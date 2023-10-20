import { ToastMessage } from "components/common";
import { Protocols } from "./constant";
import { AbiItem } from "web3-utils";
import { BN } from "bn.js";

const queryString = require("query-string");

export class CommonUtility {
  static convertFromWei(weiInput, decimals, commas) {
    if (weiInput && decimals) {
      var wei = numberToBN(weiInput); // eslint-disable-line
      var negative = wei.lt(this.zero); // eslint-disable-line
      var base = this.getValueOfUnit(decimals);
      // var baseLength = unitMap[unit].length - 1 || 1;
      var baseLength = this.addZeros(decimals).length - 1 || 1;

      var options = {
        pad: false,
        commify: commas,
      };

      if (negative) {
        wei = wei.mul(this.negative1);
      }

      var fraction = wei.mod(base).toString(10); // eslint-disable-line

      while (fraction.length < baseLength) {
        fraction = "0" + fraction;
      }

      if (!options.pad) {
        fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
      }

      var whole = wei.div(base).toString(10); // eslint-disable-line

      if (options.commify) {
        whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      var value = "" + whole + (fraction == "0" ? "" : "." + fraction); // eslint-disable-line

      if (negative) {
        value = "-" + value;
      }

      return value;
    }
  }

  static convertToWei(etherInput, decimals) {
    const regex = new RegExp(`^(\\d*\\.\\d{0,${decimals}})\\d*`);
    let etherInp =
      Number(etherInput) < 0.0001
        ? etherInput.toString()
        : etherInput.toLocaleString("fullwide", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 18,
            useGrouping: false,
          });
    etherInp = etherInp.replace(regex, "$1");

    var ether = this.numberToString(etherInp); // eslint-disable-line
    var base = this.getValueOfUnit(decimals);
    // var baseLength = unitMap[unit].length - 1 || 1;
    var baseLength = this.addZeros(decimals).length - 1 || 1;

    // Is it negative?
    var negative = ether.substring(0, 1) === "-"; // eslint-disable-line
    if (negative) {
      ether = ether.substring(1);
    }

    if (ether === ".") {
      throw new Error(
        "[ethjs-unit] while converting number " +
          etherInp +
          " to wei, invalid value"
      );
    }

    // Split it into a whole and fractional part
    var comps = ether.split("."); // eslint-disable-line
    if (comps.length > 2) {
      throw new Error(
        "[ethjs-unit] while converting number " +
          etherInp +
          " to wei,  too many decimal points"
      );
    }

    var whole = comps[0],
      fraction = comps[1]; // eslint-disable-line

    if (!whole) {
      whole = "0";
    }
    if (!fraction) {
      fraction = "0";
    }
    if (fraction.length > baseLength) {
      throw new Error(
        "[ethjs-unit] while converting number " +
          etherInp +
          " to wei, too many decimal places"
      );
    }

    while (fraction.length < baseLength) {
      fraction += "0";
    }

    whole = new BN(whole);
    fraction = new BN(fraction);
    var wei = whole.mul(base).add(fraction); // eslint-disable-line

    if (negative) {
      wei = wei.mul(this.negative1);
    }
    let res = new BN(wei.toString(10), 10);
    return res.toString();
  }

  static truncateDecimals(num, decimalPlaces) {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.trunc(num * multiplier) / multiplier;
  }

  static zero = new BN(0);
  static negative1 = new BN(-1);
  static numberToString(arg) {
    if (typeof arg === "string") {
      if (!arg.match(/^-?[0-9.]+$/)) {
        throw new Error(
          "while converting number to string, invalid number value '" +
            arg +
            "', should be a number matching (^-?[0-9.]+)."
        );
      }
      return arg;
    } else if (typeof arg === "number") {
      return String(arg);
    } else if (
      typeof arg === "object" &&
      arg.toString &&
      (arg.toTwos || arg.dividedToIntegerBy)
    ) {
      if (arg.toPrecision) {
        return String(arg.toPrecision());
      } else {
        // eslint-disable-line
        return arg.toString(10);
      }
    }
    throw new Error(
      "while converting number to string, invalid number value '" +
        arg +
        "' type " +
        typeof arg +
        "."
    );
  }

  static getValueOfUnit(decimals) {
    var unitValue = this.addZeros(decimals); // eslint-disable-line

    if (typeof unitValue !== "string") {
      throw new Error(
        "[ethjs-unit] the unit provided " +
          decimals +
          " doesn't exists, please use the one of the following units " +
          JSON.stringify(unitValue, null, 2)
      );
    }

    return new BN(unitValue, 10);
  }

