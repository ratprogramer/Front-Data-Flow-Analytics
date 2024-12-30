import "./InputLst.css";

export function InputLst({ id, opciones, register, onChange }) {
    return (
        <select
            className="selectInput"
            {...register(id)}
            defaultValue=""
            onChange={onChange} // Asegura que puedas manejar el cambio
        >
            <option value="" disabled>
                Seleccione una opción
            </option>
            {opciones.map((opcion, indx) => (
                <option key={indx} value={opcion.value}>
                    {opcion.placeHolder}
                </option>
            ))}
        </select>
    );
}