import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Success() {
    const passId = useParams().passId;
    const [timer, setTimer] = React.useState(10);
    const navigate = useNavigate();

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (timer === 1) {
                clearInterval(interval);
                navigate(`/success/pass/${passId}`);
            } else {
                setTimer((prev) => prev - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, navigate, passId]);

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

            <Link
                to={`/success/pass/${passId}`}
                className="mt-14 bg-green-500 text-white px-4 py-2 rounded-md"
            >
                View Your Pass
            </Link>

            {/* 10sec countdown */}
            <p className="text-gray-500 text-center mt-4">
                You will be automatically redirected to the pass page in {timer}{" "}
                seconds.
            </p>
            <p className="text-gray-700 text-center mt-4 px-8 text-xs">
                You can search your pass using your mobile number by visitng the{" "}
                <b>View Your Pass</b> page.
            </p>

            <p className="mx-6 text-xs mt-8 p-3 bg-red-50 rounded-md text-justify">
                <b>Note:</b> Your entry pass is not valid untill the payment
                slip is verified. Please don't forget to checkback your
                verification status after 24 hours.
            </p>
        </div>
    );
}

export default Success;
