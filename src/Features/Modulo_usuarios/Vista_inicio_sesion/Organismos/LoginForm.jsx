import Swal from "sweetalert2";

import { InputSub } from "../../../../Atomos/InputSub/InputSub";
import "./LoginForm.css";

import { useUser } from "../../../../helpers/userContext.jsx"

import { decodeToken } from "../../../../helpers/decodeToken";
import { usePostFetch } from "../../../../helpers/usePostFetch";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Label } from "../../../../Atomos/Label/Label";
import { InputTxt } from "../../../../Atomos/InputTxt/InputTxt";
import { User, Lock } from "lucide-react";

export function LoginForm() {
  Swal.fire({
    title: "Ingresa tu nombre",
    input: "text",
    inputPlaceholder: "Escribe aquí...",
    showCancelButton: true,
    confirmButtonText: "Enviar"
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("Nombre ingresado:", result.value);
    }
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { setUser} = useUser()
  

  const onSubmit = async (data) => {
    if (data.dni.length > 11 || data.dni.length < 7) {
      return Swal.fire("Error", "Credenciales invalidas", "error");
    }
    const response = await usePostFetch("/login", data, navigate, false);
    if (!response.success) {
      Swal.fire("Error", "Credenciales invalidas", "error");
    } else {
      sessionStorage.setItem("token", response.result);
      const token = decodeToken(response.result);
      setUser(token.nombre)
      if (token.rol == "Analista" || token.rol == "analista") {
        navigate("/menu");
      } else if (token.rol == "Administrador" || token.rol == "administrador") {
        navigate("/menu_admin");
      } else {
        Swal.fire("Error", "Credenciales invalidas", "error");
      }
    }
  };

  const onError = (errors) => {
    for (const error in errors) {
      Swal.fire("Error", "Credenciales invalidas", "error");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="loginForm-organismo"
    >
      <div className="group-container">
        <Label htmlFor={"dni"} text={""} variant={'login'}></Label>
        <div className="input-lg-container">
          <User />
          <InputTxt
            id={"dni"}
            placeholder={"Ingrese usuario"}
            register={register}
            type={"text"}
            validaciones={{ require: "El usuario es obligatorio" }}

            variant={'login'}
          />
        </div>
      </div>

      <div className="group-container">
        <Label htmlFor={"contraseña"} text={""} variant={'login'}></Label>

        <div className="input-lg-container">
          <Lock />
          <InputTxt
            id={"contraseña"}
            placeholder={"Ingrese contraseña"}
            register={register}
            type={"password"}
            validaciones={{ require: "La contraseña es obligatoria" }}

            variant='login'
          />
        </div>
      </div>

      <InputSub text="Ingresar" type="submit" variant='login' />
    </form>
  );
}
