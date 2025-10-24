/* eslint-disable no-undef */

import { PrismaClient } from "../src/Infrastructure/Database/Prisma/index.js";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed your data here
  if ((await prisma.user.count()) === 0)
    await prisma.user.createMany({
      data: users(),
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

//Seed Data--------------------------------------------------------------
function users(count = 10) {
  const users = [];

  for (let i = 1; i <= count; i++) {
    const firstName = `John${i}`;
    const lastName = `Doe${i}`;
    const username = `User${i}`.toLowerCase();
    const email = `${username.toLowerCase()}@example.com`;

    // Use a deterministic password for the seed (e.g., "password{i}")
    const rawPassword = `123`;
    const passwordHash = hashSync(rawPassword, 10);

    users.push({
      firstName,
      lastName,
      username,
      email,
      password: passwordHash,
    });
  }

  return users;
}

/* function products(count) {
  const products = [];

  while (products.length < count) {
    const productDto = {
      name: "کالای نمونه " + Math.floor(Math.random() * 10000),
      price: parseFloat(Math.random() * 1000000),
      stock: Math.floor(Math.random() * 100),
      image: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
      description: "این توضیحی برای محصول است.",
    };

    const newProduct = {
      name: productDto.name,
      price: productDto.price,
      stock: productDto.stock,
      image: productDto.image || null,
      description: productDto.description || null,
    };

    products.push(newProduct);
  }
  console.log(products);

  return products;
} */
