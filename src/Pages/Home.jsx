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
            email:"",
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
            email: Yup.string().email("Invalid email address").required("Required"),
            schoolID: Yup.string().required("Required"),
            class: Yup.string().required("Required"),
            schoolName: Yup.string().required("Required"),
            mediumOfStudy: Yup.string()
                .oneOf(["Hindi", "English"], "Invalid mediumOfStudy")
                .required("Required"),
            photo: Yup.mixed().required("Required").test("fileType", "Unsupported File Format", value => {
                return value && ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(value.type);
            }),
            mobile: Yup.string()
                .matches(
                    /^[0-9]{10}$/,
                    "Must be a valid 10-digit mobile number"
                )
                .required("Required"),
            paymentSlip: Yup.mixed().required("Required").test("fileType", "Unsupported File Format", value => {
                return value && ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'application/pdf'].includes(value.type);
            }),
            aadhar: Yup.string()
                .matches(
                    /^[0-9]{12}$/,
                    "Must be a valid 12-digit aadhar number"
                )
                .required("Required"),
            aadharFront: Yup.mixed().required("Required").test("fileType", "Unsupported File Format", value => {
                return value && ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'application/pdf'].includes(value.type);
            }),
            aadharBack: Yup.mixed().required("Required").test("fileType", "Unsupported File Format", value => {
                return value && ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'application/pdf'].includes(value.type);
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

    return (
        <>
            {!loading && (
                <form onSubmit={formik.handleSubmit} className="quiz-form">
                    <h1>SATYALOK MEGA QUIZ COMPETITION</h1>
                    <label>
                        <p>Name<span> *</span>:</p>
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
                        <p>Father's Name<span> *</span>:</p>
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
                        <p>Mother's Name<span> *</span>:</p>
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
                        <p>Email<span> *</span>:</p>
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="error">{formik.errors.email}</div>
                        ) : null}
                    </label>
                    <label>
                        <p>School ID/Aadhar<span> *</span>:</p>
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
                        <p>Class<span> *</span>:</p>
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
                        <p>School Name<span> *</span>:</p>
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
                        <p>Medium Of Study (Select one)<span> *</span>:</p>
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
                        <p>Photo<span> *</span>:(supported formats: jpg, png, jpeg, webp)</p>
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
                        <p>Mobile Number<span> *</span>:</p>
                        <input
                            type="number"
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
                        <p>Screenshot of Payment Slip<span> *</span>: (supported formats: jpg, png, jpeg, webp, pdf)</p>
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
                        <p>Aadhar Number<span> *</span>:</p>
                        <input
                            type="number"
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
                        <p>Aadhar Front Photo<span> *</span>: (supported formats: jpg, png, jpeg, webp, pdf)</p>
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
                        <p>Aadhar Back Photo<span> *</span>: (supported formats: jpg, png, jpeg, webp, pdf)</p>
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

export default Home;
