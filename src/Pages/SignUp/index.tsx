import GlobalStyles from "../../global.module.scss";
import Styles from "./styles.module.scss";
import Banner from "../../Components/Banner";
import Name, { nameValidate } from "./Components/Name";
import { useState } from "react";
import { StepType } from "./types";

/**
 * Sing Up page
 *
 * this page renders a multi step sign up form, validates
 * informations, inserts them in `FormContext` and then uploads them
 * to server
 *
 * @returns {JSX.Element}
 */
export default function SignUp(): JSX.Element {
  /**
   * An array contains list of sign up steps
   */
  const steps: Array<StepType> = [
    {
      element: <Name />,
      validate: nameValidate,
      title: "مشخصات فردی",
      subTitle: "گام اول",
    },
    {
      element: <Name />,
      validate: nameValidate,
      title: "ایمیل",
      subTitle: "گام دوم",
    },
  ];

  /**
   * stepNumber state and setStepNumber method, that defines
   * which step should be showed
   */
  const [stepNumber, setStepNumber] = useState<number>(0);

  return (
    <div className={Styles.box}>
      <Banner active={stepNumber} steps={steps} />

      <div className={Styles.container}>
        {/**
         * Renders sign up steps based on `stepNumber` state
         */}
        {steps[stepNumber].element}

        <div className={Styles.buttonBar}>
          <button
            className={[
              GlobalStyles.secondary,
              stepNumber === 0 ? GlobalStyles.disabled : "",
            ].join(" ")}
            onClick={() =>
              stepNumber > 0 ? setStepNumber((prevState) => prevState - 1) : ""
            }
          >
            قبلی
          </button>

          <button
            className={
              !steps[stepNumber].validate() ? GlobalStyles.disabled : ""
            }
            onClick={() =>
              stepNumber < steps.length - 1
                ? setStepNumber((prevState) => prevState + 1)
                : ""
            }
          >
            بعدی
          </button>
        </div>
      </div>
    </div>
  );
}
