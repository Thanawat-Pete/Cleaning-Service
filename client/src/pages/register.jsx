import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import authenticationService from "../services/authentication.services";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        telephone: "",
        email: "",
        address: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.confirmPassword) {
            Swal.fire({
                title: "รหัสผ่านไม่ตรงกัน",
                text: "กรุณาตรวจสอบรหัสผ่านอีกครั้ง",
                icon: "error"
            });
            return;
        }

        try {
            const response = await authenticationService.register(
                credentials.username,
                credentials.password,
                credentials.name,
                credentials.telephone,
                credentials.email,
                credentials.address
            );

            if (response.status === 201 || response.status === 200) {
                Swal.fire({
                    title: "สมัครสมาชิกสำเร็จ",
                    text: "คุณสามารถเข้าสู่ระบบได้แล้ว",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    navigate("/login");
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "สมัครสมาชิกไม่สำเร็จ",
                text: error.response?.data?.message || "เกิดข้อผิดพลาดบางอย่าง",
                icon: "error"
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[90vh] py-10 bg-base-100 font-sans">
            <Card
                className="w-full max-w-xl"
                title="สร้างบัญชีผู้ใช้"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                }
            >
                <div className="text-center mb-4">
                    <p className="text-sm text-gray-500">เริ่มต้นใช้งานฟรีไม่มีค่าใช้จ่าย</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Username & Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="ชื่อผู้ใช้"
                            name="username"
                            placeholder="ชื่อผู้ใช้"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            }
                        />
                        <Input
                            label="ชื่อ-นามสกุล"
                            name="name"
                            placeholder="ชื่อ-นามสกุล"
                            value={credentials.name}
                            onChange={handleChange}
                            required
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .884.956 2.006 1.504 3.05a.5.5 0 01-.484.95l-1.02-.51a1.5 1.5 0 00-1.02.51C12.956 12.006 12 10.884 12 10v-1" />
                                </svg>
                            }
                        />
                    </div>

                    {/* Email & Tel */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="อีเมล"
                            type="email"
                            name="email"
                            placeholder="อีเมล (you@example.com)"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z" />
                                </svg>
                            }
                        />
                        <Input
                            label="เบอร์โทรศัพท์"
                            type="tel"
                            name="telephone"
                            placeholder="เบอร์โทรศัพท์"
                            value={credentials.telephone}
                            onChange={handleChange}
                            required
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            }
                        />
                    </div>

                    {/* Address */}
                    <Input
                        label="ที่อยู่"
                        as="textarea"
                        name="address"
                        placeholder="ที่อยู่ปัจจุบัน"
                        value={credentials.address}
                        onChange={handleChange}
                        required
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        }
                    />

                    {/* Passwords */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <Input
                            label="ยืนยันรหัสผ่าน"
                            type="password"
                            name="confirmPassword"
                            placeholder="ยืนยันรหัสผ่าน"
                            value={credentials.confirmPassword}
                            onChange={handleChange}
                            required
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            }
                        />
                    </div>

                    <div className="form-control mt-6">
                        <Button type="submit" fullWidth>สมัครสมาชิก</Button>
                    </div>
                    <div className="text-center text-sm text-gray-500 mt-4">
                        มีบัญชีผู้ใช้แล้ว? <Link to="/login" className="link link-primary font-bold">เข้าสู่ระบบ</Link>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Register;
