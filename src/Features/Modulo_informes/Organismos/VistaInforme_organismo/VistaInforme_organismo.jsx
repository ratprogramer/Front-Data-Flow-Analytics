import { useEffect } from "react";
import "./VistaInforme_organismo.css"
import { useLocation } from "react-router-dom"

export function VistaInforme_organismo(){
    const location = useLocation();
    useEffect(() => {
        const selectedCards = location.state?.selectedCards || [];
        console.log(selectedCards);
    }, [])
    return(
        <div>
            <h1>ola</h1>
        </div>
    )
}