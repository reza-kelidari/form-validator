import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  Unsubscribe,
  updateProfile,
  User,
} from "firebase/auth";
import { InfoType } from "../../Context/types";
import { SignUpOrLoginType } from "./types";

/**
 * Firebase configuration
 */
const firebaseConfig = {
  apiKey: "AIzaSyADA4phwMV3d8rR_6HOMP9AiKeYPP_8PDk",
  authDomain: "my-form-validator.firebaseapp.com",
  projectId: "my-form-validator",
  storageBucket: "my-form-validator.appspot.com",
  messagingSenderId: "594718890352",
  appId: "1:594718890352:web:ce7ca721666799e3b417b5",
  measurementId: "G-K4FLP2681S",
};

/**
 * Initialized firebase app
 */
const app = initializeApp(firebaseConfig);

/**
 * Authentication tool
 */
const auth = getAuth(app);

/**
 * Configuring language
 */
auth.useDeviceLanguage();

/**
 * Creates a new account in server, based on provided creditional
 *
 * @param creditional is an object that contains user's creditional
 * @returns {SignUpOrLoginType}
 */
export async function signUp(creditional: InfoType): SignUpOrLoginType {
  try {
    /**
     * User's data after sign up
     */
    const useCreditional = await createUserWithEmailAndPassword(
      auth,
      creditional.email,
      creditional.password
    );

    /**
     * Sets user's name in his profile
     */
    await updateProfile(useCreditional.user, {
      displayName: [creditional.firstName, creditional.lastName].join(" "),
    });
  } catch (error: any) {
    switch (error.code) {
      case "auth/email-already-in-use":
        throw new Error("ایمیل قبلا استفاده شده");

      case "auth/invalid-email":
        throw new Error("ایمیل معتبر نیست");

      default:
        throw new Error("خطایی رخ داد");
    }
  }
}

/**
 * Logins user based on provided creditional
 *
 * @param creditional is an object that contains user's creditional
 * @returns {SignUpOrLoginType}
 */
export async function login(creditional: InfoType): SignUpOrLoginType {
  try {
    await signInWithEmailAndPassword(
      auth,
      creditional.email,
      creditional.password
    );
  } catch (error: any) {
    switch (error.code) {
      case "auth/invalid-credential":
        throw new Error("ایمیل یا رمز عبور اشتباه");
      default:
        throw new Error(error.code);
    }
  }
}

/**
 * Logouts user
 */
export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.code);
  }
}

/**
 * Sends a verification email to user
 */
export async function sendVerificationEmail(): Promise<void> {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    } else {
      throw new Error("An error occured during logout");
    }
  } catch (error: any) {
    throw new Error(error.code);
  }
}

/**
 * Removes user's account
 */
export async function deleteAccount(): Promise<void> {
  try {
    if (auth.currentUser) {
      await deleteUser(auth.currentUser);
    } else {
      throw new Error("An error occured during delete account");
    }
  } catch (error: any) {
    throw new Error(error.code);
  }
}

/**
 * Provides logged in user's informations
 *
 * This method waits until user data fetched from server
 */
export async function getUser(): Promise<User> {
  let unsubscribe: Unsubscribe;
  await new Promise<User>(
    (resolve) =>
      (unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) resolve(user);
        else throw new Error("An error occured");
      }))
  );
  return auth.currentUser as User;
}
