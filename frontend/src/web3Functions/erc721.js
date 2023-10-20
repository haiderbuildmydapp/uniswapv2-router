import { CommonUtility } from "utility/common";
import { erc721Abi, erc721Address } from "../utility/contract/erc721Abi";

class ERC21 {
  // <<<<---  READ FUNCTIONS --->>>>
  async isApprovedForAll(web3, account, contractAddressErc721) {
    try {
      const contract = CommonUtility.contract(web3, erc721Abi, erc721Address);
      const receipt = await contract.methods
        .isApprovedForAll(account, contractAddressErc721)
        .call();
      return receipt;
    } catch (error) {
      console.log("Error in isApprovedForAll func", error);
      return error;
    }
  }

  async balance(web3, account) {
    try {
      const contract = CommonUtility.contract(web3, erc721Abi, erc721Address);

      const balance = await contract.methods.balanceOf(account).call();
      return +balance;
    } catch (error) {
      console.log("error in balance func", error);
      return error;
    }
  }

  async name(web3) {
    try {
      const contract = CommonUtility.contract(web3, erc721Abi, erc721Address);

      const name = await contract.methods.name().call();
      return name;
    } catch (error) {
      console.log("Error in name func", error);
      return error;
    }
  }

  async symbol(web3) {
    try {
      const contract = CommonUtility.contract(web3, erc721Abi, erc721Address);

      const symbol = await contract.methods.symbol().call();
      return symbol;
    } catch (error) {
      console.log("Error in symbol func", error);
      return error;
    }
  }

  async tokenURI(web3, tokenId) {
    try {
      const contract = CommonUtility.contract(web3, erc721Abi, erc721Address);
      const tokenURI = await contract.methods.tokenURI(tokenId).call();
      return tokenURI;
    } catch (error) {
      console.log("Error in tokenURI func", error);
    }
  }

  async totalSupply(web3) {
    try {
      const contract = CommonUtility.contract(web3, erc721Abi, erc721Address);

      const totalSupply = await contract.methods.totalSupply().call();
      return +totalSupply;
    } catch (error) {
      console.log("error in totalSupply func", error);
      return error;
    }
  }

  //   <<<<--- WRITE FUNCTIONS ---->>>>
  async approve(web3, recipientAddress, tokenId, account) {
    try {
      const contract = CommonUtility.contract(web3, erc721Abi, erc721Address);

      const receipt = await contract.methods
        .approve(recipientAddress, tokenId)
        .send({ from: account });
      return receipt;
    } catch (error) {
      console.log("Error in approve func", error);
      return error;
    }
  }
}

const ERC21Service = new ERC21();
Object.freeze(ERC21Service);
export { ERC21Service };
