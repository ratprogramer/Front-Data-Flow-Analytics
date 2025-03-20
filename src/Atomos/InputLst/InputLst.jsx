import "./InputLst.css";
import { useThemeContext } from "../../context/ThemeContext";

export function InputLst({ id, opciones, register, onChange, placeHolder = true }) {
    const { contextTheme } = useThemeContext();
    return (
        <select
            className="selectInput"
            id={contextTheme}
            {...register(id)}
            defaultValue=""
            onChange={onChange} // Asegura que puedas manejar el cambio
        >
            {placeHolder && (
                <option value="" disabled>
                    Seleccione una opción
                </option>
            )}
            {opciones.map((opcion, indx) => (
                <option key={indx} value={opcion.value}>
                    {opcion.placeHolder}
                </option>
            ))}
        </select>
    );
}