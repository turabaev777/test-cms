import React, { useState } from "react";
import "./Modals.scss";
import { UserDTO } from "../../types/users";
import { deleteUser } from "../../services/users";
import { useToastContext } from "../../contexts/ToastModal";
import EditModal from "./EditModal";

type Props = {
  userData: UserDTO;
  updateUserList: () => void;
};

const ActionsModal: React.FC<Props> = ({ userData, updateUserList }) => {
  const { openToast } = useToastContext();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleUserDelete = (id: string) => {
    deleteUser(id).then(() => {
      updateUserList();
      openToast();
    });
  };

  return (
    <div className="modal_wrapper">
      <p
        onClick={() => {
          setShowEditModal(!showEditModal);
        }}
      >
        Редактировать
      </p>
      <p>Отправить код повторно</p>
      <p
        onClick={() => {
          handleUserDelete(userData.id);
        }}
      >
        Удалить
      </p>

      {showEditModal && (
        <EditModal
          close={setShowEditModal}
          updateUserList={updateUserList}
          user={userData}
        />
      )}
    </div>
  );
};

export default ActionsModal;
