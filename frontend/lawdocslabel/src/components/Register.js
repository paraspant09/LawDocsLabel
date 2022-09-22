import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "../constants/axios";

function Register() {
  const [resultMessage, setResultMessage] = useState({ message: "", type: "" });
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_num: "",
    institution_name: "",
    reg_num: "",
  };

  const validateSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, "First Name must be alphanumeric")
      .required("First Name is required")
      .min(3, "Should be 3 chars minimum")
      .max(100, "Should be 100 chars maximum"),
    email: Yup.string()
      .max(100, "Should be 100 chars maximum")
      .email("Should be valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum")
      .max(255, "Password is too long - should be 255 chars maximum"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
    phone_num: Yup.string()
      .length(10, "Should be 10 chars in length")
      .matches(/^[0-9]+$/, "Must be numeric")
      .required("Phone number is required"),
    institution_name: Yup.string()
      .max(150, "Should be 150 chars maximum")
      .required("Institution Name is required"),
    reg_num: Yup.string()
      .max(255, "Should be 255 chars maximum")
      .required("Registeration Number is required"),
  });

  const submitForm = async (values) => {
    let { confirmPassword, ...reqData } = values;
    try {
      for (const prop in reqData) {
        if (reqData[prop] === "") reqData[prop] = null;
      }
      const response = await axios.post(
        "/auth/register",
        JSON.stringify(reqData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setResultMessage({ message: response.data.message, type: "good" });
    } catch (err) {
      if (!err?.response) {
        setResultMessage({ message: "No Server Response", type: "bad" });
      } else if (err.response?.status === 409) {
        setResultMessage({ message: "Username Taken", type: "bad" });
      } else {
        setResultMessage({ message: "Registration Failed", type: "bad" });
      }
    }
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={submitForm}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => {
        return (
          <form className="form sign-up" onSubmit={handleSubmit}>
            <h2>Fill in all the information below!</h2>

            {resultMessage.message !== "" && (
              <p style={
                resultMessage.type === "good"
                  ? { color: "green" }
                  : { color: "red" }
              }>
                {resultMessage.message}
              </p>
            )}
            <label htmlFor="name">
              <span> Name </span>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={touched.name && errors.name}
                placeholder="Name"
              />
            </label>
            {touched.name && errors.name && (
              <p style={{ color: "red" }}>{errors.name}</p>
            )}

            <label htmlFor="email">
              <span>Email</span>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && errors.email}
                placeholder="Email"
              />
            </label>
            {touched.email && errors.email && (
              <p style={{ color: "red" }}>{errors.email}</p>
            )}

            <label htmlFor="password">
              <span>Password</span>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && errors.password}
                placeholder="Password"
              />
            </label>
            {touched.password && errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}

            <label htmlFor="confirmPassword">
              <span>Confirm Password</span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                error={touched.confirmPassword && errors.confirmPassword}
                placeholder="Confirm Password"
              />
            </label>
            {touched.confirmPassword && errors.confirmPassword && (
              <p style={{ color: "red" }}>
                {errors.confirmPassword}
              </p>
            )}

            <label htmlFor="phone_num">
              <span> Phone Number </span>
              <input
                type="tel"
                id="phone_num"
                name="phone_num"
                value={values.phone_num}
                onChange={handleChange}
                error={touched.phone_num && errors.phone_num}
                placeholder="Phone Number"
              />
            </label>
            {touched.phone_num && errors.phone_num && (
              <p style={{ color: "red" }}>{errors.phone_num}</p>
            )}

            <label htmlFor="institution_name">
              <span> Institution Name </span>
              <input
                type="text"
                id="institution_name"
                name="institution_name"
                value={values.institution_name}
                onChange={handleChange}
                error={touched.institution_name && errors.institution_name}
                placeholder="Institution Name"
              />
            </label>
            {touched.institution_name && errors.institution_name && (
              <p style={{ color: "red" }}>{errors.institution_name}</p>
            )}

            <label htmlFor="reg_num">
              <span> Registration Number </span>
              <input
                type="text"
                id="reg_num"
                name="reg_num"
                value={values.reg_num}
                onChange={handleChange}
                error={touched.reg_num && errors.reg_num}
                placeholder="Registration Number"
              />
            </label>
            {touched.reg_num && errors.reg_num && (
              <p style={{ color: "red" }}>{errors.reg_num}</p>
            )}

            <button type="submit" className="submit">Register</button>
          </form>
        );
      }}
    </Formik>
  );
}

export default Register;
