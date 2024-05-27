import React, { useEffect } from "react";
import banner1 from "../assets/banner_1.png";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { Copy, Lock } from "lucide-react";
import screenshot from "../assets/screenshot.png";
import Footer from "../Components/Footer";
import upilogo from "../assets/upi.png";
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

    useEffect(() => {
        document.title = "Quiz Champ 2024 - Home | Presented by Satyalok";
    }, []);
    return (
        <div className="w-full h-dvh overflow-y-auto bg-slate-200">
            <div className="max-w-7xl !m-auto bg-white">
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

                                <div className="max-w-sm w-fit m-auto mt-6">
                                    <span className="font-semibold pl-3 text-sm pb-1">
                                        Payment UPI ID
                                    </span>
                                    <div className="flex w-full justify-center items-center space-x-2">
                                        <div>
                                            <input
                                                className="upiId flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                                                type="text"
                                                value={upiId}
                                                readOnly
                                            />
                                        </div>
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
                                <img
                                    src={upilogo}
                                    alt="upi"
                                    className="max-w-sm w-full mt-4 m-auto"
                                />
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
                                    <div className="text-left mx-auto mt-8 max-w-2xl leading-relaxed">
                                        <h3 className="font-bold text-xl mb-2">
                                            Exam Rules (English)
                                        </h3>
                                        <ol className="list-decimal pl-6 mb-6">
                                            <li>
                                                <b>Eligibility: </b>
                                                Students from class 6th to 12th are eligible for this quiz competition.
                                            </li>
                                            <li>
                                                <b>Number of Questions: </b>
                                                There will be 60 questions.
                                            </li>
                                            <li>
                                                <b>Negative Marking: </b>
                                                For each incorrect answer, half
                                                mark will be deducted.
                                            </li>
                                            <li>
                                                <b>Time Limit: </b>
                                                The total duration of the exam
                                                is 75 minutes.
                                            </li>
                                            <li>
                                                <b>Arrival Time: </b>
                                                All participants must arrive 30
                                                minutes before the exam starts.
                                            </li>
                                            <li>
                                                <b>Punctuality: </b>
                                                The exam will start and end
                                                exactly on time. Latecomers will
                                                receive the question paper but
                                                will have less time to complete
                                                it.
                                            </li>
                                            <li>
                                                <b>Mobile Phones: </b>
                                                Mobile phones are not allowed in the exam hall. If you bring a mobile phone, ensure you have someone to keep it for you during the exam.
                                            </li>
                                            <li>
                                                <b>Limited Seats: </b> 
                                                We have limited seats, so registration may close before the last date if capacity is reached.
                                            </li>
                                            <li>
                                                <b>Disqualification: </b> 
                                                Any form of malpractice during the exam will result in disqualification.
                                            </li>
                                            <li>
                                                <b>Result: </b> 
                                                Result will be declared through our <a className="text-blue-600 underline" href="https://satyalok.in/resultquizchamp">website</a> on 11th June at 05:00 PM.
                                            </li>
                                            <li>
                                                <b>Prizes: </b> 
                                                Prize Distribution will be on 13th June at 05:00 PM, Venue will be Bachpan Play School, Hazari (Gomia - Bermo Road) <a className="text-blue-600 underline" href="https://maps.app.goo.gl/hw7UU53hg12Cu5a86">Location</a> and it's compulary for all participants to be there.
                                            </li>
                                        </ol>
                                        <h3 className="font-bold text-xl mb-2">
                                            परीक्षा के नियम (हिंदी)
                                        </h3>
                                        <ol className="list-decimal pl-6">
                                            <li>
                                                <b>पात्रता: </b> 
                                                कक्षा 6वीं से 12वीं तक के छात्र इस क्विज प्रतियोगिता के लिए पात्र हैं।
                                            </li>
                                            <li>
                                                <b>प्रश्नों की संख्या: </b>
                                                परीक्षा में 60 प्रश्न होंगे।
                                            </li>
                                            <li>
                                                <b>नकारात्मक अंकन: </b> 
                                                प्रत्येक गलत उत्तर पर आधा अंक काटा जाएगा।
                                            </li>
                                            <li>
                                                <b>समय सीमा: </b> 
                                                परीक्षा की कुल अवधि 75 मिनट है।
                                            </li>
                                            <li>
                                                <b>आगमन समय: </b> 
                                                सभी प्रतिभागियों को परीक्षा शुरू होने से 30 मिनट पहले पहुंचना होगा।
                                            </li>
                                            <li>
                                                <b>समय की पाबंदी: </b> 
                                                परीक्षा समय पर शुरू और समाप्त होगी। देर से आने वालों को प्रश्न पत्र तो मिलेगा, लेकिन उन्हें कम समय मिलेगा।
                                            </li>
                                            <li>
                                                <b>मोबाइल फोन: </b> 
                                                कक्ष में मोबाइल फोन की अनुमति नहीं है। यदि आप मोबाइल फोन लाते हैं, तो सुनिश्चित करें कि आपके साथ कोई ऐसा व्यक्ति हो जो परीक्षा के दौरान इसे संभाल सके।
                                            </li>
                                            <li>
                                                <b>सीमित सीटें: </b> 
                                                हमारे पास सीमित सीटें हैं, इसलिए हो सकता है कि हम अंतिम तिथि से पहले ही पंजीकरण बंद कर दें।
                                            </li>
                                            <li>
                                                <b>अयोग्यता: </b> 
                                                परीक्षा के दौरान किसी भी प्रकार की गलत गतिविधि करने पर आपको अयोग्य घोषित किया जा सकता है।
                                            </li>
                                            <li>
                                                <b>परिणाम: </b> 
                                                परिणाम हमारी <a className="text-blue-600 underline" href="https://satyalok.in/resultquizchamp">वेबसाइट</a> के माध्यम से 11 जून को शाम 05:00 बजे घोषित किया जाएगा।
                                            </li>
                                            <li>
                                                <b>पुरस्कार: </b> 
                                                पुरस्कार वितरण 13 जून को शाम 05:00 बजे होगा, स्थान बचपन प्ले स्कूल, हजारी (गोमिया - बेरमो रोड) <a className="text-blue-600 underline" href="https://maps.app.goo.gl/hw7UU53hg12Cu5a86">लोकेशन</a> है और सभी प्रतिभागियों के लिए वहां उपस्थित होना अनिवार्य है।
                                            </li>
                                        </ol>
                                    </div>
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
