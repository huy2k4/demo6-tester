import { Locator, Page } from "@playwright/test";
import { TimeOutConstants } from "../constants/TimeOutConstants";

export class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async inputText(locator: Locator, value: string, timeout: number = TimeOutConstants.DEFAULT_TIMEOUT) {
        await locator.fill(value, {timeout: timeout});
    }

    async click(locator: Locator, timeout: number = TimeOutConstants.DEFAULT_TIMEOUT) {
        await locator.click({timeout: timeout});
    }
}
