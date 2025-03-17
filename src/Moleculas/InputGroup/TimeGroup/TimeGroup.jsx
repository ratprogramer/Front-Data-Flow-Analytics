import { Label } from "../../../Atomos/Label/Label"
import { InputDate } from "../../../Atomos/InputDate/InputDate"
import "./TimeGroup.css"

export function TimeGroup({ 
    id, 
    label, 
    register, 
    validaciones, 
    type, 
    defaultDate = false, 
    isDisabled = false, 
    rangeMode, 
    rangeDays, 
    dataRequired
    }){
    return(
        <div className="inputGroup-molecula">
            <Label htmlFor={id} text={label} dataRequired={dataRequired} variant={'formulario'}/>
            <InputDate 
                id={id} 
                type={type} 
                register ={register} 
                validaciones={validaciones} 
                defaultDate={defaultDate} 
                isDisabled={isDisabled} 
                rangeDays={rangeDays} 
                rangeMode={rangeMode} 
                dataRequired={dataRequired}
            />
        </div>
    )
}