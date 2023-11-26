import React, { FormEvent, useEffect, useState } from "react";
import "./UserList.scss";
import UserItem from "../userItem/UserItem";
import InviteModal from "../modals/InviteModal";
import { getUsers } from "../../services/users";
import { UserDTO } from "../../types/users";

type Props = {
  isMobile?: boolean;
  setIsMobile?: (isMobile: boolean) => void;
};

const UserList: React.FC<Props> = ({ isMobile, setIsMobile }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [users, setUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  const updateUserList = () => {
    getUsers().then((res) => {
      setUsers(res);
    });
  };

  const handleSearchUsers = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchValue = e.currentTarget.email?.value?.trim().toLowerCase();

    if (!isSearchVisible) {
      setIsSearchVisible(true);
    } else {
      if (searchValue) {
        const filteredUsers = users.filter((user) =>
          user.email.toLowerCase().includes(searchValue),
        );
        setUsers(filteredUsers);
      } else {
        updateUserList();
      }
    }
  };

  return (
    <div className="user_list">
      <div className="list_header">
        <div className="list_header_flex">
          <div
            className="mobile_hamburger"
            onClick={() => setIsMobile?.(!isMobile)}
          ></div>
          <p>Команда</p>
        </div>
        <div className="header_actions">
          <form className="header_search" onSubmit={handleSearchUsers}>
            <input
              type="text"
              style={{
                display: isSearchVisible ? "block" : "none",
              }}
              placeholder="Поиск по Email"
              name="email"
            />
            <button type="submit" />
          </form>

          <p onClick={() => setShowInvite(true)}>Добавить пользователя</p>
        </div>
      </div>
      <div className="list_wrapper">
        {users.map((user) => {
          return (
            <UserItem
              user={user}
              key={user.id}
              updateUserList={updateUserList}
            />
          );
        })}
      </div>

      {showInvite && (
        <InviteModal close={setShowInvite} updateUserList={updateUserList} />
      )}
    </div>
  );
};

export default UserList;
