import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
    private txtUsername: Locator;
    private txtFullName: Locator;
    private txtEmail: Locator;
    private txtPhone: Locator;
    private txtPassword: Locator;
    private txtConfirmPassword: Locator;
    private dtpDateOfBirth: Locator;
    private selGender: Locator;
    private btnRegister: Locator;

    constructor(page: Page) {
        super(page);
        this.txtUsername = page.locator("input[name='username']");
        this.txtFullName = page.locator("input[name='fullName']");
        this.txtEmail = page.locator("input[name='email']");
        this.txtPhone = page.locator("input[name='phone']");
        this.txtPassword = page.locator("input[name='password']");
        this.txtConfirmPassword = page.locator("input[name='confirmPassword']");
        this.dtpDateOfBirth = page.locator("#dateOfBirth");
        this.selGender = page.locator("#gender");
        this.btnRegister = page.getByRole("button", { name: "Register" });
    }

    async enterUsername(username: string) { await this.inputText(this.txtUsername, username); }
    async enterFullName(fullName: string) { await this.inputText(this.txtFullName, fullName); }
    async enterEmail(email: string) { await this.inputText(this.txtEmail, email); }
    async enterPhone(phone: string) { await this.inputText(this.txtPhone, phone); }
    async enterPassword(password: string) { await this.inputText(this.txtPassword, password); }
    async enterConfirmPassword(password: string) { await this.inputText(this.txtConfirmPassword, password); }
    async selectDateOfBirth(date: string) { await this.inputText(this.dtpDateOfBirth, date); }
    async selectGender(gender: string) { await this.selGender.selectOption(gender); }
    async clickRegister() { await this.click(this.btnRegister); }

    async register(user: any) {
        await this.enterUsername(user.username);
        await this.enterFullName(user.fullName);
        await this.enterEmail(user.email);
        await this.enterPhone(user.phone);
        await this.enterPassword(user.password);
        await this.enterConfirmPassword(user.password);
        await this.selectDateOfBirth(user.dob);
        await this.selectGender(user.gender);
        await this.clickRegister();
    }
}
