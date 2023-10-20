import { CommonUtility } from "utility/common";
import { erc20Abi, erc20Address } from "../utility/contract/erc20Abi";

class ERC20 {
  // <<<<--- READ FUNCTIONS --->>>>

  async tokenBalance(web3, account) {
    try {
      const contract = CommonUtility.contract(web3, erc20Abi, erc20Address);
      const balance = +(await contract.methods.balanceOf(account).call());
      const decimals = +(await contract.methods.decimals().call());
      return balance / 10 ** decimals;
    } catch (error) {
      console.log("error in tokenBalance func", error);
      return error;
    }
  }

  async balance(web3, account) {
    try {
      const contract = CommonUtility.contract(web3, erc20Abi, erc20Address);
      const balance = await contract.methods.balanceOf(account).call();
      return +balance;
    } catch (error) {
      console.log("error in balance func", error);
      return error;
    }
  }

  async name(web3) {
    try {
      const contract = CommonUtility.contract(web3, erc20Abi, erc20Address);
      const name = await contract.methods.name().call();
      return name;
    } catch (error) {
      console.log("Error in name func", error);
      return error;
    }
  }

  async symbol(web3) {
    try {
      const contract = CommonUtility.contract(web3, erc20Abi, erc20Address);
      const symbol = await contract.methods.symbol().call();
      return symbol;
    } catch (error) {
      console.log("Error in symbol func", error);
      return error;
    }
  }

  async decimals(web3) {
    try {
      const contract = CommonUtility.contract(web3, erc20Abi, erc20Address);
      const decimals = await contract.methods.decimals().call();
      return +decimals;
    } catch (error) {
      console.log("error in decimals func", error);
      return error;
    }
  }

  async totalSupply(web3) {
    try {
      const contract = CommonUtility.contract(web3, erc20Abi, erc20Address);
      const totalSupply = await contract.methods.totalSupply().call();
      return +totalSupply;
    } catch (error) {
      console.log("error in totalSupply func", error);
      return error;
    }
  }

  async allowance(web3, ownerAddress, spenderAddress) {
    try {
      const contract = CommonUtility.contract(web3, erc20Abi, erc20Address);
      const allowance = await contract.methods.allowance(
        ownerAddress,
        spenderAddress
      );
      return allowance;
    } catch (error) {
      console.log("Error in allowance func", error);
      return error;
    }
  }

  //   <<<<--- WRITE FUNCTIONS ---->>>>
  async approve(web3, spenderAddress, amount, account) {
    try {
      const contract = CommonUtility.contract(web3, erc20Abi, erc20Address);
      const receipt = await contract.methods
        .approve(spenderAddress, amount)
        .send({ from: account });
      return receipt;
    } catch (error) {
      console.log("Error in approve func", error);
      return error;
    }
  }

  async transferFrom(web3, senderAddress, recipientAddress, amount, account) {
    try {
      const contract = CommonUtility.contract(web3, erc20Abi, erc20Address);

      const receipt = await contract.methods
        .transferFrom(senderAddress, recipientAddress, amount)
        .send({
          from: account,
        });
      return receipt;
    } catch (error) {
      console.log("Error in transfer func", error);
      return error;
    }
  }

  async transfer(web3, recipientAddress, amount, account) {
    try {
      const contract = CommonUtility.contract(web3, erc20Abi, erc20Address);
      const receipt = await contract.methods
        .transfer(recipientAddress, amount)
        .send({
          from: account,
        });
      return receipt;
    } catch (error) {
      console.log("Error in transfer func", error);
      return error;
    }
  }
}

const ERC20Service = new ERC20();
Object.freeze(ERC20Service);
export { ERC20Service };
