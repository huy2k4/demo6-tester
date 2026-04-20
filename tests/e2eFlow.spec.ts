import { test, expect } from '../fixtures/custom-fixtures';

test('E2E: Register a random account then Login', async ({ registerPage, loginPage, page }) => {
    // Để không bị trùng lặp account, ta tạo ra một Email & Username ngẫu nhiên theo thời gian
    const randomId = new Date().getTime();
    const randomEmail = `nguoidung_${randomId}@cybersoft.edu.vn`;
    const randomUsername = `user_${randomId}`;
    const password = "VuiHocCode123!";

    // ==========================================
    // STEP 1: ĐĂNG KÝ
    // ==========================================
    // Truy cập mơi đăng ký. Dựa theo HTML bạn cung cấp có link href="/login", vậy đăng ký có thể là /register
    // Nếu sai, bạn tự sửa lại đường dẫn thật nhé.
    await page.goto("/register");

    // Điền toàn bộ thông tin Đăng Ký
    await registerPage.enterUsername(randomUsername);
    await registerPage.enterFullName("Chiến Thần Automation");
    await registerPage.enterEmail(randomEmail);
    await registerPage.enterPhone("0901234567");
    await registerPage.enterPassword(password);
    await registerPage.enterConfirmPassword(password);
    await registerPage.selectDateOfBirth("1995-12-12");
    await registerPage.selectGender("Male");

    // Bấm nút Đăng Ký
    await registerPage.clickRegister();

    // Đợi 2 giây cho web xử lý lưu vào database (thực tế nên xài await expect để báo hiệu UI)
    await page.waitForTimeout(2000);


    // ==========================================
    // STEP 2: ĐĂNG NHẬP
    // ==========================================
    // Đi tới trang đăng nhập
    await page.goto("/login");

    // Có trang thì ô đăng nhập hỏi Email, có trang hỏi Username. 
    // Mình nhập Username hay Email cũng tuỳ thiết kế hệ thống. Dưới đây nhập email ngẫu nhiên vừa tạo:
    await loginPage.enterEmail(randomEmail);
    await loginPage.enterPassword(password);
    await loginPage.clickLogin();

    // Verify (Nếu cần)
    // await expect(page.locator("text=Dashboard")).toBeVisible();
});
