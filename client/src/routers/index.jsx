import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/mainLayout.jsx"
import Home from "../pages/home.jsx"
import Login from "../pages/login.jsx"
import Register from "../pages/register.jsx"
import BookingPage from "../pages/bookingForm.jsx"
import HistoryPage from "../pages/HistoryPage.jsx"
import UserPage from "../pages/userPage.jsx"
import AdminPage from "../pages/adminPage.jsx"
import CreateServicePage from "../pages/CreateServicePage.jsx"
import ServiceDetailPage from "../pages/serviceDetail.jsx"
import NotAllowed from "../pages/NotAllowed.jsx"
import NotFound from "../pages/NotFound.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: (
                    <UserPage requireAuth={false}>
                        <Login />
                    </UserPage>
                )
            },
            {
                path: "register",
                element: (
                    <UserPage requireAuth={false}>
                        <Register />
                    </UserPage>
                )
            },
            {
                path: "booking",
                element: (
                    <UserPage requireAuth={true}>
                        <BookingPage />
                    </UserPage>
                )
            },
            {
                path: "history",
                element: (
                    <UserPage requireAuth={true}>
                        <HistoryPage />
                    </UserPage>
                )
            },
            {
                path: "create-service",
                element: (
                    <AdminPage>
                        <CreateServicePage />
                    </AdminPage>
                )
            },
            {
                path: "service/:id",
                element: <ServiceDetailPage />
            },
            {
                path: "notallowed",
                element: <NotAllowed />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
]);

export default router;