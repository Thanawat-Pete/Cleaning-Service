import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";
import bookingServices from "../services/bookings.services";
import serviceServices from "../services/service.services"; // You'll need this service
import Input from "./ui/Input";
import Button from "./ui/Button";
import Card from "./ui/Card";

const BookingForm = () => {
    const { userInfo } = useContext(UserContext);
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        phone: userInfo?.telephone || "",
        appointmentDate: "",
        appointmentTime: "",
        serviceId: ""
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await serviceServices.getService();
                setServices(response.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServices();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Combine date and time
            const appointmentDateTime = new Date(`${formData.appointmentDate}T${formData.appointmentTime}`);

            await bookingServices.createBooking(
                formData.phone,
                appointmentDateTime,
                formData.serviceId
            );

            Swal.fire({
                title: "จองบริการสำเร็จ",
                text: "เราได้รับข้อมูลการจองของคุณแล้ว",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
            setFormData({
                phone: userInfo?.telephone || "",
                appointmentDate: "",
                appointmentTime: "",
                serviceId: ""
            });

        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "จองบริการไม่สำเร็จ",
                text: error.response?.data?.message || "เกิดข้อผิดพลาดบางอย่าง",
                icon: "error"
            });
        }
    };

    return (
        <Card title="จองบริการทำความสะอาด" className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-medium">เลือกบริการ</span>
                    </label>
                    <select
                        className="select select-bordered w-full bg-base-content/5"
                        name="serviceId"
                        value={formData.serviceId}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>เลือกบริการที่คุณต้องการ</option>
                        {services.map(service => (
                            <option key={service._id} value={service._id}>
                                {service.serviceName} - {service.price} บาท / {service.priceType}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="วันที่"
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required
                        placeholder=""
                    />
                    <Input
                        label="เวลา"
                        type="time"
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        required
                        placeholder=""
                    />
                </div>

                <Input
                    label="เบอร์โทรศัพท์"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0812345678"
                    required
                />

                <Button type="submit" fullWidth className="mt-4">
                    ยืนยันการจอง
                </Button>
            </form>
        </Card>
    );
};

export default BookingForm;
