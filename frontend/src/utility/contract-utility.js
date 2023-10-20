import { CommonConstant, Protocols } from "utility";

export class ContractUtility {
  static config = {};

  static setConfig(config) {
    ContractUtility.config = { ...config };
  }

  static getInfuraKey() {
    return process.env.REACT_APP_INFURA_KEY;
  }
  static getContractAddress = (chainId) => {
    switch (chainId) {
      case "1":
        return ContractUtility.config.ethereum;
      case "137":
        return ContractUtility.config.polygon;
      default:
        return {};
    }
  };

  static getPaymentMethods = (protocol) => {
    switch (protocol) {
      case Protocols.ethereum.name:
      case Protocols.bsc.name:
      case Protocols.polygon.name:
        return ContractUtility.config[protocol].payment_methods;
      default:
        return [];
    }
  };

  static getMoralisKeys = (chainId) => {
    switch (chainId) {
      case "1":
      case "0x1":
      case "137":
        return {
          serverUrl: "https://im5edb4xnfxc.usemoralis.com:2053/server",
          appId: "O8QrWqOWXUypTAMKhNd5nj1qVQymXfu71edNCKgL",
          chain: chainId == "0x1" ? "ethereum" : "polygon",
        };
      case "5":
        return {
          serverUrl: "https://kodzkxzmdrce.usemoralis.com:2053/server",
          appId: "AZbnPhH6KAFCIDTOAr7YWTr4CdLikf9ujqgwKHis",
          chain: "rinkeby",
        };
      default:
        return {};
    }
  };

  static getViewContractABI(protocol) {
    switch (protocol) {
      case Protocols.ethereum.name:
      // return ERCView_ABI;

      case Protocols.bsc.name:
      // return View_ABI;
      default:
        return null;
    }
  }

  static getStakingPoolContractABI(protocol) {
    switch (protocol) {
      case Protocols.ethereum.name:
      // return ERCPool_ABI;

      case Protocols.bsc.name:
      // return Pool_ABI;
      default:
        return null;
    }
  }

  static getMoralisSymbol = (netId) => {
    switch ((netId || "").toString()) {
      case "1":
      case "0x1":
        return "eth";
      case "2":
      case "0x2":
        return "morden";
      case "3":
      case "0x3":
        return "ropsten";
      case "4":
      case "0x4":
        return "rinkeby";
      case "42":
      case "0x42":
        return "Kovan";
      case "13881":
      case "0x13881":
      case "80001":
      case "0x80001":
        return "Mumbai";
      case "89":
      case "0x89":
      case "137":
        return "polygon";
      case "38":
      case "0x38":
      case "56":
      case "0x56":
        return "bsc";
      case "61":
      case "0x61":
      case "97":
      case "0x97":
        return "bsc testnet";
      default:
        return "Unknown";
    }
  };

  static getChainXId(chainId) {
    switch ((chainId || "").toString()) {
      case "1":
        return "0x1";
      case "5":
        return "0x5";
      case "137":
        return "0x89";
      case "80001":
        return "0x13881";
      case "89":
        return "0x89";
      case "97":
        return "0x61";
      case "38":
        return "0x38";
      case "42161":
        return "0xa4b1";
      default:
        return null;
    }
  }

  static getNetwork(netId) {
    switch ((netId || "").toString()) {
      case "1":
      case "0x1":
        return "eth";
      case "2":
      case "0x2":
        return "Morden";
      case "3":
      case "0x3":
        return "Ropsten";
      case "4":
      case "0x5":
        return "goerli";
      case "42":
      case "0x42":
        return "Kovan";
      case "13881":
      case "0x13881":
      case "80001":
      case "0x80001":
        return "mumbai";
      case "89":
      case "0x89":
        return "polygon";
      case "38":
      case "0x38":
        return "bsc";
      case "61":
      case "0x61":
        return "bsc testnet";
      default:
        return "Unknown";
    }
  }

