import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, ProtectedRoute } from "./pages";
import { AdminLogin } from "components/common";
import GlobalStyle from "globalStyles";
import { useAppDispatch, useAppSelector } from "store/store";
import { updateAccount } from "store/redux/slices/wallet3Connect/web3ConnectSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();

  const { web3 } = useAppSelector((state) => state.web3Connect);

  // account switch
  useEffect(() => {
    web3 &&
      window.ethereum.on("accountsChanged", async (data) => {
        dispatch(updateAccount({ account: data[0] }));
      });
  }, [web3]);

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/protected-route" element={<ProtectedRoute />} />
        <Route path="/formik-form" element={<ProtectedRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
