import { Cookies } from "react-cookie"
const cookie = new Cookies();

const getAccessToken = () => {
    const user = getUser();
    return user?.accessToken;
};

const getUser = () => {
    const user = cookie.get('user');
    return user;
};

const removeUser = () => {
    cookie.remove("user", { path: "/" });
};

const setUser = (user) => {
    if (user) {
        cookie.set("user", JSON.stringify({
            id: user?.id,
            username: user?.user || user?.username,
            type: user?.type,
            accessToken: user?.accessToken,
        }), {
            path: "/",
            expires: new Date(Date.now() + 86400) // 1 day = 24 *60 * 60
        }
        )
    } else {
        removeUser();
    }
};

const TokenService = {
    getAccessToken,
    getUser,
    removeUser,
    setUser
};

export default TokenService;