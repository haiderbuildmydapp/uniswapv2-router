import { myTokenAbi, myTokenAddress } from "utility/contract/myTokenAbi";
const { CommonUtility } = require("utility/common");

class MyToken {
  async symbol(web3) {
    try {
      console.log("abi", myTokenAbi);
      console.log("address", myTokenAddress);
      const contract = CommonUtility.contract(web3, myTokenAbi, myTokenAddress);
      return await contract.methods.symbol().call();
    } catch (error) {
      console.log("error in symbol func", error);
    }
  }

  async approve(web3, spender, value, account) {
    try {
      console.log("spender", spender);
      console.log("value", value);
      console.log("account", account);

      const contract = CommonUtility.contract(web3, myTokenAbi, myTokenAddress);
      return await contract.methods
        .approve(spender, value)
        .send({ from: account });
    } catch (error) {
      console.log("error in approve func", error);
    }
  }
}

const MyTokenService = new MyToken();
Object.freeze(MyTokenService);
export { MyTokenService };
