import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../App.css";
import { appwriteClient } from "../lib/appwrite";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.png";
import Footer from "../Components/Footer";
import photoExample from "../assets/photoexamples.jpg";
import Navbar from "../Components/Navbar";

const QuizForm = () => {
    const loadingMessage = [
        "Uploading your photo",
        "Uploading your payment slip",
        "Uploading your aadhar front photo",
        "Uploading your aadhar back photo",
        "Submitting your form data",
        "Just a moment...",
    ];

    const [messageIndex, setMessageIndex] = React.useState(0);

    const [loading, setLoading] = React.useState(false);

    const [error, setError] = React.useState(null);

    const navigate = useNavigate();

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

    const removeError = () => {
        setError(null);
        document.body.style.overflow = "auto";
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            fathersName: "",
            mothersName: "",
            email: "",
            schoolID: "",
            class: "",
            schoolName: "",
            mediumOfStudy: "Hindi",
            photo: null,
            mobile: "",
            paymentSlip: null,
            aadhar: "",
            aadharFront: null,
            aadharBack: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            fathersName: Yup.string().required("Required"),
            mothersName: Yup.string().required("Required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            schoolID: Yup.string().required("Required"),
            class: Yup.string().required("Required"),
            schoolName: Yup.string().required("Required"),
            mediumOfStudy: Yup.string()
                .oneOf(["Hindi", "English"], "Invalid mediumOfStudy")
                .required("Required"),
            photo: Yup.mixed()
                .required("Required")
                .test("fileType", "Unsupported File Format", (value) => {
                    return (
                        value &&
                        [
                            "image/png",
                            "image/jpg",
                            "image/jpeg",
                            "image/webp",
                        ].includes(value.type)
                    );
                }),
            mobile: Yup.string()
                .matches(
                    /^[0-9]{10}$/,
                    "Must be a valid 10-digit mobile number"
                )
                .required("Required"),
            paymentSlip: Yup.mixed()
                .required("Required")
                .test("fileType", "Unsupported File Format", (value) => {
                    return (
                        value &&
                        [
                            "image/png",
                            "image/jpg",
                            "image/jpeg",
                            "image/webp",
                        ].includes(value.type)
                    );
                }),
            aadhar: Yup.string()
                .matches(
                    /^[0-9]{12}$/,
                    "Must be a valid 12-digit aadhar number"
                )
                .required("Required"),
            aadharFront: Yup.mixed()
                .required("Required")
                .test("fileType", "Unsupported File Format", (value) => {
                    return (
                        value &&
                        [
                            "image/png",
                            "image/jpg",
                            "image/jpeg",
                            "image/webp",
                        ].includes(value.type)
                    );
                }),
            aadharBack: Yup.mixed()
                .required("Required")
                .test("fileType", "Unsupported File Format", (value) => {
                    return (
                        value &&
                        [
                            "image/png",
                            "image/jpg",
                            "image/jpeg",
                            "image/webp",
                        ].includes(value.type)
                    );
                }),
        }),

        onSubmit: async (values) => {
            setLoading(true);
            const data = new FormData();

            for (let key in values) {
                data.append(key, values[key]);
            }

            const formData = Object.fromEntries(data.entries());

            try {
                const mobilePresent = await appwriteClient.checkMobilePresent(
                    formData.mobile
                );

                if (mobilePresent.documents.length > 0) {
                    handleError("Mobile number already registered");
                    setLoading(false);
                    return;
                }

                const photoRes = await appwriteClient.uploadPhoto(
                    formData.photo
                );
                setMessageIndex(1);

                const paymentSlipRes = await appwriteClient.uploadPhoto(
                    formData.paymentSlip
                );
                setMessageIndex(2);

                const aadharFrontRes = await appwriteClient.uploadPhoto(
                    formData.aadharFront
                );
                setMessageIndex(3);

                const aadharBackRes = await appwriteClient.uploadPhoto(
                    formData.aadharBack
                );
                setMessageIndex(4);

                const response = await appwriteClient.createDocument({
                    ...formData,
                    photo: photoRes.$id,
                    paymentSlip: paymentSlipRes.$id,
                    aadharFront: aadharFrontRes.$id,
                    aadharBack: aadharBackRes.$id,
                });
                setMessageIndex(5);

                navigate("/success/" + response.$id);
                setLoading(false);
            } catch (error) {
                console.error(error);
                handleError(error);
                setLoading(false);
            }
        },
    });

    useEffect(() => {
        document.title =
            "Registration Form - Quiz Champ 2024 | Powered by Satyalok";
    }, []);

    return (
        <>
        <Navbar />
        <div className="h-16"></div>
            {!loading && (
                <form
                    onSubmit={formik.handleSubmit}
                    className="quiz-form max-w-4xl"
                >
                    <img src={banner} alt="banner" className="w-full mb-8" />
                    <div className="px-4 !mb-10 quiz-form">
                        <p className="text-center text-sm lg:text-base mb-5 font-medium -mt-2 lg:col-span-2">
                            Fill in the details below to register for the quiz
                        </p>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="error">
                                    {formik.errors.name}
                                </div>
                            ) : null}
                        </label>
                        <label>
                            Father's Name:
                            <input
                                type="text"
                                name="fathersName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.fathersName}
                            />
                            {formik.touched.fathersName &&
                            formik.errors.fathersName ? (
                                <div className="error">
                                    {formik.errors.fathersName}
                                </div>
                            ) : null}
                        </label>
                        <label>
                            Mother's Name:
                            <input
                                type="text"
                                name="mothersName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.mothersName}
                            />
                            {formik.touched.mothersName &&
                            formik.errors.mothersName ? (
                                <div className="error">
                                    {formik.errors.mothersName}
                                </div>
                            ) : null}
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error">
                                    {formik.errors.email}
                                </div>
                            ) : null}
                        </label>
                        <label>
                            School ID/Aadhar:
                            <input
                                type="text"
                                name="schoolID"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.schoolID}
                            />
                            {formik.touched.schoolID &&
                            formik.errors.schoolID ? (
                                <div className="error">
                                    {formik.errors.schoolID}
                                </div>
                            ) : null}
                        </label>
                        <label>
                            Class:
                            <input
                                type="text"
                                name="class"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.class}
                            />
                            {formik.touched.class && formik.errors.class ? (
                                <div className="error">
                                    {formik.errors.class}
                                </div>
                            ) : null}
                        </label>
                        <label>
                            School Name:
                            <input
                                type="text"
                                name="schoolName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.schoolName}
                            />
                            {formik.touched.schoolName &&
                            formik.errors.schoolName ? (
                                <div className="error">
                                    {formik.errors.schoolName}
                                </div>
                            ) : null}
                        </label>
                        <label>
                            Medium Of Study (Select one):
                            <select
                                name="mediumOfStudy"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.mediumOfStudy}
                            >
                                <option value="Hindi">Hindi</option>
                                <option value="English">English</option>
                            </select>
                            {formik.touched.mediumOfStudy &&
                            formik.errors.mediumOfStudy ? (
                                <div className="error">
                                    {formik.errors.mediumOfStudy}
                                </div>
                            ) : null}
                        </label>

                        <label>
                            Photo: (supported formats: jpg, png, jpeg, webp)
                            <input
                                type="file"
                                name="photo"
                                onChange={(event) =>
                                    formik.setFieldValue(
                                        "photo",
                                        event.currentTarget.files[0]
                                    )
                                }
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.photo && formik.errors.photo ? (
                                <div className="error">
                                    {formik.errors.photo}
                                </div>
                            ) : null}
                            {/* <p className="text-sm m-2">
                                Example of a valid photo:
                                <img
                                    src={photoExample}
                                    alt="example"
                                    className="w-full mb-4"
                                />
                            </p> */}
                        </label>
                        <label>
                            Mobile Number:
                            <input
                                type="number"
                                name="mobile"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.mobile}
                            />
                            {formik.touched.mobile && formik.errors.mobile ? (
                                <div className="error">
                                    {formik.errors.mobile}
                                </div>
                            ) : null}
                        </label>

                        <div className="fee-info">
                            <p>
                                In order to take part in the quiz, a
                                registration fee of Rs. 10 is mandatory.
                                Subsequently, your entry card will be deemed
                                valid. Please scan the QR code below or make a
                                payment to the UPI ID provided.
                            </p>
                            <p className="bold">
                                Please pay a registration fee of Rs. 10 and
                                upload the payment screenshot below.
                            </p>
                        </div>

                        <label>
                            Screenshot of Payment Slip: (supported formats: jpg,
                            png, jpeg, webp)
                            <input
                                type="file"
                                name="paymentSlip"
                                onChange={(event) =>
                                    formik.setFieldValue(
                                        "paymentSlip",
                                        event.currentTarget.files[0]
                                    )
                                }
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.paymentSlip &&
                            formik.errors.paymentSlip ? (
                                <div className="error">
                                    {formik.errors.paymentSlip}
                                </div>
                            ) : null}
                        </label>
                        <label>
                            Aadhar Number:
                            <input
                                type="number"
                                name="aadhar"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.aadhar}
                            />
                            {formik.touched.aadhar && formik.errors.aadhar ? (
                                <div className="error">
                                    {formik.errors.aadhar}
                                </div>
                            ) : null}
                        </label>
                        <label>
                            Aadhar Front Photo: (supported formats: jpg, png,
                            jpeg, webp)
                            <input
                                type="file"
                                name="aadharFront"
                                onChange={(event) =>
                                    formik.setFieldValue(
                                        "aadharFront",
                                        event.currentTarget.files[0]
                                    )
                                }
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.aadharFront &&
                            formik.errors.aadharFront ? (
                                <div className="error">
                                    {formik.errors.aadharFront}
                                </div>
                            ) : null}
                        </label>
                        <label>
                            Aadhar Back Photo: (supported formats: jpg, png,
                            jpeg, webp)
                            <input
                                type="file"
                                name="aadharBack"
                                onChange={(event) =>
                                    formik.setFieldValue(
                                        "aadharBack",
                                        event.currentTarget.files[0]
                                    )
                                }
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.aadharBack &&
                            formik.errors.aadharBack ? (
                                <div className="error">
                                    {formik.errors.aadharBack}
                                </div>
                            ) : null}
                        </label>
                        <div className="lg:flex items-center justify-end">
                            <button
                                className="h-fit lg:mr-5 lg:!px-8 w-full lg:w-fit"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <Footer />
                </form>
            )}

            {loading && (
                <div className="w-full h-dvh flex items-center justify-center flex-col">
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
        </>
    );
};

export default QuizForm;
