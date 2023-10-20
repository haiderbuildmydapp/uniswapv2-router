// import { Images } from 'images'

export const CommonConstant = {
  defaultPageSize: 20,
  mode: process.env.REACT_APP_MODE,
  maxBonus: 10 ** 18,
  totemChart: "https://coinmarketcap.com/currencies/totem-new-earth-systems/",
};

export const UserRoles = {
  Admin: "admin",
  User: "user",
};

export const ErrorConstant = {
  default: "Something went wrong",
};

export const StorageConstant = {
  token: "token",
  termsAndCondition: "termsAndCondition",
  versionUpdate: "versionUpdate",
};

export const AuthType = {
  ADMIN_PAGE: "ADMIN_PAGE",
  LOGIN_PAGE: "LOGIN_PAGE",
};

export const LoginState = {
  init: "init",
  processing: "processing",
  error: "error",
  success: "success",
};

export const Ipfs = {
  PATH: "https://ipfs.infura.io/ipfs",
  ADDRESS: "https://ipfs.infura.io:5001/api/v0",
};

export const TransactionType = {
  Flexible: 0,
  Locked: 1,
};

export const Protocols = {
  ethereum: {
    name: "ethereum",
    chainId: {
      mainnet: "0x1",
      testnet: "0x5",
    },

    assetUrl: {
      mainnet: "https://etherscan.io/address",
      testnet: "https://goerli.etherscan.io/address",
    },
    tokenUrl: {
      mainnet: "https://etherscan.io/token",
      testnet: "https://goerli.etherscan.io/token",
    },
    txUrl: {
      mainnet: "https://etherscan.io/tx",
      testnet: "https://goerli.etherscan.io/tx",
    },
  },
  bsc: {
    name: "bsc",
    chainId: {
      mainnet: "0x38",
      testnet: "0x61",
    },
    assetUrl: {
      mainnet: "https://bscscan.com/address",
      testnet: "https://testnet.bscscan.com/address",
    },
    tokenUrl: {
      mainnet: "https://bscscan.com/token",
      testnet: "https://testnet.bscscan.com/token",
    },
    txUrl: {
      mainnet: "https://bscscan.com/tx",
      testnet: "https://testnet.bscscan.com/tx",
    },
  },
  polygon: {
    name: "polygon",
    chainId: {
      mainnet: "0x89",
      testnet: "0x89",
    },
    assetUrl: {
      mainnet: "https://polygonscan.com/address",
      testnet: "https://mumbai.polygonscan.com/address",
    },
    tokenUrl: {
      mainnet: "https://polygonscan.com/token",
      testnet: "https://mumbai.polygonscan.com/token",
    },
    txUrl: {
      mainnet: "https://polygonscan.com/tx",
      testnet: "https://mumbai.polygonscan.com/tx",
    },
  },
  avax: {
    name: "avax",
    chainId: {
      mainnet: "0xa86a",
      testnet: "0xa86a",
    },
  },
};

export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};
