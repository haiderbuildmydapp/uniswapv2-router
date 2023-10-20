const Web3 = require("web3");
const { transferEventListener } = require("../../events/transferEventListener");
const { env } = require("../../environment");

const loadBlockchain = async (socketUrl, rpcUrl, chainId) => {
  try {
    console.log("VALUES", socketUrl, rpcUrl, chainId);
    const web3Socket = new Web3(
      new Web3.providers.WebsocketProvider(socketUrl)
    );
    const web3 = new Web3(rpcUrl); // can be used upon requirements
    await transferEventListener(
      env.ERC20_CONTRACT[chainId],
      env.TRANSFER_TOPIC,
      web3Socket,
      env.BLOCK_NUMBER[chainId],
      "latest",
      chainId
    );
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { loadBlockchain };
