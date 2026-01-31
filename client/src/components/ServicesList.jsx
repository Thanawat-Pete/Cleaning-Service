import React from "react";
import { Link } from "react-router-dom";
import Card from "./ui/Card";
import Button from "./ui/Button";

const ServicesList = ({ items }) => {
    if (!Array.isArray(items) || items.length === 0) {
        return (
            <div className="text-center text-gray-500 py-6">
                <span>ไม่พบข้อมูลบริการ</span>
            </div>
        );
    }

    const translatePriceType = (type) => {
        switch (type) {
            case 'hour': return 'ชั่วโมง';
            case 'time': return 'ครั้ง';
            case 'area': return 'ตร.ม.';
            default: return type;
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it, index) => (
                <Link key={it._id || index} to={`/service/${it._id}`}>
                    <Card
                        title={it.serviceName}
                        image={it.coverImageUrl} // Assuming service has coverImageUrl
                        className="hover:scale-105 transition-transform duration-300 h-full cursor-pointer"
                    >
                        <p className="text-sm text-gray-500 mb-4">{it.serviceDetail}</p>
                        <div className="flex justify-between items-center mt-auto">
                            <span className="text-lg font-bold text-primary">{it.price} บาท / {translatePriceType(it.priceType)}</span>
                            {/* We can add a book button here if needed, or link to booking page */}
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export default ServicesList;
