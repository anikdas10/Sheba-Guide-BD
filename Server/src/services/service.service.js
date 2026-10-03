const { getDB } = require("../../config/db");

function getServicesCollection() {
  const db = getDB();

  return db.collection("services");
}

async function getAllServices() {
  const collection = getServicesCollection();

  return await collection.find({}).toArray();
}

async function getServiceById(serviceId) {
  const collection = getServicesCollection();

  return await collection.findOne({
    id: serviceId,
  });
}

async function createService(service) {
  const collection = getServicesCollection();

  const result = await collection.insertOne(service);

  return {
    ...service,
    _id: result.insertedId,
  };
}

module.exports = {
  getAllServices,
  getServiceById,
  createService,
};
