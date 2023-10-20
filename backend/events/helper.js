const eventHandler = async (address, topic, web3Socket, from, to) => {
  let options = {
    fromBlock: from,
    toBlock: to,
    address: address, //Only get events from specific addresses
    topics: [topic], //What topics to subscribe to
  };
  const subscription = web3Socket.eth.subscribe("logs", options);
  await subscription;

  return subscription;
};
module.exports = { eventHandler };
