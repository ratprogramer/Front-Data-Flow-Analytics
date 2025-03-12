import "./InputSub.css";
export function InputSub({text, variant}){
    return(
        <input className="inputSub-atomo" type="submit" value={text} variant={variant}/>
    )
}