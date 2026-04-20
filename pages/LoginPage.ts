import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private txtEmail: Locator;
    private txtPassword: Locator;
    private btnLogin: Locator;

    constructor(page: Page) {
        super(page);
        // Ô đăng nhập đôi khi lại có tên là 'username' thay vì 'email', nên mình dự phòng cả hai
        this.txtEmail = page.locator("input[name='email'], input[name='username']");
        this.txtPassword = page.locator("input[name='password']");
        this.btnLogin = page.getByRole("button", { name: /đăng nhập|login/i });
    }

    async enterEmail(email: string) {
        await this.inputText(this.txtEmail, email);
    }

    async enterPassword(password: string) {
        await this.inputText(this.txtPassword, password);
    }

    async clickLogin() {
        await this.click(this.btnLogin);
    }

    async login(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}