  static getProtocol(netId) {
    switch ((netId || "").toString()) {
      case "1":
      case "0x1":
      case "2":
      case "0x2":
      case "3":
      case "0x3":
      case "4":
      case "0x5":
      case "42":
      case "0x42":
        return Protocols.ethereum.name;
      case "13881":
      case "0x13881":
      case "80001":
      case "0x80001":
      case "89":
      case "0x89":
      case "137":
        return Protocols.polygon.name;
      case "38":
      case "0x38":
      case "97":
      case "0x97":
      case "61":
      case "0x61":
        return Protocols.bsc.name;
      case "43114":
        return Protocols.avax.name;
      default:
        return null;
    }
  }

  static getRightNetwork(protocol) {
    if (CommonConstant.mode === "PRODUCTION") {
      switch (protocol) {
        case Protocols.ethereum.name:
          return "eth";
        case Protocols.polygon.name:
          return "polygon";
        case Protocols.bsc.name:
          return "bsc";
        default:
          return null;
      }
    } else {
      switch (protocol) {
        case Protocols.ethereum.name:
          return "goerli";
        case Protocols.polygon.name:
          return "mumbai";
        case Protocols.bsc.name:
          return "bsc testnet";
        default:
          return null;
      }
    }
  }

  static getNetworkText(network) {
    switch (network) {
      case "eth":
      case "goerli":
        return "Ethereum (ETH)";

      case "bsc":
      case "bsc testnet":
        return "Binance Smart Chain (BSC)";

      case "polygon":
        return "Polygon";
      case "mumbai":
        return "Polygon Mumbai";
      case "avax":
        return "Avalanche";
      default:
        return "";
    }
  }
  static getVersionParam = () => {
    let url = new URL(window.location.href);
    let version = url.searchParams.get("v");
    return version;
  };

  static getNetworkRpc(network) {
    switch (network) {
      case "eth":
        return "https://mainnet.infura.io/v3/";
      case "goerli":
        return "https://goerli.infura.io/v3/";
      case "bsc":
        return "https://speedy-nodes-nyc.moralis.io/482892835df3520a7ee8bb72/bsc/mainnet";
      case "bsc testnet":
        return "https://data-seed-prebsc-1-s1.binance.org:8545/";

      case "mumbai":
        return "https://rpc-mumbai.maticvigil.com/";
      case "polygon":
        return "https://polygon-rpc.com/";
      default:
        return "";
    }
  }

  static getNetworkExplorer(network) {
    switch (network) {
      case "eth":
      case "ethereum":
        return "https://etherscan.io";
      case "goerli":
        return "https://goerli.etherscan.io";
      case "bsc":
        return "https://bscscan.com";
      case "bsc testnet":
        return "https://testnet.bscscan.com";
      case "mumbai":
        return "https://mumbai.polygonscan.com/";
      case "polygon":
        return "https://polygonscan.com";
      case "avax":
        return "https://snowtrace.io/";
      default:
        return "";
    }
  }

  static getSymbol(network) {
    switch (network) {
      case "eth":
      case "goerli":
        return "eth";
      case "bsc":
      case "bsc testnet":
        return "bnb";
      case "polygon":
      case "mumbai":
        return "MATIC";
      case "avax":
        return "avax";
      default:
        return "";
    }
  }

  static getChainId(protocol) {
    switch (protocol) {
      case Protocols.ethereum.name:
      case Protocols.bsc.name:
      case Protocols.polygon.name:
      case Protocols.avax.name:
        return Protocols[protocol].chainId[
          CommonConstant.mode === "PRODUCTION" ? "mainnet" : "testnet"
        ];
      default:
        return null;
    }
  }

  static getOwnerAddress = async (tokenId, contractAddress, web3) => {
    const contract = new web3.eth.Contract(
      // marketplaceContractAbi,
      contractAddress
    );
    const ownerAddress = await contract?.methods.ownerOf(tokenId).call();
    return ownerAddress;
  };

