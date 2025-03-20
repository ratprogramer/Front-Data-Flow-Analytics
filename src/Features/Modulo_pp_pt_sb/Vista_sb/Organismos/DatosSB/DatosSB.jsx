import './DatosSB.css';
import { useLocation } from 'react-router-dom';
import { useThemeContext } from '../../../../../context/ThemeContext';

export function DatosSB() {
    const { contextTheme } = useThemeContext();
    const location = useLocation();
    const { sabor, lote } = location.state || {};
    return (
        <div className='container-box-datos-sb' id={contextTheme}>
            <div className="datosSB-organismo-container" id={contextTheme}>
                <p className="ttPp" id={contextTheme}>{sabor}</p>
                <p>Lote: {lote}</p>
            </div>
        </div>
    )
}