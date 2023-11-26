import React, { FormEvent, useState } from "react";
import PermissionsModal from "../modals/PermissionsModal";
import { UserDTO } from "../../types/users";

type Props = {
  onSubmit: (permissions: string[], e: FormEvent<HTMLFormElement>) => void;
  close: (close: boolean) => void;
  user?: UserDTO;
};

const UserForm: React.FC<Props> = ({ onSubmit, close, user }) => {
  const [showPermissions, setShowPermissions] = useState(false);
  const [permissions, setPermissions] = useState<string[]>(
    user?.permissions || [],
  );

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(permissions, e);
  };

  return (
    <>
      <p>{user ? "Изменить данные" : "Отправить приглашение"}</p>
      <div className="modal_close" onClick={() => close(false)}></div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          defaultValue={user?.email}
        />
        {user && (
          <input
            type="text"
            placeholder="Name"
            name="firstName"
            defaultValue={user?.name}
          />
        )}
        {user && (
          <input
            type="text"
            placeholder="Image"
            name="image"
            defaultValue={user?.image}
          />
        )}
        <p onClick={() => setShowPermissions(!showPermissions)}>
          {permissions.length > 0
            ? permissions.map((permission, index) => (
                <span key={permission}>
                  {index > 0 && ", "}
                  {permission}
                </span>
              ))
            : "Выберите права доступа"}
        </p>

        {showPermissions && (
          <PermissionsModal
            permissions={permissions}
            setPermissions={setPermissions}
            close={setShowPermissions}
          />
        )}
        <button type="submit">
          {user ? "Изменить данные" : "Отправить приглашение"}
        </button>
      </form>
    </>
  );
};

export default UserForm;
