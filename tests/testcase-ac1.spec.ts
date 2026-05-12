import { test, expect } from '../fixtures/custom-fixtures';

test.describe('AC1: Display Registration Form', () => {

    test('TC_AC1_01: Tất cả nhãn, placeholder và nút bấm hiển thị bằng Tiếng Việt', async ({ registerPage, page }) => {
        await page.goto("/register");

        // Kiểm tra Placeholder
        await expect(registerPage.getTxtUsername()).toHaveAttribute("placeholder", "Tên đăng nhập");
        await expect(registerPage.getTxtFullName()).toHaveAttribute("placeholder", "Họ và tên");
        await expect(registerPage.getTxtEmail()).toHaveAttribute("placeholder", "Email");
        await expect(registerPage.getTxtPhone()).toHaveAttribute("placeholder", "Số điện thoại");
        await expect(registerPage.getTxtPassword()).toHaveAttribute("placeholder", "Mật khẩu");
        await expect(registerPage.getTxtConfirmPassword()).toHaveAttribute("placeholder", "Mật khẩu xác nhận");
        
        // Kiểm tra Label
        await expect(page.locator("label[for='dateOfBirth']")).toHaveText("Ngày sinh");
        await expect(page.locator("label[for='gender']")).toHaveText("Giới tính");
        
        // Kiểm tra Nút bấm
        await expect(registerPage.getBtnRegister()).toHaveText("Đăng ký");
    });

    test('TC_AC1_02: Không có văn bản Tiếng Anh nào xuất hiện trên form đăng ký', async ({ page }) => {
        await page.goto("/register");

        // Đảm bảo các text Tiếng Anh mặc định KHÔNG hiển thị trên màn hình
        await expect(page.locator("text='Username'")).not.toBeVisible();
        await expect(page.locator("text='Full Name'")).not.toBeVisible();
        await expect(page.locator("text='Register'")).not.toBeVisible();
    });

});
