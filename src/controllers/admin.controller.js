import { getProfileService, loginAdminService, registerAdminService } from "../services/admin.service.js";

export const registerAdmin = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required",
      });
    }

    const admin =
      await registerAdminService({
        name,
        email,
        password,
        role,
      });

    res.status(201).json({
      success: true,
      message:
        "Admin registered successfully",
      data: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to register admin",
    });
  }
};

export const loginAdmin = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

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
  } catch (error) {
    console.log(error);

    res.status(401).json({
      success: false,
      message:
        error.message ||
        "Invalid credentials",
    });
  }
};

export const getProfile = async (
  req,
  res
) => {
  try {
    const admin =
      await getProfileService(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to fetch profile",
    });
  }
};