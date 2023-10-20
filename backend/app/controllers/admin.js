const {
  passwordUpdate,
  userNameUpdate,
  insertCredentials,
  adminLogin,
} = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const SHA256 = require("crypto-js/sha256");
const { env } = require("../../environment");
const { generateHashPass } = require("../utils/common");
const logger = require("../../logger");

const createCredentials = async (ctx) => {
  try {
    logger.info({ login: ctx.body });
    const result = await insertCredentials();
    if (result.error) throw result.error;
    ctx.body = {
      response: "success",
      data: result,
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = {
      response: "failure",
      error: error,
    };
  }
};

const login = async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    const data = await adminLogin(username);

    if (data.error) throw data.error;

    if (data.length == 0) {
      ctx.status = 404;
      ctx.body = {
        response: "failure",
        error: "user name not found",
      };
    } else {
      if (data[0].password != generateHashPass(password)) {
        ctx.status = 404;
        ctx.body = {
          response: "failure",
          error: "password is incorrect",
        };
      } else {
        const token = jwt.sign(
          { id: data[0]._id },
          JSON.stringify(SHA256(env.ADMIN_TOKEN).words),
          { expiresIn: "1d" }
        );

        ctx.body = {
          response: "success",
          data: { token: token },
        };
      }
    }
  } catch (error) {
    logger.error({ error, inputs: ctx.request.body });
    ctx.status = 500;
    ctx.body = {
      response: "failure",
      error: error,
    };
  }
};

const updatePassword = async (ctx) => {
  try {
    logger.info({ inputs: ctx.request.body });
    const { new_password, current_password } = ctx.request.body;
    const theToken = ctx.request.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(
      theToken,
      JSON.stringify(SHA256(env.ADMIN_TOKEN).words)
    );
    const currentEncryptPass = generateHashPass(current_password);
    const newEncryptedPass = generateHashPass(new_password);
    const updated = await passwordUpdate(
      decoded.id,
      currentEncryptPass,
      newEncryptedPass
    );

    if (updated.error) {
      throw updated.error;
    } else
      ctx.body = {
        response: "success",
        data: updated,
      };
  } catch (error) {
    logger.error({ error, inputs: ctx.request.body });
    // return error
    ctx.status = 500;
    ctx.body = {
      response: "failure",
      error: error,
    };
  }
};

const updateUserName = async (ctx) => {
  try {
    logger.info({ inputs: ctx.request.body });
    const theToken = ctx.request.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(
      theToken,
      JSON.stringify(SHA256(env.ADMIN_TOKEN).words)
    );
    const userName = ctx.request.body.username;
    const result = await userNameUpdate(decoded.id, userName);

    if (result.error) throw result.error;

    ctx.body = {
      response: "success",
      data: result,
    };
  } catch (error) {
    logger.error({
      error,
      inputs: ctx.request.headers.authorization.split(" ")[1],
    });
    ctx.status = 500;
    ctx.body = {
      response: "failure",
      error: error,
    };
  }
};

const checkAuth = async (ctx) => {
  ctx.body = {
    response: "success",
    data: {auth: true},
  };
};

module.exports = {
  updatePassword,
  updateUserName,
  createCredentials,
  login,
  checkAuth,
};
