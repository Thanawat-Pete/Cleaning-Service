const ServiceModel = require("../Models/service.js");

exports.getAllServices = async (req, res) => {
    try {
        const services = await ServiceModel.find().sort({ createdAt: -1 });
        if (!services || services.length === 0) {
            return res.status(404).json({ message: 'No services found' });
        }
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error fetching services' });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Service ID is missing' });
        }
        const service = await ServiceModel.findById(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error fetching service' });
    }
};

exports.createService = async (req, res) => {
    try {
        const { serviceName, serviceDetail, price, priceType, coverImageUrl } = req.body;
        if (!serviceName || !serviceDetail || !price || !priceType || !coverImageUrl) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingService = await ServiceModel.findOne({ serviceName });
        if (existingService) {
            return res.status(409).json({ message: 'Service name already exists' });
        }
        const newService = await ServiceModel.create({ serviceName, serviceDetail, price, priceType, coverImageUrl });
        await newService.save();
        res.status(201).json({ message: 'Service created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error processing request' });
    }
};

exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { serviceName, serviceDetail, price, priceType, coverImageUrl, isActive } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Service ID is missing' });
        }
        if (!serviceName || !serviceDetail || !price || !priceType || !coverImageUrl) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const serviceDoc = await ServiceModel.findById(id);
        if (!serviceDoc) {
            return res.status(404).json({ message: 'Service not found' });
        }
        const updatedService = await ServiceModel.findByIdAndUpdate(
            id,
            { serviceName, serviceDetail, price, priceType, coverImageUrl, isActive },
            { new: true }
        );
        if (!updatedService) {
            return res.status(500).json({ message: 'Cannot update service' });
        }
        res.status(200).json({ message: 'Service updated successfully', data: updatedService });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error processing request' });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Service ID is missing' });
        }
        const deletedService = await ServiceModel.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error processing request' });
    }
};