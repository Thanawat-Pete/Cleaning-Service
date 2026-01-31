import React from "react";

const Input = ({ label, type = "text", name, placeholder, value, onChange, icon, required = false, as = "input", rows }) => {
    const InputTag = as === "textarea" ? "textarea" : "input";

    return (
        <div className="form-control w-full">
            {label && (
                <label className="label">
                    <span className="label-text font-medium">{label}</span>
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <div className={`flex items-center justify-center ${as === "textarea" ? "h-full items-start pt-3" : "h-full"}`}>
                            {icon}
                        </div>
                    </div>
                )}
                <InputTag
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className={`${as === "textarea" ? "textarea textarea-bordered" : "input input-bordered"} w-full ${icon ? "pl-10" : ""} bg-base-content/5`}
                    value={value}
                    onChange={onChange}
                    required={required}
                    rows={rows}
                />
            </div>
        </div>
    );
};

export default Input;
