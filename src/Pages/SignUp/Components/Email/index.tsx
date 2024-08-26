import useFormContext from "../../../../Context/Form";
import { InfoType } from "../../../../Context/types";
import Styles from "../../../styles.module.scss";

/**
 * Validates user data to ensure the email in current
 *
 * @param info Object that contains user info
 */
export function emailValidate(info: InfoType) {
  /**
   * Email that extracted form provided info object
   */
  const email = info.email;

  /**
   * Position of `@` in email
   */
  const atIndex = email.indexOf("@");

  /**
   * Position of `.` in email
   */
  const dotIndex = email.lastIndexOf(".");

  /** If email is longer that 5 character,
   * and `@` is not first character,
   * and `.` is not last character,
   * and `@` is before `.`,
   * then the email is correct.
   */
  if (email.length > 5)
    if (atIndex > 0)
      if (dotIndex > atIndex + 1)
        if (dotIndex < info.email.length - 1) return true;

  /**
   * Otherwise, the email is not correct.
   */
  return false;
}

/**
 * This component renders a form that sets email in `FormContext`
 *
 * *For using in Sign Up page*
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
    <>
      <div className={Styles.titleBar}>
        <h1 className={Styles.title}>ایمیل ات رو وارد کن</h1>
        <h3 className={Styles.subTitle}>با این ایمیل وارد حسابت میشی.</h3>
      </div>

      <div className={Styles.inputs}>
        <div className={Styles.InputBar}>
          <span className={Styles.name}>ایمیل</span>
          <input
            type="email"
            dir="ltr"
            name="email"
            placeholder="mohammadi@gmail.com"
            value={info.email}
            onChange={(event) =>
              setInfo((prevState: InfoType) => ({
                ...prevState,
                email: event.target.value,
              }))
            }
            className={[
              Styles.input,
              info.email && !emailValidate(info) ? Styles.incorrect : "",
            ].join(" ")}
          />
        </div>
      </div>
    </>
  );
}
