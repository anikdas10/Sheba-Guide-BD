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
      "জন্ম নিবন্ধন, জন্ম নিবন্ধনের তথ্য সংশোধন এবং সনদ সংক্রান্ত সরকারি সেবা।",

    subServices: [
      {
        id: "birth-registration-correction",

        nameBn: "জন্ম নিবন্ধন তথ্য সংশোধন",

        keywords: [
          "নাম ভুল",
          "তথ্য ভুল",
          "সংশোধন",
          "ভুল ঠিক",
          "জন্ম নিবন্ধন সংশোধন",
        ],

        documents: [
          "সংশোধনের প্রয়োজনীয় প্রমাণপত্র",
          "জন্ম নিবন্ধনের প্রয়োজনীয় তথ্য",
        ],

        steps: [
          "BDRIS-এর জন্ম নিবন্ধন তথ্য সংশোধন সেবায় প্রবেশ করুন।",
          "জন্ম নিবন্ধন নম্বর এবং জন্ম তারিখ দিয়ে প্রয়োজনীয় তথ্য যাচাই করুন।",
          "যে তথ্য সংশোধন করতে চান সেটি নির্বাচন করুন।",
          "সংশোধিত তথ্য এবং সংশোধনের কারণ প্রদান করুন।",
          "প্রয়োজনীয় supporting document upload করুন।",
          "আবেদনকারীর প্রয়োজনীয় যোগাযোগের তথ্য প্রদান করে আবেদন সম্পন্ন করুন।",
        ],

        officialLinks: [
          {
            title: "জন্ম নিবন্ধন তথ্য সংশোধন",
            url: "https://www.bdris.gov.bd/br/correction",
          },
          {
            title: "BDRIS",
            url: "https://bdris.gov.bd/",
          },
        ],

        verification: {
          verified: true,
          source: "Bangladesh Birth Registration Information System",
          lastVerified: "2026-10-03",
        },
      },
    ],
  },

  {
    id: "passport",
    name: "Passport",
    nameBn: "পাসপোর্ট",
    category: "travel",

    keywords: [
      "passport",
      "পাসপোর্ট",
      "পাসপোর্ট বানাতে",
      "পাসপোর্ট করতে",
      "ই-পাসপোর্ট",
    ],

    descriptionBn:
      "বাংলাদেশের পাসপোর্ট সংক্রান্ত সাধারণ তথ্য ও আবেদন নির্দেশনা।",

    services: [
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
          "সরকারি e-passport application portal-এ প্রবেশ করুন।",
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

    keywords: [
      "nid",
      "NID",
      "জাতীয় পরিচয়পত্র",
      "ভোটার আইডি",
      "ভোটার কার্ড",
      "আইডি কার্ড",
    ],

    descriptionBn: "জাতীয় পরিচয়পত্র সংক্রান্ত বিভিন্ন সরকারি সেবা ও তথ্য।",

    subServices: [
      {
        id: "nid-correction",

        nameBn: "NID তথ্য সংশোধন",

        keywords: [
          "NID সংশোধন",
          "NID correction",
          "নাম ভুল",
          "পিতার নাম ভুল",
          "মাতার নাম ভুল",
          "তথ্য সংশোধন",
        ],

        documents: [
          "সংশোধনের দাবির সমর্থনে প্রয়োজনীয় supporting document",
          "প্রযোজ্য ক্ষেত্রে SSC বা সমমানের সনদ",
          "প্রয়োজন অনুযায়ী জন্ম নিবন্ধন, passport, driving licence বা অন্যান্য প্রমাণপত্র",
        ],

        steps: [
          "NID-এর official service information যাচাই করুন।",
          "আপনার সংশোধনের ধরন নির্ধারণ করুন।",
          "প্রয়োজনীয় supporting documents প্রস্তুত করুন।",
          "নির্ধারিত পদ্ধতিতে correction application করুন।",
          "প্রয়োজনে সংশ্লিষ্ট নির্বাচন অফিসের নির্দেশনা অনুসরণ করুন।",
        ],

        officialLinks: [
          {
            title: "Bangladesh NID Wing",
            url: "https://www.nidw.gov.bd/",
          },
          {
            title: "NID Correction Rules",
            url: "https://nidw.gov.bd/LawsRulesNIDCorrection.php",
          },
        ],

        verification: {
          verified: true,
          source: "Bangladesh NID Wing",
          lastVerified: "2026-10-03",
        },
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

    descriptionBn:
      "বাংলাদেশে ড্রাইভিং লাইসেন্স সংক্রান্ত সরকারি সেবা ও আবেদন নির্দেশনা।",

    subServices: [
      {
        id: "learner-license",

        nameBn: "লার্নার বা শিক্ষানবিশ ড্রাইভিং লাইসেন্স",

        keywords: [
          "learner license",
          "লার্নার লাইসেন্স",
          "শিক্ষানবিশ লাইসেন্স",
          "নতুন লাইসেন্স",
        ],

        documents: [
          "নির্ধারিত আবেদন ফরম",
          "রেজিস্টার্ড ডাক্তার কর্তৃক মেডিকেল সার্টিফিকেট",
          "জাতীয় পরিচয়পত্র / জন্ম সনদ / পাসপোর্টের প্রযোজ্য কপি",
          "নির্ধারিত ফি জমাদানের রশিদ",
          "প্রয়োজনীয় ছবি",
        ],

        steps: [
          "BRTA Service Portal-এ প্রবেশ করুন।",
          "Learner Driving Licence-এর জন্য আবেদন করুন।",
          "প্রয়োজনীয় তথ্য ও documents প্রদান করুন।",
          "প্রযোজ্য fee প্রদান করুন।",
          "BRTA-এর পরবর্তী নির্দেশনা অনুসরণ করুন।",
        ],

        officialLinks: [
          {
            title: "BRTA Service Portal",
            url: "https://bsp.brta.gov.bd/",
          },
          {
            title: "BRTA Driving Licence Information",
            url: "https://bsp.brta.gov.bd/drivingLicense",
          },
        ],

        verification: {
          verified: true,
          source: "Bangladesh Road Transport Authority",
          lastVerified: "2026-10-03",
        },
      },

      {
        id: "smart-card-license",

        nameBn: "স্মার্ট কার্ড ড্রাইভিং লাইসেন্স",

        keywords: [
          "smart card license",
          "স্মার্ট কার্ড লাইসেন্স",
          "ড্রাইভিং লাইসেন্স",
        ],

        documents: [
          "নির্ধারিত আবেদন ফরম",
          "রেজিস্টার্ড ডাক্তার কর্তৃক মেডিকেল সার্টিফিকেট",
          "জাতীয় পরিচয়পত্র / জন্ম সনদ / পাসপোর্টের প্রযোজ্য কপি",
          "নির্ধারিত fee জমাদানের রশিদ",
          "প্রয়োজনীয় ছবি",
        ],

        steps: [
          "প্রযোজ্য learner licence-এর প্রক্রিয়া সম্পন্ন করুন।",
          "BRTA-এর নির্দেশনা অনুযায়ী smart-card driving licence-এর আবেদন করুন।",
          "প্রয়োজনীয় documents ও fee প্রদান করুন।",
          "BRTA-এর পরবর্তী নির্দেশনা অনুসরণ করুন।",
        ],

        officialLinks: [
          {
            title: "BRTA Service Portal",
            url: "https://bsp.brta.gov.bd/",
          },
        ],

        verification: {
          verified: true,
          source: "Bangladesh Road Transport Authority",
          lastVerified: "2026-10-03",
        },
      },

      {
        id: "license-renewal",

        nameBn: "ড্রাইভিং লাইসেন্স নবায়ন",

        keywords: [
          "লাইসেন্স নবায়ন",
          "driving license renewal",
          "renew license",
          "লাইসেন্স renew",
        ],

        documents: [
          "নির্ধারিত আবেদন ফরম",
          "প্রয়োজনীয় মেডিকেল সার্টিফিকেট",
          "প্রযোজ্য পরিচয়পত্রের কপি",
          "নির্ধারিত fee জমাদানের রশিদ",
        ],

        steps: [
          "BRTA-এর official service portal ব্যবহার করুন।",
          "Driving Licence Renewal service নির্বাচন করুন।",
          "প্রয়োজনীয় documents ও fee সংক্রান্ত নির্দেশনা অনুসরণ করুন।",
          "প্রয়োজনে BRTA নির্ধারিত অফিসে উপস্থিত হয়ে প্রয়োজনীয় প্রক্রিয়া সম্পন্ন করুন।",
        ],

        officialLinks: [
          {
            title: "BRTA Service Portal",
            url: "https://bsp.brta.gov.bd/",
          },
        ],

        verification: {
          verified: true,
          source: "Bangladesh Road Transport Authority",
          lastVerified: "2026-10-03",
        },
      },
    ],
  },
];

module.exports = services;
