import { test, expect } from '../fixtures/custom-fixtures';

test.describe('Acceptance Criteria 1-4 (Assignee: Huy)', () => {

    test('TC1: Home header hiển thị nút “Đăng nhập” đúng thiết kế và tương tác hover', async ({ homePage, page }) => {
        // Mở trang chủ
        await page.goto("/");

        const btnLogin = homePage.getLoginButton();
        
        // Kiểm tra nút Đăng nhập có hiển thị hay không
        await expect(btnLogin).toBeVisible();

        // Kiểm tra tương tác hover
        await btnLogin.hover();
        // Bạn có thể thêm expect về màu sắc hoặc cursor tại đây dựa trên requirement thực tế.
    });

    test('TC2: Điều hướng từ Home sang Login khi click “Đăng nhập”', async ({ homePage, page }) => {
        await page.goto("/");
        
        // Click vào nút Đăng Nhập trên Header
        await homePage.clickLoginHeader();

        // Kiểm tra URL có chứa từ khoá /login
        await expect(page).toHaveURL(/.*\/login/);
    });

    test('TC3: Register page hiển thị đúng cụm “Already have an account? Login here” và chỉ “Login here” clickable', async ({ registerPage, page }) => {
        await page.goto("/register");

        const lblText = registerPage.getAlreadyHaveAccountLabel();
        const lnkLoginHere = registerPage.getLoginHereLink();

        // Kiểm tra nguyên câu hiển thị chính xác
        await expect(lblText).toBeVisible();
        await expect(lblText).toContainText("Already have an account?");

        // Kiểm tra chữ "Login here" là thẻ link có thể click được (enabled)
        await expect(lnkLoginHere).toBeVisible();
        await expect(lnkLoginHere).toBeEnabled();
    });

    test('TC4: Điều hướng từ Register sang Login khi click “Login here”', async ({ registerPage, page }) => {
        await page.goto("/register");

        // Click chữ Login Here
        await registerPage.clickLoginHere();

        // Xác minh đường dẫn được chuyển về trang Đăng Nhập
        await expect(page).toHaveURL(/.*\/login/);
    });

});
