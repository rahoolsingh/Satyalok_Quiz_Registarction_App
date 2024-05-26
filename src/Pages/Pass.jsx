import React, { useEffect } from "react";
import quizLogo from "../assets/quiz_logo.png";
import logo from "../assets/satyalok_logo.png";
import logoDark from "../assets/logoDark.png";
import qrBackground from "../assets/qrBackground.png";
import { Link, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { appwriteClient } from "../lib/appwrite";

function Pass() {
    const [name, setName] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [renderError, setRenderError] = React.useState(false);
    const [messageIndex, setMessageIndex] = React.useState(0);
    const [refresh, setRefresh] = React.useState(false);
    const [code, setCode] = React.useState("");
    const passId = useParams().passId;
    const [photoId, setPhotoId] = React.useState("");
    const [photo, setPhoto] = React.useState(null);

    const loadingMessage = [
        "Loading your pass",
        "Checking your pass",
        "Verifying your pass status",
    ];

    const removeError = () => {
        setError("");
    };

    const handleError = (error) => {
        if (typeof error === "string") {
            setError(error);
        } else {
            setError(error.message);
        }
        setLoading(false);

        // document.documentElement.scrollTop = 0;
        // document.body.style.overflow = "hidden";

        setTimeout(() => {
            setError(null);
            // document.body.style.overflow = "auto";
        }, 5000);
    };

    useEffect(() => {
        setLoading(true);
        setRefresh(false);
        appwriteClient
            .getDocument(passId)
            .then((response) => {
                console.log(response);
                setName(response.name);
                setVerified(response.verified);
                setCode(response.mobile.slice(-4));
                setPhotoId(response.photo);
                setLoading(false);
            })
            .catch((error) => {
                handleError(error);
                setRenderError(true);
                setLoading(false);
            });
    }, [passId, refresh]);

    useEffect(() => {
        if (photoId) {
            appwriteClient
                .getImageById(photoId)
                .then((response) => {
                    setPhoto(response);
                })
                .catch((error) => {
                    console.error(error);
                    handleError("Error loading photo");
                });
        }
    }, [photo, photoId]);

    useEffect(() => {
        document.title = "Entry Pass - Quiz Champ 2024 | Powered by Satyalok";
    }, []);

    return (
        <div className="max-w-md m-auto md:p-4 min-h-dvh flex md:items-center relative print:text-black">
            {!loading && !renderError && (
                <div
                    className="text-white print:text-black min-h-64 md:py-8 bg-cover bg-center md:rounded-lg p-4 text-center md:h-fit flex flex-col justify-center md:drop-shadow-2xl bg-[#1a1a1a]"
                    style={
                        {
                            // background: `url(${background})`,
                        }
                    }
                >
                    <div className="mb-6">
                        <img
                            src={logo}
                            alt="Satyalok Logo"
                            className="w-[80%] m-auto print:hidden"
                        />
                        <img
                            src={logoDark}
                            alt="Satyalok Logo"
                            className="w-[80%] m-auto print:block hidden"
                        />
                        <img
                            src={quizLogo}
                            alt="Quiz Logo"
                            className="w-[60%] m-auto h-fit"
                        />
                    </div>
                    <div className="">
                        {photo && (
                            <img
                                src={photo.href}
                                alt="User"
                                className="w-20 h-20 rounded-full m-auto object-cover object-center border border-white print:border-black"
                            />
                        )}
                        <div>
                            <h1 className="text-2xl font-bold">
                                {name.toUpperCase()}
                            </h1>
                            <p className="text-xs">
                                PASS ID: {passId.toUpperCase()}
                            </p>
                        </div>
                    </div>

                    {!verified && (
                        <div>
                            <div className="my-2 flex justify-center gap-4">
                                <p className="py-2 px-6 w-fit bg-red-500 rounded-full max-w-60 flex items-center justify-center gap-2 text-sm font-semibold bg-opacity-80">
                                    <i className="fas fa-exclamation-triangle text-xs"></i>
                                    UNVERIFIED
                                </p>
                                {/* refresh icon */}
                                <button onClick={() => setRefresh(true)}>
                                    <i className="fas fa-sync-alt text-sm text-white print:text-black hover:rotate-180 transition-all delay-100 ease-linear"></i>
                                </button>
                            </div>

                            <div className="mt-4 text-xs px-4">
                                Your registration payment is unverified.
                                <p>
                                    Please wait 24 hours after form submission.
                                </p>
                            </div>
                        </div>
                    )}

                    {verified && (
                        <div>
                            <div className="my-2 flex justify-center gap-4">
                                <p className="py-2 px-6 w-fit bg-green-500 rounded-full max-w-60 flex items-center justify-center gap-2 text-sm font-semibold bg-opacity-80">
                                    <i className="fas fa-check-circle text-xs"></i>
                                    VERIFIED
                                </p>
                                <button
                                    className="print:hidden"
                                    onClick={() => window.print()}
                                >
                                    <i className="fas fa-print text-xl text-white print:text-black"></i>
                                </button>
                            </div>

                            <div className="mt-4 text-xs px-4">
                                <p>
                                    Your registration payment is verified.
                                    Please show this pass at the entry gate at
                                    the venue for verification and entry.
                                </p>
                                <p className="space-x-2 mt-4  font-medium mb-1">
                                    <span>
                                        Please bring a print of this pass.
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="border border-black p-0.5 bg-white w-24 md:w-28 h-24 md:h-28 m-auto my-8">
                        <div
                            className="border-container relative p-2.5 md:p-3"
                            style={{
                                backgroundImage: `url(${qrBackground})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <QRCode
                                size={256}
                                style={{
                                    height: "auto",
                                    maxWidth: "100%",
                                    width: "100%",
                                }}
                                value={`[${passId}]${code}`}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                    </div>

                    <div className="my-4 text-xs flex gap-2 text-justify items-center bg-white p-2 rounded-full text-black">
                        <p className="pl-2">
                            In case you need any technical support, please
                            contact Satyalok tech support.
                        </p>
                        <Link
                            to={`https://wa.me/918210228101?text=I%20need%20help%20with%20my%20pass:${passId}`}
                            target="_blank"
                            className="bg-green-500 py-2 px-4 rounded-full whitespace-nowrap h-fit text-white print:text-black font-medium"
                        >
                            Support <i className="fas fa-headset"></i>
                        </Link>
                    </div>
                </div>
            )}

            {loading && (
                <div className="w-full h-dvh flex items-center justify-center flex-col text-blue-600">
                    <span className="loading loading-ring w-52"></span>
                    <p className="text-center mt-4">
                        <span className="text-lg">
                            {loadingMessage[messageIndex]}
                        </span>
                    </p>
                </div>
            )}

            {error && (
                <div className="fixed bottom-10 w-full md:px-10 transform -translate-x-1/2 left-1/2 transition-all duration-300 ease-in-out">
                    <div
                        role="alert"
                        className="max-w-3xl w-[80%] flex md:ml-auto md:mr-0 m-auto items-center justify-between bg-red-500 text-white p-4 rounded-md shadow-md gap-4"
                    >
                        <span>{error}</span>
                        <button onClick={removeError}>
                            <i className="fa fa-close"></i>
                        </button>
                    </div>
                </div>
            )}

            {renderError && !loading && (
                <div className="h-dvh flex items-center justify-center w-full px-2">
                    <div className="text-center text-black">
                        <h1 className="text-2xl font-bold">
                            <i className="fas fa-exclamation-triangle text-red-500 mr-3"></i>
                            Oops! Invalid Pass
                        </h1>
                        <p>There was an error loading your pass.</p>
                        <p>Please try again later.</p>

                        <div className="mt-5">
                            <p className="mb-4">
                                If you think this is an error, please contact
                                support.
                            </p>
                            <Link
                                to={`https://wa.me/918210228101?text=I%20need%20help%20with%20my%20pass:${passId}`}
                                target="_blank"
                                className="bg-green-500 py-2 px-4 rounded-full whitespace-nowrap h-fit text-white font-medium"
                            >
                                Support <i className="fas fa-headset"></i>
                            </Link>
                            <Link
                                to="/"
                                className="bg-blue-500 py-2 px-4 rounded-full whitespace-nowrap h-fit text-white font-medium ml-4"
                            >
                                Home <i className="fas fa-home"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pass;
