# Hướng Dẫn Sử Dụng - Playwright Basic Framework

## Giới Thiệu
Đây là kho lưu trữ tự động hóa kiểm thử với Playwright + TypeScript được cấu trúc đơn giản, bám sát kiến trúc **Page Object Model (POM)** và có sử dụng cơ chế **Custom Fixtures** để làm sạch Test Spec. 
Dự án mẫu này hiện đang viết cho trang: `https://demo6.cybersoft.edu.vn`.

## Cấu Trúc Dự Án
- `constants`: Chứa các biến, hằng số dùng chung toàn cục (Ví dụ: timeout quy định chung).
- `fixtures/custom-fixtures.ts`: Nơi khai báo và tiêm (inject) các biến Page Object để kịch bản test sử dụng trực tiếp mà không cần dùng từ khoá `new`.
- `pages`: Khai báo các đối tượng giao diện (Locators) và thao tác, tất cả đều kế thừa từ class `BasePage`.
- `tests`: Nơi chứa toàn bộ kịch bản kiểm thử (Testcase).
- `playwright.config.ts`: Cấu hình lõi của trình chạy Playwright.

## Cách Chạy Mã Nguồn
1. **Di chuyển vào thư mục dự án** (nếu bạn chưa ở trong đó):
   ```bash
   cd playwright-demo6-basic
   ```
2. **Cài đặt thư viện** (chỉ chạy lần đầu hoặc khi đổi máy):
   ```bash
   npm install
   npx playwright install chromium
   ```
3. **Chạy kịch bản kiểm thử ẩn (chỉ chạy ngầm)**:
   ```bash
   npm run test
   ```
4. **Chạy kiểm thử trực quan với giao diện UI (vừa học vừa debug)**:
   ```bash
   npm run test:ui
   ```
5. **Xem báo cáo tự động bằng HTML**:
   Nếu trên 0 lỗi, báo cáo tự động hiện. Nếu muốn chủ động xem:
   ```bash
   npm run report
   ```

## Cách Viết / Mở Rộng
Khi bạn cần kiểm thử một trang mới ví dụ `HomePage`:
1. Tạo class mới `HomePage.ts` trong thư mục `pages/`. Kế thừa `BasePage`.
2. Khai báo `homePage` đó vào trong `fixtures/custom-fixtures.ts`.
3. Trong file test (`.spec.ts`), chỉ cần chèn argument `homePage` vào hàm là có thể gọi thoải mái các hàm con mà không cần khởi tạo thủ công.
