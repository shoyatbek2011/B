import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [freelancers, setFreelancers] = useState([]);

  return (
    <DataContext.Provider value={{ jobs, setJobs, freelancers, setFreelancers }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
