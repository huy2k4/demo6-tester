import { test, expect } from '../fixtures/custom-fixtures';

test.describe('AC4: Email Field Validation', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/register');
    });

    test('REGISTER_016: Kiểm tra nhập email hợp lệ ở trường dữ liệu "Email"', async ({ registerPage }) => {
        const validEmail = 'NguyenThiThao250400@gmail.com';
        await registerPage.enterEmail(validEmail);

        // Nhập thành công email đúng định dạng
        await expect(registerPage.getTxtEmail()).toHaveValue(validEmail);
    });

    test('REGISTER_017: Kiểm tra thông báo lỗi nếu nhập email sai định dạng', async ({ registerPage }) => {
        // Nhập email sai định dạng: 123@, @123, Thao123@123
        const invalidEmails = ['123@', '@123', 'Thao123@123'];

        for (const email of invalidEmails) {
            await registerPage.getTxtEmail().clear();
            await registerPage.enterEmail(email);
            await registerPage.getBtnRegister().click();

            // Hệ thống hiển thị thông báo lỗi định dạng
            const errMsg = registerPage.getErrorMessage('Email phải đúng định dạng [Tên email@tên miền]');
            await expect(errMsg).toBeVisible();
        }
    });

    test('REGISTER_018: Kiểm tra đăng ký thất bại với email đã được đăng ký', async ({ registerPage, page }) => {
        // Nhập email đã tồn tại trong hệ thống vào trường "Email"
        const existingEmail = 'thithao25082004@gmail.com';
        await registerPage.enterUsername('testuser01');
        await registerPage.enterFullName('Nguyễn Thị Thảo');
        await registerPage.enterEmail(existingEmail);
        await registerPage.enterPhone('0987654321');
        await registerPage.enterPassword('Password@123');
        await registerPage.enterConfirmPassword('Password@123');
        await registerPage.selectDateOfBirth('01/01/2000');
        await registerPage.selectGender('Nam');
        await registerPage.getBtnRegister().click();

        // Hệ thống hiển thị thông báo và không cho phép đăng ký
        const errMsg = registerPage.getErrorMessage('Email này đã tồn tại trên hệ thống');
        await expect(errMsg).toBeVisible();
    });

    test('REGISTER_019: Kiểm tra hiển thị thông báo khi để trống trường dữ liệu email', async ({ registerPage }) => {
        // Không nhập email, nhấn "Đăng ký"
        await registerPage.getBtnRegister().click();

        // Hệ thống hiển thị thông báo ngay dưới textField "Email"
        const errMsg = registerPage.getErrorMessage('Email không được để trống');
        await expect(errMsg).toBeVisible();
    });

});
