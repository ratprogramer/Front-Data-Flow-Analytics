import "./InputTxt.css";

export function InputTxt({id, type, placeholder, register, validaciones}){
    return(
        <input className="inputTxt-atomo" id={id} type={type} placeholder={placeholder} {...register(id,validaciones)}></input>
    )
}