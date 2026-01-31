import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import serviceServices from "../services/service.services";
import { UserContext } from "../contexts/UserContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const ServiceDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Edit Form State
    const [editForm, setEditForm] = useState({
        serviceName: "",
        serviceDetail: "",
        price: "",
        priceType: "time",
        coverImageUrl: "",
        isActive: true
    });

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await serviceServices.getServiceById(id);
                setService(response.data);
                setEditForm({
                    serviceName: response.data.serviceName,
                    serviceDetail: response.data.serviceDetail,
                    price: response.data.price,
                    priceType: response.data.priceType,
                    coverImageUrl: response.data.coverImageUrl,
                    isActive: response.data.isActive
                });
            } catch (error) {
                console.error("Error fetching service:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'ไม่พบข้อมูลบริการ',
                    text: 'ไม่สามารถดึงข้อมูลบริการได้ หรือรหัสบริการไม่ถูกต้อง'
                }).then(() => {
                    navigate("/");
                });
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchService();
        }
    }, [id, navigate]);

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: "การลบข้อมูลนี้จะไม่สามารถกู้คืนได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ลบ',
            cancelButtonText: 'ยกเลิก'
        });

        if (result.isConfirmed) {
            try {
                await serviceServices.deleteService(id);
                Swal.fire(
                    'ลบสำเร็จ!',
                    'ข้อมูลบริการถูกลบเรียบร้อยแล้ว.',
                    'success'
                ).then(() => {
                    navigate("/");
                });
            } catch (error) {
                console.error("Error deleting service:", error);
                Swal.fire(
                    'เกิดข้อผิดพลาด!',
                    'ไม่สามารถลบข้อมูลบริการได้.',
                    'error'
                );
            }
        }
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditForm({
            ...editForm,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await serviceServices.updateService(
                id,
                editForm.serviceName,
                editForm.serviceDetail,
                parseInt(editForm.price),
                editForm.priceType,
                editForm.coverImageUrl,
                editForm.isActive
            );

            Swal.fire({
                title: "อัปเดตสำเร็จ",
                text: "ข้อมูลบริการถูกแก้ไขเรียบร้อยแล้ว",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            setService({ ...service, ...editForm });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating service:", error);
            Swal.fire({
                title: "อัปเดตไม่สำเร็จ",
                text: error.response?.data?.message || "เกิดข้อผิดพลาด",
                icon: "error"
            });
        }
    };

    const translatePriceType = (type) => {
        switch (type) {
            case 'hour': return 'ชั่วโมง';
            case 'time': return 'ครั้ง';
            case 'area': return 'ตร.ม.';
            default: return type;
        }
    };

    if (loading) {
        return <div className="text-center py-10">กำลังโหลด...</div>;
    }

    if (!service) {
        return <div className="text-center py-10">ไม่พบข้อมูลบริการ</div>;
    }

    return (
        <div className="flex justify-center items-start min-h-[80vh] py-10 bg-base-100 font-sans px-4">
            <Card className="w-full max-w-3xl" title={isEditing ? "แก้ไขบริการ" : service.serviceName}>
                {isEditing ? (
                    // Edit Form
                    <form className="space-y-4" onSubmit={handleEditSubmit}>
                        <Input
                            label="ชื่อบริการ"
                            name="serviceName"
                            value={editForm.serviceName}
                            onChange={handleEditChange}
                            required
                        />
                        <Input
                            label="รายละเอียด"
                            as="textarea"
                            name="serviceDetail"
                            value={editForm.serviceDetail}
                            onChange={handleEditChange}
                            required
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="ราคา (บาท)"
                                type="number"
                                name="price"
                                value={editForm.price}
                                onChange={handleEditChange}
                                required
                            />
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">ประเภทราคา</span>
                                </label>
                                <select
                                    className="select select-bordered w-full bg-base-content/5"
                                    name="priceType"
                                    value={editForm.priceType}
                                    onChange={handleEditChange}
                                >
                                    <option value="time">ต่อครั้ง (Time)</option>
                                    <option value="hour">ต่อชั่วโมง (Hour)</option>
                                    <option value="area">ต่อตร.ม. (Area)</option>
                                </select>
                            </div>
                        </div>
                        <Input
                            label="ลิงก์รูปภาพปก"
                            name="coverImageUrl"
                            value={editForm.coverImageUrl}
                            onChange={handleEditChange}
                        />
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-4">
                                <span className="label-text font-medium">เปิดใช้งาน</span>
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    className="toggle toggle-primary"
                                    checked={editForm.isActive}
                                    onChange={handleEditChange}
                                />
                            </label>
                        </div>
                        <div className="flex gap-2 justify-end mt-4">
                            <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>ยกเลิก</Button>
                            <Button type="submit" variant="primary">บันทึก</Button>
                        </div>
                    </form>
                ) : (
                    // View Mode
                    <div className="flex flex-col gap-6">
                        {service.coverImageUrl && (
                            <img
                                src={service.coverImageUrl}
                                alt={service.serviceName}
                                className="w-full h-64 object-cover rounded-lg shadow-sm"
                            />
                        )}

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-primary">
                                    {service.price} บาท / {translatePriceType(service.priceType)}
                                </span>
                                {!service.isActive && (
                                    <span className="badge badge-error">ปิดใช้งาน</span>
                                )}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                {service.serviceDetail}
                            </p>
                        </div>

                        {userInfo?.type === 'admin' && (
                            <div className="divider">ผู้ดูแลระบบ</div>
                        )}

                        {userInfo?.type === 'admin' && (
                            <div className="flex gap-4 justify-end">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(true)}
                                >
                                    แก้ไข
                                </Button>
                                <Button
                                    variant="error"
                                    onClick={handleDelete}
                                >
                                    ลบ
                                </Button>
                            </div>
                        )}

                        <div className="flex justify-center mt-8">
                            <Button variant="ghost" onClick={() => navigate("/")}>กลับสู่หน้าหลัก</Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ServiceDetailPage;
