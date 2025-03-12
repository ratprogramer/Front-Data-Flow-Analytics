import { Label } from "../../../Atomos/Label/Label";
import { InputLst } from "../../../Atomos/InputLst/InputLst";
import "./SelectGroup.css";

export function SelectGroup({ id, label, opciones, register, validaciones, onChange, placeHolder, dataRequired }) {
    return (
        <div className="inputGroup-molecula">
            <Label htmlFor={id} text={label} dataRequired={"true"} variant={'formulario'}/>
            <InputLst id={id} opciones={opciones} register={register} onChange={onChange} placeHolder= {placeHolder}/>
        </div>
    );
}