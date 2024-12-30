import { useForm } from "react-hook-form";
import { useState } from "react";
import { TxtGroup } from "../../../../../Moleculas/InputGroup/TxtGroup/TxtGroup";
import { SelectGroup } from "../../../../../Moleculas/InputGroup/SelectGroup/SelectGroup";
import { usePostFetch } from "../../../../../helpers/usePostFetch";
import { TimeGroup } from "../../../../../Moleculas/InputGroup/TimeGroup/TimeGroup";
import { InputSub } from "../../../../../Atomos/InputSub/InputSub";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../../../../helpers/decodeToken";

import "./FormularioIngresoPP_organismo.css";
import Swal from "sweetalert2";

export function FormularioIngresoPP_organismo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const navigate = useNavigate();

  const [isAlternativo, setIsAlternativo] = useState(false);

  const puntoMuestraValue = watch("punto_muestra", "");

  const onSubmit = async (data) => {
    if(data["nombre_pp"] == '' || data[punto_muestra] == ''){
        Swal.fire("Error", "Los campos con * son obligatorios", "error");
        return
    }

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
    const response = await usePostFetch("/producto/registrar_pp", data);
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

  const opcionesNombreProducto = [
    { value: "Bebida semi elaborada", placeHolder: "Bebida semi elaborada" },
    { value: "Bebida pasteurizada", placeHolder: "Bebida pasteurizada" },
    { value: "Corte de bebida lactea", placeHolder: "Corte de bebida lactea" },
  ];

  const opcionesPuntoToma = [
    { value: "Tanque 7", placeHolder: "Tanque 7" },
    { value: "Tanque 9", placeHolder: "Tanque 9" },
    { value: "Tanque 10", placeHolder: "Tanque 10" },
    { value: "Tanque 12", placeHolder: "Tanque 12" },
    { value: "alternativo", placeHolder: "Punto de toma alternativo" },
  ];

  const validaciones = { required: "los campos con * son obligatorios" };
  return (
    <>
      <form
        className="formulrio-registro-pp-container"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="formulario-pp-campos">
          <SelectGroup
            id={"nombre_pp"}
            register={register}
            label={"Nombre del producto *"}
            opciones={opcionesNombreProducto}
            validaciones={validaciones}
          ></SelectGroup>

          <TimeGroup
            id={"fecha_analisis"}
            label={"Fecha de analisis *"}
            type={"date"}
            register={register}
            validaciones={validaciones}
            defaultDate={true}
          ></TimeGroup>

          <TimeGroup
            id={"fecha_toma_muestra"}
            label={"Fecha de toma de muestra *"}
            register={register}
            type={"date"}
            validaciones={validaciones}
          ></TimeGroup>

          <TimeGroup
            id={"hora_toma_muestra"}
            label={"Hora de toma de muestra *"}
            register={register}
            type={"time"}
            validaciones={validaciones}
          ></TimeGroup>

          <SelectGroup
            id={"punto_muestra"}
            register={register}
            label={"Punto de toma de muestra *"}
            opciones={opcionesPuntoToma}
            validaciones={validaciones}
            onChange={(e) => setIsAlternativo(e.target.value === "alternativo")}
          ></SelectGroup>

          {puntoMuestraValue === "alternativo" && (
            <TxtGroup
              id={"punto_alterno"}
              label={"Punto de toma alternativo *"}
              placeholder={"Ingrese el punto alternativo"}
              register={register}
              validaciones={validaciones}
            ></TxtGroup>
          )}
          <TxtGroup
            id={"lote"}
            label={"Lote *"}
            placeholder={"Ingrese el lote"}
            register={register}
            validaciones={validaciones}
          ></TxtGroup>

          <TxtGroup
            id={"observaciones"}
            label={"Observaciones"}
            placeholder={"Ingrese las observaciones"}
            register={register}
          ></TxtGroup>
        </div>
        <InputSub text={"Ingresar"}></InputSub>
      </form>
    </>
  );
}
