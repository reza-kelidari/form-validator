import Banner from "../../Components/Banner";
import {
  getUser,
  sendVerificationEmail,
} from "../../Services/Firebase/Firebase";
import Styles from "../styles.module.scss";
import GlobalStyles from "../../global.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [isVerifyEmailSent, setIsVerifyEmailSent] = useState<boolean>(false);

  useEffect(() => {
    getUser()
      .then((result) => setUser(result))
      .catch(() => navigate("/"));
  }, []);

  if (!user) return <div className={Styles.loading}>لطفا صبر کنید ...</div>;
  else
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
                <div className={Styles.verified}>ایمیل تایید شده</div>
              )}
            </div>

            <div className={Styles.detail}>
              <h1 className={Styles.detailSubtitle}>زمان ایجاد حساب</h1>
              <h3 className={Styles.detailTitle}>
                {new Date(
                  user?.metadata.creationTime as string
                ).toLocaleString("fa-IR")}
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
}
