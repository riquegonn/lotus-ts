import { ChangeEvent } from "react";
import styles from "./styles.module.css";

const DarkTheme = ({ className }: CSSModuleClasses) => {
  const setDarkMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "dark") setDarkMode();

  const handleFunction = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };

  return (
    <label className={`${styles.switch} ${className}`}>
      <input
        onChange={handleFunction}
        type="checkbox"
        defaultChecked={selectedTheme === "dark"}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default DarkTheme;
