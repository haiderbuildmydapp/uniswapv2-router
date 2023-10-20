const { BlacklistTokens } = require("../schemas/blacklistTokenSchema");
const logger = require("../../logger");

class BlacklistTokenModel {
  async createBlacklistToken() {
    try {
      const data = await BlacklistTokens.create({
        user_id: obj.id,
        iat: obj.iat,
        exp: obj.exp,
        token: token,
      });

      if (!data) throw "not inserted";
      return data;
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  async getToken() {
    try {
      const result = await BlacklistTokens.find({
        $and: [{ token: token }],
      });

      return result;
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }
}
const BlacklistTokenService = new BlacklistTokenModel();
Object.freeze(BlacklistTokenService);

module.exports = {
  BlacklistTokenService,
};
