import React, { useEffect, useRef } from "react";
import "./Modals.scss";
import { useToastContext } from "../../contexts/ToastModal";

type Props = {};

const ToastModal: React.FC<Props> = ({}) => {
  const { closeToast, showToast } = useToastContext();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeToast();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeToast]);

  return showToast ? (
    <div className="modal_overlay">
      <div className="modal_toast_wrapper" ref={modalRef}>
        <p>Пользователь успешно удален!</p>
        <div className="modal_close_btn" onClick={() => closeToast()}>
          Закрыть
        </div>
      </div>
    </div>
  ) : null;
};

export default ToastModal;
