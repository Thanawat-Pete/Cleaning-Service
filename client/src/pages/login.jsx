import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import authenticationService from "../services/authentication.services";
import { UserContext } from "../contexts/UserContext";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const { setUserinfo } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authenticationService.login(
                credentials.username,
                credentials.password
            );

            if (response.status === 200) {
                Swal.fire({
                    title: "เข้าสู่ระบบสำเร็จ",
                    text: "ยินดีต้อนรับกลับมา!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    const userData = {
                        ...response.data,
                        username: response.data.user || response.data.username
                    };
                    setUserinfo(userData);
                    navigate("/");
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "เข้าสู่ระบบไม่สำเร็จ",
                text: error.response?.data?.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
                icon: "error"
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh] bg-base-100 font-sans">
            <Card
                className="w-full max-w-sm"
                title="เข้าสู่ระบบ"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                }
            >
                <div className="text-center mb-4">
                    <p className="text-sm text-gray-500">ยินดีต้อนรับเข้าสู่ระบบ Cleaning Service</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Input
                        label="ชื่อผู้ใช้ หรือ อีเมล"
                        name="username"
                        placeholder="ชื่อผู้ใช้ หรือ อีเมล"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        }
                    />

                    <div className="form-control w-full">
                        <Input
                            label="รหัสผ่าน"
                            type="password"
                            name="password"
                            placeholder="รหัสผ่าน"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            }
                        />
                        <label className="label">
                            <span className="label-text-alt"></span>
                            <a href="#" className="label-text-alt link link-hover text-primary">ลืมรหัสผ่าน?</a>
                        </label>
                    </div>

                    <Button type="submit" fullWidth>เข้าสู่ระบบ</Button>

                    <div className="text-center text-sm text-gray-500">
                        ยังไม่มีบัญชีผู้ใช้? <Link to="/register" className="link link-primary font-bold">สมัครสมาชิก</Link>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Login;
