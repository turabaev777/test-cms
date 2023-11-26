import React, { useState, useEffect, useRef } from "react";
import "./Modals.scss";
import { UserPermissions } from "../../types/users";

type Props = {
  permissions?: string[];
  setPermissions: (permissions: string[]) => void;
  close: (showPermissions: boolean) => void;
};

const PermissionsModal: React.FC<Props> = ({
  permissions,
  setPermissions,
  close,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [isChecked, setIsChecked] = useState({
    all: permissions?.length === Object.values(UserPermissions).length,
    admin: permissions?.includes(UserPermissions.admin) || false,
    moderator: permissions?.includes(UserPermissions.moderator) || false,
    blog: permissions?.includes(UserPermissions.blog) || false,
    techSupport: permissions?.includes(UserPermissions.techSupport) || false,
    customerRequests:
      permissions?.includes(UserPermissions.customerRequests) || false,
    analytics: permissions?.includes(UserPermissions.analytics) || false,
    stocks: permissions?.includes(UserPermissions.stocks) || false,
  });

  const handleCheckboxChange = (checkbox: keyof typeof isChecked | "all") => {
    setIsChecked((prevState) => {
      if (checkbox === "all") {
        const allChecked = !prevState.all;
        const updatedState: Record<keyof typeof isChecked, boolean> = {
          all: allChecked,
          admin: allChecked,
          moderator: allChecked,
          blog: allChecked,
          techSupport: allChecked,
          customerRequests: allChecked,
          analytics: allChecked,
          stocks: allChecked,
        };

        return updatedState;
      } else {
        return {
          ...prevState,
          [checkbox]: !prevState[checkbox],
          all: false,
        };
      }
    });
  };

  useEffect(() => {
    const selectedPermissions = Object.keys(isChecked)
      .filter(
        (key) => key !== "all" && isChecked[key as keyof typeof isChecked],
      )
      .map((key) => UserPermissions[key as keyof typeof UserPermissions]);

    setPermissions(selectedPermissions);
  }, [isChecked, setPermissions]);

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
    <div className="modal_permissions_wrapper" ref={modalRef}>
      <label>
        <input
          type="checkbox"
          checked={isChecked.all}
          onChange={() => handleCheckboxChange("all")}
        />
        Все
      </label>
      {Object.entries(UserPermissions).map(([key, value]) => (
        <label key={key}>
          <input
            type="checkbox"
            checked={isChecked[key as keyof typeof isChecked]}
            onChange={() => handleCheckboxChange(key as keyof typeof isChecked)}
          />
          {value}
        </label>
      ))}
    </div>
  );
};

export default PermissionsModal;
