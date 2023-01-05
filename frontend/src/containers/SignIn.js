import AppTitle from "../components/SignIn/Title.js";
import Register from "../components/SignIn/Register.js";

const SignIn = () => {
  
  // const handleLogin = (name) => {
  // if (!name){
  //     displayStatus({
  //         type: "error",
  //         msg: "Missing user name",
  //     });
  // } else {
  //     SignInNewUser(name)
  //     setSignedIn(true);
  // }
  // }

  return (
    <>
      <AppTitle />
      <Register />
    </>
  );
};

export default SignIn;
