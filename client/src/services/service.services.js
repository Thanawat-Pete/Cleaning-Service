import api from "./api";
const API_URL = import.meta.env.VITE_SERVICE_URL;

const getService = async () => {
    return await api.get(API_URL);
};

const getServiceById = async (id) => {
    return await api.get(API_URL + "/" + id);
};

const createService = async (serviceName, serviceDetail, price, priceType, coverImageUrl) => {
    return await api.post(API_URL, {
        serviceName,
        serviceDetail,
        price,
        priceType,
        coverImageUrl
    });
};

const updateService = async (id, serviceName, serviceDetail, price, priceType, coverImageUrl, isActive) => {
    return await api.put(API_URL + "/" + id, {
        serviceName,
        serviceDetail,
        price,
        priceType,
        coverImageUrl,
        isActive
    });
};

const deleteService = async (id) => {
    return await api.delete(API_URL + "/" + id);
};

const serviceServices = {
    getService,
    getServiceById,
    createService,
    updateService,
    deleteService
};

export default serviceServices;