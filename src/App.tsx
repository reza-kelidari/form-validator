import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import { useState } from "react";
import { FormContext } from "./Context/Form";

function App() {
  /**
   * Declaring info state for maintaining user data
   */
  const [info, setInfo] = useState({});

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
