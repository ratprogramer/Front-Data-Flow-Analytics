import './BurgerMenu.modules.css'
import { useThemeContext } from "../../context/ThemeContext";

export const BurgerMenu = ({ onclick }) => {
  const { contextTheme } = useThemeContext();
  return (
    <label className="burger" onClick={onclick} id={contextTheme}>
      <input type="checkbox" id="burger" />
      <span></span>
      <span></span>
      <span></span>
    </label>
  )
}
