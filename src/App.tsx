import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import { useState } from "react";
import { FormContext } from "./Context/Form";
import { InfoType } from "./Context/types";

function App() {
  /**
   * Declaring info state for maintaining user data
   */
  const [info, setInfo] = useState<InfoType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <FormContext.Provider value={{ info, setInfo }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </FormContext.Provider>
  );
}

export default App;
