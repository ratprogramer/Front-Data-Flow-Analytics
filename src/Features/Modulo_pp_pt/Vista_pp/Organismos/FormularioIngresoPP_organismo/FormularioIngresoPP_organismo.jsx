import { useForm } from "react-hook-form";
import { TxtGroup } from "../../../../../Moleculas/InputGroup/TxtGroup/TxtGroup";
import { SelectGroup } from "../../../../../Moleculas/InputGroup/SelectGroup/SelectGroup";
import { usePostFetch } from "../../../../../helpers/usePostFetch" 
import { TimeGroup } from "../../../../../Moleculas/InputGroup/TimeGroup/TimeGroup";
import { InputSub } from "../../../../../Atomos/InputSub/InputSub";

import "./FormularioIngresoPP_organismo.css"

export function FormularioIngresoPP_organismo(){
    const { register, handleSubmit, formState: {errors} } = useForm()

    
    const  onSubmit = async (data) => {
        data[responsable_analisis] = 1;
        const response = await usePostFetch("/producto/registrar_pp", data)
        if(!response.success){
            Swal.fire('Error', JSON.stringify(response) , 'error');
        }else{
            navigate('/menu')
        }
    }

    const onError = (errors) => {
        for (const error in errors){
            Swal.fire('Error', errors[error].message , 'error');
        }
    }

    const opcionesNombreProducto = [{value:"bebida semi elaborada", placeHolder:"Bebida semi elaborada"},{value:"bebida pasteurizada", placeHolder:"Bebida pasteurizada"},{value:"corte de bebida lactea", placeHolder:"Corte de bebida lactea"}];

    const opcionesPuntoToma = [{value:"Tanque 7", placeHolder:"Tanque 7"},{value:"Tanque 9", placeHolder:"Tanque 9"},{value:"Tanque 10", placeHolder:"Tanque 10"},{value:"Tanque 12", placeHolder:"Tanque 12"},{value:"alternativo", placeHolder:"Punto de toma alternativo"}];

    const validaciones = { required: "los campos con * son obligatorios" };
    return(
        <>
            <form className="formulrio-registro-pp-container" onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="formulario-pp-campos">
                    <SelectGroup id={"nombre_pp"} register={register} label={"Nombre del producto *"} opciones={opcionesNombreProducto} validaciones={validaciones}></SelectGroup>
            
                    <TimeGroup id={"fecha_analisis"} label={"Fecha de analisis *"}  type={"date"} register={register} validaciones={validaciones}></TimeGroup>

                    <TimeGroup id={"fecha_toma_muestra"} label={"Fecha de toma de muestra *"} register={register} type={"date"} validaciones={validaciones}></TimeGroup>

                    <TimeGroup id={"hora_toma_muestra"} label={"Hora de toma de muestra *"} register={register} type={"time"} validaciones={validaciones}></TimeGroup>

                    <SelectGroup id={"punto_muestra"} register={register} label={"Punto de toma de muestra *"} opciones={opcionesPuntoToma} validaciones={validaciones}></SelectGroup>

                    <TxtGroup id={"lote"} label={"Lote *"} placeholder={"Ingrese el lote"} register={register} validaciones={validaciones} ></TxtGroup>
                
                    <TxtGroup id={"observaciones"} label={"Observaciones"} placeholder={'Ingrese las observaciones'} register={register}></TxtGroup>
                </div>
                <InputSub text={"Ingresar"}></InputSub>
            </form>
        </>
    )
}
