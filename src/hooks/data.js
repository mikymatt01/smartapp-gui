import React, { createContext, useEffect, useState } from "react";
import { fetchKPIsSDK, fetchMachinesBySiteSDK, fetchUserSDK } from "../sdk";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

  const [KPIs, setCurrentKPIs] = useState([]);
    const setCachedKPIs = (kpiList) => {
        setCurrentKPIs(kpiList);
    };
    
  const [MachinesBySite, setCurrentMachinesBySite] = useState([]);
  const setCachedMachinesBySite = (machineList) => {
    setCurrentMachinesBySite(machineList);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let result = await fetchUserSDK()
        const user = result.data
        let KPIsResult = {}
        let MachinesResult = {}
        if (user.site === null) {
          KPIsResult = { data: [] }
          MachinesResult = { data: [] }
        }
        else {
          KPIsResult = await fetchKPIsSDK(user.site)
          MachinesResult = await fetchMachinesBySiteSDK(user.site)
        }
        setCurrentKPIs(KPIsResult.data)
        setCurrentMachinesBySite(MachinesResult.data)
      } catch (e) {

      }
    }
    getData()
  }, [])

  return (
    <DataContext.Provider value={{ KPIs, setCachedKPIs, MachinesBySite, setCachedMachinesBySite }}>
      {children}
    </DataContext.Provider>
  );
};