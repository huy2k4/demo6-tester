import { test, expect } from '../fixtures/custom-fixtures';

test.describe('AC1: Display Registration Form', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/register');
    });

    test('REGISTER_001: Kiểm tra form đăng ký tài khoản hiển thị đầy đủ các trường dữ liệu', async ({ registerPage }) => {
        // Kiểm tra đầy đủ các trường dữ liệu hiển thị
        await expect(registerPage.getTxtUsername()).toBeVisible();
        await expect(registerPage.getTxtFullName()).toBeVisible();
        await expect(registerPage.getTxtEmail()).toBeVisible();
        await expect(registerPage.getTxtPhone()).toBeVisible();
        await expect(registerPage.getTxtPassword()).toBeVisible();
        await expect(registerPage.getTxtConfirmPassword()).toBeVisible();
        await expect(registerPage.getDtpDateOfBirth()).toBeVisible();
        await expect(registerPage.getSelGender()).toBeVisible();

        // Kiểm tra nút Đăng ký hiển thị
        await expect(registerPage.getBtnRegister()).toBeVisible();
    });

    test('REGISTER_002: Kiểm tra tất cả nội dung hiển thị trên form đăng ký bằng tiếng Việt', async ({ registerPage, page }) => {
        // Kiểm tra placeholder các trường nhập liệu bằng tiếng Việt
        await expect(registerPage.getTxtUsername()).toHaveAttribute('placeholder', 'Tên đăng nhập');
        await expect(registerPage.getTxtFullName()).toHaveAttribute('placeholder', 'Họ và tên');
        await expect(registerPage.getTxtEmail()).toHaveAttribute('placeholder', 'Email');
        await expect(registerPage.getTxtPhone()).toHaveAttribute('placeholder', 'Số điện thoại');
        await expect(registerPage.getTxtPassword()).toHaveAttribute('placeholder', 'Mật khẩu');
        await expect(registerPage.getTxtConfirmPassword()).toHaveAttribute('placeholder', 'Mật khẩu xác nhận');

        // Kiểm tra label bằng tiếng Việt
        await expect(page.locator("label[for='dateOfBirth']")).toHaveText('Ngày sinh');
        await expect(page.locator("label[for='gender']")).toHaveText('Giới tính');

        // Kiểm tra nút bấm bằng tiếng Việt
        await expect(registerPage.getBtnRegister()).toHaveText('Đăng ký');

        // Kiểm tra không có text tiếng Anh hiển thị
        await expect(page.locator("text='Username'")).not.toBeVisible();
        await expect(page.locator("text='Full Name'")).not.toBeVisible();
        await expect(page.locator("text='Register'")).not.toBeVisible();
    });

});
