import "./InputDate.css";

export function InputDate({id, type, placeholdear, register, validaciones}){
    const input = document.getElementById("fecha");
    const placeholder = document.getElementById("placeholder");

    function hidePlaceholder() {
        placeholder.style.display = "none";
    }

    function showPlaceholderIfEmpty() {
        if (!input.value) {
            placeholder.style.display = "block";
        }
    }

    return(
<div style="position: relative; display: inline-block;">
    <label for="fecha" id="placeholder" style="
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        color: #fff;
        font-size: 0.9em;
        pointer-events: none;
        transition: 0.2s ease-in-out;
    ">Selecciona la fecha de análisis</label>
    <input 
        type="date" 
        id="fecha" 
        style="
            padding: 10px;
            font-size: 1em;
            border: none;
            border-radius: 4px;
            width: 150px;
            background-color: #50C0E9;
            color: black;
        "
        onfocus="hidePlaceholder()" 
        onblur="showPlaceholderIfEmpty()" 
    />
</div>

    )
}