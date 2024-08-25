import { StepType } from "../../Pages/SignUp/types";

/**
 * Represents the properties of the Banner component.
 */
export interface BannerProps {
  /**
   * The number of the active step on the SignUp page.
   *
   * Optional
   */
  active?: number;

  /**
   * The text displayed in the title bar.
   *
   * Optional
   */
  title?: string;

  /**
   * User information
   *
   * Optional, if not defined will be `[]`
   */
  steps: Array<StepType>;
}
