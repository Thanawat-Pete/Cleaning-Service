import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import serviceServices from "../services/service.services";
import ServicesList from "../components/ServicesList";
import Button from "../components/ui/Button";

const Home = () => {
    const [services, setServices] = useState([]);

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

    return (
        <div className="flex flex-col gap-10 pb-10">
            {/* Hero Section */}
            <div className="hero min-h-[60vh] bg-base-200 rounded-box">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">บริการทำความสะอาดครบวงจร</h1>
                        <p className="py-6">
                            สัมผัสประสบการณ์บ้านสะอาดโดยที่คุณไม่ต้องเหนื่อย
                            ทีมงานมืออาชีพของเราพร้อมให้บริการทำความสะอาดที่ตอบโจทย์ทุกความต้องการของคุณ
                        </p>
                        <Link to="/booking">
                            <Button variant="primary">จองเลย</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="flex flex-col items-center gap-4 px-4">
                <h2 className="text-3xl font-bold mb-4">บริการของเรา</h2>
                <div className="w-full">
                    <ServicesList items={services} />
                </div>
            </div>
        </div>
    );
};

export default Home;
