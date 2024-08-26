import Styles from "../../../styles.module.scss";
import { InfoType } from "../../../../Context/types";
import useFormContext from "../../../../Context/Form";

/**
 * Validates user data to ensure the first name is longer
 * than 2 characters.
 *
 * @param info Object that contains user info
 */
export function firstNameValidate(info: InfoType): boolean {
  /**
   * Check if user provided first name, and it's longer than 2
   * characters
   */
  return info.firstName ? info.firstName.length > 2 : false;
}

/**
 * Validates user data to ensure the first name is longer
 * than 2 characters.
 *
 * @param info Object that contains user info
 */
export function lastNameValidate(info: InfoType): boolean {
  /**
   * Check if user provided first name, and it's longer than 2
   * characters
   */
  return info.lastName ? info.lastName.length > 2 : false;
}

/**
 * Validates user data to ensure the both first and last names
 * are longer than 2 characters.
 *
 * @param info Object that contains user info
 */
export function nameValidate(info: InfoType): boolean {
  /**
   * Checks if both user first and last names are correct
   */
  return firstNameValidate(info) && lastNameValidate(info);
}

/**
 * This component renders a form that sets user first and last names
 * in `FormContext`
 *
 * *For using in Sign Up page*
 *
 * @returns {JSX.Element}
 */
export default function Name(): JSX.Element {
  /**
   * Declaring `info` state and `setInfo` method, for
   * integrating with user data
   */
  const { info, setInfo } = useFormContext();

  return (
    <>
      <div className={Styles.titleBar}>
        <h1 className={Styles.title}>مشخصات ات رو وارد کن</h1>
        <h3 className={Styles.subTitle}>
          این مشخصات رو برای حساب ات استفاده میکنیم.
        </h3>
      </div>

      <div className={Styles.inputs}>
        <div className={Styles.InputBar}>
          <span className={Styles.name}>نام</span>
          <input
            type="text"
            name="fname"
            placeholder="محمد"
            value={info.firstName}
            onChange={(event) =>
              setInfo((prevState: InfoType) => ({
                ...prevState,
                firstName: event.target.value,
              }))
            }
            className={[
              Styles.input,
              info.firstName && !firstNameValidate(info)
                ? Styles.incorrect
                : "",
            ].join(" ")}
          />
        </div>

        <div className={Styles.InputBar}>
          <span className={Styles.name}>نام خانوادگی</span>
          <input
            type="text"
            name="lname"
            placeholder="محمدی"
            value={info.lastName}
            onChange={(event) =>
              setInfo((prevState: InfoType) => ({
                ...prevState,
                lastName: event.target.value,
              }))
            }
            className={[
              Styles.input,
              info.lastName && !lastNameValidate(info) ? Styles.incorrect : "",
            ].join(" ")}
          />
        </div>
      </div>
    </>
  );
}
