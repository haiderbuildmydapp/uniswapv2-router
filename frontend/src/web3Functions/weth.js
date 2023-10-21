import { CommonUtility } from "utility/common";
import { routerV2Address, wethAbi, wethAddress } from "utility/contract";

class WETH {
  async balanceOf(web3, account) {
    try {
      const contract = CommonUtility.contract(web3, wethAbi, wethAddress);
      return await contract.methods.balanceOf(account).call();
    } catch (error) {
      console.log("error in balanceOf func", error);
    }
  }

  async approve(web3, account) {
    try {
      const contract = CommonUtility.contract(web3, wethAbi, wethAddress);
      return await contract.methods
        .approve(routerV2Address, value)
        .send({ from: account });
    } catch (error) {
      console.log("error in approve func", error);
    }
  }
}

const WETHServices = new WETH();
Object.freeze(WETHServices);
export { WETHServices };
