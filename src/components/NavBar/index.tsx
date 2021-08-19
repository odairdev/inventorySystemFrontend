import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SideBarData } from "./SideBarData";

import styles from "./styles.module.scss";
import { useAuth } from "../../hooks/useAuth";

export function NavBar() {
  const { signOut } = useAuth();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  function showSidebar() {
    setIsSideBarOpen(!isSideBarOpen);
  }

  return (
    <>
      <div className={styles.navbar}>
        <Link to="#" className={styles.menuBars}>
          <FaIcons.FaBars onClick={() => showSidebar()} />
        </Link>
      </div>
      <nav
        className={
          isSideBarOpen ? `${styles.navMenu} ${styles.active}` : styles.navMenu
        }
      >
        <ul className={styles.navMenuItems}>
          <li className={`${styles.navBarToggle} ${styles.navText}`}>
            <Link to="#" className={styles.menuBars} onClick={() => showSidebar()}>
              <FaIcons.FaBackward />
            </Link>
          </li>
          {SideBarData.map((item, index) => {
            return (
              <li key={index} className={item.className}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
          <li
            className={`${styles.navText} ${styles.navLogOut}`}
            onClick={() => signOut()}
          >
            <AiIcons.AiOutlineClose />
            <span>Sair</span>
          </li>
        </ul>
      </nav>
    </>
  );
}
