import { useForm } from "react-hook-form";
import { TxtGroup } from "../../../../../Moleculas/InputGroup/TxtGroup/TxtGroup";
import { SelectGroup } from "../../../../../Moleculas/InputGroup/SelectGroup/SelectGroup";
import { usePostFetch } from "../../../../../helpers/usePostFetch";
import { TimeGroup } from "../../../../../Moleculas/InputGroup/TimeGroup/TimeGroup";
import { InputSub } from "../../../../../Atomos/InputSub/InputSub";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../../../../helpers/decodeToken";
import { useEffect, useState } from "react";

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

  const [lote, setLote] = useState("")
  const [tanque, setTanque] = useState("")
  const [isMora, setIsMora] = useState(false)
  const [isFresa, setIsFresa] = useState(false)
  const [isMelocoton, setIsMelocoton] = useState(false)
  const [isKumis, setIsKumis] = useState(false)
  const [posLote, setPos] = useState(undefined)
  
  const creadorLote = () => {
    let lotecito = "";
  
    if (isMora) {
      lotecito = "Mo";
    } else if (isFresa) {
      lotecito = "Fr";
    } else if (isMelocoton) {
      lotecito = "Me"; 
    } else if (isKumis) {
      lotecito = "Ku"; 
    }
    lotecito += tanque; 
    setLote(lotecito);
  };
  
  const handleChange = (e) => {
    console.log(e.target.value);
    let inputVal = e.target.value;
    if (inputVal.length > 5) {
      inputVal = inputVal.slice(0, 5);
    }

    setPos(inputVal);
  };

  useEffect(() => {
    creadorLote();
  }, [tanque, isMora, isFresa,isMelocoton, isKumis]); 
  

  const onSubmit = async (data) => {
        if(data["sabor"] == '' ){
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
        data["lote"] = lote + posLote;
        console.log(data);
        
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
            onChange={(e) => {
              setIsFresa(e.target.value === "Fresa")
              setIsMora(e.target.value === "Mora")
              setIsKumis(e.target.value === "Kumis")
              setIsMelocoton(e.target.value === "Melocoton")
            }
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
            type={"date"}
            register={register}
            validaciones={validaciones}
            rangeDays={4}
            rangeMode={"past"}
          ></TimeGroup>

          <TimeGroup
            id={"hora_toma_muestra"}
            label={"Hora de toma de muestra *"}
            type={"time"}
            register={register}
            validaciones={validaciones}
            defaultDate={true}
          />

          <SelectGroup
            id={"tanque"}
            register={register}
            label={"Tanque *"}
            opciones={opcionesPuntoToma}
            placeHolder={true}
            validaciones={validaciones}
            onChange={(e) => {
              if(e.target.value.startsWith("Tanque ")){
                setTanque("T" + e.target.value.split(" ")[1]);
              }
            }}
          ></SelectGroup>



          <TxtGroup
            id={"lote"}
            label={"Lote *"}
            placeholder={"Ingrese el lote del producto terminado"}
            register={register}
            type={"number"}
            validaciones={validacionesLote}
            onChange={(e) => handleChange(e)}
            value={posLote}
          ></TxtGroup>

          <TxtGroup
            id={"observaciones"}
            label={"Observaciones"}
            placeholder={"Ingrese las observaciones"}
            register={register}
            validaciones={validacionesObservaciones}
          ></TxtGroup>
        </div>
        <InputSub text={"Ingresar"} />
      </form>
    </>
  );
}
