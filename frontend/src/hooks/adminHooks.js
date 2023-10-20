import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminService } from "services/adminServices";
import { useAppSelector } from "store/store";
import { AuthType, BrowserUtility, StorageConstant } from "utility";
import { CommonHook } from "./commonHook";

export const LoginHook = () => {
  const { data, setData, setError, loading, setLoading, error } = CommonHook();
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      setLoading(true);
      const result = await AdminService.login(credentials);
      setData(result.data);
      BrowserUtility.save("token", result.data?.token);
      navigate("/protected-route");
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    data,
    loading,
    error,
  };
};

export const CheckAuthHook = (type) => {
  const { loading, setLoading } = CommonHook();
  const navigate = useNavigate();

  const authenticate = async () => {
    try {
      setLoading(true);
      const auth = await AdminService.auth();
      if (auth.data && type === AuthType.LOGIN_PAGE) {
        navigate("/protected-route"); //navigate to admin's home screen
      }
    } catch (error) {
      if (type === AuthType.ADMIN_PAGE) {
        console.log("logged in");
        navigate("/admin-login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return {
    authLoading: loading,
  };
};
