import React, { useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Chip, IconButton, Collapse } from "@mui/material";
import { ExpandMore, ExpandLess, CheckCircle, Error, HourglassEmpty } from "@mui/icons-material";

// This page is only for the FFM
// The machines page shows machines grouped by category

const MachineDashboard = () => {
    const [expanded, setExpanded] = useState({}); // Tracks expanded state for each machine

    const machines = [
        { id: 1, name: "Metal cutting machines", status: "Active", subMachines: ["Mach A1", "Mach A2"] },
        { id: 2, name: "Laser welding machines", status: "Inactive", subMachines: ["Mach B1", "Mach B2"] },
        { id: 3, name: "Assembly machines", status: "Active", subMachines: ["Mach C1", "Sub C2"] },
        { id: 4, name: "Testing machines", status: "Active", subMachines: ["Mach D1", "Mach D2"] },
        { id: 5, name: "Riveting Machine", status: "Inactive",  subMachines: ["Mach E1"] },
        { id: 6, name: "Laser Cutter", status: "Active", subMachines: ["Mach F1"] },
    ];

    const statusColors = {
        Active: "success",
        Inactive: "error",
    };

    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div>
            <Box sx={{ padding: 2, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
            <h1> Machine Dashboard </h1>
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
        </div>

    );
};

export default MachineDashboard;
