import "./Label.css"
export function Label({htmlFor, text}){
    return(
        <label className="label-atomo" htmlFor={htmlFor}><b>{text}</b></label>
    )
}