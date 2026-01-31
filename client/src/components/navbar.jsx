import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import TokenService from "../services/token-services";

const Navbar = () => {
    const { userInfo, setUserinfo } = useContext(UserContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    const handleLogout = () => {
        TokenService.removeUser();
        setUserinfo({});
        navigate("/login");
    };

    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link to="/">หน้าหลัก</Link>
                        </li>
                        {userInfo?.accessToken ? (
                            <>
                                <li><Link to="/booking">จองบริการ</Link></li>
                                <li><Link to="/history">ประวัติการจอง</Link></li>
                            </>
                        ) : null}
                        {!userInfo?.accessToken ? (
                            <>
                                <li>
                                    <Link to="/login">เข้าสู่ระบบ</Link>
                                </li>
                                <li>
                                    <Link to="/register">ลงทะเบียน</Link>
                                </li>
                            </>
                        ) : null}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">
                    บริการทำความสะอาด
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/">หน้าหลัก</Link>
                    </li>
                    {userInfo?.accessToken ? (
                        <>
                            <li><Link to="/booking">จองบริการ</Link></li>
                            <li><Link to="/history">ประวัติการจอง</Link></li>
                        </>
                    ) : null}
                    {!userInfo?.accessToken ? (
                        <>
                            <li>
                                <Link to="/login">เข้าสู่ระบบ</Link>
                            </li>
                            <li>
                                <Link to="/register">ลงทะเบียน</Link>
                            </li>
                        </>
                    ) : null}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                {/* Theme Toggle */}
                <label className="swap swap-rotate btn btn-ghost btn-circle">
                    {/* this hidden checkbox controls the state */}
                    <input
                        type="checkbox"
                        className="theme-controller"
                        checked={theme === "dark"}
                        onChange={handleToggle}
                    />

                    {/* sun icon */}
                    <svg
                        className="swap-off h-5 w-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,5.64,7.05Zm12,1.41a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41l-.71.71A1,1,0,0,0,17.65,8.46Zm1.75,3.84H20a1,1,0,0,0,0-2h-1.6a1,1,0,0,0,0,2Zm-3.75,5.19a1,1,0,0,0,.7,5.5,1,1,0,0,0,.71,5.5,1,1,0,0,0,0,1l.71.71a1,1,0,1,0,1.41-1.41l-.71-.71A1,1,0,0,0,18.36,17.06Zm-5.36,1.41a1,1,0,0,0-1,1v1.6a1,1,0,0,0,2,0v-1.6A1,1,0,0,0,12,18.46ZM12,6a6,6,0,1,0,6,6A6,6,0,0,0,12,6Z" />
                    </svg>

                    {/* moon icon */}
                    <svg
                        className="swap-on h-5 w-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>

                {userInfo?.type === 'admin' && (
                    <Link to="/create-service" className="btn btn-ghost">
                        สร้างบริการ
                    </Link>
                )}

                {userInfo?.accessToken && (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar placeholder"
                        >
                            <div className="bg-neutral text-neutral-content rounded-full w-10 flex items-center justify-center h-full">
                                <span className="text-xs">
                                    {userInfo.username || userInfo.user ? (userInfo.username || userInfo.user).substring(0, 2).toUpperCase() : "US"}
                                </span>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <div className="flex flex-col items-start gap-1 p-2 cursor-default hover:bg-transparent">
                                    <span className="font-bold">{userInfo.username || userInfo.user}</span>
                                    <span className={`badge ${userInfo.type === 'admin' ? 'badge-primary' : 'badge-secondary'} badge-sm`}>
                                        {userInfo.type === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน'}
                                    </span>
                                </div>
                            </li>
                            <div className="divider my-0"></div>
                            <li>
                                <a className="justify-between">
                                    โปรไฟล์
                                    <span className="badge">ใหม่</span>
                                </a>
                            </li>
                            <li>
                                <a>ตั้งค่า</a>
                            </li>
                            <li>
                                <a onClick={handleLogout} className="text-error">ออกจากระบบ</a>
                            </li>
                        </ul>
                    </div>
                )}
                {!userInfo?.accessToken && (
                    <Link to="/login" className="btn btn-primary hidden sm:inline-flex">เข้าสู่ระบบ</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
