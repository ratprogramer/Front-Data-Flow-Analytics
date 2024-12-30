import { Label } from "../../../Atomos/Label/Label";
import { InputLst } from "../../../Atomos/InputLst/InputLst";
import "./SelectGroup.css";

export function SelectGroup({ id, label, opciones, register, validaciones, onChange }) {
    return (
        <div className="inputGroup-molecula">
            <Label htmlFor={id} text={label} />
            <InputLst id={id} opciones={opciones} register={register} onChange={onChange} />
        </div>
    );
}