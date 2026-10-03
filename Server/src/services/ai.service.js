const { GoogleGenAI, Type } = require("@google/genai");

const { searchServices } = require("./retrieval.service");

// ==========================================
// GOOGLE AI CLIENT
// ==========================================

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_API_KEY,
});

const MODEL_NAME = process.env.AI_MODEL || "gemini-3.5-flash-lite";

// ==========================================
// AI REQUEST WITH RETRY
// ==========================================

async function generateWithRetry(contents, config, retries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`AI request attempt ${attempt}/${retries}`);

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents,
        config,
      });

      return response;
    } catch (error) {
      lastError = error;

      console.error(
        `AI request failed on attempt ${attempt}:`,
        error?.message || error,
      );

      // Only retry temporary server errors
      if (error?.status !== 503) {
        throw error;
      }

      // Don't wait after final attempt
      if (attempt === retries) {
        break;
      }

      const delay = attempt * 2000;

      console.log(`Retrying AI request after ${delay}ms...`);

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// ==========================================
// 1. CLASSIFY USER INTENT
// ==========================================

async function classifyUserIntent(userMessage) {
  // Retrieve possible services from MongoDB
  const retrievedServices = await searchServices(userMessage);

  const serviceList = retrievedServices.map((service) => ({
    id: service.id,
    nameBn: service.nameBn,
    category: service.category,
    keywords: service.keywords || [],
  }));

  // If MongoDB has no relevant service
  if (serviceList.length === 0) {
    return {
      serviceId: "unknown",
      category: "unknown",
      userProblem: userMessage,
      needsMoreInfo: false,
      followUpQuestion: "",
    };
  }

  const prompt = `
তুমি ShebaGuide BD-এর AI Intent Classification Engine।

ShebaGuide BD বাংলাদেশের নাগরিকদের সরকারি সেবা
সহজ বাংলায় বুঝতে সাহায্য করে।

ব্যবহারকারীর প্রশ্ন:

"${userMessage}"


MongoDB Knowledge Base থেকে পাওয়া সম্ভাব্য services:

${JSON.stringify(serviceList, null, 2)}


তোমার কাজ:

1. ব্যবহারকারীর প্রশ্নের মূল উদ্দেশ্য বুঝবে।

2. উপরের retrieved services থেকে সবচেয়ে
relevant service নির্বাচন করবে।

3. কোনো service relevant না হলে
serviceId হবে "unknown"।

4. ব্যবহারকারীর সমস্যাটি সহজ বাংলায়
সংক্ষেপে লিখবে।

5. প্রশ্নটি বোঝার জন্য আরও তথ্য প্রয়োজন হলে
needsMoreInfo true করবে।

6. আরও তথ্য প্রয়োজন হলে একটি ছোট
follow-up question লিখবে।

7. Retrieved services-এর বাইরে কোনো
নতুন service তৈরি করবে না।

শুধু valid JSON return করবে।
`;

  const response = await generateWithRetry(prompt, {
    responseMimeType: "application/json",

    responseSchema: {
      type: Type.OBJECT,

      properties: {
        serviceId: {
          type: Type.STRING,
        },

        category: {
          type: Type.STRING,
        },

        userProblem: {
          type: Type.STRING,
        },

        needsMoreInfo: {
          type: Type.BOOLEAN,
        },

        followUpQuestion: {
          type: Type.STRING,
        },
      },

      required: [
        "serviceId",
        "category",
        "userProblem",
        "needsMoreInfo",
        "followUpQuestion",
      ],
    },
  });

  return JSON.parse(response.text);
}

// ==========================================
// 2. FIND RELEVANT SERVICE
// ==========================================

async function getRelevantService(userMessage, classification) {
  const retrievedServices = await searchServices(userMessage);

  // Try AI-selected service first
  if (classification?.serviceId && classification.serviceId !== "unknown") {
    const matchedService = retrievedServices.find(
      (service) => service.id === classification.serviceId,
    );

    if (matchedService) {
      return matchedService;
    }
  }

  // Fallback to highest-ranked
  // MongoDB retrieval result
  return retrievedServices[0] || null;
}

// ==========================================
// 3. GENERATE SERVICE GUIDE
// ==========================================

async function generateServiceGuide(userMessage, classification) {
  // Get relevant service from MongoDB
  const service = await getRelevantService(userMessage, classification);

  // ========================================
  // NO SERVICE FOUND
  // ========================================

  if (!service) {
    return {
      type: "unknown",

      title: "সেবা খুঁজে পাওয়া যায়নি",

      explanation:
        "আপনার প্রশ্নের সঙ্গে মিলে এমন কোনো verified সরকারি সেবা বর্তমানে আমাদের knowledge base-এ পাওয়া যায়নি।",

      documents: [],

      steps: [],

      officialLinks: [],

      disclaimer:
        "সরকারি তথ্য পরিবর্তিত হতে পারে। প্রয়োজন হলে সংশ্লিষ্ট সরকারি website থেকে তথ্য যাচাই করুন।",
    };
  }

  // ========================================
  // FIND MATCHING SUB-SERVICE
  // ========================================

  const subServices = service.subServices || [];

  const normalizedMessage = userMessage.toLowerCase();

  let matchedSubService = null;

  for (const subService of subServices) {
    const keywords = subService.keywords || [];

    const matched = keywords.some((keyword) =>
      normalizedMessage.includes(keyword.toLowerCase()),
    );

    if (matched) {
      matchedSubService = subService;

      break;
    }
  }

  // Fallback
  if (!matchedSubService) {
    matchedSubService = subServices[0] || null;
  }

  // ========================================
  // RAG CONTEXT
  // ========================================

  const context = {
    service: {
      id: service.id,

      nameBn: service.nameBn,

      category: service.category,

      descriptionBn: service.descriptionBn,
    },

    subService: matchedSubService,
  };

  // ========================================
  // AI PROMPT
  // ========================================

  const prompt = `
তুমি ShebaGuide BD-এর AI Citizen Service Assistant।

তোমার কাজ হলো বাংলাদেশের নাগরিকদের
সরকারি সেবা সম্পর্কে সহজ বাংলায়
সহায়তা করা।


ব্যবহারকারীর প্রশ্ন:

"${userMessage}"


AI Classification:

${JSON.stringify(classification, null, 2)}


MongoDB থেকে Retrieved Verified Information:

${JSON.stringify(context, null, 2)}


========================================
অত্যন্ত গুরুত্বপূর্ণ নিয়ম
========================================

1. শুধুমাত্র উপরের retrieved information
ব্যবহার করবে।

2. Retrieved information-এর বাইরে কোনো
সরকারি নিয়ম তৈরি করবে না।

3. কোনো নতুন document, fee, eligibility,
deadline বা procedure অনুমান করবে না।

4. কোনো তথ্য context-এ না থাকলে সেটি
নিজে থেকে তৈরি করবে না।

5. তথ্য পাওয়া না গেলে বলবে:
"এই তথ্যটি official source থেকে যাচাই করুন।"

6. সহজ, স্বাভাবিক এবং পরিষ্কার বাংলায়
উত্তর দেবে।

7. উত্তর practical হবে।

8. Steps থাকলে numbered steps হিসেবে দেবে।

9. Documents থাকলে list হিসেবে দেবে।

10. Official source থাকলে অবশ্যই
officialLinks-এর মধ্যে দেখাবে।

11. Retrieved information-এর officialLinks
পরিবর্তন করবে না।

12. কোনো website-কে official বলবে না যদি
তা retrieved information-এর
officialLinks-এ না থাকে।

13. ব্যবহারকারীর প্রশ্নের সঙ্গে সম্পর্কহীন
তথ্য দেবে না।

14. কোনো সরকারি তথ্য নিয়ে নিশ্চিত না হলে
অনুমান করবে না।

15. শুধুমাত্র valid JSON return করবে।
`;

  // ========================================
  // STRUCTURED AI RESPONSE
  // ========================================

  const response = await generateWithRetry(prompt, {
    responseMimeType: "application/json",

    responseSchema: {
      type: Type.OBJECT,

      properties: {
        type: {
          type: Type.STRING,
        },

        title: {
          type: Type.STRING,
        },

        explanation: {
          type: Type.STRING,
        },

        documents: {
          type: Type.ARRAY,

          items: {
            type: Type.STRING,
          },
        },

        steps: {
          type: Type.ARRAY,

          items: {
            type: Type.STRING,
          },
        },

        officialLinks: {
          type: Type.ARRAY,

          items: {
            type: Type.OBJECT,

            properties: {
              title: {
                type: Type.STRING,
              },

              url: {
                type: Type.STRING,
              },
            },

            required: ["title", "url"],
          },
        },

        disclaimer: {
          type: Type.STRING,
        },
      },

      required: [
        "type",
        "title",
        "explanation",
        "documents",
        "steps",
        "officialLinks",
        "disclaimer",
      ],
    },
  });

  // ========================================
  // PARSE AI RESPONSE
  // ========================================

  return JSON.parse(response.text);
}

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  classifyUserIntent,
  generateServiceGuide,
};
