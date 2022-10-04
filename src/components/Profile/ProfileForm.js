import classes from "./ProfileForm.module.css";
import { useRef, useContext } from "react";
import AuthContext from "../../store/AuthContext";

const ProfileForm = () => {
  const authCntxt = useContext(AuthContext);
  const newPasswordInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDSpzTjcNExN8iLGiCuL3K19dgagjBRG4Q",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCntxt.token,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
      } else {
        // return res.json().then((data) => {
        //   let errorMessage = "Authentication Failed";
        //   if (data && data.error && data.message)
        //     errorMessage = data.error.message;
        alert("wrong Password");
      }
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
