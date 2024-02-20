import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import styles from "./NewAppPage.module.css";
import iconCatalog from "../../assets/icons/icons_Grid_Filled.png";
import CustomSelect from "../../components/customComponents/customSelect/CustomSelect";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewAppPage = () => {
  const options = ["iOS", "Android"];
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const [newAppInfo, setNewAppInfo] = useState({
    platform: "",
    name: "",
    description: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [pageLoaded, setPageLoaded] = useState(false);

  const handleChange = (e) => {
    setNewAppInfo({ ...newAppInfo, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setNewAppInfo({ platform: "", name: "", description: "" });
  };

  const createNewApp = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const response = await axios.post(
        "http://0.0.0.0/api/auth/jwt/create/",
        newAppInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      navigate("/catalog");
    } catch (error) {
      setError("Failed sending");
    }
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
        <React.Fragment>
          <Navbar />

          <div className={styles.wrapper_newApp}>
            <div className={styles.title_container}>
              <img
                src={iconCatalog}
                className={styles.title_container_icon}
                alt="iconCatalog"
              />
              <div className={styles.title_name}>Catalog</div>
              <div className={styles.titles_dot}></div>
              <div className={styles.title_subname}>New App</div>
            </div>

            <div className={styles.container_create_app}>
              <div className={styles.title_table}>Create new App</div>

              <form className={styles.form_container} onSubmit={createNewApp}>
                <div className={styles.wrapper_inputs}>
                  <div className={styles.input_container1}>
                    <label
                      className={styles.input_label}
                      htmlFor="appNameInput"
                    >
                      Name
                    </label>
                    <input
                      id="appNameInput"
                      name="appName"
                      type="text"
                      className={styles.input}
                      placeholder="Enter name"
                      autoComplete="newValue"
                      required
                    />
                  </div>
                  <div className={styles.input_container2}>
                    <label
                      className={styles.input_label}
                      htmlFor="selectPlatform"
                    >
                      Platform
                    </label>
                    <CustomSelect
                      options={options}
                      placeholder="Select element"
                      onSelect={setSelectedPlatform}
                    />
                  </div>

                  <div className={styles.input_container3}>
                    <label
                      className={styles.input_label}
                      htmlFor="appDescriptionInput"
                    >
                      Description
                    </label>
                    <input
                      id="appDescriptionInput"
                      name="appDescription"
                      className={styles.input}
                      placeholder="Enter name"
                      autoComplete="newValue"
                      required
                    />
                  </div>
                  <div className={styles.input_container4}>
                    <label
                      className={styles.input_label}
                      htmlFor="appIconInput"
                    >
                      Icon
                    </label>
                    <input
                      id="appIconInput"
                      name="appIcon"
                      type="text"
                      className={styles.input}
                      placeholder="Enter name"
                      autoComplete="newValue"
                      required
                    />
                    <div className={styles.form_actions}>
                      <button
                        className={styles.button_cansel}
                        onClick={handleCancel}
                      >
                        Cansel
                      </button>
                      <button className={styles.button_create} type="submit">
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NewAppPage;
