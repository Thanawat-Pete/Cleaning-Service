import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import serviceServices from "../services/service.services";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const CreateServicePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        serviceName: "",
        serviceDetail: "",
        price: "",
        priceType: "time",
        coverImageUrl: "",
        isActive: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await serviceServices.createService(
                formData.serviceName,
                formData.serviceDetail,
                parseInt(formData.price),
                formData.priceType,
                formData.coverImageUrl,
                formData.isActive
            );

            Swal.fire({
                title: "สร้างบริการสำเร็จ",
                text: "บริการใหม่ถูกเพิ่มเรียบร้อยแล้ว",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate("/");
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "สร้างบริการไม่สำเร็จ",
                text: error.response?.data?.message || "เกิดข้อผิดพลาด",
                icon: "error"
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] py-10 bg-base-100 font-sans">
            <Card
                className="w-full max-w-2xl"
                title="สร้างบริการใหม่"
            >
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input
                        label="ชื่อบริการ"
                        name="serviceName"
                        placeholder="เช่น บริการทำความสะอาดบ้าน"
                        value={formData.serviceName}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="รายละเอียด"
                        as="textarea"
                        name="serviceDetail"
                        placeholder="รายละเอียดของบริการ..."
                        value={formData.serviceDetail}
                        onChange={handleChange}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="ราคา (บาท)"
                            type="number"
                            name="price"
                            placeholder="เช่น 500"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">ประเภทราคา</span>
                            </label>
                            <select
                                className="select select-bordered w-full bg-base-content/5"
                                name="priceType"
                                value={formData.priceType}
                                onChange={handleChange}
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
                        placeholder="https://example.com/image.jpg"
                        value={formData.coverImageUrl}
                        onChange={handleChange}
                    />

                    <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-4">
                            <span className="label-text font-medium">เปิดใช้งาน</span>
                            <input
                                type="checkbox"
                                name="isActive"
                                className="toggle toggle-primary"
                                checked={formData.isActive}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <Button type="button" variant="ghost" className="flex-1" onClick={() => navigate("/")}>
                            ยกเลิก
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1">
                            สร้างบริการ
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateServicePage;
