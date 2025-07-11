import { createContext, useState, ReactNode, useEffect } from "react";
import { account } from "../lib/appwrite";
import { ID, Models } from "appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { showToast } from "../utils/toast";

interface UserContextType {
  user: Models.User<Models.Preferences> | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  authChecked: boolean;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [authChecked, setAuthChecked] = useState(false);

  const login = async (email: string, password: string) => {
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      throw new Error("Cannot login while offline");
    }

    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser(response);
      await AsyncStorage.setItem("userData", JSON.stringify(response));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const register = async (email: string, password: string) => {
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      throw new Error("Cannot register while offline");
    }

    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      showToast("error", "Authentication Error", "Cannot log out while offline")
    }

    await account.deleteSession("current");
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("bookList");
    setUser(null);
  };

  const getUserDetails = async () => {
    try {
      const localUserData = await AsyncStorage.getItem("userData");
      let response: Models.User<Models.Preferences> | null;

      if (localUserData) {
        response = JSON.parse(localUserData);
      } else {
        response = await account.get();
      }

      setUser(response);
      console.log(response?.email);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, authChecked }}
    >
      {children}
    </UserContext.Provider>
  );
};
