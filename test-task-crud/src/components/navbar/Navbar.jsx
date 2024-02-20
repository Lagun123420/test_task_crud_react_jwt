import React from "react";
import styles from "./Navbar.module.css";
import imageUserAvatar from "../../assets/icons/AvatarUser.png"


const Navbar = () => {
  return (
    <React.Fragment>
      <div className={styles.navbar}>
        <div className={styles.navbar_user_container}>
          <img src={imageUserAvatar} className={styles.user_avatar} alt="imageUserAvatar" />
          <div className={styles.userData}>
            <div className={styles.userName}>Alexander Smith</div>
            <div className={styles.userRole}>admin</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Navbar;