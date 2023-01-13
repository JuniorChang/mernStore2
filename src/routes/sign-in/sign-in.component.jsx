//import { useEffect } from "react";
//import { getRedirectResult } from "firebase/auth";

import {
  //auth,
  //signInWithGoogleRedirect,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  //If you want to use sign in with redirect
  // useEffect(() => {
  //   async function fetchUser() {
  //     const response = await getRedirectResult(auth);
  //     console.log(response);
  //   }
  // }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    // console.log(response);
  };

  return (
    <div>
      <div>sign-in page</div>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
