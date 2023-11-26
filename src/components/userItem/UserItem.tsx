import React, { useState, useRef, useEffect } from "react";
import "./UserItem.scss";
import ActionsModal from "../modals/ActionsModal";
import { UserDTO, UserPermissions } from "../../types/users";

type Props = {
  user: UserDTO;
  updateUserList: () => void;
};

const UserItem: React.FC<Props> = ({ user, updateUserList }) => {
  const [showActions, setShowActions] = useState(false);

  const actionsModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionsModalRef.current &&
        !actionsModalRef.current.contains(event.target as Node)
      ) {
        setShowActions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showActions]);

  return (
    <div className="list_item">
      <div className="user_flex">
        <div
          className="user_image"
          style={{
            background: `url(${user.image}) #EBEBF0 no-repeat center / cover`,
          }}
        ></div>
        <div className="user_information">
          <div className="user_name">
            <p>{user.name}</p>
            {!user.isAuthorized && <span>Не авторизован</span>}
            <span>{user.email}</span>
          </div>
          <div className="user_permissions">
            {user.permissions.includes(UserPermissions.admin) ? (
              <p className="admin">Администратор</p>
            ) : (
              user.permissions.map((permission) => <p>{permission}</p>)
            )}
          </div>
        </div>
      </div>
      <div className="user_actions">
        <img
          src="/images/more_icon.svg"
          alt=""
          onClick={() => setShowActions(!showActions)}
        />
        {showActions && (
          <div ref={actionsModalRef}>
            <ActionsModal updateUserList={updateUserList} userData={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserItem;
