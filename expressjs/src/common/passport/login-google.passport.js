// var GoogleStrategy = require("passport-google-oauth20").Strategy;
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../constant/app.constant.js";
import { prisma } from "../prisma/connect.prisma.js";
import { signAccessToken, signRefreshToken } from "../helpers/jwt.helper.js";

export const initLoginGooglePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3069/api/auth/google/callback",
      },
      async function (accessTokenGG, refreshTokenGG, profile, cb) {
        console.dir(
          { accessTokenGG, refreshTokenGG, profile },
          {
            depth: null,
            color: true,
          },
        );

        const fullName = profile.displayName;
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const isEmailVerified = profile.emails[0].verified;
        const avatar = profile.photos[0].value;

        console.log({ fullName, googleId, email, isEmailVerified, avatar });
        if (!isEmailVerified) {
          return cb("Email chưa được xác minh", null);
        }

        let user = await prisma.users.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          user = await prisma.users.create({
            data: {
              email: email,
              fullName: fullName,
              googleId: googleId,
              avatar: avatar,
            },
          });
        }

        const payload = {
          userId: user.id,
          email: user.email,
        };
        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);
        //hợp lệ
        return cb(null, { accessToken, refreshToken });
      },
    ),
  );
};
