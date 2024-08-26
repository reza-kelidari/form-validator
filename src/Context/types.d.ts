/**
 * Represents shape of user info object
 */
export interface InfoType {
  /**
   * First name of user
   */
  firstName?: string;

  /**
   * Last name of user
   */
  lastName?: string;

  /**
   * Email of user
   */
  email: string;

  /**
   * Password of user
   */
  password: string;

  /**
   * Repeated password of user
   */
  passwordRepeat?: string;
}

/**
 * Represent shape of setInfo method
 *
 * @param {InfoType} value - New info for user
 * @param {InfoType} prevState - Previous user information
 * @returns {void}
 */
export type SetInfoType = (
  value: InfoType | ((prevState: InfoType) => InfoType)
) => void;

/**
 * Represents shape of FormContext
 */
export interface FormContextType {
  /**
   * An object that provides user information for validating and
   * submitting to server
   *
   * @property firstName
   * @property lastName
   * @property email
   * @property password
   * @property passwordRepeat
   */
  info: InfoType;

  /**
   * A method that changes user info
   */
  setInfo: SetInfoType;
}

/**
 * A method that provides `FormContext`
 */
export type FormContextHookType = () => FormContextType;
