import { CommonUtility } from "utility/common";
import { routerV2Abi, routerV2Address } from "utility/contract";
import { PairContractService } from "./pairContract";
import { MyTokenService } from "./myToken";
import { pairContractAddress } from "utility/contract/pairAbi";
import { myTokenAddress } from "utility/contract/myTokenAbi";
import { goldTokenAddress } from "utility/contract/goldTokenAbi";
import { GoldTokenService } from "./goldToken";

class UniswapRouterV2 {
  //<<<<<<<---- Read Function ---->>>>>>>>>>
  async factory(web3) {
    try {
      const contract = CommonUtility.contract(
        web3,
        routerV2Abi,
        routerV2Address
      );

      return await contract.methods.factory().call();
    } catch (error) {
      console.log("erro in factory func", error);
    }
  }
  async WETH(web3) {
    try {
      const contract = CommonUtility.contract(
        web3,
        routerV2Abi,
        routerV2Address
      );

      return await contract.methods.WETH().call();
    } catch (error) {
      console.log("erro in WETH func", error);
    }
  }

  async getAmountsOut(web3, amountIn, path) {
    console.log(amountIn, path);
    try {
      const contract = CommonUtility.contract(
        web3,
        routerV2Abi,
        routerV2Address
      );
      const amountInWei = web3.utils.toWei(amountIn, "ether");
      console.log("amountInWei", amountInWei);
      console.log("address0", path[0]);
      console.log("address1", path[1]);
      return await contract.methods.getAmountsOut(amountInWei, path).call();
    } catch (error) {
      console.log("error in getAmountOut func", error);
    }
  }

  //<<<<<<<---- Write Function ---->>>>>>>>>>
  async addLiquidity(
    web3,
    account,
    tokenA,
    tokenB,
    amountADesired,
    amountBDesired,
    amountAMin,
    amountBMin,
    to,
    deadline
  ) {
    try {
      const contract = CommonUtility.contract(
        web3,
        routerV2Abi,
        routerV2Address
      );

      return await contract.methods
        .addLiquidity(
          tokenA,
          tokenB,
          amountADesired,
          amountBDesired,
          amountAMin,
          amountBMin,
          to,
          deadline
        )
        .send({ from: account });
    } catch (error) {
      console.log("error in addLiquidity func", error);
    }
  }

  async swapExactTokensForTokens(web3, account, amountIn, path, deadline) {
    try {
      const contract = CommonUtility.contract(
        web3,
        routerV2Abi,
        routerV2Address
      );

      const amountInWei = web3.utils.toWei(amountIn.toString(), "ether");
      let isApproved;
      console.log("approving tokens");
      if (path[0] === myTokenAddress) {
        console.log("approving myToken");
        console.log("path[0]", path[0]);
        console.log("myTokenAddress", myTokenAddress);
        isApproved = await MyTokenService.approve(
          web3,
          routerV2Address,
          amountInWei,
          account
        );
      } else {
        console.log("approving gdToken");
        console.log("path[0]", path[0]);
        console.log("dgTokenAddress", goldTokenAddress);
        isApproved = await GoldTokenService.approve(
          web3,
          routerV2Address,
          amountInWei,
          account
        );
      }

      console.log("isApproved: ", isApproved);

      if (isApproved) {
        return await contract.methods
          .swapExactTokensForTokens(amountInWei, 1, path, account, deadline)
          .send({ from: account });
      }
      return false;
    } catch (error) {
      console.log("error in swapTokens func", error);
    }
  }

  async swapExactTokensForETH(web3, account, amountIn, path, deadline) {
    try {
      const contract = CommonUtility.contract(
        web3,
        routerV2Abi,
        routerV2Address
      );

      const amountInWei = web3.utils.toWei(amountIn.toString(), "ether");
      const isApproved = await MyTokenService.approve(
        web3,
        routerV2Address,
        amountInWei,
        account
      );
      console.log("isApproved: ", isApproved);

      if (isApproved) {
        return await contract.methods
          .swapExactTokensForETH(amountInWei, 1, path, account, deadline)
          .send({ from: account });
      }
      return false;
    } catch (error) {
      console.log("error in swapTokens func", error);
    }
  }

  async swapExactETHForTokens(web3, account, amountIn, path, deadline) {
    try {
      const contract = CommonUtility.contract(
        web3,
        routerV2Abi,
        routerV2Address
      );
      console.log("amountIn", amountIn);
      console.log("path", path);
      console.log("account", account);
      console.log("deadline", deadline);
      const amountInWei = web3.utils.toWei(amountIn, "ether");
      return await contract.methods
        .swapExactETHForTokens(1, path, account, deadline)
        .send({ from: account, value: amountInWei });
    } catch (error) {
      console.log("error in swapETHForTokens func", error);
    }
  }
}

const UniswapRouterV2Service = new UniswapRouterV2();
Object.freeze(UniswapRouterV2);
export { UniswapRouterV2Service };
