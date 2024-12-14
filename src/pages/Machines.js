import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Card, CardContent, Typography, Chip, IconButton, Collapse, Button } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const MachineDashboard = () => {
  const [machines, setMachines] = useState({});
  const [expanded, setExpanded] = useState({});
  const [selectedKpis, setSelectedKpis] = useState({}); // Stores KPIs per machine
  const [visibleKpis, setVisibleKpis] = useState({}); // Track visibility of KPIs for each machine
  const machineRefs = useRef({}); // Stores refs for each machine box
  const baseUrl = "https://api-656930476914.europe-west1.run.app/api/v1.0";

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/machine/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();
        console.log("API Response:", responseData);

        const machinesArray = Array.isArray(responseData.data) ? responseData.data : [responseData.data];

        const groupedMachines = machinesArray.reduce((acc, machine) => {
          const category = machine.category || "Uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(machine);
          return acc;
        }, {});

        setMachines(groupedMachines);
      } catch (error) {
        console.error("Error fetching machines:", error);
      }
    };

    fetchMachines();
  }, []);

  const fetchKpis = async (machineId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/machine/${machineId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      console.log("KPIs Response:", responseData);

      // Update KPIs for the specific machine
      setSelectedKpis((prev) => ({
        ...prev,
        [machineId]: responseData.data.kpis || [],
      }));

      // Toggle visibility of the KPIs for the selected machine
      setVisibleKpis((prev) => ({
        ...prev,
        [machineId]: !prev[machineId], // Toggle the visibility
      }));

      // Scroll to the machine's box
      machineRefs.current[machineId]?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      console.error("Error fetching KPIs:", error);
    }
  };

  const toggleExpand = (category) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div>
      <Box sx={{ padding: 2, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
        <h1> Machine Dashboard </h1>
        <Grid container spacing={2}>
          {Object.entries(machines).map(([category, categoryMachines]) => (
            <Grid item xs={12} key={category}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h6">{category}</Typography>
                    <IconButton onClick={() => toggleExpand(category)}>
                      {expanded[category] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Box>
                  <Collapse in={expanded[category]} timeout="auto" unmountOnExit>
                    <Box sx={{ mt: 2 }}>
                      <ul>
                        {categoryMachines.map((machine) => (
                          <li
                            key={machine._id}
                            ref={(el) => (machineRefs.current[machine._id] = el)} // Assign ref to machine box
                          >
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                {machine.name}
                              </Typography>
                              <Button
                                variant="contained"
                                size="small"
                                sx={{ ml: 2, my: 0.2 }}
                                onClick={() => fetchKpis(machine._id)}
                              >
                                {visibleKpis[machine._id] ? "Hide KPIs" : "Select"}
                              </Button>
                            </Box>
                            {visibleKpis[machine._id] && selectedKpis[machine._id] && (
                              <Box sx={{ maxHeight: 200, overflowY: "auto", mt: 2, pl: 4 }}>
                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                  KPIs:
                                </Typography>
                                <ul>
                                  {selectedKpis[machine._id].map((kpi) => (
                                    <li key={kpi._id}>
                                      <Typography variant="body2">
                                        {kpi.name} - {kpi.description} ({kpi.unite_of_measure})
                                      </Typography>
                                    </li>
                                  ))}
                                </ul>
                              </Box>
                            )}
                          </li>
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
