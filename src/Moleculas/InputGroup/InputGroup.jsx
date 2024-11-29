import { Label } from "../../Atomos/Label/Label"
import { InputTxt } from "../../Atomos/InputTxt/InputTxt"
import "./InputGroup.css"

export function InputGroup({ id, label, type = "text", placeholder, register, validaciones }){
    return(
        <div className="inputGroup-molecula">
            <Label htmlFor={id} text={label}/>
            <InputTxt id={id} type={type} placeholder={placeholder} register={register} validaciones={validaciones}/>
        </div>
    )
}