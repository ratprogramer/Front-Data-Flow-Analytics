import Swal from 'sweetalert2';

import { InputSub } from '../../../../Atomos/InputSub/InputSub';
import "./LoginForm.css"

import { decodeToken } from '../../../../helpers/decodeToken';
import { usePostFetch } from "../../../../helpers/usePostFetch"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Label } from '../../../../Atomos/Label/Label';
import { InputTxt } from '../../../../Atomos/InputTxt/InputTxt';

export function LoginForm(){
    const { register, handleSubmit, formState: {errors} } = useForm()
    const navigate = useNavigate();

    const  onSubmit = async (data) => {
        const response = await usePostFetch("/login", data)
        if(!response.success){
            Swal.fire('Error', 'Credenciales invalidas', 'error');
        }else{
            const id = decodeToken(response.result)
            sessionStorage.setItem("userID", id )
            navigate('/menu')
        }
    }

    const onError = (errors) => {
        for (const error in errors){
            Swal.fire('Error', "Credenciales invalidas" , 'error');
        }
    }
    return(
        <form onSubmit={handleSubmit(onSubmit, onError)} className="loginForm-organismo">
            <div className='group-container'>
                <Label htmlFor={"dni"} text={"Usuario"}></Label>
                <InputTxt id={"dni"} placeholder={"Ingrese usuario"} register={register} type={"text"} validaciones={{ require: "El usuario es obligatorio"}}></InputTxt>
            </div>
            
            <div className='group-container'>
                <Label htmlFor={"contraseña"} text={"Contraseña"}></Label>
                <InputTxt id={"contraseña"} placeholder={"Ingrese contraseña"} register={register} type={"password"} validaciones={{require: "La contraseña es obligatoria"}}></InputTxt>
            </div>


            <InputSub text="Ingresar" type="submit"></InputSub>
        </form>
    )
}