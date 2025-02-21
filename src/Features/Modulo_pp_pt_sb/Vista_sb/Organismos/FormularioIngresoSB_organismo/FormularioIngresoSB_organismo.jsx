import { useForm } from "react-hook-form";
import { TxtGroup } from "../../../../../Moleculas/InputGroup/TxtGroup/TxtGroup";
import { SelectGroup } from "../../../../../Moleculas/InputGroup/SelectGroup/SelectGroup";
import { usePostFetch } from "../../../../../helpers/usePostFetch";
import { TimeGroup } from "../../../../../Moleculas/InputGroup/TimeGroup/TimeGroup";
import { InputSub } from "../../../../../Atomos/InputSub/InputSub";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../../../../helpers/decodeToken";
import { useLocation } from "react-router-dom";

import "./FormularioIngresoSB_organismo.css";
import Swal from "sweetalert2";

export function FormularioIngresoSB_organismo() {
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
    
        const response = await usePostFetch("/producto/registrar_saborizacion", data, token);
        
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
  const validaciones = { required: "los campos con * son obligatorios" };

  const opcionesSabor =  [
    { value: "Mora", placeHolder: "Mora" },
    { value: "Melocoton", placeHolder: "Melocoton" },
    { value: "Fresa", placeHolder: "Fresa" },
    { value: "Kumis", placeHolder: "Kumis" }
  ];
  const opcionesPuntoToma = [
    { value: "Tanque 7", placeHolder: "Tanque 7" },
    { value: "Tanque 9", placeHolder: "Tanque 9" },
    { value: "Tanque 10", placeHolder: "Tanque 10" },
    { value: "Tanque 12", placeHolder: "Tanque 12" }
  ];
  return (
    <>
      <form
        className="formulrio-registro-pt-container"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="formulario-pt-campos">

          <SelectGroup
            id={"sabor"}
            register={register}
            label={"Sabor *"}
            opciones={opcionesSabor}
            placeHolder={true}
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
            type={"date"}
            register={register}
            validaciones={validaciones}
            defaultDate={true}
          ></TimeGroup>

          <TimeGroup
            id={"hora_toma_muestra"}
            label={"Hora de toma de muestra *"}
            type={"time"}
            register={register}
            validaciones={validaciones}
            defaultDate={true}
          ></TimeGroup>

          <SelectGroup
            id={"tanque"}
            register={register}
            label={"Tanque *"}
            opciones={opcionesPuntoToma}
            placeHolder={true}
            validaciones={validaciones}
          ></SelectGroup>



          <TxtGroup
            id={"lote"}
            label={"Lote *"}
            placeholder={"Ingrese el lote del producto terminado"}
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
