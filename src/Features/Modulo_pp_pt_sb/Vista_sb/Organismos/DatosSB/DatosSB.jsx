import './DatosSB.css';
import { useLocation } from 'react-router-dom';

export function DatosSB() {
    const location = useLocation();
    const { sabor, lote } = location.state || {};
    return (
        <div className='container-box-datos-sb'>
            <div className="datosSB-organismo-container">
                <p>{sabor}</p>
                <p>Lote: {lote}</p>
            </div>
        </div>
    )
}