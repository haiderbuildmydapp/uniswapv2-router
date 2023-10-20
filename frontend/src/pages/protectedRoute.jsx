import { Loader } from "../components/common";
import { CheckAuthHook } from "../hooks/adminHooks";
import { AuthType } from "../utility";

const ProtectedRoute = () => {
  const { authLoading } = CheckAuthHook(AuthType.ADMIN_PAGE);

  return (
    <div>
      {authLoading ? (
        <Loader content="loading..." />
      ) : (
        <h5>Welcome to Admin's home</h5>
      )}
    </div>
  );
};

export default ProtectedRoute;
