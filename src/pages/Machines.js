import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Button,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const MachineDashboard = () => {
  const [machines, setMachines] = useState({});
  const [expanded, setExpanded] = useState({});
  const [selectedKpis, setSelectedKpis] = useState({});
  const [visibleKpis, setVisibleKpis] = useState({});
  const machineRefs = useRef({});
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

      const kpiDetails = responseData.data.kpis || [];
      const computedKpis = [];

      for (const kpi of kpiDetails) {
        const kpiValue = await computeKpi(machineId, kpi._id);
        computedKpis.push({
          name: kpi.name,
          value: kpiValue
        });
      }

      setSelectedKpis((prev) => ({
        ...prev,
        [machineId]: computedKpis,
      }));
      toggleKpisVisibility(machineId);
    } catch (error) {
      console.error("Error fetching KPIs:", error);
    }
  };

  const computeKpi = async (machineId, kpiId) => {
    try {
      const token = localStorage.getItem("token");
      const startDate = "2024-10-01 00:00:00";
      const endDate = "2024-10-30 23:59:59";
      const granularityOp = "avg";

      const response = await fetch(
        `${baseUrl}/kpi/machine/${machineId}/compute?kpi_id=${kpiId}&start_date=${encodeURIComponent(
          startDate
        )}&end_date=${encodeURIComponent(endDate)}&granularity_op=${granularityOp}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      console.log("KPI Computation Response:", responseData);

      if (response.ok && responseData.data) {
        return responseData.data[0]?.value;
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      console.error("Error computing KPI:", error);
      return null;
    }
  };

  const toggleExpand = (category) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const toggleKpisVisibility = (machineId) => {
    setVisibleKpis((prev) => ({
      ...prev,
      [machineId]: !prev[machineId],
    }));
  };

  return (
    <div>
      <Box sx={{ padding: 2, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
        <h1>Machine Dashboard</h1>
        <Grid container spacing={2}>
          {Object.entries(machines).map(([category, categoryMachines]) => (
            <Grid item xs={12} key={category}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
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
                            ref={(el) => (machineRefs.current[machine._id] = el)}
                            style={{ marginBottom: "1rem" }}
                          >
                            <Typography variant="body1">
                              {machine.name}
                              <Button
                                variant="contained"
                                size="small"
                                sx={{ ml: 2 }}
                                onClick={() => fetchKpis(machine._id)}
                              >
                                {visibleKpis[machine._id] ? "Hide KPIs" : "Select"}
                              </Button>
                            </Typography>
                            {visibleKpis[machine._id] &&
                              selectedKpis[machine._id] &&
                              selectedKpis[machine._id].length > 0 && (
                                <Box
                                  sx={{
                                    maxHeight: 200,
                                    overflowY: "auto",
                                    mt: 2,
                                    pl: 4,
                                  }}
                                >
                                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                    KPIs:
                                  </Typography>
                                  <ul>
                                    {selectedKpis[machine._id].map((kpi, index) => (
                                      <li key={index}>
                                        <Typography variant="body2">
                                          {kpi.name}: {kpi.value} {kpi.unit}
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
