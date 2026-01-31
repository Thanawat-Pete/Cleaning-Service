import React from "react";
import { Link } from "react-router-dom";

const NotAllowed = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-base-100 px-4">
            <h1 className="text-6xl font-bold text-error mb-4">
                403
            </h1>
            <p className="text-xl text-base-content/70 mb-6 text-center">
                ขออภัย คุณไม่มีสิทธิ์เข้าถึงหน้านี้ (Access Denied)
            </p>
            <Link
                to="/"
                className="btn btn-primary"
            >
                กลับไปหน้าแรก
            </Link>
        </div>
    );
};

export default NotAllowed;