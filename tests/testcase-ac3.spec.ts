import { test, expect } from '../fixtures/custom-fixtures';

test.describe('AC3: Full Name Field Validation', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/register');
    });

    test('REGISTER_007: Kiểm tra nhập 49 ký tự ở trường dữ liệu "Họ và tên"', async ({ registerPage }) => {
        const fullName49 = 'A'.repeat(49);
        await registerPage.enterFullName(fullName49);

        // Hệ thống cho phép nhập 49 ký tự
        await expect(registerPage.getTxtFullName()).toHaveValue(fullName49);
    });

    test('REGISTER_008: Kiểm tra nhập 50 ký tự ở trường dữ liệu "Họ và tên"', async ({ registerPage }) => {
        // Pre-condition: đã nhập 49 ký tự
        const fullName49 = 'A'.repeat(49);
        await registerPage.enterFullName(fullName49);

        // Nhập thêm 1 ký tự (tổng = 50)
        await registerPage.getTxtFullName().press('B');

        // Hệ thống cho phép nhập 50 ký tự
        const fullName50 = fullName49 + 'B';
        await expect(registerPage.getTxtFullName()).toHaveValue(fullName50);
    });

    test('REGISTER_009: Kiểm tra nhập 51 ký tự ở trường dữ liệu "Họ và tên"', async ({ registerPage }) => {
        // Pre-condition: đã nhập 50 ký tự
        const fullName50 = 'A'.repeat(50);
        await registerPage.getTxtFullName().fill(fullName50);

        // Cố nhập thêm 1 ký tự thứ 51
        await registerPage.getTxtFullName().press('B');

        // Hệ thống tự động ngăn nhập ký tự thứ 51, chỉ giữ lại 50
        await expect(registerPage.getTxtFullName()).toHaveValue(fullName50);
    });

    test('REGISTER_010: Kiểm tra nhập tên tiếng Việt có dấu vào trường dữ liệu "Họ và tên"', async ({ registerPage }) => {
        const testData = 'Nguyễn Thị Thảo';
        await registerPage.enterFullName(testData);

        // Hệ thống cho phép nhập chữ cái tiếng Việt có dấu và khoảng trắng
        await expect(registerPage.getTxtFullName()).toHaveValue(testData);
    });

    test('REGISTER_011: Kiểm tra nhập tên tiếng Anh vào trường dữ liệu "Họ và tên"', async ({ registerPage }) => {
        const testData = 'John Smith';
        await registerPage.enterFullName(testData);

        // Hệ thống cho phép nhập chữ cái tiếng Anh và khoảng trắng
        await expect(registerPage.getTxtFullName()).toHaveValue(testData);
    });

    test('REGISTER_012: Kiểm tra nhập tên tiếng Việt trộn tiếng Anh vào trường dữ liệu "Họ và tên"', async ({ registerPage }) => {
        const testData = 'Nguyễn Thị Anna';
        await registerPage.enterFullName(testData);

        // Hệ thống cho phép nhập chữ cái tiếng Việt trộn tiếng Anh và khoảng trắng
        await expect(registerPage.getTxtFullName()).toHaveValue(testData);
    });

    test('REGISTER_013: Kiểm tra nhập số vào trường dữ liệu "Họ và tên"', async ({ registerPage }) => {
        const testData = 'Thảo124533';
        await registerPage.enterFullName(testData);
        await registerPage.getBtnRegister().click();

        // Hệ thống hiển thị thông báo lỗi định dạng
        const errMsg = registerPage.getErrorMessage('Họ và tên chỉ bao gồm chữ cái (Unicode) và khoảng trắng');
        await expect(errMsg).toBeVisible();
    });

    test('REGISTER_014: Kiểm tra nhập ký tự đặc biệt vào trường dữ liệu "Họ và tên"', async ({ registerPage }) => {
        const testData = 'Thảo@#$^*';
        await registerPage.enterFullName(testData);
        await registerPage.getBtnRegister().click();

        // Hệ thống hiển thị thông báo lỗi định dạng
        const errMsg = registerPage.getErrorMessage('Họ và tên chỉ bao gồm chữ cái (Unicode) và khoảng trắng');
        await expect(errMsg).toBeVisible();
    });

    test('REGISTER_015: Kiểm tra đăng ký nếu để trống trường dữ liệu "Họ và tên"', async ({ registerPage }) => {
        // Không nhập nội dung vào trường "Họ và tên"
        // Nhấn "Đăng ký"
        await registerPage.getBtnRegister().click();

        // Hệ thống hiển thị thông báo ngay dưới textField "Họ và tên"
        const errMsg = registerPage.getErrorMessage('Họ và tên không được để trống');
        await expect(errMsg).toBeVisible();
    });

});
