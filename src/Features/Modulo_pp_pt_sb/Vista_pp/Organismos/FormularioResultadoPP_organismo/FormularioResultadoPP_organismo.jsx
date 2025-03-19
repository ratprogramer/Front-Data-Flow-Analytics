import { SelectGroup } from "../../../../../Moleculas/InputGroup/SelectGroup/SelectGroup";
import { controladorResultados } from "../../../../../helpers/controladorResultados";
import { TimeGroup } from "../../../../../Moleculas/InputGroup/TimeGroup/TimeGroup";
import { TxtGroup } from "../../../../../Moleculas/InputGroup/TxtGroup/TxtGroup";
import { InputSub } from "../../../../../Atomos/InputSub/InputSub";
import { usePostFetch } from "../../../../../helpers/usePostFetch";
import { decodeToken } from "../../../../../helpers/decodeToken";

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import "./FormularioResultadoPP_organismo.css";

export function FormularioResultadoPP_organismo (){
    const location = useLocation();
    const { id_pp } = location.state || {};
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
      } = useForm({
        defaultValues: {
          fecha_analisis: new Date().toISOString().split("T")[0], // Valor inicial
        },
      });
      const navigate = useNavigate();
      const [primero, setPrimero] = useState(true);
      
      const [e_coli, setE_coli] = useState("")
      const [coliformes, setColiformes] = useState("")
      const [observaciones, setObservaciones] = useState("")
      const [opcionesCabina, setOpcionesCabina] = useState( [
        { value: "C", placeHolder: "Cumple" },
        { value: "NC", placeHolder: "No cumple" },
      ])
      const [opcionesMedio_cultivo, setOpcionesMedio_cultivo] = useState( [
        { value: "C", placeHolder: "Cumple" },
        { value: "NC", placeHolder: "No cumple" }
      ])

      useEffect(() => {
        const fetchData = async () => {
          try {
            let data = { id_pp: id_pp };
            console.log(data);
            
            const response = await usePostFetch(`/producto/obtenerResultadosId`, data, navigate)
            if(response.success){
              if (response.result[0]) {
                switch(response.result[0].medio_cultivo){
                  case "C":
                    response.result[0].medio_cultivo = [{ value: "C", placeHolder: "Cumple" }];
                    break;
                  case "NC":
                    response.result[0].medio_cultivo = [{ value: "NC", placeHolder: "No cumple" }];
                    break;
                }
                switch(response.result[0].cabina){
                  case "C":
                    response.result[0].cabina = [{value: "C", placeHolder: "Cumple"}];
                    break;
                  case "NC":
                    response.result[0].cabina = [{value: "NC", placeHolder: "No cumple"}];
                    break;
                }
                setPrimero(false);
                setE_coli(response.result[0].e_coli);
                setColiformes(response.result[0].coliformes);
                setObservaciones(response.result[0].observaciones);
                setOpcionesMedio_cultivo(response.result[0].medio_cultivo);
                setOpcionesCabina(response.result[0].cabina);


                setValue("e_coli", response.result[0].e_coli);
                setValue("coliformes", response.result[0].coliformes);
                setValue("observaciones", response.result[0].observaciones);
              }
            }
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          }
        };

        fetchData();
      }, []);

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
        data["id_pp"] = id_pp;
        
        console.log(data);
        
        const objeto = await controladorResultados("id_pp", id_pp, data, navigate);
        
        let response = {};
        if(objeto.tipo == "24h"){
          response = await usePostFetch("/producto/registrar_resultado", objeto.dataFetch, navigate);
        }else{
          response = await usePostFetch("/producto/registrar_resultado_actualizado", objeto.dataFetch, navigate, true, "PATCH");
        }
        
        if (!response.success) {
          Swal.fire("Error", JSON.stringify(response), "error");
        } else {
          Swal.fire("Exito", "El resultado para el producto en proceso, fue registrado con exito", "success");
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
            label={"Fecha de analisis"}
            type={"date"}
            register={register}
            validaciones={validaciones}
            defaultDate={true}
            isDisabled={true}

            dataRequired={'true'}
          />
          { primero ? (
            <>
              <TxtGroup
              id={"e_coli"}
              label={"E. Coli"}
              placeholder={"Ingrese cantidad de E. coli."}
              register={register}
              onChange={validacionesColiformes1}
              validaciones={validaciones}

              variant={'formulario'}
              dataRequired={'true'}
              />

              <TxtGroup
              id={"coliformes"}
              label={"Coliformes totales"}
              placeholder={"Ingrese cantidad de coliformes totales"}
              register={register}
              onChange={validacionesColiformes2}
              validaciones={validaciones}

              variant={'formulario'}
              dataRequired={'true'}
              />
              
              <TxtGroup
              id={"mohos_ley"}
              label={"Mohos y levaduras"}
              placeholder={"Ingrese cantidad de mohos y levaduras"}
              register={register}
              onChange={validacionesMoho}
              isDisabled={true}
              variant={'formulario'}
              dataRequired={'true'}
              />
              
              <TxtGroup
              id={"observaciones"}
              label={"Observaciones"}
              placeholder={"Ingrese las observaciones"}
              register={register}
              validaciones={validacionesObservaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              value={observaciones}

              variant={'formulario'}
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
              <InputSub text={"Ingresar"} variant={'formulario'} />
            </>
          ) : (
            <>
              <TxtGroup
              id={"e_coli"}
              label={"E. Coli"}
              placeholder={"Ingrese cantidad de E. coli."}
              register={register}
              onChange={validacionesColiformes1}
              value={e_coli}

              isDisabled={true}
              variant={'formulario'}
              dataRequired={'true'}
            />
            
            <TxtGroup
              id={"coliformes"}
              label={"Coliformes totales"}
              placeholder={"Ingrese cantidad de coliformes totales"}
              register={register}
              value={coliformes}
              onChange={validacionesColiformes2}

              isDisabled={true}
              variant={'formulario'}
              dataRequired={'true'}
            />

            <TxtGroup
              id={"mohos_ley"}
              label={"Mohos y levaduras"}
              placeholder={"Ingrese cantidad de mohos y levaduras"}
              register={register}
              onChange={validacionesMoho}
              validaciones={validaciones}

              variant={'formulario'}
              dataRequired={'true'}
            />
          
            <TxtGroup
              id={"observaciones"}
              label={"Observaciones"}
              placeholder={"Ingrese las observaciones"}
              register={register}
              onChange={(e) => setObservaciones(e.target.value)}
              validaciones={validacionesObservaciones}
              value={observaciones}

              variant={'formulario'}
            />
            
            <SelectGroup
              id={"cabina"}
              register={register}
              label={"Cabina"}
              opciones={opcionesCabina}
              placeHolder={false}
            />

            <SelectGroup
              id={"medio_cultivo"}
              register={register}
              label={"Medio de cultivo"}
              opciones={opcionesMedio_cultivo}
              placeHolder={false}
            />
            <InputSub text={"Ingresar"} variant={'formulario'}/>
            </>
          )
        }
        </div>
      </form>
    </>
  );
}
