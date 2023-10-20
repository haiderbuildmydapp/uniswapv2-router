const environment = {
  MONGOOSE_URL:
    "mongodb://test:test123@cluster0-shard-00-00.1cezz.mongodb.net:27017,cluster0-shard-00-01.1cezz.mongodb.net:27017,cluster0-shard-00-02.1cezz.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-yvux9g-shard-0&authSource=admin&retryWrites=true&w=majority",
  ADMIN_TOKEN: "adminsecerest@key2login_secure",
  PROJECT_NAME: "abc",
  CMC_BASE_URL: "https://pro-api.coinmarketcap.com",
  CMC_API_KEY: "aa739a85-8a33-4567-8e5c-8f99f07559b7",
  PORT: "8080",
  ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",
  //rpc
  RPC: {
    11155111: "https://sepolia.infura.io/v3/2b2b802ce8414591a6c76a30cf192ad3",
  },
  //socket
  SOCKET_URL: {
    11155111: "wss://sepolia.infura.io/ws/v3/2b2b802ce8414591a6c76a30cf192ad3",
  },
  // block
  BLOCK_NUMBER: {
    11155111: "4406960",
  },

  //contract addresses
  ERC20_CONTRACT: {
    11155111: "0x5c338F7064292b8dF32a9c357Fa81715Db4BFC50",
  },
  // topics
  TRANSFER_TOPIC:
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
};

module.exports = {
  env: environment,
};
