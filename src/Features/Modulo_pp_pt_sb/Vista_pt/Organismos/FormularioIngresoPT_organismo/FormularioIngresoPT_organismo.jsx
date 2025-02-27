import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { TxtGroup } from "../../../../../Moleculas/InputGroup/TxtGroup/TxtGroup";
import { SelectGroup } from "../../../../../Moleculas/InputGroup/SelectGroup/SelectGroup";
import { usePostFetch } from "../../../../../helpers/usePostFetch";
import { TimeGroup } from "../../../../../Moleculas/InputGroup/TimeGroup/TimeGroup";
import { InputSub } from "../../../../../Atomos/InputSub/InputSub";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../../../../helpers/decodeToken";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./FormularioIngresoPT_organismo.css";
import Swal from "sweetalert2";

export function FormularioIngresoPT_organismo() {
  const {
    register,
    handleSubmit,
    watch,
    setValue  
  } = useForm({
    defaultValues: {
      fecha_analisis: new Date().toISOString().split("T")[0],
      fecha_env: new Date().toISOString().split("T")[0],
      fecha_vencimiento: ""
    },
  });


  const fecha_env = watch("fecha_env");
  useEffect(() => {
    if (fecha_env) {
      const nuevaFecha = new Date(fecha_env);
      nuevaFecha.setDate(nuevaFecha.getDate() + 60);
      setValue("fecha_vencimiento", nuevaFecha.toISOString().split("T")[0]);
    }
  }, [fecha_env, setValue]);


  const [lote, setLote] = useState(undefined)

  const location = useLocation();
  const { id } = location.state || 123;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire(
        "Error",
        "No se encontraron credenciales válidas en el sistema",
        "error"
      );
      navigate("/");
      return;
    }
    const decode = decodeToken(token);
    data["responsable_analisis"] = parseInt(decode.id);
    data["id_pp"] = parseInt(id);
    const response = await usePostFetch("/producto/registrar_pt", data, navigate);
    if (!response.success) {
      console.log(response);
      
      Swal.fire("Error", JSON.stringify(response.message), "error");
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

  const opcionesPresentacion = [
    { value: "1000 ml", placeHolder: "1000 ml" },
    { value: "200 ml", placeHolder: "200 ml" }
  ];

  const opcionesMaquina = [
    { value: "M1", placeHolder: "Máquina 1" },
    { value: "M2", placeHolder: "Máquina 2" },
    { value: "M3", placeHolder: "Máquina 3" },
    { value: "M4", placeHolder: "Máquina 4" },
  ];

  const opcionesRef = [
    { value: "Mora", placeHolder: "Mora" },
    { value: "Melocoton", placeHolder: "Melocoton" },
    { value: "Fresa", placeHolder: "Fresa" },
    { value: "Kumis", placeHolder: "Kumis" },
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
    let inputVal = e.target.value;
    if (inputVal.length > 5) {
      inputVal = inputVal.slice(0, 5);
    }
    setLote(inputVal)
  }
  const validaciones = { required: "Los campos con * son obligatorios" };
  const validacionesLote = {
    required: "Los campos con * son obligatorios",
    pattern: {
      value: /^[0-9]+$/,
      message: "Solo se permiten números en el Lote",
    },
    minLength: {
      value: 5,
      message: "El lote debe tener al menos 5 dígitos",
    },
    maxLength: {
      value: 5,
      message: "El lote no puede tener más de 5 dígitos",
    },
  };
  const validacionesObservaciones = {
    maxLength: {
      value: 100,
      message: "El campo de observaciones no puede tener más de 100 caracteres",
    },
  };


  return (
    <form
      className="formulrio-registro-pt-container"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="formulario-pt-campos">
        <TimeGroup
          id={"fecha_analisis"}
          label={"Fecha de análisis *"}
          type={"date"}
          register={register}
          validaciones={validaciones}
          defaultDate={true}
          isDisabled={true}
        />

        <TimeGroup
          id={"fecha_env"}
          label={"Fecha de envasado *"}
          type={"date"}
          register={register}
          validaciones={validaciones}
          rangeMode={"past"}
          rangeDays={4}
          defaultDate={true}
        />

        <TimeGroup
          id={"fecha_vencimiento"}
          label={"Fecha de vencimiento *"}
          type={"date"}
          register={register}
          validaciones={validaciones}
          baseDate={fecha_env}
          isDisabled={true}
          rangeDays={4}  
        />

        <SelectGroup
          id={"ref"}
          register={register}
          label={"Referencia *"}
          opciones={opcionesRef}
          validaciones={validaciones}
        />

        <SelectGroup
          id={"maquina_envasadora"}
          register={register}
          label={"Máquina envasadora *"}
          opciones={opcionesMaquina}
          validaciones={validaciones}
        />

        <SelectGroup
          id={"presentacion"}
          register={register}
          label={"Presentación del producto *"}
          opciones={opcionesPresentacion}
          validaciones={validaciones}
        />

        <TimeGroup
          id={"hora_empaque"}
          label={"Hora de empaque *"}
          register={register}
          type={"time"}
          validaciones={validaciones}
        />

        <TxtGroup
          id={"lote"}
          label={"Lote *"}
          placeholder={"Ingrese el lote del producto terminado"}
          register={register}
          value={lote}
          validaciones={validacionesLote}
          type="number"
          onChange={(e) => handleChange(e)}
        />


        <TxtGroup
          id={"observaciones"}
          label={"Observaciones"}
          placeholder={"Ingrese las observaciones"}
          register={register}
          validaciones={validacionesObservaciones}
        />
      </div>
      <InputSub text={"Ingresar"} />
    </form>
  );
}
