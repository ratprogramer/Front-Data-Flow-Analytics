import "./UserCard.css";


export const UserCard = ({usuarios}) => {

    return (
        <div className="users-content">
            <h1>Usuarios</h1>
            <ul className="users-list">
                {usuarios.map(({ id, nombre, rol, dni, email }) => (
                    <li className="user-item" key={id}>
                    <div className="user-info">
                    <h3>{nombre}</h3>
                    <p className="user-role">{email}</p>
                    <p className="user-dni">{dni}</p>
                    </div>
                </li>
                ))}
            </ul>
        </div>
  );
}