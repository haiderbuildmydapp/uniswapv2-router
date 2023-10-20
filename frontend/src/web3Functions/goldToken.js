import { CommonUtility } from "utility/common";
import { goldTokenAbi, goldTokenAddress } from "utility/contract/goldTokenAbi";

class GoldToken {
  async symbol(web3) {
    try {
      const contract = CommonUtility.contract(
        web3,
        goldTokenAbi,
        goldTokenAddress
      );
      return await contract.methods.symbol().call();
    } catch (error) {
      console.log("error in symbol func", error);
    }
  }

  async approve(web3, spender, value, account) {
    try {
      const contract = CommonUtility.contract(
        web3,
        goldTokenAbi,
        goldTokenAddress
      );
      return await contract.methods
        .approve(spender, value)
        .send({ from: account });
    } catch (error) {
      console.log("error in approve func", error);
    }
  }
}

const GoldTokenService = new GoldToken();
Object.freeze(GoldTokenService);
export { GoldTokenService };
