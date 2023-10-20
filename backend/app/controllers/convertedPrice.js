const { priceConversion } = require("./../utils/externalApiCalls")
const { objectToParams } = require("./../utils/common")
const logger = require("../../logger");

const convertPrice = async (ctx) => {
  try {
    const data = ctx.request.query

    logger.info({ inputs: ctx.request.query });

    const url = `/v2/tools/price-conversion?${objectToParams(data)}`
    const convertedPrice = await priceConversion(url)

    if (convertedPrice.error) throw convertedPrice.error

    ctx.body = {
      response: "success",
      data: convertedPrice.data,
    }

  } catch (error) {
    logger.error({
      error,
      inputs: ctx.request.query,
    });
    ctx.status = 500;
    ctx.body = {
      response: "failure",
      error: error,
    };
  }
};

module.exports = {
  convertPrice,
};
