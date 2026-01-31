const express = require("express");
const router = express.Router();
const BookingController = require("../Controllers/booking.controller.js");
const authJWT = require("../Middlewares/authJwt.middleware.js");

// localhost:5000/api/v1/bookings
router.get("/", authJWT.verifyToken, BookingController.getAllBookings);

// localhost:5000/api/v1/bookings/:id
router.get("/:id", authJWT.verifyToken, BookingController.getBookingById);

// localhost:5000/api/v1/bookings
router.post("/", authJWT.verifyToken, BookingController.createBooking);

// localhost:5000/api/v1/bookings/:id
router.put("/:id", authJWT.verifyToken, BookingController.updateBooking);

// localhost:5000/api/v1/bookings/:id
router.delete("/:id", authJWT.verifyToken, BookingController.deleteBooking);

module.exports = router;