# Deploy My Bouquet cho HW4

## Yêu cầu trong ảnh

HW4: tạo RESTful API Hello World bằng Node.js + Express và deploy trên Render.
Project đã có `GET /api/hello` trả `{"message":"Hello World"}`.
Chỉ hoàn thành phần deploy sau khi URL Render thực tế truy cập được.
Frontend Vercel là phần tùy chọn để chơi game online; dòng HW3 trong ảnh là một yêu cầu riêng.

## 1. Đưa source lên GitHub

1. Tạo repository GitHub tên `my-bouquet-hw4`.
2. Mở **thư mục `Game - My Bouquet`** trong VS Code, không mở thư mục cha khi khởi tạo Git.
3. Source Control → Initialize Repository → stage các file → commit → Publish Branch lên repository của bạn. Nếu chưa có Git, cài Git rồi mở lại VS Code; hoặc dùng GitHub Desktop để thêm thư mục này làm repository và publish.
4. Kiểm tra trang đầu repository thấy trực tiếp `backend`, `frontend`, `docs`, `render.yaml`, `README.md` và `.gitignore`.
5. Không upload `node_modules`, `dist`, `.env`. Giữ hai `package-lock.json` và toàn bộ `backend/data`.

Nếu repository đã chứa cả thư mục bọc `Game - My Bouquet`, dùng Root Directory `Game - My Bouquet/backend` cho Render và `Game - My Bouquet/frontend` cho Vercel. Hướng dẫn bên dưới giả định source ở gốc như bước 4. Blueprint `render.yaml` cũng giả định cấu trúc này; nên dùng deploy thủ công bên dưới nếu có thư mục bọc.

## 2. Deploy backend trên Render — bắt buộc HW4

1. Đăng nhập https://dashboard.render.com.
2. Chọn **New → Web Service**, kết nối GitHub, chọn repository và nhánh chứa source.
3. Điền:

| Trường | Giá trị |
|---|---|
| Name | `my-bouquet-api` hoặc tên còn trống |
| Language / Runtime | Node |
| Root Directory | `backend` |
| Build Command | `npm ci` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

4. Trong Environment, thêm:

```text
NODE_ENV=production
NODE_VERSION=22
FRONTEND_ORIGINS=http://localhost:5175,http://127.0.0.1:5175
```

Không cần đặt `PORT`: backend dùng cổng Render cấp và bind `0.0.0.0`. Không cần database.

5. Chọn gói Free nếu tài khoản có lựa chọn này và bạn muốn dùng miễn phí. Kiểm tra giá hiển thị trước khi tạo dịch vụ.
6. Bấm **Create Web Service**, chờ trạng thái **Live**.
7. Copy URL Render cấp, mở `https://<domain-render>/api/hello`. Kết quả phải là:

```json
{"message":"Hello World"}
```

8. Kiểm tra thêm `/api/health` trả `{"status":"ok"}` và `/api/letters/12345` trả thư có `id: 195`.

Đến đây đã triển khai phần API theo yêu cầu HW4. CORS không cản việc mở URL trực tiếp để xem JSON.

## 3. Deploy frontend trên Vercel — nếu muốn game online

1. Đăng nhập https://vercel.com, chọn **Add New → Project**, import cùng repository.
2. Chọn **Root Directory = frontend**, **Framework Preset = Vite**.
3. Chọn Node.js **22.x** trong phần cài đặt Node.js nếu cần. File `vercel.json` đã khai báo Install `npm ci`, Build `npm run build`, Output `dist`.
4. Thêm biến môi trường trước khi deploy:

```text
VITE_API_URL=https://<domain-render-thật>
```

Thay bằng URL thực tế ở bước 2, không thêm `/api` hay `/api/hello`, không để nguyên dấu `< >`. Chọn Production; chọn thêm Preview nếu muốn dùng các bản preview.

5. Bấm **Deploy**, đợi thành công và copy domain production của frontend.
6. Mỗi lần đổi `VITE_API_URL` phải **Redeploy** frontend vì giá trị được đưa vào bundle lúc build. Build sẽ báo lỗi nếu biến bị thiếu hoặc không phải URL gốc HTTP/HTTPS.

## 4. Cho phép frontend gọi backend

1. Quay lại Render → dịch vụ backend → **Environment**.
2. Đặt:

```text
FRONTEND_ORIGINS=https://<domain-production-vercel-thật>
```

Chỉ nhập origin, không có dấu `/` cuối hay đường dẫn. Nếu cần nhiều origin, phân cách bằng dấu phẩy. Domain preview khác domain production phải được thêm riêng.

3. Lưu thay đổi và chờ backend deploy lại.
4. Mở game trên domain frontend → trả lời 5 câu → tạo bó hoa → mở thư.
5. DevTools → Network phải thấy request `/api/letters/.....` đến domain Render và trả HTTP 200.

Tiến trình game lưu trong LocalStorage theo từng trình duyệt/domain, không đồng bộ giữa các máy.

## 5. Minh chứng để nộp

- URL công khai `https://<domain-render>/api/hello`.
- Link GitHub, source Express ở `backend/src/app.js`.
- Có thể chụp màn hình JSON Hello World kèm thanh địa chỉ và Render báo Live.
- Nếu gửi kèm game: thêm URL frontend và kiểm tra mở thư thành công.

Đây là gợi ý minh chứng; ảnh đề không nêu định dạng nộp cụ thể.

## Kiểm tra trên máy (tùy chọn)

Cài Node.js 22.x. Từ thư mục `Game - My Bouquet`, terminal thứ nhất:

```powershell
cd backend
npm ci
npm test
npm start
```

Terminal thứ hai, cũng bắt đầu tại `Game - My Bouquet`:

```powershell
cd frontend
npm ci
npm test
npm run dev
```

Mở http://127.0.0.1:5175. Local dev dùng proxy nên không cần `.env`.
Test hiện có dùng dữ liệu/code ở cả hai thư mục nên giữ nguyên toàn bộ project khi chạy test.

Muốn kiểm tra production build từ thư mục frontend bằng PowerShell:

```powershell
$env:VITE_API_URL='https://<domain-render-thật>'
npm run build
```

`.env.example` chỉ là mẫu. Backend đọc biến môi trường; `npm start` không tự nạp file `.env`. Nếu dùng `.env` ở local, chạy `node --env-file=.env src/server.js` trong backend.

## Lỗi thường gặp

| Triệu chứng | Cách xử lý |
|---|---|
| Không tìm thấy package.json | Sửa Root Directory theo cấu trúc thực tế trên GitHub |
| Build báo Set VITE_API_URL | Thêm URL gốc backend trong Environment rồi redeploy frontend |
| Hello World chạy nhưng không mở được thư | Kiểm tra VITE_API_URL, FRONTEND_ORIGINS và Network |
| Request API trả HTML | Frontend đang gọi sai domain; kiểm tra URL backend và build lại |
| Truy cập lần đầu chậm | Render Free có thể ngủ khi không hoạt động; chờ khởi động rồi thử lại |

## Tài liệu chính thức

- https://render.com/docs/deploy-node-express-app
- https://render.com/docs/node-version
- https://render.com/docs/free
- https://vercel.com/docs/frameworks/frontend/vite
- https://vercel.com/docs/environment-variables
