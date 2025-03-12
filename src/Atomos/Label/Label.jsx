import "./Label.css"
export function Label({ htmlFor, text, variant, dataRequired }) {
    return(
        <label 
            className="label-atomo" 
            htmlFor={htmlFor} 
            data-variant={variant} 
            data-required={dataRequired}
        >
            {text}
            {dataRequired && <span className="red-asterisk"> *</span>}
        </label>
    )
}