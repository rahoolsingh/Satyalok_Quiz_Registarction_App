import React from "react";
import { useParams } from "react-router-dom";

function Success() {
    const passId = useParams().passId;
    return (
        <div className="w-full h-dvh flex justify-center items-center flex-col">
            {/* green cirlce with animated tick in middle using daisy ui and tailwind */}
            <div className="relative flex justify-center items-center h-20 w-20 rounded-full bg-green-500">
                <span className="absolute loading loading-ring w-52 bg-green-300 -z-10"></span>
                <svg
                    className="w-10 h-10 text-white animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>
            <h1 className="text-4xl font-bold text-green-500 mt-16">
                Hooraay!
            </h1>
            <p className=" text-gray-500 text-center">
                Your form has been submitted successfully.
            </p>

            <p className="text-gray-500 text-center mt-4">
                Your Entry Pass ID is: <b>{passId}</b>
            </p>

            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
                Download Entry Pass
            </button>

            <p className="mx-6 text-xs mt-8 p-3 bg-red-50 rounded-md text-justify">
                <b>Note:</b> Your entry pass is not valid untill the payment slip is verified. Please don't forget to checkback your verification status after 24 hours.
            </p>
        </div>
    );
}

export default Success;
