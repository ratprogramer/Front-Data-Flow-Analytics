import { Bell } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import { CardPP_molecula } from '../Modulo_pp_pt_sb/Vista_pp/Moleculas/CardPP_molecula/CardPP_molecula';
import './Notification.css';

export const Notification = ({ notif = [] }) => {
  const [notifications, setNotifications] = useState(notif);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
          <CardPP_molecula 
            key={notification.id}   
            navRoute={"/ingreso_resultado_producto_p"}
            nombreMuestra={/*producto.nombre_pp  */ 'Nombre muestra'}  
            lote={/*producto.lote*/  '0000'}
            fechaAnalisis={/*formatFecha(producto.fecha_analisis )*/ '0000-00-00'}
            fecha24={/*producto.fecha_24h*/ '0000-00-00'}
            className="listitem"
            responsableAnalisis={/*producto.responsable_analisis*/ '0'}

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