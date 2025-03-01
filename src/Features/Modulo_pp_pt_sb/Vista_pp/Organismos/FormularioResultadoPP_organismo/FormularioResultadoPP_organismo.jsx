import { useForm } from "react-hook-form";
import { TxtGroup } from "../../../../../Moleculas/InputGroup/TxtGroup/TxtGroup";
import { SelectGroup } from "../../../../../Moleculas/InputGroup/SelectGroup/SelectGroup";
import { usePostFetch } from "../../../../../helpers/usePostFetch";
import { TimeGroup } from "../../../../../Moleculas/InputGroup/TimeGroup/TimeGroup";
import { InputSub } from "../../../../../Atomos/InputSub/InputSub";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../../../../helpers/decodeToken";
import { useLocation } from "react-router-dom";
import { verificadorResultados } from "../../../../../helpers/verificadorResultados";

import "./FormularioResultadoPP_organismo.css";

export function FormularioResultadoPP_organismo() {
  const location = useLocation();
  const { id } = location.state || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      fecha_analisis: new Date().toISOString().split("T")[0], // Valor inicial
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire(
        "Error",
        "No se encontraron credenciales validas en el sistema",
        "error"
      );
      navigate("/");
      return;
    }
    const decode = decodeToken(token);
    data["responsable_analisis"] = parseInt(decode.id);
    data["id_pp"] = id;

    const objeto = await verificadorResultados("id_pp", id, data, navigate);

    //GENERAR SWITCHEO DE RUTAS DEPENDIENDO DE OBJETO.TIPO

    const response = await usePostFetch(
      "/producto/registrar_r",
      objeto.data,
      navigate
    );
    if (!response.success) {
      Swal.fire("Error", JSON.stringify(response), "error");
    } else {
      Swal.fire("Exito", "Producto en proceso registrado con exito", "success");
      navigate("/menu");
    }
  };

  const onError = (errors) => {
    for (const error in errors) {
      Swal.fire("Error", errors[error].message, "error");
    }
  };

  const opcionesCoNC = [
    { value: "C", placeHolder: "Cumple" },
    { value: "NC", placeHolder: "No cumple" },
  ];
  const validaciones = { required: "los campos con * son obligatorios" };
  const validacionesObservaciones = {
    maxLength: {
      value: 100,
      message: "El campo de observaciones no puede tener más de 100 caracteres",
    },
  };

  const validacionesColiformes1 = (event) => {
    let value = event.target.value;

    value = value.replace(/[^0-9<>]/g, "");

    if (value.startsWith("<") || value.startsWith(">")) {
      value = value.slice(0, 3);
      const numberPart = value.slice(1);
      if (!/^[1-9]$|^10$/.test(numberPart)) {
        value = value.slice(0, 2);
      }
    } else {
      value = value.slice(0, 3);
      if (!/^(11|[1-9]\d?|100)?$/.test(value)) {
        value = value.slice(0, value.length - 1);
      }
    }

    setValue("e_coli", value, { shouldValidate: true });
  };
  const validacionesColiformes2 = (event) => {
    let value = event.target.value;

    value = value.replace(/[^0-9<>]/g, "");

    if (value.startsWith("<") || value.startsWith(">")) {
      value = value.slice(0, 3);
      const numberPart = value.slice(1);
      if (!/^[1-9]$|^10$/.test(numberPart)) {
        value = value.slice(0, 2);
      }
    } else {
      value = value.slice(0, 3);
      if (!/^(11|[1-9]\d?|100)?$/.test(value)) {
        value = value.slice(0, value.length - 1);
      }
    }

    setValue("coliformes", value, { shouldValidate: true });
  };
  const validacionesMoho = (event) => {
    let value = event.target.value;

    value = value.replace(/[^0-9<>]/g, "");

    if (value.startsWith("<") || value.startsWith(">")) {
      value = value.slice(0, 3);
      const numberPart = value.slice(1);
      if (!/^[1-9]$|^10$/.test(numberPart)) {
        value = value.slice(0, 2);
      }
    } else {
      value = value.slice(0, 3);
      if (!/^(11|[1-9]\d?|[1-4]\d{2}|500)?$/.test(value)) {
        value = value.slice(0, value.length - 1);
      }
    }

    setValue("mohos_ley", value, { shouldValidate: true });
  };
  return (
    <>
      <form
        className="formulrio-resultado-pp-container"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="formulario-resultado-pp-campos">
          <TimeGroup
            id={"fecha_analisis"}
            label={"Fecha de analisis *"}
            type={"date"}
            register={register}
            validaciones={validaciones}
            defaultDate={true}
            isDisabled={true}
          />

          <TxtGroup
            id={"e_coli"}
            label={"E. Coli *"}
            placeholder={"Ingrese cantidad de E. coli."}
            register={register}
            onChange={validacionesColiformes1}
            validaciones={validaciones}
          />

          <TxtGroup
            id={"coliformes"}
            label={"Coliformes totales *"}
            placeholder={"Ingrese cantidad de coliformes totales"}
            register={register}
            onChange={validacionesColiformes2}
            validaciones={validaciones}
          />

          <TxtGroup
            id={"mohos_ley"}
            label={"Mohos y levaduras *"}
            placeholder={"Ingrese cantidad de mohos y levaduras"}
            register={register}
            onChange={validacionesMoho}
            validaciones={validaciones}
          />

          <TxtGroup
            id={"observaciones"}
            label={"Observaciones"}
            placeholder={"Ingrese las observaciones"}
            register={register}
            validaciones={validacionesObservaciones}
          />

          <SelectGroup
            id={"cabina"}
            register={register}
            label={"Cabina"}
            opciones={opcionesCoNC}
            validaciones={validaciones}
            placeHolder={false}
          />

          <SelectGroup
            id={"medio_cultivo"}
            register={register}
            label={"Medio de cultivo"}
            opciones={opcionesCoNC}
            validaciones={validaciones}
            placeHolder={false}
          />
          <InputSub text={"Ingresar"} />
        </div>
      </form>
    </>
  );
}
