import { test, expect } from '../fixtures/custom-fixtures';

test.describe('Acceptance Criteria 1-4 (Assignee: Huy) - Registration Phase', () => {

    test('REGISTER_001 (AC1): Kiểm tra form đăng ký tài khoản hiển thị đầy đủ các trường dữ liệu', async ({ registerPage, page }) => {
        await page.goto("/register");

        // Kiểm tra sự xuất hiện của tất cả các trường dữ liệu
        await expect(registerPage.getTxtUsername()).toBeVisible();
        await expect(registerPage.getTxtFullName()).toBeVisible();
        await expect(registerPage.getTxtEmail()).toBeVisible();
        await expect(registerPage.getTxtPhone()).toBeVisible();
        await expect(registerPage.getTxtPassword()).toBeVisible();
        await expect(registerPage.getTxtConfirmPassword()).toBeVisible();
        await expect(registerPage.getDtpDateOfBirth()).toBeVisible();
        await expect(registerPage.getSelGender()).toBeVisible();
        
        // Kiểm tra button đăng ký
        await expect(registerPage.getBtnRegister()).toBeVisible();
    });

    test('REGISTER_002 (AC1): Kiểm tra tất cả nội dung hiển thị trên form đăng ký (chấp nhận tiếng Anh)', async ({ registerPage, page }) => {
        await page.goto("/register");

        // Kiểm tra placeholder
        await expect(registerPage.getTxtUsername()).toHaveAttribute("placeholder", /Username/i);
        await expect(registerPage.getTxtFullName()).toHaveAttribute("placeholder", /Full Name/i);
        
        // Kiểm tra Label (Dùng locator trực tiếp vì label đứng ngoài thẻ input)
        await expect(page.locator("label[for='dateOfBirth']")).toHaveText(/Date of Birth/i);
        await expect(page.locator("label[for='gender']")).toHaveText(/Gender/i);
        
        // Kiểm tra Button
        await expect(registerPage.getBtnRegister()).toHaveText(/Register/i);
    });

    test('REGISTER_003 (AC2): Kiểm tra nhập 49 ký tự cho trường dữ liệu "Tên đăng nhập"', async ({ registerPage, page }) => {
        await page.goto("/register");
        
        // Tạo chuỗi 49 ký tự 'a'
        const username49 = "a".repeat(49);
        await registerPage.enterUsername(username49);
        
        // Kiểm tra hệ thống cho phép nhập và giữ nguyên đủ 49 ký tự trong ô input
        await expect(registerPage.getTxtUsername()).toHaveValue(username49);
    });

    test('REGISTER_004 (AC2): Kiểm tra nhập tối đa 50 ký tự cho trường dữ liệu "Tên đăng nhập"', async ({ registerPage, page }) => {
        await page.goto("/register");
        
        // Bước 1: Nhập 49 ký tự
        const username49 = "a".repeat(49);
        await registerPage.enterUsername(username49);
        
        // Bước 2: Nhập thêm 1 ký tự (tổng 50)
        const username50 = username49 + "b";
        // Fill đè lên (hoặc type thêm)
        await registerPage.enterUsername(username50);
        
        // Hệ thống cho phép hiển thị đủ 50 ký tự
        await expect(registerPage.getTxtUsername()).toHaveValue(username50);

        // (Bonus kịch bản ẩn) Nếu field có thuộc tính maxlength="50", ta có thể verify nó:
        // await expect(registerPage.getTxtUsername()).toHaveAttribute("maxlength", "50");
    });

});
