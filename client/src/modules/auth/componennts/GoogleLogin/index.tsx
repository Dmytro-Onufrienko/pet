import { FC } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

type GoodleResponse = {
  credential: string;
  clientId: string;
}

type DecodedResponse = {
  email: string;
  name: string;
}

const Login: FC = () => {
  const onSuccess = ({ credential, clientId }: CredentialResponse) => {
    const { email, name }: DecodedResponse = jwtDecode(credential ?? '');
    console.log(email, name, clientId);
  };

  const onError = () => {
    console.log("Помилка входу!");
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
};

export default Login;
