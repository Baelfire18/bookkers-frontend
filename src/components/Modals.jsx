import Modal, {
    useModalState,
    modalAnimation
  } from "react-simple-modal-provider";
import "../styles/modal.scss";

export default ({ children }) => {
  const [isOpen, setOpen] = useModalState();

  return (
    <Modal
    id={"Modal4"}
    consumer={children}
    isOpen={isOpen}
    setOpen={setOpen}
    duration={250}
    animation={modalAnimation.slideUp}
    allowClickOutside={false}
    draggable={true}
    >
    <div className="modal-body">
      😘
      <button onClick={() => setOpen(false)}>Close</button>
    </div>
    </Modal>
  );
};