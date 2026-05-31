import type { Tab } from "../../types";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isMobileMenuOpen: boolean;
}

export const Sidebar = ({
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
}: SidebarProps) => {
  return (
    <aside
      className={
        isMobileMenuOpen
          ? `${styles["sidebar"]} ${styles["isOpened"]}`
          : `${styles["sidebar"]}`
      }
    >
      <nav className={styles["sidebar__nav"]} aria-label="Main menu">
        <ul>
          <SidebarItem
            localTab="all"
            tabClass="sidebar__nav-item"
            currentActiveTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <SidebarItem
            localTab="favorites"
            tabClass="sidebar__nav-item"
            currentActiveTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <SidebarItem
            localTab="archive"
            tabClass="sidebar__nav-item"
            currentActiveTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </ul>
      </nav>
    </aside>
  );
};
