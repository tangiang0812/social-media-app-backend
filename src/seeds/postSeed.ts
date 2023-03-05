import { faker } from "@faker-js/faker";
import prisma from "../db/prisma";

import * as unsplashImages from "./unsplashRandomImages.json";

async function createUser() {
  await prisma.user.deleteMany();
  const user = await prisma.user.create({
    data: {
      email: "tangiang@gmail.com",
      password: "tangiang",
      givenName: "Sieu dep trai Gaing",
      familyName: "Nguyen",
    },
  });
  return user;
}

function createRandomPost(userId: string, mediaLocation: string) {
  return {
    content: faker.lorem.paragraph(),
    mediaLocation: mediaLocation,
    userId: userId,
    totalLikes: parseInt(faker.random.numeric(4)),
  };
}

async function main() {
  console.log(unsplashImages);
  const user = await createUser();
  console.log(user);
  for (let i = 0; i < 30; i++) {
    const post = createRandomPost(user.id, unsplashImages[i].urls.small);
    await prisma.post.create({
      data: post,
    });
    console.log(post);
  }
  /* const post = createRandomPost(user.id); */
  /* console.log(post); */
}

main();
