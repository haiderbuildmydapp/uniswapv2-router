const ethers = require("ethers");
const { erc20Abi } = require("../app/utils/abi/erc20Abi");
const { eventHandler } = require("./helper");
var converter = require("hex2dec");

const transferEventListener = async (
  contractAddress,
  topic,
  web3socket,
  fromBlock,
  toBlock,
  chainId
) => {
  const subscription = await eventHandler(
    contractAddress,
    topic,
    web3socket,
    fromBlock,
    toBlock
  );
  subscription.on("data", async (event) => {
    let interface = new ethers.utils.Interface(erc20Abi);
    const data = interface.parseLog(event);
    console.log("DATA", data);
    console.log(
      `${web3socket.utils.fromWei(
        converter.hexToDec(data.args.value._hex),
        "ether"
      )} tokens transferred from ${data?.args?.from} to ${data?.args?.to}`
    );
  });
};
module.exports = {
  transferEventListener,
};
