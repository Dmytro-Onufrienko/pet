import { FC } from "react";
import GoogleLoginButton from "react-google-login";

const clientId =
  "903862645929-rfj62e0fd86v53v7nijumldmg9ee6brr.apps.googleusercontent.com";

const GoogleLogin: FC = () => {
  const onSuccess = (res: any) => {
    console.log(res);
  };

  const onFailure = (err: any) => {
    console.log("err", err);
  };

  return (
    <GoogleLoginButton
      onSuccess={onSuccess}
      onFailure={onFailure}
      clientId={clientId}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
};

export default GoogleLogin;
