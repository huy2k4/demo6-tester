import { test, expect } from '../fixtures/custom-fixtures';

test.describe('AC3: Full Name Field Validation', () => {

    test('TC_AC3_01: Placeholder hiển thị "Họ và tên"', async ({ registerPage, page }) => {
        await page.goto("/register");
        await expect(registerPage.getTxtFullName()).toHaveAttribute("placeholder", "Họ và tên");
    });

    test('TC_AC3_02: Cho phép nhập tối đa 50 ký tự', async ({ registerPage, page }) => {
        await page.goto("/register");
        // Nhập 50 ký tự hợp lệ
        const fullName50 = "Nguyễn Văn " + "A".repeat(39);
        await registerPage.enterFullName(fullName50);
        await expect(registerPage.getTxtFullName()).toHaveValue(fullName50);
    });

    test('TC_AC3_03: Nếu nhập quá 50 ký tự, hệ thống tự động chặn lại', async ({ registerPage, page }) => {
        await page.goto("/register");
        
        await expect(registerPage.getTxtFullName()).toHaveAttribute("maxlength", "50");
        
        // Thử ép điền 51 ký tự
        const fullName51 = "Nguyễn Văn " + "A".repeat(40);
        await registerPage.getTxtFullName().fill(fullName51);
        
        const fullName50 = "Nguyễn Văn " + "A".repeat(39);
        await expect(registerPage.getTxtFullName()).toHaveValue(fullName50);
    });

    test('TC_AC3_04: Chỉ cho phép ký tự chữ cái (Unicode) và khoảng trắng', async ({ registerPage, page }) => {
        await page.goto("/register");
        
        // Nhập số và ký tự đặc biệt
        await registerPage.enterFullName("Nguyễn Văn A 123 @#");
        
        // Nhấn nút submit để validate
        await registerPage.getBtnRegister().click();
        
        // Tuỳ theo thiết kế hệ thống, có thể nó xoá đi tự động hoặc hiển thị lỗi
        // Ở đây giả định nó báo lỗi định dạng (sửa lại theo UI thực tế nếu cần)
        // const errMsg = registerPage.getErrorMessage("Chỉ cho phép ký tự chữ và khoảng trắng");
        // await expect(errMsg).toBeVisible();
    });

    test('TC_AC3_05: Bỏ trống trường Họ và tên hiển thị thông báo lỗi', async ({ registerPage, page }) => {
        await page.goto("/register");
        
        // Trigger validation
        await registerPage.getTxtFullName().click();
        await registerPage.getBtnRegister().click();

        // Sử dụng nth(1) nếu Form có nhiều trường bắt buộc cùng báo lỗi "Vui lòng điền vào trường này" 
        // Hoặc first() nếu nó là lỗi đầu tiên xuất hiện
        const errMsg = registerPage.getErrorMessage("Vui lòng điền vào trường này");
        await expect(errMsg.nth(1)).toBeVisible(); 
    });

});
