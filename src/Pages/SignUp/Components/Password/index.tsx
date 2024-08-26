import useFormContext from "../../../../Context/Form";
import { InfoType } from "../../../../Context/types";
import Styles from "../../../styles.module.scss";

/**
 * Validates user data to unsure the first password is
 * correct
 *
 * @param info Object that contains user info
 */
export function firstPasswordValidate(info: InfoType) {
  /**
   * Password string from info object
   */
  const password = info.password;

  /**
   * Checks does password has letters
   *
   * If any character being a letter, it's `lower case` is diffrent
   * from `upper case`
   */
  const hasLetter = password
    .split("")
    .some((char) => char.toLowerCase() !== char.toUpperCase());

  /**
   * Checks does password contains any number
   *
   * If any character being a number, parseInt should return something
   * diffrent than NaN
   */
  const hasDigit = password.split("").some((char) => !isNaN(parseInt(char)));

  /**
   * If the password contains letters and numbers, and it's longer
   * than 8 characters, it's correct; otherwise it's not.
   */

  return hasLetter && hasDigit && password.length >= 8;
}

/**
 * Validates user data to unsure the second password is
 * correct
 *
 * @param info Object that contains user info
 */
export function secondPasswordValidate(info: InfoType) {
  /**
   * Main password string from info object
   */
  const password = info.password;

  /**
   * Repeated password string from info object
   */
  const passwordRepeat = info.passwordRepeat;

  if (passwordRepeat)
    if (passwordRepeat.length >= 8)
      if (passwordRepeat === password) return true;

  return false;
}

/**
 * Validates user data to unsure the password is correct
 *
 * @param info Object that contains user info
 */
export function passwordValidate(info: InfoType) {
  return firstPasswordValidate(info) && secondPasswordValidate(info);
}

/**
 * This component renders a form that sets user password in
 * `FormContext`
 *
 * *For using in Sign Up page*
 *
 * @returns {JSX.Element}
 */
export default function Password(): JSX.Element {
  /**
   * Declaring `info` state and `setInfo` method, for
   * integrating with user data
   */
  const { info, setInfo } = useFormContext();

  return (
    <>
      <div className={Styles.titleBar}>
        <h1 className={Styles.title}>یه رمز عبور وارد کن</h1>
        <h3 className={Styles.subTitle}>باید حداقل 8 حرف و عدد باشه.</h3>
      </div>

      <div className={Styles.inputs}>
        <div className={Styles.InputBar}>
          <span className={Styles.name}>رمز عبور</span>
          <input
            type="password"
            name="password"
            dir="ltr"
            value={info.password}
            onChange={(event) =>
              setInfo((prevState: InfoType) => ({
                ...prevState,
                password: event.target.value,
              }))
            }
            className={[
              Styles.input,
              info.password && !firstPasswordValidate(info)
                ? Styles.incorrect
                : "",
            ].join(" ")}
          />
        </div>

        <div className={Styles.InputBar}>
          <span className={Styles.name}>تکرار رمز عبور</span>
          <input
            type="password"
            name="repeatpassword"
            dir="ltr"
            value={info.passwordRepeat}
            onChange={(event) =>
              setInfo((prevState: InfoType) => ({
                ...prevState,
                passwordRepeat: event.target.value,
              }))
            }
            className={[
              Styles.input,
              info.passwordRepeat && !secondPasswordValidate(info)
                ? Styles.incorrect
                : "",
            ].join(" ")}
          />
        </div>
      </div>
    </>
  );
}
