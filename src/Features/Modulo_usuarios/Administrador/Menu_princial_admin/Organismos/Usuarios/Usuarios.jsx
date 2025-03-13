import "./Usuarios.css";

const usersList = [
  { id: 1, dni: "111111", nombre: "María López", rol: "Analista", contraseña: "111111" },
  { id: 2, dni: "222222", nombre: "Juan Pérez", rol: "Analista", contraseña: "222222" },
  { id: 3, dni: "333333", nombre: "Ana García", rol: "Analista", contraseña: "333333" },
  { id: 4, dni: "444444", nombre: "Carlos Rodríguez", rol: "Analista", contraseña: "444444" },
  { id: 5, dni: "555555", nombre: "Luis Rodríguez", rol: "Analista", contraseña: "555555" },
  { id: 6, dni: "666666", nombre: "Pedro Rodríguez", rol: "Analista", contraseña: "666666" },
  { id: 7, dni: "777777", nombre: "Ana Rodríguez", rol: "Analista", contraseña: "777777" },
  { id: 8, dni: "888888", nombre: "Carlos Rodríguez", rol: "Analista", contraseña: "888888" },
  { id: 9, dni: "999999", nombre: "Luis Rodríguez", rol: "Analista", contraseña: "999999" },
  { id: 10, dni: "101010", nombre: "Pedro Rodríguez", rol: "Analista", contraseña: "101010" },
];

export const Usuarios = () => {
  return (
    <div className="users-content">
      <h1>Usuarios</h1>
      <ul className="users-list">
        {usersList.map(({ id, nombre, rol, dni }) => (
          <li className="user-item" key={id}>
            <div className="user-info">
              <h3>{nombre}</h3>
              <p className="user-role">{rol}</p>
              <p className="user-dni">{dni}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
