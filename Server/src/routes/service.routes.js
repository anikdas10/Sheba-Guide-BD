const express = require("express");

const {
  getAllServices,
  getServiceById,
} = require("../services/service.service");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const services = await getAllServices();

    res.json({
      success: true,
      services,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Services could not be loaded",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const service = await getServiceById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      service,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Service could not be loaded",
    });
  }
});

module.exports = router;
