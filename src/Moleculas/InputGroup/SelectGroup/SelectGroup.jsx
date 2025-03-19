import { Label } from "../../../Atomos/Label/Label";
import { InputLst } from "../../../Atomos/InputLst/InputLst";
import { useThemeContext } from "../../../context/ThemeContext";

export function SelectGroup({ id, label, opciones, register, validaciones, onChange, placeHolder, dataRequired }) {
    const { contextTheme } = useThemeContext();
    return (
        <div className="inputGroup-molecula" id={contextTheme}>
            <Label htmlFor={id} text={label} dataRequired={"true"} variant={'formulario'}/>
            <InputLst id={id} opciones={opciones} register={register} onChange={onChange} placeHolder= {placeHolder}/>
        </div>
    );
}