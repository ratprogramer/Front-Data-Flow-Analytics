import "./CardPP_molecula.css";

export function CardPP_molecula({nombreMuestra = "Nombre de la muestra", lote = "1234", fechaAnalisis = "01/01/2021", responsableAnalisis = "Juan Perez"}){
    return(
        <>
            <div className="card-pp-molecula-container">
                <div className="data-pp-molecula">
                    <h1>{nombreMuestra}</h1>
                    <p>Lote: {lote}</p>
                    <p>Fecha de analisis: {fechaAnalisis}</p>   
                    <p>Responsable de analisis: {responsableAnalisis}</p>    
                </div>
                <div className="card-pp-estado">
                    <img className="estado-img-pp" src="src\imgs\estado1.png" alt="" />
                </div>
            </div>
        </>
    )
}