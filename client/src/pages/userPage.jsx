import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const UserPage = ({ children, requireAuth = false }) => {
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        // 🔒 หน้าที่ต้อง login
        if (requireAuth && !userInfo?.accessToken) {
            navigate("/notallowed", { replace: true });
        }

        // 🚫 หน้า login / register (login แล้วห้ามเข้า)
        if (!requireAuth && userInfo?.accessToken) {
            navigate("/", { replace: true });
        }
    }, [requireAuth, userInfo, navigate]);

    return <>{children}</>;
};

export default UserPage;
