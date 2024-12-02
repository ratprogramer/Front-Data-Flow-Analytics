import Swal from 'sweetalert2';

import { InputSub } from '../../../../Atomos/InputSub/InputSub';
import { InputGroup } from "../../../../Moleculas/InputGroup/InputGroup"
import "./LoginForm.css"

import { usePostFetch } from "../../../../helpers/usePostFetch"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

export function LoginForm(){
    const { register, handleSubmit, formState: {errors} } = useForm()
    const navigate = useNavigate();

    const  onSubmit = async (data) => {
        const response = await usePostFetch("http://localhost:3001/producto/login", data)
        if(!response.success){
            Swal.fire('Error', 'Credenciales invalidas', 'error');
        }else{
            navigate('/menu')
        }
    }

    const onError = (errors) => {
        for (const error in errors){
            Swal.fire('Error', errors[error].message, 'error');
        }
    }
    return(
        <form onSubmit={handleSubmit(onSubmit, onError)} className="loginForm-organismo">
            <InputGroup
                id="dni"
                type="text"
                placeholder="Ingrese usuario"
                label="Usuario"
                register={register}
                validaciones={{
                    require: "El usuario es obligatorio",
                    minLength:{
                        value:4,
                        message:"El Dni debe tener como minimo 8 caracteres"
                    }
                }}
            />
            
            <InputGroup
                id="contraseña"
                type="password"
                placeholder="Ingrese contraseña"
                label="Contraseña"
                register={register}
                validaciones={{
                    require: "La contraseña es obligatoria",
                    minLength:{
                        value:8,
                        message:"La contraseña debe tener como minimo 8 caracteres"
                    }
                }}
            />

            <InputSub text="Ingresar" type="submit"></InputSub>
        </form>
    )
}