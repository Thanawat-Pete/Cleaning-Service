const express = require("express");
const router = express.Router();
const ServiceController = require("../Controllers/service.controller.js");
const authJWT = require("../Middlewares/authJwt.middleware.js");

// localhost:5000/api/v1/services
router.get("/", ServiceController.getAllServices);

// localhost:5000/api/v1/services/:id
router.get("/:id", ServiceController.getServiceById);

// localhost:5000/api/v1/services
router.post("/", authJWT.verifyAdmin, ServiceController.createService);

// localhost:5000/api/v1/services/:id
router.put("/:id", authJWT.verifyAdmin, ServiceController.updateService);

// localhost:5000/api/v1/services/:id
router.delete("/:id", authJWT.verifyAdmin, ServiceController.deleteService);

module.exports = router;
