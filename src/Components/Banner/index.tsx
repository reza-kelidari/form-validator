import Styles from "./styles.module.scss";
import GlobalStyles from "../../global.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BannerProps } from "./types";
import { logout } from "../../Services/Firebase/Firebase";

export default function Banner({ active, steps }: BannerProps) {
  /**
   * Provides information of current url path
   */
  const location = useLocation();

  /**
   * Navigation method
   */
  const navigate = useNavigate();

  /**
   * `true` if `active` prop not being `undefined`, otherwise it's
   * `false`
   */
  const isActivePropUsed: boolean = typeof active !== "undefined";

  return (
    <div className={Styles.banner}>
      <h1 className={Styles.title}>
        {/**
         * If `title` prop defined, use that;
         *
         * Otherwise, if `active` prop defined, show related step
         * title;
         *
         * Otherwise, say Welcome!
         */}
        {location.pathname === "/login"
          ? "ورود به حساب"
          : isActivePropUsed && steps
          ? steps[active ?? 0].title
          : "خوش اومدی"}
      </h1>

      {/**
       * If active step provided, renders steps
       */}
      {isActivePropUsed ? (
        <div className={Styles.steps}>
          {steps?.map((step, index) => (
            <div className={Styles.step} key={index}>
              <span
                className={[
                  Styles.circle,
                  index === active ? Styles.active : "",
                ].join(" ")}
              ></span>
              <div className={Styles.titleBar}>
                <h3 className={Styles.subTitle}>{step.subTitle}</h3>
                <h1 className={Styles.title}>{step.title}</h1>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}

      {/**
       * Will be hidden if user not being in `/` (for sign up) or
       * `/login` (for login)
       */}
      <div
        className={[
          Styles.change,
          location.pathname !== "/" && location.pathname !== "/login"
            ? Styles.hide
            : "",
        ].join(" ")}
      >
        <span className={Styles.title}>
          {location.pathname === "/" ? "از قبل حساب داری؟" : "حسابی نداری؟"}
        </span>

        <Link
          className={Styles.link}
          to={location.pathname === "/" ? "/login" : "/"}
        >
          {location.pathname === "/" ? "وارد شو" : "یه حساب درست کن"}
        </Link>
      </div>

      {/**
       * Will be hidden if user not being in `/profile`
       */}
      <div
        className={[
          Styles.change,
          location.pathname !== "/profile" ? Styles.hide : "",
        ].join(" ")}
      >
        <button
          className={[GlobalStyles.link, GlobalStyles.secondary].join(" ")}
          onClick={() => logout().then(() => navigate("/login"))}
        >
          خروج
        </button>
      </div>
    </div>
  );
}
