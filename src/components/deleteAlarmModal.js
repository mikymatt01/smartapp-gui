import React, { useState, useContext } from 'react'
import Modal from '@mui/material/Modal';
import { TranslationContext } from "../hooks/translation";

const DeleteAlarmModal = ({
    isOpen,
    setIsOpen,
    onDeleteAlarm
}) => {
    const [loadingAlarm, setLoadingAlarm] = useState(false)

    const { translate } = useContext(TranslationContext);
    
    const handleSubmit = async () => {
        setLoadingAlarm(true);
        try {
            await onDeleteAlarm()
        } catch (err) {
        } finally {
            setLoadingAlarm(false);
        }
        closeModal(); // Close the modal after submission
    };

    const handleClose = () => setIsOpen(false);
    const closeModal = () => setIsOpen(false);
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div style={styles.modalOverlay}>
                <div style={styles.modalContent}>
                    <h3>{translate.Dashboard.delete_alarm}</h3>
                    <p>{translate.Dashboard.delete_alarm_description}</p>
                    <div style={styles.buttonContainer}>
                        <button onClick={handleSubmit} style={styles.button}>{loadingAlarm ? 'loading' : translate.labels.delete}</button>
                        <button onClick={closeModal} style={styles.button}>{translate.labels.cancel}</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  inputWrapper: {
     marginBottom: 20, 
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default DeleteAlarmModal