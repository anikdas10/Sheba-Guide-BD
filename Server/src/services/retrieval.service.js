const { getDB } = require("../../config/db");

function normalizeText(text = "") {
  return text.toLowerCase().replace(/[.,!?;:()[\]{}]/g, " ");
}

function calculateScore(query, service) {
  const normalizedQuery = normalizeText(query);

  let score = 0;

  const serviceName = normalizeText(service.nameBn);

  const description = normalizeText(service.descriptionBn);

  // Service name
  if (normalizedQuery.includes(serviceName)) {
    score += 10;
  }

  // Keywords
  for (const keyword of service.keywords || []) {
    const normalizedKeyword = normalizeText(keyword);

    if (normalizedQuery.includes(normalizedKeyword)) {
      score += 5;
    }
  }

  // Sub-services
  for (const subService of service.subServices || []) {
    if (normalizedQuery.includes(normalizeText(subService.nameBn))) {
      score += 8;
    }

    for (const keyword of subService.keywords || []) {
      if (normalizedQuery.includes(normalizeText(keyword))) {
        score += 4;
      }
    }
  }

  // Description
  const descriptionWords = description.split(/\s+/);

  for (const word of descriptionWords) {
    if (word.length > 2 && normalizedQuery.includes(word)) {
      score += 1;
    }
  }

  return score;
}

async function searchServices(query) {
  const db = getDB();

  const collection = db.collection("services");

  const services = await collection.find({}).toArray();

  const rankedResults = services
    .map((service) => ({
      service,
      score: calculateScore(query, service),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return rankedResults.slice(0, 5).map((item) => item.service);
}

module.exports = {
  searchServices,
};
