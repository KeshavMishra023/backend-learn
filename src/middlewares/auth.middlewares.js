import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asynchandler";
import jwt from "jsonwebtoken";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "UnAuthorization request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);

    const user = await User.findOne(decodedToken?._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      throw new ApiError(401, "invalid token access");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token ")
  }
});
