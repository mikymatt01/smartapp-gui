import React, { useState, useContext, useEffect } from 'react'
import Modal from '@mui/material/Modal';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormLabel
} from '@mui/material';
import { TranslationContext } from "../hooks/translation";
import { DataContext } from "../hooks/data";
import { fetchKPIsSDK, fetchMachinesBySiteSDK } from '../sdk';
import { SITES } from '../consts';
import { AuthContext } from '../hooks/user';

const UpdateAlarmModal = ({
    data,
    isOpen,
    setIsOpen,
    onUpdateAlarm,
}) => {
    const { KPIs, setCachedKPIs, MachinesBySite, setCachedMachinesBySite } = useContext(DataContext)
    const [loadingAlarm, setLoadingAlarm] = useState(false)
    const [inputValue, setInputValue] = useState(data);
    const { translate } = useContext(TranslationContext)
    const user = useContext(AuthContext)
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
    const handleActiveChange = (e) => {
        setInputValue((obj) => ({ ...obj, enabled: !obj.enabled }));
    };
    useEffect(() => {
        if (inputValue.site_id !== null) {
            fetchKPIsSDK(inputValue.site_id).then((result) => setCachedKPIs(result.data))
            fetchMachinesBySiteSDK(inputValue.site_id).then((result) => setCachedMachinesBySite(result.data))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue.site_id])
    const handleSubmit = async () => {
        setLoadingAlarm(true);
        try {
            await onUpdateAlarm({...inputValue, threshold: parseFloat(inputValue.threshold)})
        } catch (err) {
        } finally {
            setLoadingAlarm(false);
        }
        closeModal()
    };

    const handleClose = () => setIsOpen(false);
    const closeModal = () => setIsOpen(false);
    return inputValue ? (
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
                        <InputLabel id="site-label">Sites</InputLabel>
                            <Select
                                labelId="site-label"
                                name="site"
                                disabled
                                value={inputValue.site_id}
                            >
                            {
                                user.site !== null ?
                                    (<MenuItem value={user.site}>{user.site}</MenuItem>) :
                                    SITES.map((site) => {
                                        console.log(site)
                                        return (
                                            <MenuItem value={site}>{site}</MenuItem>
                                        )
                                    })
                            }
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
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="machine-label">Machines</InputLabel>
                            <Select
                                labelId="machine-label"
                                name="machine"
                                value={inputValue.machine_id}
                                onChange={handleMachineChange}
                        >
                        {MachinesBySite && MachinesBySite.map((machine) => (
                            <MenuItem value={machine._id}>{machine.name}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <FormLabel component="legend">Enabled</FormLabel>
                    <Switch checked={inputValue.enabled} onChange={handleActiveChange} /> 
                    <div style={styles.buttonContainer}>
                        <button onClick={handleSubmit} style={styles.button}>{loadingAlarm ? 'loading' :translate.labels.update}</button>
                        <button onClick={closeModal} style={styles.button}>{translate.labels.cancel}</button>
                    </div>
                </div>
            </div>
        </Modal>
    ) : (<div></div>)
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

export default UpdateAlarmModal