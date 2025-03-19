import { Bell } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useGetFetch } from '../../helpers/useGetFetch';
import { useNavigate } from 'react-router-dom';
import { CardNotificacion } from './CardNotificacion';
import './Notification.css';

export const Notification = ({ notif = [] }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();


  useEffect( () => {
    const fetchData = async () => {
        try {
            const response = await useGetFetch("/producto/notificaciones", navigate);
            setNotifications(response.data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };
    fetchData();
  }, [])


  const handleRemoveNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <input
        hidden
        className="sr-only"
        id="state-dropdown"
        type="checkbox"
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />
      <label
        htmlFor="state-dropdown"
        className="trigger"
        aria-label="Notificaciones"
      >
        <Bell size={24} className="bell-icon" />
        {notifications.length > 0 && (
          <span className="notification-indicator"></span>
        )}
      </label>

      <ul className={`list webkit-scrollbar ${isOpen ? 'visible' : ''}`} role="list" dir="auto">
        {notifications.map((notification) => (
          <CardNotificacion
            key={notification.id}   
            navRoute={notification.ruta}
            nombreMuestra={notification.nombre}  
            lote={notification.lote}
            fechaAnalisis={notification.fecha_analisis}
            fecha24={notification.f24}
            tipo={notification.tipo}
            className="listitem"
            responsableAnalisis={notification.analista}
            id={parseInt(notification.id)}
            role="listitem"
            handleRemoveNotification={handleRemoveNotification}
          />
        ))}
        
        {notifications.length === 0 && (
          <li className="listitem" role="listitem">
            <article className="article">No hay nuevas notificaciones</article>
          </li>
        )}
      </ul>
    </div>
  )
}