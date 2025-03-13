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
    data["rol"] = "analista"
    const response = await usePostFetch("/register", data, navigate);
    if (!response.success) {
      Swal.fire("Error", JSON.stringify(response), "error");
    } else {
      Swal.fire("Exito", "Analista registrado con exito", "success");
      navigate("/menu_admin");
    }
  };

  const onError = (errors) => {
    for (const error in errors) {
      Swal.fire("Error", errors[error].message, "error");
    }
  };

  const validaciones = { required: "los campos con * son obligatorios" };
  return (
    <form
      className="formulario-registro-usuario"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <h3>Registro de Analista</h3>
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
          label={"Nombre"}
          placeholder={"Ingrese el nombre del analista"}
          register={register}
          validaciones={validaciones}

          variant={'formulario'}
          dataRequired
        />

        <TxtGroup
          id={"contraseña"}
          label={"Contraseña"}
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
