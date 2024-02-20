import React, { useEffect } from "react";
import styles from "./Catalog.module.css";
import iconCatalog from "../../assets/icons/icons_Grid_Filled.png";
import iconSearch from "../../assets/icons/Button_search_Small.png";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

const CatalogPage = () => {
  const getData = async (e) => {
    const token = localStorage.getItem("token");

     
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const response = await axios.get("http://54.93.213.129/api/apps/", {
        headers: {
           
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    console.log("getData taken");
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.catalog_wrapper}>
        <div className={styles.title_container}>
          <img
            src={iconCatalog}
            className={styles.title_container_icon}
            alt="iconCatalog"
          />
          <div className={styles.catalog_name}>Catalog</div>
        </div>
        <div className={styles.actions_wrapper}>
          <div className={styles.action_button}>
            <button className={styles.button_create_app}>Create new App</button>
          </div>
          <div className={styles.actions_search}>
            <input
              type="text"
              className={styles.input_search}
              placeholder="Search App"
            />
            <img
              src={iconSearch}
              className={styles.input_icon_button}
              alt="iconSearch"
            />
          </div>
        </div>

        <div className={styles.catalog_table}></div>
      </div>
    </React.Fragment>
  );
};

export default CatalogPage;
