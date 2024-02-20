import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
import image1 from "../../assets/images/bgrd.webp";
import closedEyeIcon from "../../assets/icons/Icons_Closed_Eye.webp";
import openEyeIcon from "../../assets/icons/Icons_Open_Eye.webp";
import Loader from "../../components/loader/Loader";
import { useAuth } from "../../auth/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [pageLoaded, setPageLoaded] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    const error = await login(credentials.username, credentials.password);
    if (error) {
      setError(error); 
    } else {
      navigate("/catalog/new");
    }
  };

  const handleCancel = () => {
    setCredentials({ username: "", password: "" });
  };

  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
    }, 300);
  }, []);

  return (
    <React.Fragment>
      {!pageLoaded && <Loader />}{" "}
      {pageLoaded && (
        <div className={styles.wrapper}>
          <div className={styles.container_actions}>
            <div className={styles.modal_form}>
              <div className={styles.form_title}>Log in</div>

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
                      value={credentials.username}
                      onChange={handleChange}
                      placeholder="Enter name"
                      autoComplete="newValue"
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
                      value={credentials.password}
                      onChange={handleChange}
                      autoComplete="newPassword"
                      placeholder="Enter password"
                      required
                    />
                    <img
                      src={showPassword ? openEyeIcon : closedEyeIcon}
                      alt={showPassword ? "Open eye" : "Closed eye"}
                      className={styles.eye_icon}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>

                <div className={styles.link_container}>
                  <div className={styles.text_nl}>
                    <span>
                      Don’t have account?{" "}
                      <Link className={styles.link} to="/registration">
                        Sign up
                      </Link>
                    </span>
                  </div>
                </div>

                <div className={styles.buttons_container}>
                  <button
                    className={styles.button_cansel}
                    type="button"
                    onClick={handleCancel}
                  >
                    Cansel
                  </button>

                  <button className={styles.button_submit} type="submit">
                    Save
                  </button>
                </div>
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

export default LoginPage;
