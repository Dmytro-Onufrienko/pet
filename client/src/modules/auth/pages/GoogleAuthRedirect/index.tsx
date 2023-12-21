import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("accessToken");
    console.log(accessToken?.slice(1, -1));

  }, [location.search]);
};

export default GoogleAuthRedirect;
