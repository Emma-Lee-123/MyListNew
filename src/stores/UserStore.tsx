import type { User } from "../models/User";
import { appendParameterToUrl } from "./Util";

const addNewUser = async (user: User): Promise<User> => {
  const func_url_base: string = import.meta.env.VITE_WEBAPP_FUNC_ADDUSER_URL;
  console.log("func_url_base:", func_url_base); // Log the URL for debugging
  const response = await fetch(func_url_base, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to add user");
  }
  const result: User = await response.json();
  console.log("User added:", result);
  return result;
};

const userNameOrEmailExists = async (
  userName: string,
  email: string
): Promise<boolean> => {
  const func_url_base: string = import.meta.env.VITE_WEBAPP_FUNC_USEREXISTS_URL;
  console.log("func_url_base:", func_url_base); // Log the URL for debugging
  try {
    const func_url = appendParameterToUrl(func_url_base, "email", email); //append email to the url
    const url = appendParameterToUrl(func_url, "userName", userName); //append userName to the url
    console.log("URL:", url); // Log the URL for debugging

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to check user existence");
    }

    const result: boolean = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
};

const getAuthenticatedUser = async (
  user: User | null
): Promise<User | undefined> => {
  if (!user) {
    console.log("User is null or undefined");
    return undefined;
  }
  if (!user.email || !user.password) {
    console.log("User email or password is empty");
    return undefined;
  }
  const func_url_base: string = import.meta.env.VITE_WEBAPP_FUNC_ISAUTHENTICATED_URL;
  console.log("func_url_base:", func_url_base); 
  try {
    const response = await fetch(func_url_base, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      console.log("user not found:", response.statusText);
      return undefined;
    }

    const returnedUser: User = await response.json(); // retrieve returned user object
    console.log("Returned user from function:", returnedUser);

    return returnedUser;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return undefined;
  }
};

export { addNewUser, userNameOrEmailExists, getAuthenticatedUser };
