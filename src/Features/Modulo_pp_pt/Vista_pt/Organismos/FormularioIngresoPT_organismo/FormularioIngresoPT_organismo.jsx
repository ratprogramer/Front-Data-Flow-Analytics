import { useForm } from "react-hook-form";
import { TxtGroup } from "../../../../../Moleculas/InputGroup/TxtGroup/TxtGroup";
import { SelectGroup } from "../../../../../Moleculas/InputGroup/SelectGroup/SelectGroup";
import { usePostFetch } from "../../../../../helpers/usePostFetch";
import { TimeGroup } from "../../../../../Moleculas/InputGroup/TimeGroup/TimeGroup";
import { InputSub } from "../../../../../Atomos/InputSub/InputSub";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../../../../helpers/decodeToken";
import { useLocation } from "react-router-dom";

import "./FormularioIngresoPT_organismo.css";
import Swal from "sweetalert2";

export function FormularioIngresoPT_organismo() {
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


  const location = useLocation();
  const { id } = location.state || 123;


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
    console.log(decode);
    
    data["responsable_analisis"] = parseInt(decode.id);
    data["id_producto_proceso"] = parseInt(id);
    console.log(data); // ESTE FALTA HACERLE EL FETCH CON EL BACK, YA LO ANOTE, LO HAGO APENAS FELIPE ME SOLUCIONE LO DEL ID (SAMUEL 12/02/2025)
    navigate("/menu");
    Swal.fire("Exito", "Producto en proceso registrado con exito", "success");
  }; 

  const onError = (errors) => {
    for (const error in errors) {
      Swal.fire("Error", errors[error].message, "error");
    }
  };

  const opcionesPresentacion = [
    { value: "1000", placeHolder: "1000 ml" },
    { value: "200", placeHolder: "200 ml" }
  ];

  const opcionesMaquina = [
    { value: "m1", placeHolder: "Máquina 1" },
    { value: "m2", placeHolder: "Máquina 2" },
    { value: "m3", placeHolder: "Máquina 3" },
    { value: "m4", placeHolder: "Máquina 4" },
  ];

  const validaciones = { required: "los campos con * son obligatorios" };
  
  return (
    <>
      <form
        className="formulrio-registro-pt-container"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="formulario-pt-campos">

          <TimeGroup
            id={"fecha_analisis"}
            label={"Fecha de analisis *"}
            type={"date"}
            register={register}
            validaciones={validaciones}
            defaultDate={true}
          ></TimeGroup>

          <TimeGroup
            id={"fecha_env"}
            label={"Fecha de envasado *"}
            type={"date"}
            register={register}
            validaciones={validaciones}
            defaultDate={true}
          ></TimeGroup>

          <TimeGroup
            id={"fecha_vencimiento"}
            label={"Fecha de vencimiento *"}
            type={"date"}
            register={register}
            validaciones={validaciones}
            defaultDate={true}
          ></TimeGroup>

          <TxtGroup
            id={"ref"}
            label={"Referencia *"}
            placeholder={"Ingrese la referencia del producto terminado"}
            register={register}
            validaciones={validaciones}
          ></TxtGroup>

          <SelectGroup
            id={"presentacion"}
            register={register}
            label={"Presentacion del producto *"}
            opciones={opcionesPresentacion}
            validaciones={validaciones}
          ></SelectGroup>


          <TxtGroup
            id={"lote"}
            label={"Lote *"}
            placeholder={"Ingrese el lote del producto terminado"}
            register={register}
            validaciones={validaciones}
          ></TxtGroup>


          <TimeGroup
            id={"hora_empaque"}
            label={"Hora de empaque *"}
            register={register}
            type={"time"}
            validaciones={validaciones}
          ></TimeGroup>

          <SelectGroup
            id={"maquina_envasadora"}
            register={register}
            label={"Maquina envasadora *"}
            opciones={opcionesMaquina}
            validaciones={validaciones}
          ></SelectGroup>

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
