import "./Label.css"
import { useThemeContext } from "../../context/ThemeContext";

export function Label({ htmlFor, text, variant, dataRequired }) {
    const { contextTheme } = useThemeContext();
    return(
        <label 
            className="label-atomo" 
            htmlFor={htmlFor} 
            data-variant={variant} 
            data-required={dataRequired}
            id={contextTheme}
        >
            {text}
            {dataRequired && <span className="red-asterisk"> *</span>}
        </label>
    )
}