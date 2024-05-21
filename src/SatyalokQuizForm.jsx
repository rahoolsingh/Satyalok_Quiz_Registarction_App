import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './App.css';

const SatyalokQuizForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      fatherName: '',
      motherName: '',
      schoolIdAdhar: '',
      studentClass: '',
      schoolName: '',
      medium: 'Hindi',
      photo: null,
      mobileNumber: '',
      paymentSlip: null,
      aadhaarNumber: '',
      aadhaarFront: null,
      aadhaarBack: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      fatherName: Yup.string().required('Required'),
      motherName: Yup.string().required('Required'),
      schoolIdAdhar: Yup.string().required('Required'),
      studentClass: Yup.string().required('Required'),
      schoolName: Yup.string().required('Required'),
      medium: Yup.string().oneOf(['Hindi', 'English'], 'Invalid medium').required('Required'),
      photo: Yup.mixed().required('Required'),
      mobileNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit mobile number')
        .required('Required'),
      paymentSlip: Yup.mixed().required('Required'),
      aadhaarNumber: Yup.string()
        .matches(/^[0-9]{12}$/, 'Must be a valid 12-digit Aadhaar number')
        .required('Required'),
      aadhaarFront: Yup.mixed().required('Required'),
      aadhaarBack: Yup.mixed().required('Required'),
    }),
    onSubmit: async (values) => {
      const data = new FormData();
      for (let key in values) {
        data.append(key, values[key]);
      }

    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="quiz-form">
      <h1>SATYALOK MEGA QUIZ COMPETITION</h1>
      <label>
        Name:
        <input type="text" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
        {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
      </label>
      <label>
        Father's Name:
        <input type="text" name="fatherName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fatherName} />
        {formik.touched.fatherName && formik.errors.fatherName ? <div className="error">{formik.errors.fatherName}</div> : null}
      </label>
      <label>
        Mother's Name:
        <input type="text" name="motherName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.motherName} />
        {formik.touched.motherName && formik.errors.motherName ? <div className="error">{formik.errors.motherName}</div> : null}
      </label>
      <label>
        School ID/Adhar:
        <input type="text" name="schoolIdAdhar" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.schoolIdAdhar} />
        {formik.touched.schoolIdAdhar && formik.errors.schoolIdAdhar ? <div className="error">{formik.errors.schoolIdAdhar}</div> : null}
      </label>
      <label>
        Class:
        <input type="text" name="studentClass" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.studentClass} />
        {formik.touched.studentClass && formik.errors.studentClass ? <div className="error">{formik.errors.studentClass}</div> : null}
      </label>
      <label>
        School Name:
        <input type="text" name="schoolName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.schoolName} />
        {formik.touched.schoolName && formik.errors.schoolName ? <div className="error">{formik.errors.schoolName}</div> : null}
      </label>
      <label>
        Medium of Language:
        <select name="medium" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.medium}>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
        </select>
        {formik.touched.medium && formik.errors.medium ? <div className="error">{formik.errors.medium}</div> : null}
      </label>
      <label>
        Photo:
        <input type="file" name="photo" onChange={(event) => formik.setFieldValue('photo', event.currentTarget.files[0])} onBlur={formik.handleBlur} />
        {formik.touched.photo && formik.errors.photo ? <div className="error">{formik.errors.photo}</div> : null}
      </label>
      <label>
        Mobile Number:
        <input type="tel" name="mobileNumber" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mobileNumber} />
        {formik.touched.mobileNumber && formik.errors.mobileNumber ? <div className="error">{formik.errors.mobileNumber}</div> : null}
      </label>

      <div className="fee-info">
        <p>In order to take part in the quiz, a registration fee of Rs. 10 is mandatory. Subsequently, your entry card will be deemed valid. Please scan the QR code below or make a payment to the UPI ID provided.</p>
        <p className="bold">Please pay a registration fee of Rs. 10 and upload the payment screenshot below.</p>
      </div>

      <label>
        Screenshot of Payment Slip:
        <input type="file" name="paymentSlip" onChange={(event) => formik.setFieldValue('paymentSlip', event.currentTarget.files[0])} onBlur={formik.handleBlur} />
        {formik.touched.paymentSlip && formik.errors.paymentSlip ? <div className="error">{formik.errors.paymentSlip}</div> : null}
      </label>
      <label>
        Aadhaar Number:
        <input type="text" name="aadhaarNumber" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.aadhaarNumber} />
        {formik.touched.aadhaarNumber && formik.errors.aadhaarNumber ? <div className="error">{formik.errors.aadhaarNumber}</div> : null}
      </label>
      <label>
        Aadhaar Front Photo:
        <input type="file" name="aadhaarFront" onChange={(event) => formik.setFieldValue('aadhaarFront', event.currentTarget.files[0])} onBlur={formik.handleBlur} />
        {formik.touched.aadhaarFront && formik.errors.aadhaarFront ? <div className="error">{formik.errors.aadhaarFront}</div> : null}
      </label>
      <label>
        Aadhaar Back Photo:
        <input type="file" name="aadhaarBack" onChange={(event) => formik.setFieldValue('aadhaarBack', event.currentTarget.files[0])} onBlur={formik.handleBlur} />
        {formik.touched.aadhaarBack && formik.errors.aadhaarBack ? <div className="error">{formik.errors.aadhaarBack}</div> : null}
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SatyalokQuizForm;
