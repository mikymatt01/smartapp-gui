import React, { useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Chip, IconButton, Collapse } from "@mui/material";
import { ExpandMore, ExpandLess, Settings, Memory, Build, CheckCircle, Error, HourglassEmpty } from "@mui/icons-material";
import { Chatbot } from '../components/Chatbot'


const MachineDashboard = () => {
    const [expanded, setExpanded] = useState({}); // Tracks expanded state for each machine

    const machines = [
        { id: 1, name: "Machine A", status: "Active", icon: <Settings />, subMachines: ["Sub A1", "Sub A2"] },
        { id: 2, name: "Machine B", status: "Inactive", icon: <Memory />, subMachines: ["Sub B1", "Sub B2"] },
        { id: 3, name: "Machine C", status: "Maintenance", icon: <Build />, subMachines: ["Sub C1", "Sub C2"] },
        { id: 4, name: "Machine D", status: "Active", icon: <Settings />, subMachines: ["Sub D1", "Sub D2"] },
        { id: 5, name: "Machine E", status: "Inactive", icon: <Memory />, subMachines: ["Sub E1", "Sub E2"] },
        { id: 6, name: "Machine F", status: "Maintenance", icon: <Build />, subMachines: ["Sub F1", "Sub F2"] },
    ];

    const statusColors = {
        Active: "success",
        Inactive: "error",
        Maintenance: "warning",
    };

    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div>
            <Box sx={{ padding: 2, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
                <Typography variant="h4" gutterBottom align="center">
                    Machine Dashboard
                </Typography>
                <Grid container spacing={2}>
                    {machines.map((machine) => (
                        <Grid item xs={12} sm={6} md={4} key={machine.id}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            {machine.icon}
                                            <Typography variant="h6" sx={{ ml: 1 }}>
                                                {machine.name}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={machine.status}
                                            color={statusColors[machine.status] || "default"}
                                            icon={
                                                machine.status === "Active" ? (
                                                    <CheckCircle />
                                                ) : machine.status === "Inactive" ? (
                                                    <Error />
                                                ) : (
                                                    <HourglassEmpty />
                                                )
                                            }
                                        />
                                        <IconButton onClick={() => toggleExpand(machine.id)}>
                                            {expanded[machine.id] ? <ExpandLess /> : <ExpandMore />}
                                        </IconButton>
                                    </Box>
                                    <Collapse in={expanded[machine.id]} timeout="auto" unmountOnExit>
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="subtitle1">Sub-Machines:</Typography>
                                            <ul>
                                                {machine.subMachines.map((subMachine, index) => (
                                                    <li key={index}>{subMachine}</li>
                                                ))}
                                            </ul>
                                        </Box>
                                    </Collapse>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Chatbot />
        </div>

    );
};

export default MachineDashboard;
