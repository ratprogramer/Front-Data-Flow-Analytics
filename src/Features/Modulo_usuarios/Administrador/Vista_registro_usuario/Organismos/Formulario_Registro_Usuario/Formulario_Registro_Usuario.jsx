import { useForm } from "react-hook-form";
import { TxtGroup } from "../../../../../../Moleculas/InputGroup/TxtGroup/TxtGroup";
import { usePostFetch } from "../../../../../../helpers/usePostFetch";
import { InputSub } from "../../../../../../Atomos/InputSub/InputSub";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Formulario_Registro_Usuario.css";

export function Formulario_Registro_Usuario() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data["rol"] = "Analista"
    if(data["contraseña"] !== data["contraseña2"]){
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }
    if (data.dni.length > 11 || data.dni.length < 7) {
      return Swal.fire("Error", "El DNI no tiene un numero adecuado de digitos rectifique e ingreselo nuevamente", "error");
    }
    
    const response = await usePostFetch("/register", data, navigate);
    console.log(response);
    if (!response.success) {
      if (response.error?.name === "ZodError") {
        // Formatear los errores de Zod
        const errorMessages = response.error.issues
          .map((issue) => `• ${issue.path.join(".")}: ${issue.message}`)
          .join("\n");
  
        Swal.fire("Error de validación", errorMessages, "error");
      } else {
        // Otro tipo de error
        Swal.fire("Error", response.message || "Ocurrió un error inesperado", "error");
      }
      return;
    }
  
    // Si todo está bien, mostrar éxito
    Swal.fire("Éxito", "Analista registrado con éxito", "success");
    navigate("/menu_admin");
  };

  const onError = (errors) => {
    for (const error in errors) {
      Swal.fire("Error", errors[error].message, "error");
    }
  };

  const validacionesNombre = {
    required: "El nombre y apellido son obligatorios",
    pattern: {
      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)+$/,
      message: "Debe ingresar minimo un nombre y un apellido"
    }
  };

  const validacionesEmail = {
    required: "El correo es obligatorio",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Ingrese un correo válido"
    }
  };

  const validacionesContraseña = {
    required: "La contraseña es obligatoria",
    minLength: {
      value: 8,
      message: "La contraseña debe tener al menos 8 caracteres"
    },
    maxLength: {
      value: 20,
      message: "La contraseña no debe superar los 20 caracteres"
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      message: "Debe incluir mayúscula, minúscula, número y carácter especial"
    }
  };

  const validaciones = { required: "los campos con * son obligatorios" };
  return (
    <form
      className="formulario-registro-usuario"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <p>Registro de Analista</p>
      <div className="formulario-usuario-campos">
        <TxtGroup
          id={"dni"}
          label={"Numero de documento"}
          placeholder={"Ingrese el documento del analista"}
          register={register}
          validaciones={validaciones}

          variant={'formulario'}
          dataRequired
        />

        <TxtGroup
          id={"nombre"}
          label={"Nombre completo"}
          placeholder={"Ingrese el nombre completo del analista"}
          register={register}
          validaciones={validacionesNombre}

          variant={'formulario'}
          dataRequired
        />

        <TxtGroup
          id={"email"}
          label={"Correo del analista"}
          placeholder={"Ingrese el correo del analista"}
          register={register}
          validaciones={validacionesEmail}
          type="email"
          variant={'formulario'}
          dataRequired
        />

        <TxtGroup
          id={"contraseña"}
          label={"Contraseña"}
          placeholder={"Ingrese la contraseña del analista"}
          register={register}
          validaciones={validacionesContraseña}

          variant={'formulario'}
          dataRequired
        />

          <TxtGroup
          id={"contraseña2"}
          label={"Repetir contraseña"}
          placeholder={"Ingrese la contraseña del analista"}
          register={register}
          validaciones={validaciones}

          variant={'formulario'}
          dataRequired
        />
      <InputSub text={"Ingresar"} variant={'formulario'}></InputSub>
      </div>
    </form>
  );
}
