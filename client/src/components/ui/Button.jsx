import React from "react";

const Button = ({ children, onClick, type = "button", variant = "primary", className = "", fullWidth = false, disabled = false }) => {
    const baseClass = "btn";

    const variants = {
        primary: "btn-primary",
        ghost: "btn-ghost",
        error: "btn-error",
        outline: "btn-outline",
        neutral: "btn-neutral"
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            type={type}
            className={`${baseClass} ${variants[variant] || ""} ${widthClass} ${className} shadow-md hover:shadow-lg transition-all`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
