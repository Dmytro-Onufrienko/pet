import { FC } from "react";
import GoogleLoginButton from "react-google-login";

const GoogleLogin: FC = () => {
  const onSuccess = (res: any) => {
    console.log(res);
  };

  const onFailure = (err: any) => {
    console.log(err);
  };

  return (
    <GoogleLoginButton
      onSuccess={onSuccess}
      onFailure={onFailure}
      clientId={
        "903862645929-rfj62e0fd86v53v7nijumldmg9ee6brr.apps.googleusercontent.com"
      }
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLogin;
