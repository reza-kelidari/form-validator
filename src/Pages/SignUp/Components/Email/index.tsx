import useFormContext from "../../../../Context/Form";
import { InfoType } from "../../../../Context/types";
import Styles from "./styles.module.scss";
import { EmailValidateType } from "./types";

/**
 * Validates user data to ensure the email in current
 *
 * @param info Object that contains user info
 */
export const emailValidate: EmailValidateType = (info) => {
  if (info.email.includes("@"))
    if (info.email.includes("."))
      if (info.email.indexOf("@") < info.email.indexOf("."))
        if (info.email.indexOf("@") > 0)
          if (info.email.indexOf(".") < info.email.length - 1) return true;

  return false;
};

/**
 * This component renders a form that sets email in `FormContext`
 *
 * - *For using in Sign Up page*
 *
 * @returns {JSX.Element}
 */
export default function Email(): JSX.Element {
  /**
   * Declaring `info` state and `setInfo` method, for
   * integrating with user data
   */
  const { info, setInfo } = useFormContext();

  return (
    <div className={Styles.container}>
      <div className={Styles.titleBar}>
        <h1 className={Styles.title}>ایمیل ات رو وارد کن</h1>
        <h3 className={Styles.subTitle}>با این ایمیل وارد حسابت میشی </h3>
      </div>

      <div className={Styles.InputBar}>
        <span className={Styles.name}>ایمیل</span>
        <input
          type="email"
          name="email"
          placeholder="mohammadi@gmail.com"
          value={info.email}
          onChange={(event) =>
            setInfo((prevState: InfoType) => ({
              ...prevState,
              email: event.target.value,
            }))
          }
          /**
           * If user inserted anything as last name, and it has
           * less than 3 charecter, it's incorrect
           */
          className={[
            Styles.input,
            info.email && !emailValidate(info) ? Styles.incorrect : "",
          ].join(" ")}
        />
      </div>
    </div>
  );
}
