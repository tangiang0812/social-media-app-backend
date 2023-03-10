import dotenv from "dotenv";
import express from "express";

import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

import passport from "passport";

import prismaMiddleware from "./middlewares/prisma";

import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";

/* import { */
/*   clientErrorHandler, */
/*   errorHandler, */
/*   logErrors, */
/* } from "./middlewares/errorHandling"; */

import { passportConfig } from "./config/passport";

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

prismaMiddleware();

app.use(express.json());

let redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
});

passportConfig(passport);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "realysecuresecret",
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    /* unset: "destroy",// clear session record in redisdb */
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

/* app.use(logErrors); */
/* app.use(clientErrorHandler); */
/* app.use(errorHandler); */

app.listen(port || 8000, () => {
  console.log(`Listening on port ${port}`);
});
