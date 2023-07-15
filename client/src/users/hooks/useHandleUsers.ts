import { useState, useCallback, useMemo } from "react";
import useAxios from "../../hooks/useAxios";
import { ChangeUserStatus, editUser, login, signup } from "../service/userApi";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../service/localStorage";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../../routes/routesModel";
import {
  Login,
  RegistrationForm,
  TokenType,
  UserFromClientType,
  UserFullType,
} from "../models/types/userType";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useSnack } from "../../providers/SnackbarProvider";
import normalizeEditUser from "../helpers/normalization/normalizeEditUser";
import { getUserData, deleteUser } from "../service/userApi";

const useHandleUsers = () => {
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserFullType | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setBlocked] = useState(false);
  const snack = useSnack();
  useAxios();
  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();

  const requestStatus = useCallback(
    (
      loading: boolean,
      errorMessage: string | null,
      user: null | TokenType = null,
      userData: null | UserFullType = null
    ) => {
      setLoading(loading);
      setError(errorMessage);
      setUser(user);
      setUserData(userData);
    },
    [setUser, setUserData]
  );

  const handleLogin = useCallback(
    async (user: Login) => {
      try {
        if (isBlocked) {
          snack("error", "you account is blocked, please try again later");
          return;
        }

        setLoading(true);
        const token = await login(user);
        setTokenInLocalStorage(token);
        setToken(token);
        const userFromLocalStorage = getUser();
        requestStatus(false, null, userFromLocalStorage);
        navigate(ROUTES.CARDS);
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null);
        snack("error", "eror: incorrect email/ password");

        setFailedAttempts((pervAtempt) => pervAtempt + 1);
        if (failedAttempts >= 2) {
          setBlocked(true);
          snack(
            "error",
            "You have typed wrong email or password to many times, your account has been blocked for 3 minuts.Please try again later"
          );
          setTimeout(() => setBlocked(false), 180 * 1000);
        }
      }
    },
    [navigate, requestStatus, setToken, snack, isBlocked, failedAttempts]
  );

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]);

  const handleSignup = useCallback(
    async (user: RegistrationForm) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeUser(user);
        await signup(normalizedUser);
        await handleLogin({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    [handleLogin, requestStatus]
  );

  const handleUpdateUser = useCallback(
    async (userFromClient: UserFromClientType) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeEditUser(userFromClient);
        const userFromServer = await editUser(normalizedUser);
        setUserData(userFromServer);
        requestStatus(false, null, null, userFromServer);
        snack("success", "user's detailes successfully updated");
        navigate(ROUTES.MY_CARDS);
      } catch (error) {
        if (typeof error === "string") return requestStatus(false, error, null);
      }
    },
    [snack]
  );

  const handleGetUser = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      const userData = await getUserData(userId);
      requestStatus(false, null, user, userData);
      return userData;
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null);
    }
  }, []);

  const handleDeleteUser = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      await deleteUser(userId);
      snack("success", "The user has been successfully deleted");
    } catch (error) {
      if (typeof error === "string") return requestStatus(false, error, null);
    }
  }, []);

  const handleChangeUserStatus = useCallback(async (userId: string = "") => {
    try {
      setLoading(true);
      const user = await ChangeUserStatus(userId);
      setUserData(user);
      snack("success", "The user status has been successfully changed");
      return user;
    } catch (error) {
      if (typeof error === "string") return requestStatus(false, error, null);
    }
  }, []);

  const value = useMemo(() => {
    return { isLoading, error, user, setUserData, userData };
  }, [isLoading, error, user, userData, setUserData]);

  return {
    value,
    handleChangeUserStatus,
    handleLogin,
    handleLogout,
    handleSignup,
    handleGetUser,
    handleUpdateUser,
    handleDeleteUser,
  };
};

export default useHandleUsers;
