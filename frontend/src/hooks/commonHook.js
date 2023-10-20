import openNotification from "../components/common/toastMessage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CommonHook = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        navigate("/admin-login");
        openNotification("Error", error.error, "error");
      } else {
        openNotification("Error", error.error, "error");
      }
    }
  }, [error]);

  return {
    data,
    setData,
    loading,
    setLoading,
    setError,
    error,
  };
};
