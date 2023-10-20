const koaRouter = require("koa-router");
const { validate } = require("../validations/emptyFieldValidate");
const { validateToken } = require("../validations/tokenValidate");

const {
  updatePassword,
  updateUserName,
  createCredentials,
  checkAuth,
  login,
} = require("../controllers/admin");
const { convertPrice } = require("../controllers/convertedPrice");
const { addBlacklistToken } = require("../controllers/blacklistController");
const { getConfig } = require("../controllers/config");

const router = new koaRouter();

//admin routes
router.post("/insert-credentials", createCredentials);
router.post(
  "/login",
  (ctx, next) => validate(ctx, next, ["username", "password"]),
  login
);
router.put(
  "/update-password",
  validateToken,
  (ctx, next) => validate(ctx, next, ["new_password", "current_password"]),
  updatePassword
);
router.put(
  "/update-username",
  validateToken,
  (ctx, next) => validate(ctx, next, ["username"]),
  updateUserName
);
router.get("/auth", validateToken, checkAuth);
router.post("/blacklist-token", validateToken, addBlacklistToken);

router.get("/convert-price", convertPrice);
// config
router.get("/get-config", getConfig);
module.exports = { router };
