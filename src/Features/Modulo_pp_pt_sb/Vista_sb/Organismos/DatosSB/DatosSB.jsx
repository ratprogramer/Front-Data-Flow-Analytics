import './DatosSB.css';
import { useLocation } from 'react-router-dom';

export function DatosSB() {
    const location = useLocation();
    const { sabor, lote } = location.state || {};
    return (
        <div className='container-box-datos-pp'>
            <div className="datosPP-organismo-container">
                <h1 className='datos-pp-txt'>{sabor}</h1>
                <h1 className='datos-pp-txt'>Lote: {lote}</h1>
            </div>
        </div>
    )
}