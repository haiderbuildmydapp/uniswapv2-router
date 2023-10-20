import {
  MainModel,
  ModelsData,
  ConnectButton,
  ConnectIcon,
} from "./connectModalElement";
import { Images } from "../../../../assets";
import {
  loadBlockchain,
  loadWalletConnect,
} from "store/redux/slices/wallet3Connect/web3ConnectSlice";
import { useAppDispatch } from "store/store";
import { useWalletConnectClient } from "services/walletServices";

const ConnectModal = ({ closeModel }) => {
  const dispatch = useAppDispatch();

  const handleWeb3MetaMask = async () => {
    dispatch(loadBlockchain());
  };

  const { connect } = useWalletConnectClient();

  return (
    <MainModel>
      <ModelsData>
        <ConnectButton
          onClick={() => handleWeb3MetaMask()}
          className="metamask-btn"
        >
          <ConnectIcon src={Images.web3.metamask} alt="icon" />
          Meta Mask
        </ConnectButton>

        <ConnectButton
          onClick={() => {
            connect("eip155:5");
            closeModel();
          }}
          className="trustwallet-btn"
        >
          <ConnectIcon
            src={Images.web3.wallet}
            className="trustwallet-btn-img"
          />
          Wallet Connect
        </ConnectButton>
      </ModelsData>
    </MainModel>
  );
};

export default ConnectModal;
