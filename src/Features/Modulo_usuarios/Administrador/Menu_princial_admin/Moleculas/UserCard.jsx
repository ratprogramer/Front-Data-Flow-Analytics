import "./UserCard.css";


export const UserCard = ({usuarios}) => {

    return (
        <div className="users-content">

            <ul className="users-list">
                {usuarios.map(({ id, nombre, rol, dni, email }) => (
                    <li className="user-item" key={id}>
                    <div className="user-info">
                    <h3>{nombre}</h3>
                    <p className="user-role"><b>Email:</b> {email}</p>
                    <p className="user-dni"><b>DNI:</b>{dni}</p>
                    </div>
                </li>
                ))}
            </ul>
        </div>
  );
}