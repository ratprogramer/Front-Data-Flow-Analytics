import "./InputLst.css"
export function InputLst({id, opciones, register}){
    // [{value:"1", placeHolder:"Holi 1"}, {value:"2", placeHolder:"Holi 2"}]
    return(
        <select className="selectInput" {...register(id)}>
            {opciones.map((opcion, indx) => (
                <option key={indx} value={opcion.value}>{opcion.placeHolder}</option>
            ))}
        </select>
    )
}