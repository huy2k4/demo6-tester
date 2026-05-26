import { test, expect } from '../fixtures/custom-fixtures';

test.describe('AC2: Username Field Validation', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/register');
    });

    test('REGISTER_003: Kiểm tra nhập 49 ký tự cho trường dữ liệu "Tên đăng nhập"', async ({ registerPage }) => {
        const username49 = 'a'.repeat(49);
        await registerPage.enterUsername(username49);

        // Hệ thống cho phép nhập 49 ký tự
        await expect(registerPage.getTxtUsername()).toHaveValue(username49);
    });

    test('REGISTER_004: Kiểm tra nhập tối đa 50 ký tự cho trường dữ liệu "Tên đăng nhập"', async ({ registerPage }) => {
        // Pre-condition: đã nhập 49 ký tự
        const username49 = 'a'.repeat(49);
        await registerPage.enterUsername(username49);

        // Nhập thêm 1 ký tự (tổng = 50)
        await registerPage.getTxtUsername().press('b');

        // Hệ thống cho phép nhập 50 ký tự
        const username50 = username49 + 'b';
        await expect(registerPage.getTxtUsername()).toHaveValue(username50);
    });

    test('REGISTER_005: Kiểm tra nhập 51 ký tự cho trường dữ liệu "Tên đăng nhập"', async ({ registerPage }) => {
        // Pre-condition: đã nhập 50 ký tự
        const username50 = 'a'.repeat(50);
        await registerPage.getTxtUsername().fill(username50);

        // Nhập thêm 1 ký tự (cố nhập thứ 51)
        await registerPage.getTxtUsername().press('b');

        // Hệ thống không cho phép nhập quá 50 ký tự, tự động ngăn ký tự thứ 51
        await expect(registerPage.getTxtUsername()).toHaveValue(username50);
    });

    test('REGISTER_006: Kiểm tra đăng ký nếu để trống trường dữ liệu "Tên đăng nhập"', async ({ registerPage }) => {
        // Không nhập nội dung vào trường "Tên đăng nhập"
        // Nhấn "Đăng ký"
        await registerPage.getBtnRegister().click();

        // Hệ thống hiển thị thông báo lỗi ngay dưới textField
        const errMsg = registerPage.getErrorMessage('Tên đăng nhập không được để trống');
        await expect(errMsg).toBeVisible();
    });

});
