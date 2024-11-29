import Swal from 'sweetalert2';

import { Boton } from "../../../../Atomos/Boton/Boton"
import { InputGroup } from "../../../../Moleculas/InputGroup/InputGroup"

import { usePostFetch } from "../../../../helpers/usePostFetch"
import { useForm } from "react-hook-form"

import "./LoginForm.css"

export function LoginForm(){
    const { register, handleSubmit, formState: {errors} } = useForm()
    
    const  onSubmit = async (data) => {
        const response = await usePostFetch("http://localhost:3001/producto/login", data)
        if(!response.success){
            Swal.fire('Error', 'Credenciales invalidas', 'error');
        }else{
            console.log(response);
        }
    }

    const onError = (errors) => {
        for (const error in errors){
            alert(errors[error].message)
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

            <Boton text="Ingresar" type="submit"></Boton>
        </form>
    )
}