  static isEthereumAddress(address) {
    if (typeof address !== "string") {
      return false;
    }
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      return false;
    }
    return true;
  }

  static decFixed(val, dec) {
    if (val && dec) {
      const regex = new RegExp(`^(\\d*\\.\\d{0,${dec}})\\d*`);
      let res = val.toString().replace(regex, "$1");
      return res;
    } else {
      return val;
    }
  }

  static currencyFormat(value, currency) {
    if (Number.isNaN(value || 0)) {
      return value;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(value || 0);
  }

  static isNotEmpty(item) {
    return (
      item !== undefined && item !== null && item !== "" && item.length !== 0
    );
  }

  static addZeros(x) {
    if (x === 0) {
      return "1";
    } else {
      return "1" + "0".repeat(x);
    }
  }

  static truncateString(text, ellipsisString) {
    return (text || "").length > ellipsisString
      ? `${text.substring(0, ellipsisString)}...`
      : text;
  }

  static numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  static handleMulDecimals = (value, tokenDecimals, decimals) => {
    return (value * 10 ** tokenDecimals).toFixed(decimals).toString();
  };

  static handleDivDecimals = (value, tokenDecimals, decimals) => {
    return (value / 10 ** tokenDecimals).toFixed(decimals).toString();
  };

  static dottedString = (x) => {
    return `${x?.slice(0, 6)}...${x?.slice(36, 42)}`;
  };

  static objectToParams(obj) {
    const str = queryString.stringify(obj);
    return str;
  }

  static toTitleCase(phrase) {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  static timeoutPromise(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static roundNumber(num, decimals = 6) {
    const t = 10 ** decimals;
    let result = Math.round((num + Number.EPSILON) * t) / t;
    if (num < 0) {
      result *= -1;
    }
    return result;
  }

  static decimalConverter(number, exponent) {
    const decimals = (number * 10 ** exponent).toFixed(0).toString();
    return decimals;
  }

  static addressConvertor(address) {
    if ((address || "").length < 10) {
      return address || "";
    }
    return `${address.slice(0, 4)}...${address.slice(address.length - 6)}`;
  }
  static nftIdConvertor = (nftId) => {
    const id = nftId.toString();
    if ((id || "").length < 5) {
      return id || "";
    }
    return `${id.slice(0, 3)}...${id.slice(id.length - 4)}`;
  };

  static isValidURL = (str) => {
    const regex =
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return regex.test(str);
  };

  static copyToClipboard = (text, toastMessage) => {
    ToastMessage("Copied", toastMessage, "success");
    navigator.clipboard.writeText(text);
  };

  // static csvToJson = async (event, setJson) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const files = event.target.files;
  //     if (files) {
  //       await Papa.parse(files[0], {
  //         complete: (results) => {
  //           setJson(results.data);
  //         },
  //         header: true,
  //         skipEmptyLines: true,
  //       });
  //     }
  //   }
  // };

  // static ipfsClient = async (file) => {
  //   try {
  //     const address = "https://ipfs.infura.io:5001/api/v0";
  //     const client = create(address);
  //     const result = await client.add(file);
  //     const url = `${app.IPFS_PATH}/${result.path}`;
  //     return url;
  //   } catch (error) {
  //     console.log(error, "ipfsError");
  //   }
  // };

  static networkShould = (chainId) => {
    switch (chainId) {
      case "137":
      case "0x89":
        return true;
        break;
      case "0x4":
      case "4":
        return true;
        break;
      case "0x1":
      case "1":
        return true;
        break;
      default:
        return false;
    }
  };

  static symbolConvertor(symbol) {
    switch (symbol) {
      case "Cake-LP":
        return "CTZN/BUSD Cake-LP";
      case "UNI-V2":
        return "CTZN/USDC UNI-LP";

      default:
        return symbol;
    }
  }

  static nameConvertor(name, protocol = Protocols.ethereum.name) {
    switch (name) {
      case "Pancake LPs":
        return "CTZN/BUSD Cake-LP";
      case "UNI-V2":
      case "Uniswap V2":
        return "$CTZN / ETH Uni-LP";
      case "Totem Earth Systems":
        return protocol === Protocols.ethereum.name
          ? "CTZN ERC Staking"
          : "CTZN BSC Staking";
      default:
        return name;
    }
  }

  static numFormatter(num) {
    if (!num) return num;
    if (num > 999 && num < 1000000) {
      return `${(num / 1000).toFixed(1)}K`; // convert to K for number from > 1000 < 1 million
    }
    if (num > 1000000) {
      return `${(num / 1000).toFixed(1)}K`; // convert to M for number from > 1 million
    }
    if (num > 1 && num < 900) {
      console.log("num", num);
      return num.toFixed(0); // if value < 1000, nothing to do
    }
    if (num < 0) {
      return num.toFixed(4);
    }
    return num;
  }

  static makeNftId = (tokenAddress, tokenId) => {
    return `${tokenAddress}-${tokenId}`;
  };
  static deStructureNftId = (nftId) => {
    const tokenId = nftId.substring(nftId.indexOf("-") + 1).trim();
    const tokenAddress = nftId.substring(0, nftId.indexOf("-")).trim();
    return {
      tokenAddress,
      tokenId,
    };
  };

  static contract(web3, abi, address) {
    return new web3.eth.Contract(abi, address);
  }

  static mm_dd_yy = (date) => {
    const d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    const year = d.getFullYear();
    if (month.length === 1) month = `0${month}`;
    if (day.length === 1) day = `0${day}`;
    return `${month}-${day}-${year}`;
  };

  static mm_yy = (date) => {
    const d = new Date(date);
    let month = d.getMonth().toString();
    const year = d.getFullYear();

    switch (month) {
      case "0":
        month = "January";
        break;
      case "1":
        month = "Feburary";
        break;
      case "2":
        month = "March";
        break;
      case "3":
        month = "April";
        break;
      case "4":
        month = "May";
        break;
      case "5":
        month = "June";
        break;
      case "6":
        month = "July";
        break;
      case "7":
        month = "August";
        break;
      case "8":
        month = "September";
        break;
      case "9":
        month = "October";
        break;
      case "10":
        month = "November";
        break;
      case "11":
        month = "December";
        break;
    }
    return `${month} ${year}`;
  };

  static validatePattern = (pattern, value) => {
    const regex = new RegExp(pattern);
    return regex.test(value);
  };

  static imagePreview = (file) => {
    if (file && file.type.match("image.*")) {
      const url = URL.createObjectURL(file);
      return url;
    }
  };
  static dynamicSort = (property) => {
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return (a, b) => {
      let result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };

  // static validateAddress = (address, token) => {
  //   var valid = WAValidator.validate(address, token);
  //   if (valid) {
  //     return valid;
  //   } else {
  //     return valid;
  //   }
  // };

  static removeTrailingZeroes = (num) => {
    return parseFloat(num.toString().match(/^\d+.\d{2}(?=0*$|\d)/))
      ? parseFloat(num.toString().match(/^\d+.\d{2}(?=0*$|\d)/)[0])
      : num;
  };
  static countDropIdOccurrences = (arr, dropId) => {
    return arr.reduce((count, obj) => {
      if (+obj.drop_id === +dropId) {
        count++;
      }
      return count;
    }, 0);
  };

  static countNFTsByNFTId = (array, nftId) => {
    let count = 0;
    for (let i = 0; i < array?.length; i++) {
      if (+array[i]?.template_id?.nft_id == +nftId) {
        count++;
      }
    }
    return count;
  };

  static calculateTotalFeesAndAmount = (signedOrder) => {
    // Calculate the sum of amounts from the fees array
    const feesTotal = signedOrder.fees.reduce(
      (total, fee) => total + parseInt(fee.amount),
      0
    );
    const erc20TokenAmount = parseInt(signedOrder.erc20TokenAmount);
    const totalSum = feesTotal + erc20TokenAmount;
    return totalSum.toString();
  };

  static round(x) {
    if (x) {
      return x.toFixed(5).replace(/\.?0*$/g, "");
    } else {
      return "00.00";
    }
  }
  static toWei(decimals) {
    switch (decimals) {
      case "1":
        return "wei";
      case "3":
        return "Kwei";
      case "6":
        return "mwei";
      case "9":
        return "gwei";
      case "12":
        return "szabo";
      case "18":
        return "ether";
      case "21":
        return "kether";
      case "24":
        return "mether";
      case "27":
        return "gether";
      case "30":
        return "tether";
      default:
        return "ether";
    }
  }

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
