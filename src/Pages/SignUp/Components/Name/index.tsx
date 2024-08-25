import Styles from "./styles.module.scss";
import { InfoType } from "../../../../Context/types";
import { NameValidateType } from "./types";
import useFormContext from "../../../../Context/Form";

/**
 * Validates user data to ensure the first and last names
 * are longer than 2 characters.
 *
 * @returns `true` if both `firstName` and `lastName` are
 * longer than 2 characters, otherwise `false`.
 */
export const nameValidate: NameValidateType = () => {
  /**
   * Object that contains information that user provided
   */
  const info = useFormContext().info;

  /**
   * If user provided both both `firstName` and `lastName`,
   * go through
   */
  if (info.firstName && info.lastName) {
    /**
     * If both `firstName` and `lastName` are longer than
     * 2 characters, return true
     */
    if (info.firstName.length > 2 && info.lastName.length > 2) {
      return true;
    }
  }

  /**
   * Return false If:
   * - User not provided first name or last name
   * - One of them shorter that 2 characters
   */
  return false;
};

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
    <div className={Styles.container}>
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
            /**
             * If user inserted anything as first name, and it has
             * less than 3 charecter, it's incorrect
             */
            className={[
              Styles.input,
              info.firstName && info.firstName.length < 3
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
            placeholder="محمدی "
            value={info.lastName}
            onChange={(event) =>
              setInfo((prevState: InfoType) => ({
                ...prevState,
                lastName: event.target.value,
              }))
            }
            /**
             * If user inserted anything as last name, and it has
             * less than 3 charecter, it's incorrect
             */
            className={[
              Styles.input,
              info.lastName && info.lastName.length < 3 ? Styles.incorrect : "",
            ].join(" ")}
          />
        </div>
      </div>
    </div>
  );
}
