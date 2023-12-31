import { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/store";
// import { MainModel } from "components/common";
import { mainModel } from "store/redux/slices/helperSlices/modelSlice";
import { switchNetwork } from "store/redux/slices/wallet3Connect/web3ConnectSlice";
import { PriceConvertorHook } from "hooks/priceHooks";
import { networkObj } from "../data";
import { ContractUtility } from "utility/contract-utility";
import { MainModel } from "../common";
import SwapTokensForm from "components/form/SwapTokensForm";
import SwapTokensForETH from "components/form/SwapTokensForETH";

const HomeCom = () => {
  const dispatch = useAppDispatch();

  const [connectModel, setConnectModel] = useState(false);

  const { web3, account, chainId } = useAppSelector(
    (state) => state.web3Connect
  );

  const handleModelOpen = () => {
    setConnectModel(true);
    dispatch(mainModel(true));
  };

  return (
    <div className="container-fluid">
      <MainModel connectModel={connectModel} />
      <button onClick={handleModelOpen} className="btn btn-secondary">
        Connect
      </button>

      {web3 ? (
        <select
          value={ContractUtility.getProtocol(chainId)}
          onChange={(e) => switchNetwork(web3, e.target.value)}
        >
          {networkObj.map((network, i) => {
            return (
              <option key={i} value={network.value}>
                {network.name}
              </option>
            );
          })}
        </select>
      ) : (
        ""
      )}
      <p>account: {account}</p>
      <div className="row m-2">
        <div className="col-4 border shadow p-1">
          <h4>Swap Tokens For Tokens</h4>
          <SwapTokensForm />
        </div>
        <div className="col-1"></div>
        <div className="col-4 border shadow p-1">
          <h4>Swap ETH ⇌ MT</h4>
          <SwapTokensForETH />
        </div>
      </div>
      <div className="col"></div>
    </div>
  );
};
export default HomeCom;
