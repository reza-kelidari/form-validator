import Banner from "../../Components/Banner";
import {
  deleteAccount,
  getUser,
  logout,
  sendVerificationEmail,
} from "../../Services/Firebase/Firebase";
import Styles from "../styles.module.scss";
import GlobalStyles from "../../global.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

/**
 * This page renders logged in user's informations
 *
 * Also provider methods for logout or delete account
 *
 * @returns {JSX.Element}
 */
export default function Profile(): JSX.Element {
  /**
   * Navigation method
   */
  const navigate = useNavigate();

  /**
   * Declaring user state and setUser method for maintaining
   * logged in user's informations
   */
  const [user, setUser] = useState<User>();

  /**
   * Declaring an state for maintaining verification email status
   */
  const [isVerifyEmailSent, setIsVerifyEmailSent] = useState<boolean>(false);

  const [error, setError] = useState("");

  /**
   * Gets user's informations and sets that to user's state
   *
   * If user is invalid, goes to login page
   */
  useEffect(() => {
    getUser()
      .then((result) => setUser(result))
      .catch(() => navigate("/login"));
  }, []);

  /**
   * If user data isn't loaded, shows the loading
   */
  if (!user) return <div className={Styles.loading}>لطفا صبر کنید ...</div>;
  /**
   * Otherway, shows the information
   */ else
    return (
      <div className={Styles.box}>
        <Banner />

        <div className={Styles.container}>
          <div className={Styles.details}>
            <div className={Styles.detail}>
              <h1 className={Styles.detailSubtitle}>نام و نام خانوادگی</h1>
              <h3 className={Styles.detailTitle}>{user?.displayName}</h3>
            </div>

            <div className={Styles.detail}>
              <h1 className={Styles.detailSubtitle}>ایمیل</h1>
              <h3 className={Styles.detailTitle}>{user?.email}</h3>
              {/**
               * If email is not verified, shows an alert and the
               * verification button
               */}
              {!user?.emailVerified ? (
                <div className={Styles.verify}>
                  <div className={Styles.error}>ایمیل تایید نشده</div>
                  <button
                    className={[
                      GlobalStyles.secondary,
                      GlobalStyles.small,
                      isVerifyEmailSent ? GlobalStyles.disabled : "",
                    ].join(" ")}
                    onClick={() => {
                      setIsVerifyEmailSent(true);
                      sendVerificationEmail();
                    }}
                  >
                    تایید اش کن
                  </button>
                </div>
              ) : (
                /**
                 * Otherway, says email is verified
                 */
                <div className={Styles.verified}>ایمیل تایید شده</div>
              )}
            </div>

            <div className={Styles.detail}>
              <h1 className={Styles.detailSubtitle}>زمان ایجاد حساب</h1>
              <h3 className={Styles.detailTitle}>
                {new Date(user?.metadata.creationTime as string).toLocaleString(
                  "fa-IR"
                )}
              </h3>
            </div>

            <div className={Styles.detail}>
              <div className={Styles.buttonBar}>
                <button
                  className={[GlobalStyles.alert, GlobalStyles.small].join(" ")}
                  onClick={() =>
                    deleteAccount()
                      .then(() => navigate("/"))
                      .catch((error) => setError(error.message))
                  }
                >
                  حذف حساب
                </button>
                <button
                  className={[
                    GlobalStyles.secondary,
                    GlobalStyles.small,
                    Styles.logout,
                  ].join(" ")}
                  onClick={() =>
                    logout()
                      .then(() => navigate("/login"))
                      .catch((error) => setError(error.message))
                  }
                >
                  خروج
                </button>
              </div>
            </div>
            {error ? (
              <div className={Styles.detail}>
                <h3 className={Styles.detailSubtitle}>خطا</h3>
                <h3 className={Styles.error}>{error}</h3>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
}
