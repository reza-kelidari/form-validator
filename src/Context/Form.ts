import { createContext, useContext } from "react";
import { FormContextHookType, FormContextType } from "./types";

/**
 * Maintains user data before sign up
 */
export const FormContext = createContext<FormContextType>({
  info: {},
  setInfo: () => {},
});

/**
 * A custom hook for using `FormContext`
 */
const useFormContext: FormContextHookType = () => useContext(FormContext);

export default useFormContext;
