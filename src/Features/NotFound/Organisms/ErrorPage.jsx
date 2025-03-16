import { Gear } from '../atoms/Gear/Gear';
import { Circuit } from '../atoms/Circuit/Circuit';
import { ErrorText } from '../Molecules/ErrorText/ErrorText';
import { Description } from '../Molecules/Description/Description';
import './ErrorPage.css';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {

  const navigator = useNavigate();
  return (
    <div className="error-page">
      <div className="error-content">
        <Gear position="top" />
        <Gear position="bottom" />
        <Circuit />
        <ErrorText />
        <Description />
        <button className='btn404' onClick={() => navigator('/')}>Volver al inicio</button>
      </div>
    </div>
  );
};
