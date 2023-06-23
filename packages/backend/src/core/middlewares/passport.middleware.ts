import { isEqual } from "lodash";
import passport from "passport";
import passportJWT, { StrategyOptions } from "passport-jwt";
import passportLocal from "passport-local";
import { AccountDao } from "../../common/dao/account.dao";
import { Password } from "../security/password.security";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

export class Passport {
  private opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_HASH_KEY,
    algorithms: ["HS512"],
  };

  constructor() {}

  usePassportJWT() {
    passport.use(
      new JwtStrategy(this.opts, function (jwt_payload, done) {
        const accountDao = new AccountDao();
        const userId = jwt_payload?.info?.id;
        return accountDao
          .findOne({ id: userId }, { profile: true })
          .then((res) => done(null, res))
          .catch((error) => done(error, false));
      })
    );
  }

  useLocalJWT() {
    passport.use(
      new LocalStrategy(function (username, password, done) {
        const accountDao = new AccountDao();
        return accountDao
          .findOne({ email: username })
          .then((res) => {
            const passwordDecrypt = new Password();
            const decryptPassword = passwordDecrypt.decryptPassword(
              res.hash_password,
              res.hash_key
            );

            if (!isEqual(password, decryptPassword)) {
              return done(null, res);
            }

            return done(null, false);
          })
          .catch((err) => done(err));
      })
    );
  }
}
