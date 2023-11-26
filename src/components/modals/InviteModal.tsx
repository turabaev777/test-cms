import React, { FormEvent, useEffect, useRef } from "react";
import "./Modals.scss";
import { createUser } from "../../services/users";
import UserForm from "../userForm/UserForm";

type Props = {
  close: (showInvite: boolean) => void;
  updateUserList: () => void;
};

const InviteModal: React.FC<Props> = ({ close, updateUserList }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCreateUser = (
    permissions: string[],
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const inputEmail = e.currentTarget.email.value;

    createUser({
      email: inputEmail,
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
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
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
      <div className="modal_invite_wrapper" ref={modalRef}>
        <UserForm onSubmit={handleCreateUser} close={() => close(false)} />
      </div>
    </div>
  );
};

export default InviteModal;