  static getTokenId = (protocol, address, id) => {
    switch (protocol) {
      case Protocols.ethereum.name:
      case Protocols.bsc.name:
      case Protocols.polygon.name:
        return `${
          Protocols[protocol].tokenUrl[
            CommonConstant.mode === "PRODUCTION" ? "mainnet" : "testnet"
          ]
        }/${address}?a=${id}`;

      default:
        return null;
    }
  };

  static getTokenAddress(protocol, address) {
    switch (protocol) {
      case Protocols.ethereum.name:
      case Protocols.bsc.name:
      case Protocols.polygon.name:
        return `${
          Protocols[protocol].assetUrl[
            CommonConstant.mode === "PRODUCTION" ? "mainnet" : "testnet"
          ]
        }/${address}`;

      default:
        return null;
    }
  }

  static getTransaction(protocol, address) {
    switch (protocol) {
      case Protocols.ethereum.name:
      case Protocols.bsc.name:
      case Protocols.polygon.name:
        return `${
          Protocols[protocol].txUrl[
            CommonConstant.mode === "PRODUCTION" ? "mainnet" : "testnet"
          ]
        }/${address}`;

      default:
        return null;
    }
  }

  static getMaxLocked(protocol) {
    switch (protocol) {
      case Protocols.ethereum.name:
        return 39;
      case Protocols.bsc.name:
        return 51;
      default:
        return 10;
    }
  }

  static getOpalContractABI(protocol) {
    switch (protocol) {
      case Protocols.ethereum.name:
      case Protocols.bsc.name:
      // return Opal_ABI;

      default:
        return null;
    }
  }

  static getPaymentList = (chainId) => {
    switch (chainId) {
      case "goerli":
        return [
          {
            name: "Eth",
            symbol: "eth",
            address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
            // icon: Images.createcollection.ethereum,
            // image: Images.createcollection.ethereum,
            decimals: 18,
          },
          {
            name: "CTZN",
            symbol: "ctzn",
            address: "0xe313162BC76b4c3aE4a7aDFd698A5fC915f26247",
            // icon: Images.createcollection.ctzn,
            // image: Images.createcollection.ctzn,

            decimals: 18,
          },
          {
            name: "USDC",
            symbol: "usdc",
            address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            // icon: Images.createcollection.usdcoin,
            // image: Images.createcollection.usdcoin,
            decimals: 6,
          },
        ];
      case "polygon":
        return [
          {
            name: "Eth",
            symbol: "eth",
            address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
            // icon: Images.createcollection.ethereum,
            // image: Images.createcollection.ethereum,
            decimals: 18,
          },
          {
            name: "CTZN",
            symbol: "ctzn",
            address: "0xe313162BC76b4c3aE4a7aDFd698A5fC915f26247",
            // icon: Images.createcollection.ctzn,
            // image: Images.createcollection.ctzn,
            decimals: 18,
          },
          {
            name: "USDC",
            symbol: "usdc",
            address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            // icon: Images.createcollection.usdcoin,
            // image: Images.createcollection.usdcoin,
            decimals: 6,
          },
        ];
      case "eth":
      case "ethereum":
        return [
          {
            name: "Eth",
            symbol: "eth",
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            // icon: Images.createcollection.ethereum,
            // image: Images.createcollection.ethereum,
            decimals: 18,
            url: "https://app.uniswap.org/#/swap?outputCurrency=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&chain=mainnet",
          },
          {
            name: "CTZN",
            symbol: "ctzn",
            address: "0xA803778AB953d3FfE4FBD20Cfa0042eCeFE8319D",
            // icon: Images.createcollection.ctzn,
            // image: Images.createcollection.ctzn,
            decimals: 18,
            url: "https://app.uniswap.org/#/swap?outputCurrency=0xa803778ab953d3ffe4fbd20cfa0042ecefe8319d&chain=mainnet",
          },
          {
            name: "USDC",
            symbol: "usdc",
            address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            // icon: Images.createcollection.usdcoin,
            // image: Images.createcollection.usdcoin,
            decimals: 6,
            url: "https://app.uniswap.org/#/swap?outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&chain=mainnet",
          },
        ];

      default:
        return [];
    }
  };

