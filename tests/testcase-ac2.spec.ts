import { test, expect } from '../fixtures/custom-fixtures';

test.describe('AC2: Username Field Validation', () => {

    test('TC_AC2_01: Placeholder hiển thị "Tên đăng nhập"', async ({ registerPage, page }) => {
        await page.goto("/register");
        await expect(registerPage.getTxtUsername()).toHaveAttribute("placeholder", "Tên đăng nhập");
    });

    test('TC_AC2_02: Cho phép nhập tối đa 50 ký tự', async ({ registerPage, page }) => {
        await page.goto("/register");
        const username50 = "a".repeat(50);
        await registerPage.enterUsername(username50);
        await expect(registerPage.getTxtUsername()).toHaveValue(username50);
    });

    test('TC_AC2_03: Nếu nhập quá 50 ký tự, hệ thống tự động chặn lại', async ({ registerPage, page }) => {
        await page.goto("/register");
        
        // Cách 1: Test maxlength
        await expect(registerPage.getTxtUsername()).toHaveAttribute("maxlength", "50");

        // Cách 2: Ép điền 51 ký tự xem có bị cắt bớt không
        const username51 = "a".repeat(51);
        await registerPage.getTxtUsername().fill(username51); // Dùng fill để chèn chuỗi dài
        
        const username50 = "a".repeat(50);
        await expect(registerPage.getTxtUsername()).toHaveValue(username50);
    });

    test('TC_AC2_04: Bỏ trống trường Tên đăng nhập hiển thị thông báo lỗi', async ({ registerPage, page }) => {
        await page.goto("/register");
        
        // Trigger validation (click input then click button)
        await registerPage.getTxtUsername().click();
        await registerPage.getBtnRegister().click();

        const errMsg = registerPage.getErrorMessage("Vui lòng điền vào trường này");
        await expect(errMsg.first()).toBeVisible();
    });

});
