import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    private btnLoginHeader: Locator;

    constructor(page: Page) {
        super(page);
        // Header thường là thẻ <header> hoặc nav bar, tìm link có chữ Đăng nhập / Login
        this.btnLoginHeader = page.locator('header, nav, .navbar').getByRole('link', { name: /đăng nhập|login/i }).first();
    }

    // Trả về locator để test file có thể dùng .hover() hoặc expect()
    getLoginButton() {
        return this.btnLoginHeader;
    }

    async clickLoginHeader() {
        await this.click(this.btnLoginHeader);
    }
}
