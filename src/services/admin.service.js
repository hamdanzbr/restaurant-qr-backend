import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerAdminService = async ({
  name,
  email,
  password,
  role,
}) => {
  const existingAdmin =
    await prisma.admin.findUnique({
      where: {
        email,
      },
    });

  if (existingAdmin) {
    throw new Error(
      "Admin with this email already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const admin = await prisma.admin.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return admin;
};

export const loginAdminService = async ({
  email,
  password,
}) => {
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (!admin) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatch =
    await bcrypt.compare(
      password,
      admin.password
    );

  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    admin,
    token,
  };
};

export const getProfileService =
  async (id) => {
    return await prisma.admin.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  };