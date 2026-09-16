# Game: My Bouquet

My Bouquet là game web React phong cách pixel pastel về sự tự suy ngẫm và chăm sóc bản thân. Người chơi trả lời 5 câu hỏi bằng tiếng Việt, nhận một bó hoa tương ứng, sắp xếp và trang trí góc hoa, sau đó mở lá thư dành riêng cho lựa chọn của mình.

Đây là một trải nghiệm thư giãn, không phải công cụ đánh giá hoặc chẩn đoán sức khỏe tâm lý.

## Tính năng chính

- 5 câu hỏi với 5 mức trả lời, tạo ra 3.125 tổ hợp bó hoa.
- 25 loại hoa cùng tên, ý nghĩa và dữ liệu thư tương ứng.
- Kéo, chạm hoặc dùng nút điều khiển để sắp xếp hoa.
- Tùy chỉnh bình hoa, tường, cửa sổ và đồ vật trong phòng.
- Mở phong thư để đọc nội dung được tra cứu từ backend.
- Chăm hoa hằng ngày bằng các hoạt động tưới nước, đón nắng và tỉa lá.
- Sổ hoa theo dõi các loài hoa đã mở khóa.
- Nhạc nền và hiệu ứng âm thanh được tạo bằng Web Audio API.
- Tiến trình chơi và tùy chỉnh được lưu trong LocalStorage của trình duyệt.

## Công nghệ

- Frontend: React 19, Vite 6, JavaScript, SVG/CSS pixel art.
- Backend: Node.js 22+, Express 5, CORS.
- Dữ liệu: các tệp JSON chứa 25 loại hoa và 3.125 lá thư.
- Kiểm thử: Node.js test runner.
- Triển khai: frontend có thể chạy trên Vercel, backend trên Render.

## Cấu trúc dự án

```text
Game - My Bouquet/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── game-data.js
│   │   ├── pixel-art.jsx
│   │   ├── Cottage.jsx
│   │   ├── audio.js
│   │   └── pixel.css
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   └── app.test.js
│   ├── data/
│   └── package.json
├── docs/
├── render.yaml
└── README.md
```

## API

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/` | Thông tin cơ bản của API |
| GET | `/api/hello` | Kiểm tra endpoint HW4 |
| GET | `/api/health` | Kiểm tra trạng thái server |
| GET | `/api/flowers` | Danh sách 25 loại hoa |
| GET | `/api/letters/:combination` | Lấy thư theo mã gồm 5 chữ số từ 1 đến 5 |

Backend đọc dữ liệu JSON vào bộ nhớ khi khởi động, không sử dụng database và không lưu tiến trình người chơi.

## Deploy và nộp HW4

Xem [hướng dẫn deploy từng bước](docs/DEPLOYMENT.md). HW4 yêu cầu API Hello World dùng Node.js + Express được deploy trên Render; frontend Vercel là bước riêng để đưa game lên online.

Khi đưa lên GitHub, dùng **nội dung bên trong `Game - My Bouquet`** làm gốc repository: phải thấy ngay `backend/`, `frontend/` và `render.yaml`.

Build frontend yêu cầu `VITE_API_URL` là URL gốc backend, ví dụ `https://your-api.onrender.com`, không có `/api`. Thiếu hoặc sai định dạng sẽ dừng build để tránh xuất bản game không mở được thư. Cấu hình này không cần khi chạy `npm run dev`.

## Chạy trên máy

Yêu cầu Node.js 22 trở lên.

```bash
cd backend
npm ci
npm start

cd ../frontend
npm ci
npm run dev
```

Mở game tại `http://127.0.0.1:5175`. Frontend đã được cấu hình proxy các request `/api` tới backend tại cổng `3001`.

## Kiểm thử

```bash
cd backend
npm test

cd ../frontend
npm test
```

## Biến môi trường triển khai

- Frontend: `VITE_API_URL` là URL public của backend.
- Backend: `FRONTEND_ORIGINS` là danh sách origin frontend được phép truy cập, phân tách bằng dấu phẩy.
