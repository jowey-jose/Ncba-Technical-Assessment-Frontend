// Loging Page: Form to enter username and password (which are verified as required fields).
// If the verification is ok, AuthService.login() is called and direct user to Profile Page (Home Screen), else shows Login Failure Message.

import React from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup';

import AuthService from "../services/auth.service";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is required")
        .min(6, "Username must be at least 6 characters")
        .max(50, "Username must not exceed 50 characters"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
});

const Login = () => {
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        // validateOnChange: false,
        // validateOnBlur: false,

        onSubmit: (data) => {
            AuthService.login(data.username, data.password).then(
                () => {
                    // window.location.reload();
                    console.log(JSON.stringify(data, null, 2));
                    console.log('Successfully logged in!!');
                    navigate("/profile");
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    console.log (resMessage);

                    // setLoading(false);
                    // setMessage(resMessage);
                }
            );
        },
    });

    return (
        <div className="col-md-12">
            <div className="card card-container">

                <div className="register-form">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username"> Username </label>
                            <input
                                name="username"
                                type="text"
                                className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                            />
                            <div className="text-danger">
                                {formik.errors.username ? formik.errors.username : null}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"> Password </label>
                            <input
                                name="password"
                                type="password"
                                className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            <div className="text-danger">
                                {formik.errors.password ? formik.errors.password : null}
                            </div>
                        </div>

                        <br></br>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning float-right"
                                onClick={formik.handleReset}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login
