import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import {
  selectCurrentLog,
  selectModalIsOpen,
} from "../../redux/logs/selectors";
import EditLogForm from "../EditLogForm/EditLogForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
ReactModal.setAppElement("#root");

export default function Modal() {
  const modalIsOpen = useSelector(selectModalIsOpen);
  const currentLog = useSelector(selectCurrentLog);
  function closeModal() {}
  return (
    <div>
      {" "}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {currentLog && <EditLogForm />}
      </ReactModal>
    </div>
  );
}
