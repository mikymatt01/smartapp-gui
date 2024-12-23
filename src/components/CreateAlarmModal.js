import React, { useState, useContext } from 'react'
import Modal from '@mui/material/Modal';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { TranslationContext } from "../hooks/translation";
import { AuthContext } from "../hooks/user";
import { DataContext } from "../hooks/data";

const CreateAlarmModal = ({
    isOpen,
    setIsOpen,
    onCreateAlarm
}) => {
    const user = useContext(AuthContext); // Gets the context of the translation
    const { KPIs } = useContext(DataContext); // Gets the context of the translation
    const [loadingAlarm, setLoadingAlarm] = useState(false)
    const [inputValue, setInputValue] = useState({
        kpi_id: "",
        site_id: user.site,
        machine_id: null,
        threshold: 0,
        threshold_type: "UPPER_BOUND"
    });
    const { translate } = useContext(TranslationContext); // Gets the context of the translation
    const handleThresholdChange = (e) => {
        setInputValue((obj) => ({ ...obj, threshold: e.target.value }));
    };
    const handleThresholdTypeChange = (e) => {
        setInputValue((obj) => ({ ...obj, threshold_type: e.target.value }));
    };
    const handleMachineChange = (e) => {
        setInputValue((obj) => ({ ...obj, machine_id: e.target.value }));
    };
    const handleKPIChange = (e) => {
        setInputValue((obj) => ({ ...obj, kpi_id: e.target.value }));
    };
    
    const handleSubmit = async () => {
        setLoadingAlarm(true);
        try {
            await onCreateAlarm({ ...inputValue, threshold: parseFloat(inputValue.threshold) })
        } catch (err) {
        } finally {
            setLoadingAlarm(false);
        }
        closeModal(); // Close the modal after submission
    };

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const closeModal = () => setIsOpen(false);
    console.log(inputValue)
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div style={styles.modalOverlay}>
                <div style={styles.modalContent}>
                    <h3>{translate.Dashboard.alarm_title}</h3>
                    <TextField
                        label="Threshold"
                        name="threshold"
                        type="text"
                        fullWidth
                        value={inputValue.threshold}
                        onChange={handleThresholdChange}
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="threshold-type-label">Threshold Type</InputLabel>
                            <Select
                                labelId="threshold-type-label"
                                name="threshold"
                                value={inputValue.threshold_type}
                                onChange={handleThresholdTypeChange}
                            >
                        <MenuItem value="UPPER_BOUND">Upper bound</MenuItem>
                        <MenuItem value="LOWER_BOUND">Lower bound</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="kpi-label">KPIs</InputLabel>
                            <Select
                                labelId="kpi-label"
                                name="kpi"
                                value={inputValue.kpi_id}
                                onChange={handleKPIChange}
                        >
                        {KPIs && KPIs.map((KPI) => (
                            <MenuItem value={KPI._id}>{KPI.name}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <div style={styles.buttonContainer}>
                        <button onClick={handleSubmit} style={styles.button}>{loadingAlarm ? 'loading' :translate.labels.add}</button>
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

export default CreateAlarmModal