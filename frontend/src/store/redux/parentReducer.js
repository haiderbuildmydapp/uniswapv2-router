import { combineReducers } from "redux";

// Web3 Connect
import { web3Reducer } from "./slices/wallet3Connect/web3ConnectSlice";
import { modelReducer } from "./slices/helperSlices/modelSlice";

const parentReducer = combineReducers({
  web3Connect: web3Reducer,
  model: modelReducer,
});

export default parentReducer;
