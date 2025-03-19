import { IndicePP_PT_organismo } from "../Organismos/IndicePP_PT_organismo";
import "./IndicePP_PT.css";
import { useThemeContext } from "../../../../context/ThemeContext";

export function IndicePP_PT() {
  const { contextTheme } = useThemeContext();
  return (
    <div className="indicepppt" id={contextTheme}>
      <IndicePP_PT_organismo />
    </div>
  );
}
