import { Boton } from "../../../../Atomos/Boton/Boton"
import { InputGroup } from "../../../../Moleculas/InputGroup/InputGroup"

import { usePostFetch } from "../../../../helpers/usePostFetch"
import { useForm } from "react-hook-form"

export function LoginForm(){
    const { register, handleSubmit, formState: {errors} } = useForm()
    
    const  onSubmit = async (data) => {
        const response = await usePostFetch("http://localhost:3000/productos/login")
        if(response.success){
            console.log(response.message)
        }else{
            console.log(response)
        }
    }

    const onError = (errors) => {
        for (const error in errors){
            alert(errors[error].message)
        }
    }
    return(
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <InputGroup
                id="dni"
                type="text"
                placeholder="Ingrese usuario"
                label="Usuario"
                register={register}
                validaciones={{
                    require: "El usuario es obligatorio",
                    minLength:{
                        value:8,
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

            <Boton text="Iniciar sesion" type="submit"></Boton>
        </form>
    )
}