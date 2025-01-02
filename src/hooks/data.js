import React, { createContext, useEffect, useState } from "react";
import { fetchAlarmsSDK, fetchKPIsSDK, fetchMachinesBySiteSDK, fetchUserSDK } from "../sdk";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

  const [KPIs, setCurrentKPIs] = useState([]);
  const [MachinesBySite, setCurrentMachinesBySite] = useState([]);
  const [alarms, setCurrentAlarms] = useState([]);

  const setCachedKPIs = (kpiList) => {
      setCurrentKPIs(kpiList);
  };
  const setCachedMachinesBySite = (machineList) => {
    setCurrentMachinesBySite(machineList);
  };
  const setCachedAlarms = (alarmsList) => {
    setCurrentAlarms(alarmsList);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let result = await fetchUserSDK()
        const user = result.data
        let KPIsResult = {}
        let MachinesResult = {}
        let AlarmsResult = {}
        if (user.site === null) {
          KPIsResult = { data: [] }
          MachinesResult = { data: [] }
          AlarmsResult = { data: [] }
        }
        else {
          KPIsResult = await fetchKPIsSDK(user.site)
          MachinesResult = await fetchMachinesBySiteSDK(user.site)
          AlarmsResult = await fetchAlarmsSDK()
        }
        setCurrentKPIs(KPIsResult.data)
        setCurrentMachinesBySite(MachinesResult.data)
        setCurrentAlarms(AlarmsResult.data)
      } catch (e) {

      }
    }
    getData()
  }, [])

  return (
    <DataContext.Provider value={{ KPIs, setCachedKPIs, MachinesBySite, setCachedMachinesBySite, alarms, setCachedAlarms }}>
      {children}
    </DataContext.Provider>
  );
};