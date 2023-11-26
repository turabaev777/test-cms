import React, { FormEvent, useState, useRef, useEffect } from "react";
import "./Modals.scss";
import { createUser, updateUser } from "../../services/users";
import UserForm from "../userForm/UserForm";
import { UserDTO } from "../../types/users";

type Props = {
  close: (showInvite: boolean) => void;
  updateUserList: () => void;
  user: UserDTO;
};

const EditModal: React.FC<Props> = ({ close, updateUserList, user }) => {
  const editModalRef = useRef<HTMLDivElement>(null);

  const handleUpdateUser = (
    permissions: string[],
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const inputEmail = e.currentTarget.email.value;
    const inputName = e.currentTarget.firstName.value;
    const inputImage = e.currentTarget.image.value;

    updateUser(user.id, {
      email: inputEmail,
      name: inputName,
      image: inputImage,
      permissions,
    })
      .then(() => {
        updateUserList();
        close(false);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editModalRef.current &&
        !editModalRef.current.contains(event.target as Node)
      ) {
        close(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  return (
    <div className="modal_overlay">
      <div className="modal_invite_wrapper" ref={editModalRef}>
        <UserForm
          onSubmit={handleUpdateUser}
          user={user}
          close={() => close(false)}
        />
      </div>
    </div>
  );
};

export default EditModal;
