import { Label } from "../../Atomos/Label/Label"
import { InputTxt } from "../../Atomos/InputTxt/InputTxt"

export function InputGroup({ id, label, type = "text", placeholder, register, validaciones }){
    return(
        <div>
            <Label htmlFor={id} text={label}/>
            <InputTxt id={id} type={type} placeHolder={placeholder} register={register} validaciones={validaciones}/>
        </div>
    )
}