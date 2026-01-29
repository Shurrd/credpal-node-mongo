import { IUser } from "../../interfaces/user.interface";
import bcrypt from "bcrypt";
import { User } from "../../models/user.model";
import { CustomError } from "../../utils/customError";
import jwt from "jsonwebtoken";

export const register = async (body: IUser) => {
  const existingUser = await User.findOne({
    username: body.username,
  });

  if (existingUser) throw new CustomError("User already exists", 409);

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await User.create({
    ...body,
    password: hashedPassword,
    fullName: `${body.firstName} ${body.lastName}`,
  });

  return {
    _id: newUser._id,
    username: newUser.username,
    fullName: newUser.fullName,
  };
};

export const login = async (body: IUser) => {
  const user = await User.findOne({
    username: body.username,
  });

  if (!user) throw new CustomError("Invalid credentials", 404);

  const isPasswordValid = await bcrypt.compare(body.password, user.password);

  if (!isPasswordValid) throw new CustomError("Invalid credentials", 404);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return token;
};
