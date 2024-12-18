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
        <input type="date" id="fecha" />
    )
}