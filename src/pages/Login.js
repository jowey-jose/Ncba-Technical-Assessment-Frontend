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
            console.log(JSON.stringify(data.username, null, 2));

            AuthService.login(data.username, data.password).then(
                () => {
                    navigate("/profile");
                    window.location.reload();
                    console.log('Successfully logged in!!');
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

    // const form = useRef();
    // const checkBtn = useRef();
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [loading, setLoading] = useState(false);
    // const [message, setMessage] = useState("");

    // const onChangeUsername = (e) => {
    //     const username = e.target.value;
    //     setUsername(username);
    // };

    // const onChangePassword = (e) => {
    //     const password = e.target.value;
    //     setPassword(password);
    // };

    // const handleLogin = (e) => {
    //     e.preventDefault();

    //     setMessage("");
    //     setLoading(true);

    //     form.current.validateAll();

    //     if (checkBtn.current.context._errors.length === 0) {
    //         AuthService.login(username, password).then(
    //             () => {
    //                 navigate("/profile");
    //                 window.location.reload();
    //             },
    //             (error) => {
    //                 const resMessage =
    //                     (error.response &&
    //                         error.response.data &&
    //                         error.response.data.message) ||
    //                     error.message ||
    //                     error.toString();

    //                 setLoading(false);
    //                 setMessage(resMessage);
    //             }
    //         );
    //     } else {
    //         setLoading(false);
    //     }
    // };

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

                {/* <Form onSubmit={handleLogin} ref={form}>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}

              <CheckButton style={{ display: "none" }} ref={checkBtn} />

            </Form> */}
            </div>
        </div>
    );
};

export default Login
