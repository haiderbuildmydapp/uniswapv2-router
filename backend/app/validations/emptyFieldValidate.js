const logger = require("../../logger");
const requestIp = require("request-ip");

//validate values in body
const validate = async (ctx, next, keys) => {
  try {
    logger.info({
      inputs: ctx.request.body,
      clientIp: requestIp.getClientIp(ctx.request),
      endpoint: ctx.request.url,
    });
    keys.map((key) => {
      if (!ctx.request.body[key]) throw `${key} is required`;
    });
    return next();
  } catch (err) {
    logger.error({
      error: err,
      endpoint: ctx.request.url,
      clientIp: requestIp.getClientIp(ctx.request),
      inputs: ctx.request.body,
    });
    ctx.status = 422;
    return (ctx.body = {
      response: "failure",
      error: err,
    });
  }
};

//validate values in params
const validateParams = async (ctx, next, keys) => {
  try {
    logger.info({
      inputs: ctx.request.params,
      clientIp: requestIp.getClientIp(ctx.request),
      endpoint: ctx.request.url,
    });
    keys.map((key) => {
      if (!ctx.request.params[key]) throw `${key} is required`;
    });
    return next();
  } catch (err) {
    logger.error({
      error: err,
      endpoint: ctx.request.url,
      clientIp: requestIp.getClientIp(ctx.request),
      inputs: ctx.request.params,
    });
    return (ctx.body = {
      response: "failure",
      status: 422,
      error: err,
    });
  }
};

module.exports = {
  validate,
  validateParams,
};
