import { useEffect, useState } from 'react';
import './Circuit.css';

export const Circuit = () => {
  const [circuits, setCircuits] = useState([]);

  useEffect(() => {
    const generateCircuits = () => {
      const newCircuits = [];
      for (let i = 0; i < 10; i++) {
        newCircuits.push({
          id: i,
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          width: Math.random() * 100 + 50 + 'px',
          rotation: Math.random() * 360 + 'deg'
        });
      }
      setCircuits(newCircuits);
    };

    generateCircuits();
  }, []);

  return (
    <div className="circuit-container">
      {circuits.map((circuit) => (
        <div key={circuit.id} className="circuit-group" style={{
          top: circuit.top,
          left: circuit.left,
          transform: `rotate(${circuit.rotation})`
        }}>
          <div className="circuit-line" style={{ width: circuit.width }}></div>
          <div className="circuit-dot"></div>
        </div>
      ))}
    </div>
  );
};
