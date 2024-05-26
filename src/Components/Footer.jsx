import React from "react";

function Footer() {
    return (
        <div className="w-full bg-white text-gray-600 text-center p-4">
            <p>&copy; Quiz Champ {new Date().getFullYear()} </p>
            <p className="text-xs">
                Created by{" "}
                <a href="https://satyalok.info" className="text-blue-500">
                    Satyalok
                </a>
            </p>
        </div>
    );
}

export default Footer;
