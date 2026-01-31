import { useState, useEffect } from "react";
import bookingServices from "../services/bookings.services";
import Card from "../components/ui/Card";

const HistoryPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await bookingServices.getBooking();
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) {
        return <div className="text-center py-10">กำลังโหลด...</div>;
    }

    if (bookings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <div className="text-center text-gray-500">
                    <p className="text-xl font-semibold">ยังไม่มีประวัติการจอง</p>
                    <p>เริ่มต้นจองบริการทำความสะอาดกับเราได้เลย</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">ประวัติการจอง</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                    <Card key={booking._id} title={booking.service?.serviceName} className="hover:shadow-lg transition-shadow">
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span className="font-semibold">สถานะ:</span>
                                <span className={`badge ${booking.status === 'confirmed' ? 'badge-success' :
                                    booking.status === 'pending' ? 'badge-warning' :
                                        booking.status === 'completed' ? 'badge-info' : 'badge-error'
                                    }`}>
                                    {booking.status === 'confirmed' ? 'ยืนยันแล้ว' :
                                        booking.status === 'pending' ? 'รอตรวจสอบ' :
                                            booking.status === 'completed' ? 'เสร็จสิ้น' : 'ยกเลิก'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">วันที่:</span>
                                <span>{new Date(booking.appointmentDateTime).toLocaleDateString("th-TH")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">เวลา:</span>
                                <span>{new Date(booking.appointmentDateTime).toLocaleTimeString("th-TH", { hour: '2-digit', minute: '2-digit' })} น.</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">เบอร์โทร:</span>
                                <span>{booking.phone}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HistoryPage;
