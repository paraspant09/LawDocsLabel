import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "../constants/axios";

function Login() {
  const [resultMessage, setResultMessage] = useState({ message: "", type: "" });
  const initialValues = {
    email: "",
    password: "",
  };

  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .max(100, "Must be less than 100 chars.")
      .email("Must be valid email.")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum")
      .max(255, "Password is too long - should be 255 chars maximum"),
  });

  const submitForm = async (values) => {
    try {
      const response = await axios.post("/auth/login", JSON.stringify(values), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setResultMessage({ message: response.data.message, type: "good" });
    } catch (err) {
      if (!err?.response) {
        setResultMessage({ message: "No Server Response", type: "bad" });
      } else {
        setResultMessage({ message: "Login Failed", type: "bad" });
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
          <form className="form sign-in" onSubmit={handleSubmit}>
            <h2>Welcome back!</h2>

            {resultMessage.message !== "" && (
              <p
                style={
                  resultMessage.type === "good"
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {resultMessage.message}
              </p>
            )}
            <label htmlFor="email">
              <span>Email</span>
              <input
                type="email"
                id="user_email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && errors.email}
                placeholder="Email"
              />
            </label>

            {touched.email && errors.email && (
              <p
                style={{ color: "red" }}
              >
                {errors.email}
              </p>
            )}

            <label htmlFor="password">
              <span>Password</span>
              <input
                type="password"
                id="user_password"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && errors.password}
                placeholder="Password"
              />
            </label>
            {touched.password && errors.password && (
              <p
                style={{ color: "red" }}
              >
                {errors.password}
              </p>
            )}

            <p className="forgot-pass">Forgot password?</p>
            <button type="submit" className="submit">
              Sign In
            </button>
          </form>
        );
      }}
    </Formik>
  );
}

export default Login;
