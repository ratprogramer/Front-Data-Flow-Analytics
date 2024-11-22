export function InputLst({opciones}){
    // [{value:"1", placeHolder:"Holi 1"}, {value:"2", placeHolder:"Holi 2"}]
    return(
        <select>
            {opciones.map((opcion, indx) => (
                <option key={indx} value={opcion.value}>{opcion.placeHolder}</option>
            ))}
        </select>
    )
}