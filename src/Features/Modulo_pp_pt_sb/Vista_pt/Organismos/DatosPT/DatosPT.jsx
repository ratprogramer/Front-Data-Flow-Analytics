import './DatosPT.css';
import { useLocation } from 'react-router-dom';

export function DatosPT() {
    const location = useLocation();
    const { nombreMuestra, lote } = location.state || {};
    return (
        <div className='container-box-datos-pt'>
            <div className="datosPT-organismo-container">
                <h1 className='datos-pt-txt'>{nombreMuestra}</h1>
                <h1 className='datos-pt-txt'>Lote: {lote}</h1>
            </div>
        </div>
    )
}