import useFormContext from "../../../../Context/Form";
import { InfoType } from "../../../../Context/types";
import Styles from "../styles.module.scss";

/**
 * Validates user data to unsure the first password is
 * correct
 *
 * @param info Object that contains user info
 */
export function firstPasswordValidate(info: InfoType) {
  return info.password.length >= 8 ? true : false;
}

/**
 * Validates user data to unsure the second password is
 * correct
 *
 * @param info Object that contains user info
 */
export function secondPasswordValidate(info: InfoType) {
  return info.passwordRepeat.length >= 8 &&
    info.passwordRepeat === info.password
    ? true
    : false;
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
    <div className={Styles.container}>
      <div className={Styles.titleBar}>
        <h1 className={Styles.title}>مشخصات ات رو وارد کن</h1>
        <h3 className={Styles.subTitle}>
          این مشخصات رو برای حساب ات استفاده میکنیم.
        </h3>
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
    </div>
  );
}
