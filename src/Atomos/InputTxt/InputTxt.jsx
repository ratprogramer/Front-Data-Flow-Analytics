export function InputTxt({id, type, placeholder, register, validaciones}){
    return(
        <input id={id} type={type} placeholder={placeholder} {...register(id,validaciones)}></input>
    )
}