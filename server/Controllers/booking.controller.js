const BookingModel = require('../Models/booking.js');
const ServiceModel = require('../Models/service.js');

exports.getAllBookings = async (req, res) => {
    try {
        let bookings;
        if (req.userType === 'admin') {
            bookings = await BookingModel.find().populate('user').populate('service').sort({ createdAt: -1 });
        } else {
            bookings = await BookingModel.find({ user: req.authorId }).populate('user').populate('service').sort({ createdAt: -1 });
        }
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error fetching bookings' });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Booking ID is missing' });
        }
        const booking = await BookingModel.findById(id).populate('user').populate('service');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (booking.user.toString() !== req.authorId && req.userType !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error fetching booking' });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const { phone, appointmentDateTime, service } = req.body;
        if (!phone || !appointmentDateTime || !service) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if service exists
        const serviceDoc = await ServiceModel.findById(service);
        if (!serviceDoc) {
            return res.status(404).json({ message: 'Service not found' });
        }
        const newBooking = await BookingModel.create({ user: req.authorId, phone, appointmentDateTime, service });
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error processing request' });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { phone, appointmentDateTime, status, service } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Booking ID is missing' });
        }
        if (!phone || !appointmentDateTime || !service) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const bookingDoc = await BookingModel.findById(id);
        if (!bookingDoc) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (bookingDoc.user.toString() !== req.authorId && req.userType !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        // Check if service exists
        const serviceDoc = await ServiceModel.findById(service);
        if (!serviceDoc) {
            return res.status(404).json({ message: 'Service not found' });
        }
        const updatedBooking = await BookingModel.findByIdAndUpdate(
            id,
            { phone, appointmentDateTime, status, service },
            { new: true }
        );
        if (!updatedBooking) {
            return res.status(500).json({ message: 'Cannot update booking' });
        }
        res.status(200).json({ message: 'Booking updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error processing request' });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Booking ID is missing' });
        }
        const bookingDoc = await BookingModel.findById(id);
        if (!bookingDoc) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (bookingDoc.user.toString() !== req.authorId && req.userType !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        const deletedBooking = await BookingModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error processing request' });
    }
};