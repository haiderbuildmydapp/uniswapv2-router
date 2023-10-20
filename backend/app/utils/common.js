const SHA256 = require("crypto-js/sha256");


const generateHashPass = (password) => {
  return JSON.stringify(SHA256(password).words);
};

const objectToParams = obj => {
  let str = ''
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      if (str !== '') {
        str += '&'
      }
      str += key + '=' + encodeURIComponent(obj[key])
    }
  }
  return str
}


module.exports = {
  generateHashPass,
  objectToParams
};
