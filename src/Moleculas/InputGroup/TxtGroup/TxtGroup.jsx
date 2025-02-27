import { Label } from "../../../Atomos/Label/Label"
import { InputTxt } from "../../../Atomos/InputTxt/InputTxt"
import "./TxtGroup.css"

export function TxtGroup({ id, label, type = "text", placeholder, register, value, validaciones, onChange }){
    return(
        <div className="inputGroup-molecula">
            <Label htmlFor={id} text={label}/>
            <InputTxt id={id} type={type} placeholder={placeholder} onChange={onChange} register={register} validaciones={validaciones} value={value}/>
        </div>
    )
}