  static getBalanceList = (chainId) => {
    switch (chainId) {
      case "13881":
      case "0x13881":
      case "80001":
      case "0x80001":
        return [];
      case "89":
      case "0x89":
        return [
          {
            name: "USD Coin (PoS)", // polygon mainnet
            symbol: "USDC",
            address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
            // icon: Images.createcollection.usdcoin,
            decimals: 6,
          },
        ];
      case "38":
      case "0x38":
        return [
          {
            name: "BSUD", // BSC mainnet
            symbol: "BSUD",
            address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
            // icon: Images.createcollection.usdcoin,
            decimals: 18,
          },
          {
            name: "Totem Earth Systems (CTZN)",
            symbol: "CTZN",
            address: "0xa803778ab953d3ffe4fbd20cfa0042ecefe8319d",
            // icon: Images.createcollection.ctzn,
            decimals: 18,
          },
        ];
      case "97":
      case "0x97":
        return [
          {
            name: "Wrapped BNB (WBNB)", // BSC testnet
            symbol: "WBNB",
            address: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
            // icon: Images.createcollection.ethereum,
            decimals: 18,
          },
        ];

      case "4":
        return [
          {
            name: "USDC",
            symbol: "USDC",
            address: "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
            // icon: Images.createcollection.usdcoin,
            decimals: 6,
          },
          {
            name: "Wrapped Ethereum",
            symbol: "WETH",
            // icon: Images.createcollection.ethereum,
            address: "0xc778417e063141139fce010982780140aa0cd5ab",
            decimals: 18,
          },
        ];
      case "1":
        return [
          {
            name: "Wrapped Ethereum",
            symbol: "WETH",
            // icon: Images.createcollection.ethereum,
            address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            decimals: 18,
          },
          {
            name: "CTZN",
            symbol: "ctzn",
            address: "0xA803778AB953d3FfE4FBD20Cfa0042eCeFE8319D",
            // icon: Images.createcollection.ctzn,
            decimals: 18,
          },
        ];

      default:
        return [];
    }
  };

  static getMintingContractAddress = (chainId) => {
    switch (chainId) {
      case "4":
        return "";
      case "137":
        return "0x91da3864FBfC91bF76f43c980bBd27DA1d1834d3";
      case "1":
        return "0x0B572F91a7450efA5379cd809b4158E717073F00";
      default:
        return "";
    }
  };

  static blockchainList = [
    {
      name: "Ethereum",
      value: "ethereum",
    },
    // {
    //     name: 'Polygon',
    //     value: 'polygon',
    // },
  ];

  static marketplacePaymentList = (chainId) => {
    return ContractUtility.getPaymentList(chainId);
  };

  static getPaymentTokenBySymbol = (symbol, chainId) => {
    const list = ContractUtility.getPaymentList(chainId);
    const token = list.filter((item) => {
      return item.symbol === symbol;
    });
    return token[0];
  };

  static getPaymentToken = (value, chainId) => {
    const list = ContractUtility.getPaymentList(chainId);
    const token = list.filter((item) => {
      return item.address.toLowerCase() === value.toLowerCase();
    });
    return token[0];
  };

  static getProtocolChainId = (protocol) => {
    switch (protocol) {
      case "polygon":
        return "0x89";
      case "ethereum":
        return "0x1";
      default:
        return "";
    }
  };

  static getMarketplaceNetwork = (protocol) => {
    switch (protocol) {
      case "polygon":
        return "polygon";
      case "ethereum":
        return "eth";
      default:
        return "";
    }
  };

  static getEtherBalance = async (web3, address) => {
    return +web3.utils.fromWei(await web3.eth.getBalance(address), "ether");
  };

  static checkIntegerSign(value) {
    let x = Math.sign(value);
    if (x == 1) {
      return true;
    } else if (x == -1) {
      return false;
    } else {
      return false;
    }
  }
}
