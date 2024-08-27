import Styles from "../styles.module.scss";
import GlobalStyles from "../../global.module.scss";
import Banner from "../../Components/Banner";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { emailValidate } from "../SignUp/Components/Email";
import { InfoType } from "../../Context/types";
import { login } from "../../Services/Firebase/Firebase";

/**
 * This page renders a login form, with validation
 *
 * @returns {JSX.Element}
 */
export default function Login(): JSX.Element {
  /**
   * Navigation method
   */
  const navigate = useNavigate();

  /**
   * Declaring creditional state and setCreditional method
   * for maintaining login info
   */
  const [creditional, setCreditional] = useState({ email: "", password: "" });

  /**
   * Delcaring error state and setError method for mainaining
   * error message
   */
  const [error, setError] = useState("");

  /**
   * Resets the error message when user changes creditional
   */
  useEffect(() => setError(""), [creditional]);

  return (
    <div className={Styles.box}>
      <Banner />

      <div className={Styles.container}>
        <div className={Styles.titleBar}>
          <h1 className={Styles.title}>مشخصات ات رو وارد کن</h1>
          <h3 className={Styles.subTitle}>
            این مشخصات رو برای حساب ات استفاده میکنیم.
          </h3>
        </div>

        <div className={Styles.inputs}>
          <div className={Styles.InputBar}>
            <span className={Styles.name}>ایمیل</span>
            <input
              type="email"
              name="email"
              dir="ltr"
              onChange={(event) =>
                setCreditional((prevState) => ({
                  ...prevState,
                  email: event.target.value,
                }))
              }
              className={[
                Styles.input,
                creditional.email && !emailValidate(creditional)
                  ? Styles.incorrect
                  : "",
              ].join(" ")}
            />
          </div>

          <div className={Styles.InputBar}>
            <span className={Styles.name}>رمز عبور</span>
            <input
              type="password"
              name="password"
              dir="ltr"
              onChange={(event) =>
                setCreditional((prevState) => ({
                  ...prevState,
                  password: event.target.value,
                }))
              }
              className={Styles.input}
            />
          </div>
        </div>

        <div className={Styles.error}>{error}</div>

        <div className={Styles.buttonBar}>
          <button
            className={
              !emailValidate(creditional) || creditional.password.length < 8
                ? GlobalStyles.disabled
                : ""
            }
            onClick={() => {
              emailValidate(creditional) && creditional.password.length >= 8
                ? login(creditional as InfoType)
                    .then(() => {
                      navigate("/profile");
                    })
                    .catch((error) => setError(error.message))
                : "";
            }}
          >
            ورود
          </button>
        </div>

        <div className={Styles.change}>
          <h3 className={Styles.subtitle}>حسابی نداری؟</h3>
          <Link to="/" className={Styles.title}>
            یه حساب درست کن
          </Link>
        </div>
      </div>
    </div>
  );
}
