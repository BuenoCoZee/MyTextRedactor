import type { Tab } from "../../types";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <aside className={styles["sidebar"]}>
      <nav className={styles["sidebar__nav"]} aria-label="Main menu">
        <ul>
          <li
            className={
              activeTab === "all"
                ? `${styles["sidebar__nav-item"]} ${styles["isSelected"]}`
                : `${styles["sidebar__nav-item"]}`
            }
            onClick={() => setActiveTab("all")}
          >
            Все
          </li>
          <li
            className={
              activeTab === "favorites"
                ? `${styles["sidebar__nav-item"]} ${styles["isSelected"]}`
                : `${styles["sidebar__nav-item"]}`
            }
            onClick={() => setActiveTab("favorites")}
          >
            Избранное
          </li>
          <li
            className={
              activeTab === "archive"
                ? `${styles["sidebar__nav-item"]} ${styles["isSelected"]}`
                : `${styles["sidebar__nav-item"]}`
            }
            onClick={() => setActiveTab("archive")}
          >
            Архив
          </li>
        </ul>
      </nav>
    </aside>
  );
};
