import { useLocation } from 'react-router-dom';
import './DatosPT.css';

export function DatosPT() {
    const location = useLocation();
    const { nombreMuestra, lote } = location.state || {};
    return (
        <div className='container-box-datos-pt'>
            <div className="datosPT-organismo-container">
                <h1 className='datos-pt-txt'>{nombreMuestra}</h1>
                <p>Lote: {lote}</p>
            </div>
        </div>
    )
}