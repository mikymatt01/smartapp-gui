import React, { createContext, useEffect, useState } from "react";
import { fetchKPIsSDK, fetchUserSDK } from "../sdk";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {

  const [KPIs, setCurrentKPIs] = useState();
    const setCachedKPIs = (kpiList) => {
        setCurrentKPIs(kpiList);
    };
    
  const [Machines, setCurrentMachines] = useState();
  const setCachedMachines = (machineList) => {
    setCurrentMachines(machineList);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let result = await fetchUserSDK()
        const user = result.data
        result = await fetchKPIsSDK(user.site)
        setCurrentKPIs(result.data)
      } catch (e) {

      }
    }
    getData()
  }, [])

  return (
    <DataContext.Provider value={{ KPIs, setCachedKPIs, Machines, setCachedMachines }}>
      {children}
    </DataContext.Provider>
  );
};