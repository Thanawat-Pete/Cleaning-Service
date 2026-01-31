import React from "react";

const Card = ({ title, children, className = "", icon, image }) => {
    return (
        <div className={`card bg-base-100 shadow-xl border border-base-200 ${className}`}>
            {image && (
                <figure>
                    <img src={image} alt={title} className="w-full h-48 object-cover" />
                </figure>
            )}
            <div className="card-body">
                {(title || icon) && (
                    <div className="flex flex-col items-center text-center mb-4">
                        {icon && (
                            <div className="bg-primary/10 p-3 rounded-xl mb-3 text-primary">
                                {icon}
                            </div>
                        )}
                        {title && <h2 className="card-title text-2xl font-bold">{title}</h2>}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default Card;
