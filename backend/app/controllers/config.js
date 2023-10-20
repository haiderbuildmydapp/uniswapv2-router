const { env } = require("../../environment");

const getConfig = async (ctx) => {
  try {
    const data = {
      RPC: env.RPC,
      BLOCK_NUMBER: env.BLOCK_NUMBER,
      SOCKET_URL: env.SOCKET_URL,
      ERC20_CONTRACT: env.ERC20_CONTRACT,
    };

    ctx.body = {
      response: "success",
      data,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      response: "failure",
      error: error,
    };
  }
};

module.exports = { getConfig };
