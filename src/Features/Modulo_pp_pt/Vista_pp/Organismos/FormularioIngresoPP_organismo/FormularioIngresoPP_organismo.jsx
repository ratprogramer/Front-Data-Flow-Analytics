import { InputLst } from "../../../../../Atomos/InputLst/InputLst" 
import { useForm } from "react-hook-form";
import { InputTxt } from "../../../../../Atomos/InputTxt/InputTxt";
import { InputSub } from "../../../../../Atomos/InputSub/InputSub";

export function FormularioRegistroPP(){
    const { register, handleSubmit, formState: {errors} } = useForm()

    
    const  onSubmit = async (data) => {
        console.log(data);
        
    }

    const onError = (errors) => {
        for (const error in errors){
            Swal.fire('Error', errors[error].message, 'error');
        }
    }

    const opciones = [{value:"bebida semi elaborada", placeHolder:"Bebida semi elaborada"},{value:"bebida pasteurizada", placeHolder:"Bebida pasteurizada"},{value:"corte de bebida lactea", placeHolder:"Corte de bebida lactea"}];
    
    return(
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <InputLst id={"nombre_pp"} register={register} opciones={opciones}></InputLst>
                <InputTxt id={"a"}  placeholder={"Ingrese fecha de analisis"} register={register} type={"date"} validaciones={{ require: "Faltaron campos por rellenar"}}></InputTxt>
                <InputTxt id={"b"}  placeholder={"Ingrese fecha de toma de muestra"} register={register} type={"date"} validaciones={{ require: "Faltaron campos por rellenar"}}></InputTxt>
                <InputTxt id={"c"}  placeholder={"Ingrese hora de toma de muestra"} register={register} type={"time"} validaciones={{ require: "Faltaron campos por rellenar"}}></InputTxt>
                <InputTxt id={"d"}  placeholder={"Lote"} register={register} type={"text"} validaciones={{ require: "Faltaron campos por rellenar"}}></InputTxt>
                <InputTxt id={"f"}  placeholder={"Observaciones"} register={register} type={"text"} validaciones={{ require: "Faltaron campos por rellenar"}}></InputTxt>
                <InputSub text={"Ingresar"} type={"submit"}></InputSub>
            </form>
        </>
    )
}