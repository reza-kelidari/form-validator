import { InfoType } from "../../../../Context/types";

/**
 * Validation method for first name
 */
export type FirstNameValidateType = (info: InfoType) => boolean;

/**
 * Validation method for last name
 */
export type LastNameValidateType = (info: InfoType) => boolean;

/**
 * Validation method for both first and last names
 */
export type NameValidateType = (info: InfoType) => boolean;
