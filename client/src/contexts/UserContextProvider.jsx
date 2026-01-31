import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import TokenService from "../services/token-services";

export const UserContextProvider = ({ children }) => {

    const [userInfo, setUserinfo] = useState(() => {
        return TokenService.getUser() || {};
    });

    useEffect(() => {
        if (userInfo && userInfo.accessToken) {
            TokenService.setUser(userInfo);
        } else {
            TokenService.removeUser();
        }
    }, [userInfo]);

    return (
        <UserContext.Provider value={{ userInfo, setUserinfo }}>
            {children}
        </UserContext.Provider>
    );
};
