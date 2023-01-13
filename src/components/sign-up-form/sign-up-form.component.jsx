import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formfields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formfields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormField();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
        console.log("Check error");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formfields, [name]: value });
  };

  function hey() {
    console.log("HEEEYYYY)");
  }

  return (
    <div>
      <h1>Sign up with your email</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          required
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />

        <label>Email</label>
        <input
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />

        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={password}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          required
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
