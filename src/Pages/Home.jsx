import React from "react";
import banner1 from "../assets/banner_1.png";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { Copy, Lock } from "lucide-react";
import screenshot from "../assets/screenshot.png";
import Footer from "../Components/Footer";
function Home() {
    const upiId = "boism-9031717629@boi";
    const [copied, setCopied] = React.useState(false);

    const handleCopyUpiId = () => {
        const upiID = upiId; // Replace with the actual UPI ID

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(upiID)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 3000);

                    document.querySelector(".upiId").focus();
                })
                .catch((err) => {
                    fallbackCopyTextToClipboard(upiID);
                });
        } else {
            fallbackCopyTextToClipboard(upiID);
        }
    };

    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand("copy");
            document.querySelector(".upiId").focus();
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000);
        } catch (err) {
            alert("Failed to copy UPI ID");
        }

        document.body.removeChild(textArea);
    }
    return (
        <div className="w-full h-dvh overflow-y-auto bg-slate-200">
            <div className="max-w-7xl m-auto bg-white">
                <Navbar />
                <div className="pt-14">
                    <img
                        src={banner1}
                        alt="banner"
                        className="w-full  object-cover"
                    />
                </div>
                <div className="py-8 px-8">
                    <section>
                        <div className=" md:py-8">
                            <h2 className="text-3xl text-center font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                                Welcome to Quiz Champ 2024
                            </h2>
                            <div className="mt-4 block max-w-4xl text-gray-500 text-center m-auto">
                                Please follow the instructions below to get
                                registered for the Quiz Champ 2024
                            </div>

                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="mx-auto w-full text-center md:max-w-2xl">
                                    <div className="flex items-center mt-8 mb-4 gap-4">
                                        <span className="h-1 w-full bg-orange-500 rounded-full"></span>
                                        <span className="inline-block whitespace-nowrap w-20 bg-orange-500 px-4 py-1 text-sm font-semibold text-white rounded-full">
                                            Step 1
                                        </span>
                                        <span className="h-1 w-full bg-orange-500 rounded-full"></span>
                                    </div>
                                    <h2 className="text-2xl text-center font-bold tracking-tight text-gray-800 xl:text-4xl">
                                        Pay Registration Fee
                                    </h2>
                                    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600">
                                        Pay the registration fee of{" "}
                                        <b className="text-orange-500">
                                            Rs. 10/-
                                        </b>{" "}
                                        to get registered for the Quiz Champ
                                        2024
                                    </p>
                                </div>

                                <div className="flex flex-col items-center sm:flex-row sm:justify-center mt-6">
                                    <div className="flex w-full max-w-sm items-center space-x-2">
                                        <input
                                            className="upiId flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                                            type="text"
                                            value={upiId}
                                            readOnly
                                        />
                                        <button
                                            type="button"
                                            onClick={handleCopyUpiId}
                                            className="flex items-center justify-center rounded-md text-gray-600 hover:text-black focus:outline-none"
                                        >
                                            <Copy />
                                        </button>
                                    </div>
                                </div>

                                <div className="m-auto text-center">
                                    {copied && (
                                        <span className="text-green-500 text-sm">
                                            Copied
                                        </span>
                                    )}
                                </div>
                                <div className="flex max-w-xl bg-slate-50 p-3 rounded-md m-auto flex-col items-center sm:flex-row sm:justify-center mt-4 text-sm md:text-base">
                                    <div className="w-full items-center space-y-1">
                                        <p className="font-bold">
                                            Follow these steps to pay the
                                            registration fee using any UPI app:
                                        </p>
                                        <ol className="list-decimal pl-6 text-xs md:text-sm">
                                            <li>
                                                Copy the UPI ID provided above.
                                            </li>
                                            <li>
                                                Launch any UPI payment app on
                                                your smartphone.
                                            </li>
                                            <li>
                                                Select the option to make a
                                                payment or send money.
                                            </li>
                                            <li>
                                                Paste the copied UPI ID into the
                                                UPI ID field.
                                            </li>
                                            <li>
                                                Enter Rs. 10/- as the amount.
                                            </li>
                                            <li>
                                                Follow any prompts to complete
                                                the payment.
                                            </li>
                                        </ol>
                                        <span className="text-xs md:text-sm pt-4 font-medium">
                                            Wait for the confirmation message
                                            indicating the payment was
                                            successful.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="mx-auto w-full text-center md:max-w-2xl">
                                    <div className="flex items-center mt-8 mb-4 gap-4">
                                        <span className="h-1 w-full bg-orange-500 rounded-full"></span>
                                        <span className="inline-block whitespace-nowrap w-20 bg-orange-500 px-4 py-1 text-sm font-semibold text-white rounded-full">
                                            Step 2
                                        </span>
                                        <span className="h-1 w-full bg-orange-500 rounded-full"></span>
                                    </div>
                                    <h2 className="text-2xl text-center font-bold tracking-tight text-gray-800 xl:text-4xl">
                                        Take a Screenshot of Payment Receipt
                                    </h2>
                                    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600">
                                        Take a screenshot of the payment
                                        successful screen
                                    </p>

                                    <div className="flex w-full max-w-xl m-auto my-6 items-center space-x-2">
                                        <img
                                            src={screenshot}
                                            alt="screenshot"
                                        />
                                    </div>

                                    <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-relaxed text-red-600">
                                        Make sure the screenshot contains the
                                        UPI ID and the amount paid clearly
                                        visible.
                                    </p>
                                </div>
                            </div>

                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="mx-auto w-full text-center md:max-w-2xl">
                                    <div className="flex items-center mt-8 mb-4 gap-4">
                                        <span className="h-1 w-full bg-orange-500 rounded-full"></span>
                                        <span className="inline-block whitespace-nowrap w-20 bg-orange-500 px-4 py-1 text-sm font-semibold text-white rounded-full">
                                            Step 3
                                        </span>
                                        <span className="h-1 w-full bg-orange-500 rounded-full"></span>
                                    </div>
                                    <h2 className="text-2xl text-center font-bold tracking-tight text-gray-800 xl:text-4xl">
                                        Fill the Registration Form
                                    </h2>
                                    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600">
                                        Fill the registration form with the
                                        required details
                                    </p>
                                    <Link
                                        to="/register"
                                        className="inline-block px-6 py-3 mt-4 text-sm font-semibold leading-tight text-white bg-orange-500 rounded-md hover:bg-orange-600"
                                    >
                                        Register Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Home;
