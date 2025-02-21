import { useForm } from "react-hook-form";
import { TxtGroup } from "../../../../../Moleculas/InputGroup/TxtGroup/TxtGroup";
import { SelectGroup } from "../../../../../Moleculas/InputGroup/SelectGroup/SelectGroup";
import { usePostFetch } from "../../../../../helpers/usePostFetch";
import { TimeGroup } from "../../../../../Moleculas/InputGroup/TimeGroup/TimeGroup";
import { InputSub } from "../../../../../Atomos/InputSub/InputSub";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../../../../helpers/decodeToken";
import { useLocation } from "react-router-dom";
import "./FormularioResultadoPP_organismo.css";

export function FormularioResultadoPP_organismo (){
    const location = useLocation();
    const { id } = location.state || {};
    const {
        register,
        handleSubmit,
        formState: { errors },
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
        console.log(data);
        
        const response = await usePostFetch("/producto/registrar_r", data);
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
        { value: "NC", placeHolder: "No cumple" }
      ];
    
      const validaciones = { required: "los campos con * son obligatorios" };

    return(
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
          ></TimeGroup>

          <TxtGroup
            id={"e_coli"}
            label={"E. Coli *"}
            placeholder={"Ingrese cantidad de E. coli."}
            register={register}
            validaciones={validaciones}
          ></TxtGroup>

        <TxtGroup
            id={"coliformes"}
            label={"Coliformes totales *"}
            placeholder={"Ingrese cantidad de coliformes totales"}
            register={register}
            validaciones={validaciones}
          ></TxtGroup>

        <TxtGroup
            id={"mohos_ley"}
            label={"Mohos y levaduras *"}
            placeholder={"Ingrese cantidad de mohos y levaduras"}
            register={register}
            validaciones={validaciones}
          ></TxtGroup>
        
          <TxtGroup
            id={"observaciones"}
            label={"Observaciones"}
            placeholder={"Ingrese las observaciones"}
            register={register}
          ></TxtGroup>
          
          <SelectGroup
            id={"cabina"}
            register={register}
            label={"Cabina"}
            opciones={opcionesCoNC}
            validaciones={validaciones}
            placeHolder={false}
          ></SelectGroup>

          <SelectGroup
            id={"medio_cultivo"}
            register={register}
            label={"Medio de cultivo"}
            opciones={opcionesCoNC}
            validaciones={validaciones}
            placeHolder={false}
          ></SelectGroup>
        </div>
        <InputSub text={"Ingresar"}></InputSub>
      </form>
    </>
    )
}