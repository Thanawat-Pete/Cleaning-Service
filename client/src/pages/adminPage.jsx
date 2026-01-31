import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const AdminPage = ({ children }) => {
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Must be logged in
        if (!userInfo?.accessToken) {
            navigate("/notallowed", { replace: true });
            return;
        }

        // Must be admin
        if (userInfo.type !== 'admin') {
            navigate("/notallowed", { replace: true });
        }
    }, [userInfo, navigate]);

    return <>{children}</>;
};

export default AdminPage;
