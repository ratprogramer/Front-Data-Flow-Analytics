import "./InputSub.css";
export function InputSub({type, text}){
    return(
        <input className="inputSub-atomo" type={type} value={text}/>
    )
}