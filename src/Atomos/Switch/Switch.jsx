import { useId } from "react";
import "./theme-switch.css";
import { useThemeContext } from "../../context/ThemeContext";

export const Switch = ({ onChange, checked }) => {
  const { contextTheme } = useThemeContext();
  const maskId = useId(); 

  return (
    <label htmlFor="themeToggle" className="themeToggle st-sunMoonThemeToggleBtn" id={contextTheme}>
      <input
        type="checkbox"
        id="themeToggle"
        className="themeToggleInput"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" stroke="none">
        <mask id={maskId}>
          <rect x="0" y="0" width="20" height="20" fill="white"></rect>
          <circle cx="11" cy="3" r="8" fill="black"></circle>
        </mask>
        <circle className="sunMoon" cx="10" cy="10" r="8" mask={`url(#${maskId})`}></circle>
        <g>
          <circle className="sunRay sunRay1" cx="18" cy="10" r="1.5"></circle>
          <circle className="sunRay sunRay2" cx="14" cy="16.928" r="1.5"></circle>
          <circle className="sunRay sunRay3" cx="6" cy="16.928" r="1.5"></circle>
          <circle className="sunRay sunRay4" cx="2" cy="10" r="1.5"></circle>
          <circle className="sunRay sunRay5" cx="6" cy="3.1718" r="1.5"></circle>
          <circle className="sunRay sunRay6" cx="14" cy="3.1718" r="1.5"></circle>
        </g>
      </svg>

      <p>{contextTheme === "Light" ? "Light Mode" : "Dark Mode"}</p>
    </label>
  );
};
