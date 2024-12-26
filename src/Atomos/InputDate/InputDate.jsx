import "./InputDate.css";

export function InputDate({id, type, register, validaciones}){

    return(
        <input id={id} type={type} {...register(id,validaciones)}></input>
    )
}