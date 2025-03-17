import { set, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
    watch,
  } = useForm({
    defaultValues: { fecha_analisis: new Date().toISOString().split("T")[0] },
  });
  const navigate = useNavigate();
  const [isAlternativo, setIsAlternativo] = useState(false);

  const [isBsemi, setIsBsemi] = useState(false);
  const [isBpas, setIsBpas] = useState(false);
  const [tanque, setTanque] = useState("");
  const [posLote, setPos] = useState(undefined);
  const [lote, setLote] = useState(false);

  const creadorLote = () => {
    let lotecito = "";

    if (isBsemi) {
      lotecito = "BsFa";
    } else if (isBpas) {
      lotecito = "BpPs";
    } else if (isAlternativo) {
      lotecito = "CbAl"; // Caso de tanque alternativo
    } else if (tanque) {
      lotecito = "Cb" + tanque; // Caso de tanque normal
    }

    setLote(lotecito);
  };

  useEffect(() => {
    creadorLote();
  }, [tanque, isBsemi, isBpas, isAlternativo]);

  const handleChange = (e) => {
    let inputVal = e.target.value;
    if (inputVal.length > 5) {
      inputVal = inputVal.slice(0, 5);
    }

    setPos(inputVal);
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
    { value: "Fabricación", placeHolder: "Fabricación" },
  ];

  const tanqueBebidaPast = [
    { value: "Pasteurizador", placeHolder: "Pasteurizador" },
  ];

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

  const onSubmit = async (data) => {
    if (data["nombre_pp"] == "") {
      Swal.fire("Error", "Los campos con * son obligatorios", "error");
      return;
    }
    if (data["punto_muestra"] == "") {
      isBpas
        ? (data["punto_muestra"] = "Pasteurizador")
        : isBsemi
        ? (data["punto_muestra"] = "Fabricación")
        : (data["punto_muestra"] = "");
    }
    if (data["punto_muestra"] == "") {
      Swal.fire("Error", "Los campos con * son obligatorios", "error");
      return;
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
    const response = await usePostFetch("/producto/registrar_pp", data, navigate);

    if (!response.success) {
      Swal.fire("Error", JSON.stringify(response.message), "error");
    } else {
      Swal.fire("Exito", "Producto en proceso registrado con exito", "success");
      navigate("/sub_menu_pp");
    }
  };

  const onError = (errors) => {
    for (const error in errors) {
      Swal.fire("Error", errors[error].message, "error");
    }
  };
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
            label={"Nombre del producto"}
            opciones={opcionesNombreProducto}
            validaciones={validaciones}
            onChange={(e) => {
              setIsBpas(e.target.value === "Bebida pasteurizada");
              setIsBsemi(e.target.value === "Bebida semi elaborada");
            }}
            
            variant={'formulario'}
          />

          <TimeGroup
            id={"fecha_analisis"}
            label={"Fecha de analisis"}
            type={"date"}
            register={register}
            validaciones={validaciones}
            isDisabled={true}
            defaultDate={true}

            variant='formulario'
          />

          <TimeGroup
            id={"fecha_toma_muestra"}
            label={"Fecha de toma de muestra"}
            register={register}
            type={"date"}
            validaciones={validaciones}
            rangeMode={"past"}
            rangeDays={4}
            
            dataRequired='ture'
            variant='formulario'
          />

          <TimeGroup
            id={"hora_toma_muestra"}
            label={"Hora de toma de muestra"}
            register={register}
            type={"time"}
            validaciones={validaciones}

            dataRequired='ture'
            variant='formulario'
          />

          <SelectGroup
            dataRequired={'true'}
            id={"punto_muestra"}
            register={register}
            label={"Punto de toma de muestra"}
            opciones={
              isBpas
                ? tanqueBebidaPast
                : isBsemi
                ? tanqueBebidaSemi
                : opcionesPuntoToma
            }
            validaciones={validaciones}
            placeHolder={isBpas || isBsemi ? false : true}
            onChange={(e) => {
              setIsAlternativo(e.target.value === "Alternativo");
              if (e.target.value.startsWith("Tanque ")) {
                setTanque("T" + e.target.value.split(" ")[1]);
                creadorLote();
              }
            }}

            variant='formulario'
          />

          {isAlternativo && (
            <TxtGroup
              id={"punto_alterno"}
              label={"Punto de toma alternativo"}
              placeholder={"Ingrese el punto alternativo"}
              register={register}

              dataRequired={'true'}
              variant='formulario'
            />
          )}
          {
            // <p>{lote}</p>
          }
          <TxtGroup
            id={"lote"}
            label={"Lote"}
            placeholder={"Ingrese el lote"}
            register={register}
            type={"number"}
            validaciones={validacionesLote}
            onChange={(e) => handleChange(e)}
            value={posLote}

            variant="formulario"
            dataRequired="true"
          />

          <TxtGroup
            id={"observaciones"}
            label={"Observaciones"}
            placeholder={"Ingrese las observaciones"}
            register={register}
            validaciones={validacionesObservaciones}

            variant='formulario'
          />
          <InputSub text={"Ingresar"} variant={'formulario'} />
        </div>
      </form>
    </>
  );
}
