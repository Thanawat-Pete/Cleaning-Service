# Cleaning Service Documentation

เอกสารคู่มือการติดตั้งและใช้งานแอปพลิเคชัน Cleaning Service (บริการทำความสะอาด)  
โปรเจกต์นี้เป็น Web Application ที่พัฒนาด้วย MERN Stack (MongoDB, Express, React, Node.js) โดยใช้ Vite สำหรับ Client และ TailwindCSS สำหรับการตกแต่ง

## โครงสร้างโปรเจกต์ (Project Structure)
- **client/**: ส่วนของ Frontend (React + Vite)
- **server/**: ส่วนของ Backend (Node.js + Express)

## ความต้องการของระบบ (Prerequisites)
ก่อนเริ่มใช้งาน โปรดตรวจสอบว่าเครื่องของท่านได้ติดตั้งโปรแกรมเหล่านี้แล้ว:
- [Node.js](https://nodejs.org/) (เวอร์ชัน LTS หรือใหม่กว่า)
- [MongoDB](https://www.mongodb.com/) (หรือใช้งาน MongoDB Atlas)

## ขั้นตอนการติดตั้ง (Installation)

### 1. การติดตั้งฝั่ง Server (Backend)
1.  เปิด Terminal และเข้าไปที่โฟลเดอร์ `server`
    ```bash
    cd server
    ```
2.  ติดตั้ง dependencies
    ```bash
    npm install
    ```
3.  สร้างไฟล์ `.env` ในโฟลเดอร์ `server` โดยกำหนดค่าตัวแปรดังนี้:
    ```env
    PORT=5000
    DB_URL=mongodb://localhost:27017/cleaning-service
    BASE_URL=http://localhost:5173
    SECRET=mysecretkey
    ```
    - **PORT**: พอร์ตที่ต้องการให้ Server ทำงาน (เช่น 5000)
    - **DB_URL**: Connection String ของ MongoDB
    - **BASE_URL**: URL ของฝั่ง Client (สำหรับการตั้งค่า CORS)
    - **SECRET**: คีย์ลับสำหรับสร้าง JWT Token

### 2. การติดตั้งฝั่ง Client (Frontend)
1.  เปิด Terminal ใหม่ และเข้าไปที่โฟลเดอร์ `client`
    ```bash
    cd client
    ```
2.  ติดตั้ง dependencies
    ```bash
    npm install
    ```
3.  สร้างไฟล์ `.env` ในโฟลเดอร์ `client` เพื่อกำหนด URL ของ Backend API:
    ```env
    VITE_BASE_URL=http://localhost:5000/api/v1
    ```
    *(ตรวจสอบให้แน่ใจว่า port ตรงกับที่ตั้งไว้ใน Server)*

## การเรียกใช้งานแอปพลิเคชัน (Running the Application)

ต้องรันทั้ง Server และ Client พร้อมกัน (แยก Terminal):

### 1. สั่งรัน Server
ในโฟลเดอร์ `server` ให้ใช้คำสั่ง:
```bash
# สำหรับ Production
npm start

# หรือ สำหรับ Development (ใช้ nodemon)
npm run dev
```
เมื่อรันสำเร็จ จะขึ้นข้อความว่า `Server is running on http://localhost:5000` และ `Connected to MongoDB`

### 2. สั่งรัน Client
ในโฟลเดอร์ `client` ให้ใช้คำสั่ง:
```bash
npm run dev
```
Client จะเริ่มทำงาน (ปกติอยู่ที่ `http://localhost:5173`)

## การใช้งาน
1.  เปิดเว็บเบราว์เซอร์ไปที่ลิงก์ที่แสดงใน terminal ของ Client (เช่น `http://localhost:5173`)
2.  เข้าสู่ระบบหรือสมัครสมาชิกเพื่อเริ่มใช้งาน
