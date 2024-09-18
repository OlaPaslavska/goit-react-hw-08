import Modal from "react-modal";

import css from "./ModalWindow.module.css";
import { useDispatch } from "react-redux";
import { apiLogout } from "../../redux/auth/operations";

Modal.setAppElement("#root");
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    height: "25%",
    width: "30%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
};

const ModalWindow = ({ modalIsOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <h3>Are you sure you want to log out?</h3>
      <p>If you log out you will not see your contacts anymore</p>
      <div className={css.btnWrapper}>
        <button
          type="button"
          onClick={() => {
            closeModal();
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            dispatch(apiLogout());
            closeModal();
          }}
          className={css.logOutBtn}
        >
          Log Out
        </button>
      </div>
    </Modal>
  );
};

export default ModalWindow;
