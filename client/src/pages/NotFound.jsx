import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-base-100 px-4">
            <h1 className="text-6xl font-bold text-base-content mb-4">
                404
            </h1>
            <p className="text-xl text-base-content/70 mb-6">
                ไม่พบหน้านี้ (Page Not Found)
            </p>
            <Link
                to="/"
                className="btn btn-primary"
            >
                กลับสู่หน้าหลัก
            </Link>
        </div>
    );
};

export default NotFound;
