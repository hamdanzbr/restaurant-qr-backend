export const errorHandler = (
  error,
  req,
  res,
  next
) => {
  console.log(error);

  // Prisma unique constraint
  if (error.code === "P2002") {
    return res.status(400).json({
      success: false,
      message:
        "Record already exists",
    });
  }

  return res.status(
    error.statusCode || 500
  ).json({
    success: false,
    message:
      error.message ||
      "Internal Server Error",
  });
};