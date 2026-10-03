require("dotenv").config();

const { connectDB, getDB } = require("../../config/db");

const services = [
  {
    id: "birth-registration",
    name: "Birth Registration",
    nameBn: "জন্ম নিবন্ধন",
    category: "identity",

    keywords: [
      "জন্ম নিবন্ধন",
      "জন্মনিবন্ধন",
      "জন্ম সনদ",
      "birth registration",
      "birth certificate",
    ],

    descriptionBn:
      "জন্ম নিবন্ধন সংক্রান্ত তথ্য, আবেদন এবং সংশোধন বিষয়ে সহায়তা।",

    subServices: [
      {
        id: "birth-registration-correction",

        nameBn: "জন্ম নিবন্ধন তথ্য সংশোধন",

        keywords: ["নাম ভুল", "তথ্য ভুল", "সংশোধন", "ভুল ঠিক", "correction"],

        documents: ["সংশোধনের প্রয়োজনীয় প্রমাণপত্র", "জন্ম নিবন্ধনের তথ্য"],

        steps: [
          "সংশ্লিষ্ট সরকারি জন্ম নিবন্ধন সেবা ব্যবস্থায় প্রবেশ করুন।",
          "সংশোধনের প্রয়োজনীয় তথ্য প্রদান করুন।",
          "প্রয়োজনীয় supporting documents প্রদান করুন।",
          "সংশ্লিষ্ট কর্তৃপক্ষের নির্দেশনা অনুসরণ করুন।",
        ],

        officialLinks: [
          {
            title: "Bangladesh Birth Registration",
            url: "https://bdris.gov.bd/",
          },
        ],
      },
    ],
  },

  {
    id: "passport",

    name: "Passport",

    nameBn: "পাসপোর্ট",

    category: "travel",

    keywords: ["passport", "পাসপোর্ট", "ই-পাসপোর্ট", "নতুন পাসপোর্ট"],

    descriptionBn:
      "বাংলাদেশের পাসপোর্ট সংক্রান্ত সাধারণ তথ্য ও আবেদন নির্দেশনা।",

    subServices: [
      {
        id: "passport-application",

        nameBn: "পাসপোর্ট আবেদন",

        keywords: [
          "নতুন পাসপোর্ট",
          "passport application",
          "পাসপোর্ট করতে",
          "পাসপোর্ট বানাতে",
        ],

        documents: [
          "প্রযোজ্য পরিচয়পত্র ও প্রয়োজনীয় তথ্য",
          "আবেদনের জন্য প্রয়োজনীয় supporting documents",
        ],

        steps: [
          "সরকারি e-Passport application portal-এ প্রবেশ করুন।",
          "আবেদন ফর্মের প্রয়োজনীয় তথ্য পূরণ করুন।",
          "প্রয়োজনীয় appointment বা পরবর্তী নির্দেশনা অনুসরণ করুন।",
        ],

        officialLinks: [
          {
            title: "Bangladesh e-Passport",
            url: "https://www.epassport.gov.bd/",
          },
        ],
      },
    ],
  },

  {
    id: "nid",

    name: "National ID",

    nameBn: "জাতীয় পরিচয়পত্র (NID)",

    category: "identity",

    keywords: ["nid", "NID", "জাতীয় পরিচয়পত্র", "ভোটার আইডি", "আইডি কার্ড"],

    descriptionBn:
      "জাতীয় পরিচয়পত্র সংক্রান্ত সাধারণ তথ্য ও প্রয়োজনীয় নির্দেশনা।",

    subServices: [
      {
        id: "nid-information",

        nameBn: "NID সংক্রান্ত তথ্য",

        keywords: ["nid information", "NID তথ্য", "NID সমস্যা", "ভোটার আইডি"],

        documents: ["প্রযোজ্য NID/পরিচয় সংক্রান্ত তথ্য"],

        steps: [
          "নির্বাচন কমিশনের official NID service portal ব্যবহার করুন।",
          "আপনার প্রয়োজনীয় service নির্বাচন করুন।",
          "প্রয়োজনীয় তথ্য প্রদান করে নির্দেশনা অনুসরণ করুন।",
        ],

        officialLinks: [
          {
            title: "Bangladesh NID Services",
            url: "https://services.nidw.gov.bd/",
          },
        ],
      },
    ],
  },

  {
    id: "driving-license",

    name: "Driving Licence",

    nameBn: "ড্রাইভিং লাইসেন্স",

    category: "transport",

    keywords: [
      "driving license",
      "driving licence",
      "ড্রাইভিং লাইসেন্স",
      "লাইসেন্স",
      "গাড়ির লাইসেন্স",
    ],

    descriptionBn: "ড্রাইভিং লাইসেন্স সংক্রান্ত সাধারণ তথ্য ও নির্দেশনা।",

    subServices: [
      {
        id: "driving-license-application",

        nameBn: "ড্রাইভিং লাইসেন্স আবেদন",

        keywords: ["নতুন লাইসেন্স", "ড্রাইভিং লাইসেন্স করতে", "লাইসেন্স আবেদন"],

        documents: ["প্রযোজ্য পরিচয়পত্র", "প্রয়োজনীয় আবেদন সংক্রান্ত তথ্য"],

        steps: [
          "BRTA-এর official service portal ব্যবহার করুন।",
          "প্রযোজ্য driving licence service নির্বাচন করুন।",
          "আবেদনের প্রয়োজনীয় ধাপগুলো সম্পন্ন করুন।",
        ],

        officialLinks: [
          {
            title: "BRTA",
            url: "https://bsp.brta.gov.bd/",
          },
        ],
      },
    ],
  },
];

async function seedDatabase() {
  try {
    await connectDB();

    const db = getDB();

    const collection = db.collection("services");

    await collection.deleteMany({});

    await collection.insertMany(services);

    console.log("Services inserted successfully ✅");

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);

    process.exit(1);
  }
}

seedDatabase();
