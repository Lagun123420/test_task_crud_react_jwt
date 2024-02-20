import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegistrationPage.module.css";
import image1 from "../../assets/images/bgrd.webp";
import closedEyeIcon from "../../assets/icons/Icons_Closed_Eye.webp";
import openEyeIcon from "../../assets/icons/Icons_Open_Eye.webp";
import Loader from "../../components/loader/Loader";

const RegistrationPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [pageLoaded, setPageLoaded] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmedPasswordVisibility = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmedPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const dataToSend = {
        email: userData.email,
        username: userData.username,
        password: userData.password,
      };

      const response = await axios.post(
        "http://54.93.213.129/api/auth/users/",
        dataToSend
      );
      console.log(response.data);

      navigate("/login");
    } catch (error) {
      setError(
        error.response.data.detail || "An error occurred. Please try again."
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
    }, 300);
  }, []);

  return (
    <React.Fragment>
      {!pageLoaded && <Loader />}
      {pageLoaded && (
        <div className={styles.wrapper}>
          <div className={styles.container_actions}>
            <div className={styles.modal_form}>
              <div className={styles.form_title}>Registration</div>
              {error && <p className={styles.block_error}>{error}</p>}
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.wrapper_container}>
                  <div className={styles.input_container}>
                    <label
                      className={styles.input_label}
                      htmlFor="usernameInput"
                    >
                      User name
                    </label>
                    <input
                      id="usernameInput"
                      name="username"
                      className={styles.input}
                      value={userData.username}
                      onChange={handleChange}
                      placeholder="Enter name"
                      required
                    />
                  </div>

                  <div className={styles.input_container}>
                    <label
                      className={styles.input_label}
                      htmlFor="passwordInput"
                    >
                      Password
                    </label>
                    <input
                      id="passwordInput"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className={styles.input}
                      value={userData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      autoComplete="newPass"
                      required
                    />
                    <img
                      src={showPassword ? openEyeIcon : closedEyeIcon}
                      alt={showPassword ? "Open eye" : "Closed eye"}
                      className={styles.eye_icon}
                      onClick={togglePasswordVisibility}
                    />
                  </div>

                  <div className={styles.input_container}>
                    <label
                      className={styles.input_label}
                      htmlFor="confirmedPasswordInput"
                    >
                      Confirm password
                    </label>
                    <input
                      id="confirmedPasswordInput"
                      name="confirmedPassword"
                      type={showConfirmedPassword ? "text" : "password"}
                      className={styles.input}
                      value={userData.confirmedPassword}
                      onChange={handleChange}
                      placeholder="Enter password"
                      autoComplete="newPass"
                      required
                    />
                    <img
                      src={showConfirmedPassword ? openEyeIcon : closedEyeIcon}
                      alt={showConfirmedPassword ? "Open eye" : "Closed eye"}
                      className={styles.eye_icon}
                      onClick={toggleConfirmedPasswordVisibility}
                    />
                  </div>
                </div>

                <div className={styles.link_container}>
                  <div className={styles.text_nl}>
                    <span>
                      If you have account{" "}
                      <Link className={styles.link} to="/">
                        Log in
                      </Link>
                    </span>
                  </div>
                </div>

                <button className={styles.button_submit} type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>

          <div className={styles.container_images}>
            <img src={image1} className={styles.image1} alt="img1" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default RegistrationPage;
