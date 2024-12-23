import React, { createContext, useState } from "react";

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

  return (
    <DataContext.Provider value={{ KPIs, setCachedKPIs, Machines, setCachedMachines }}>
      {children}
    </DataContext.Provider>
  );
};