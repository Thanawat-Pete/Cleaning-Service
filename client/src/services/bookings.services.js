import api from "./api";
const API_URL = import.meta.env.VITE_BOOKING_URL;

const getBooking = async () => {
    return await api.get(API_URL);
};

const getBookingById = async (id) => {
    return await api.get(API_URL + "/" + id);
};

const createBooking = async (phone, appointmentDateTime, serviceId) => {
    return await api.post(API_URL, {
        phone,
        appointmentDateTime,
        service: serviceId
    });
};

const updateBooking = async (id, phone, appointmentDateTime, status, serviceId) => {
    return await api.put(API_URL + "/" + id, {
        phone,
        appointmentDateTime,
        status,
        service: serviceId
    });
};

const deleteBooking = async (id) => {
    return await api.delete(API_URL + "/" + id);
};

const bookingServices = {
    getBooking,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
};

export default bookingServices;