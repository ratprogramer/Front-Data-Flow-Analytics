import { useLocation } from 'react-router-dom';
import './DatosPT.css';
import { useThemeContext } from '../../../../../context/ThemeContext';

export function DatosPT() {
    const { contextTheme } = useThemeContext();
    const location = useLocation();
    const { nombreMuestra, lote } = location.state || {};
    return (
        <div className='container-box-datos-pt' id={contextTheme}>
            <div className="datosPT-organismo-container" id={contextTheme}>
                <h1 className='datos-pt-txt'>{nombreMuestra}</h1>
                <p>Lote: {lote}</p>
            </div>
        </div>
    )
}