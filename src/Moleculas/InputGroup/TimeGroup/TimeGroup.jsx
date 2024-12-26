import { Label } from "../../../Atomos/Label/Label"
import { InputDate } from "../../../Atomos/InputDate/InputDate"
import "./TimeGroup.css"

export function TimeGroup({ id,  label, register, validaciones, type }){
    return(
        <div className="inputGroup-molecula">
            <Label htmlFor={id} text={label}/>
            <InputDate id={id} type={type} register ={register} validaciones={validaciones}/>
        </div>
    )
}