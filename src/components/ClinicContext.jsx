// src/context/ClinicContext.js
import React, { createContext, useState } from 'react';

export const ClinicContext = createContext();

export const ClinicProvider = ({ children }) => {
  const [clinicName, setClinicName] = useState("Dok Hayop Dog Spa & Animal Clinic");

  return (
    <ClinicContext.Provider value={{ clinicName, setClinicName }}>
      {children}
    </ClinicContext.Provider>
  );
};
