import type { Tab } from "../../types";
import { useDroppable } from "@dnd-kit/core";
import styles from "./SidebarItem.module.css";

interface SidebarItemProps {
  localTab: Tab;
  tabClass: string;
  currentActiveTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const SidebarItem = ({
  localTab,
  tabClass,
  currentActiveTab,
  setActiveTab,
}: SidebarItemProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: localTab });

  const style = {
    backgroundColor: isOver ? "#5d5d5d" : "#2a2a2a",
    borderRight: isOver ? "3px solid #34b78b" : undefined,
  };

  return (
    <li
      className={
        localTab === currentActiveTab
          ? `${tabClass} ${styles["nav-item"]} ${styles["isSelected"]}`
          : `${tabClass} ${styles["nav-item"]}`
      }
      onClick={() => setActiveTab(localTab)}
      ref={localTab === "all" ? null : setNodeRef}
      style={style}
    >
      {localTab === "all"
        ? "Все"
        : localTab === "favorites"
          ? "Избранное"
          : "Архив"}
    </li>
  );
};
