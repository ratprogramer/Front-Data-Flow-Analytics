import { Label } from "../../../Atomos/Label/Label";
import { InputTxt } from "../../../Atomos/InputTxt/InputTxt";
import "./TxtGroup.css";

export function TxtGroup({ id, label, type = "text", placeholder, register, value, validaciones, onChange, variant, dataRequired }) {
    return (
        <div className="inputGroup-molecula">
            <Label 
                htmlFor={id} 
                text={dataRequired ? (
                    <>
                        {label} <span className="red-asterisk">*</span>
                    </>
                ) : label} 
                
                variant={variant} 
            />
            <InputTxt 
                id={id} 
                type={type} 
                placeholder={placeholder} 
                onChange={onChange} 
                register={register} 
                validaciones={validaciones} 
                value={value} 

                variant={variant} 
            />
        </div>
    );
}
