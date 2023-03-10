import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import verifyPassword from "../utils/verifyPassword";
import prisma from "./prisma";

export function passportConfig(passport: PassportStatic) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // specify the name of the email field
        passwordField: "password",
      },
      async function verify(email, password, done) {
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
            email: true,
            password: true,
          },
        });
        if (user) {
          if (await verifyPassword(password, user.password)) {
            const { id, email } = user;
            done(null, { id, email });
          } else {
            done(null, false);
          }
        } else {
          done(null, false);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    const { id, email } = user;
    done(null, { id, email });
  });

  passport.deserializeUser(async function (user: Express.User, done) {
    done(null, user);
  });
}
