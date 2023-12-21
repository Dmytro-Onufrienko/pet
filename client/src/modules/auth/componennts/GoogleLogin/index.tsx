import { FC } from "react";
import GoogleLogin from "react-google-login"


const cliendId = '903862645929-rfj62e0fd86v53v7nijumldmg9ee6brr.apps.googleusercontent.com'

const Login: FC = () => {
  const onSuccess = (res: any) => {
    console.log('success', res);
  }

  const onFailure = (res: any) => {
    console.log('error', res);
  }
  
  return (
    <div id={'signInButton'}>
      <GoogleLogin 
        clientId={cliendId}
        buttonText="login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}

export default Login