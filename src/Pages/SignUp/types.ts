/**
 * Represent shape of an step in sign up
 */
export interface StepType {
  /**
   * Element that gets data from user for inserting in `info`
   * object later
   */
  element: JSX.Element;

  /**
   * Method that validates user data
   */
  validate: () => boolean;

  /**
   * The title of the step.
   */
  title: string;

  /**
   * The subtitle or name of the step.
   */
  subTitle: string;
}
