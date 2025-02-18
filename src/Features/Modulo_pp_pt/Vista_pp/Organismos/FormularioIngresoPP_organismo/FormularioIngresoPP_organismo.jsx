import { useForm } from "react-hook-form";
import { useState } from "react";
import { TxtGroup } from "../../../../../Moleculas/InputGroup/TxtGroup/TxtGroup";
import { SelectGroup } from "../../../../../Moleculas/InputGroup/SelectGroup/SelectGroup";
import { usePostFetch } from "../../../../../helpers/usePostFetch";
import { TimeGroup } from "../../../../../Moleculas/InputGroup/TimeGroup/TimeGroup";
import { InputSub } from "../../../../../Atomos/InputSub/InputSub";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../../../../helpers/decodeToken";
import { useEffect } from "react";

import "./FormularioIngresoPP_organismo.css";
import Swal from "sweetalert2";

export function FormularioIngresoPP_organismo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      fecha_analisis: new Date().toISOString().split("T")[0], // Valor inicial
    },
  });
  const navigate = useNavigate();

  const [isAlternativo, setIsAlternativo] = useState(false);
  const [isBsemi, setIsBsemi] = useState(false);
  const [isBpas, setIsBpas] = useState(false);


  const onSubmit = async (data) => {
    if(data["nombre_pp"] == '' || data["punto_muestra"] == ''){
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
    { value: "Alternativo", placeHolder: "Punto de toma alternativo" },
  ];

  const tanqueBebidaSemi = [
    { value: "Fabricacion", placeHolder: "Fabricación" }
  ];

  const tanqueBebidaPast = [
    { value: "Pasteurizador", placeHolder: "Pasteurizador" }
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
            onChange={(e) => {
              setIsBpas(e.target.value === "Bebida pasteurizada") 
              setIsBsemi(e.target.value === "Bebida semi elaborada")}
            } 
          ></SelectGroup>

          <TimeGroup
            id={"fecha_analisis"}
            label={"Fecha de analisis *"}
            type={"date"}
            register={register}
            validaciones={validaciones}
            defaultDate={true}
            isDisabled={true}
          ></TimeGroup>

          <TimeGroup
            id={"fecha_toma_muestra"}
            label={"Fecha de toma de muestra *"}
            register={register}
            type={"date"}
            validaciones={validaciones}
            rangeMode={"past"}
            rangeDays={4}
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
            opciones={isBpas ? tanqueBebidaPast : isBsemi ? tanqueBebidaSemi : opcionesPuntoToma}
            validaciones={validaciones}
            placeHolder={ isBpas || isBsemi ? false : true }
            onChange={(e) => setIsAlternativo(e.target.value === "Alternativo")}
          ></SelectGroup>

          {isAlternativo && (
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
