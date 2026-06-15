import {
  getProfileService,
  loginAdminService,
  registerAdminService,
} from "../services/admin.service.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const admin = await registerAdminService({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    success: true,
    message: "Admin registered successfully",
    data: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

export const loginAdmin =
  asyncHandler(async (req, res) => {
    const { email, password } =
      req.body;

    const { admin, token } =
      await loginAdminService({
        email,
        password,
      });

    res.status(200).json({
      success: true,
      token,
      data: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  });

export const getProfile =
  asyncHandler(async (req, res) => {
    const admin =
      await getProfileService(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: admin,
    });
  });
