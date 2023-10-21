import { pairContractAbi, pairContractAddress } from "utility/contract/pairAbi";

const { CommonUtility } = require("utility/common");

class PairContract {
  async getReserves(web3) {
    try {
      const contract = CommonUtility.contract(
        web3,
        pairContractAbi,
        pairContractAddress
      );

      return await contract.methods.getReserves().call();
    } catch (error) {
      console.log("error in the getReserves func", error);
    }
  }
}

const PairContractService = new PairContract();
Object.freeze(PairContractService);
export { PairContractService };
