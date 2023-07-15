import axios from "axios";
import UserType, {
  Login,
  UserFullType,
  UserRegistered,
  NormalizedEditUser,
} from "../models/types/userType";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const login = async (user: Login) => {
  try {
    const { data } = await axios.post<string>(`${apiUrl}/users/login`, user);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const signup = async (normalizedUser: UserType) => {
  try {
    const { data } = await axios.post<UserRegistered>(
      `${apiUrl}/users`,
      normalizedUser
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getUserData = async (userId: string) => {
  try {
    const { data } = await axios.get<UserFullType>(`${apiUrl}/users/${userId}`);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("unexpected error has occured");
  }
};

export const editUser = async (normalizedUser: NormalizedEditUser) => {
  try {
    const userToServer = { ...normalizedUser };
    delete userToServer.password;

    const { data } = await axios.put<UserFullType>(
      `${apiUrl}/users/${normalizedUser._id}`,
      userToServer
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("unexpected error has occured");
  }
};

export const ChangeUserStatus = async (userId: string | undefined) => {
  try {
    const { data } = await axios.patch<UserFullType>(
      `${apiUrl}/users/${userId}`
    );

    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error has occurred!");
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/users/${userId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
  }
};
