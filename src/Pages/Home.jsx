import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../App.css";
import { appwriteClient } from "../lib/appwrite";
import { useNavigate } from "react-router-dom";

const Home = () => {
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

    const formik = useFormik({
        initialValues: {
            name: "",
            fathersName: "",
            mothersName: "",
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
            schoolID: Yup.string().required("Required"),
            class: Yup.string().required("Required"),
            schoolName: Yup.string().required("Required"),
            mediumOfStudy: Yup.string()
                .oneOf(["Hindi", "English"], "Invalid mediumOfStudy")
                .required("Required"),
            photo: Yup.mixed().required("Required"),
            mobile: Yup.string()
                .matches(
                    /^[0-9]{10}$/,
                    "Must be a valid 10-digit mobile number"
                )
                .required("Required"),
            paymentSlip: Yup.mixed().required("Required"),
            aadhar: Yup.string()
                .matches(
                    /^[0-9]{12}$/,
                    "Must be a valid 12-digit aadhar number"
                )
                .required("Required"),
            aadharFront: Yup.mixed().required("Required"),
            aadharBack: Yup.mixed().required("Required"),
        }),

        onSubmit: async (values) => {
            setLoading(true);
            const data = new FormData();

            for (let key in values) {
                data.append(key, values[key]);
            }

            const formData = Object.fromEntries(data.entries());

            try {
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
                setError(error.message);
                setLoading(false);
            }
        },
    });

    return (
        <>
            {!loading && (
                <form onSubmit={formik.handleSubmit} className="quiz-form">
                    <h1>SATYALOK MEGA QUIZ COMPETITION</h1>
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
                            <div className="error">{formik.errors.name}</div>
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
                        School ID/Adhar:
                        <input
                            type="text"
                            name="schoolID"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.schoolID}
                        />
                        {formik.touched.schoolID && formik.errors.schoolID ? (
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
                            <div className="error">{formik.errors.class}</div>
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
                        mediumOfStudy of Study (Select one):
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
                        Photo:
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
                            <div className="error">{formik.errors.photo}</div>
                        ) : null}
                    </label>
                    <label>
                        Mobile Number:
                        <input
                            type="tel"
                            name="mobile"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mobile}
                        />
                        {formik.touched.mobile && formik.errors.mobile ? (
                            <div className="error">{formik.errors.mobile}</div>
                        ) : null}
                    </label>

                    <div className="fee-info">
                        <p>
                            In order to take part in the quiz, a registration
                            fee of Rs. 10 is mandatory. Subsequently, your entry
                            card will be deemed valid. Please scan the QR code
                            below or make a payment to the UPI ID provided.
                        </p>
                        <p className="bold">
                            Please pay a registration fee of Rs. 10 and upload
                            the payment screenshot below.
                        </p>
                    </div>

                    <label>
                        Screenshot of Payment Slip:
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
                        aadhar Number:
                        <input
                            type="text"
                            name="aadhar"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.aadhar}
                        />
                        {formik.touched.aadhar && formik.errors.aadhar ? (
                            <div className="error">{formik.errors.aadhar}</div>
                        ) : null}
                    </label>
                    <label>
                        aadhar Front Photo:
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
                        aadhar Back Photo:
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
                    <button type="submit">Submit</button>
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
                <div className="absolute w-full h-dvh top-0 left-0">
                    <div className="bg-red-500 text-white p-4 text-center">
                        {error}
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
