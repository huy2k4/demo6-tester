
import { test, expect } from '../fixtures/custom-fixtures';

test('E2E: Register a random account then Login', async ({ registerPage, loginPage, page }) => {
    // Để không bị trùng lặp account, ta tạo ra một Email & Username ngẫu nhiên theo thời gian
    const randomId = new Date().getTime();
    const randomEmail = `nguoidung_${randomId}@cybersoft.edu.vn`;
    const randomUsername = `user_${randomId}`;
    const password = "VuiHocCode123!";

    // ==========================================
    // STEP 1: ĐĂNG KÝ
    // ==========================================
    // Truy cập mơi đăng ký. Dựa theo HTML bạn cung cấp có link href="/login", vậy đăng ký có thể là /register
    // Nếu sai, bạn tự sửa lại đường dẫn thật nhé.
    await page.goto("/register");

    // Điền toàn bộ thông tin Đăng Ký
    await registerPage.enterUsername(randomUsername);
    await registerPage.enterFullName("Chiến Thần Automation");
    await registerPage.enterEmail(randomEmail);
    await registerPage.enterPhone("0901234567");
    await registerPage.enterPassword(password);
    await registerPage.enterConfirmPassword(password);
    await registerPage.selectDateOfBirth("1995-12-12");
    await registerPage.selectGender("Male");

    // Bấm nút Đăng Ký
    await registerPage.clickRegister();

    // Đợi 2 giây cho web xử lý lưu vào database (thực tế nên xài await expect để báo hiệu UI)
    await page.waitForTimeout(2000);


    // ==========================================
    // STEP 2: ĐĂNG NHẬP
    // ==========================================
    // Đi tới trang đăng nhập
    await page.goto("/login");

    // Có trang thì ô đăng nhập hỏi Email, có trang hỏi Username. 
    // Mình nhập Username hay Email cũng tuỳ thiết kế hệ thống. Dưới đây nhập email ngẫu nhiên vừa tạo:
    await loginPage.enterEmail(randomEmail);
    await loginPage.enterPassword(password);
    await loginPage.clickLogin();

    // Verify (Nếu cần)
    // await expect(page.locator("text=Dashboard")).toBeVisible();
});

test('Register with valid phone number: 0356621341', async ({ registerPage, page }) => {
    const randomId = new Date().getTime();
    const randomEmail = `nguoidung_${randomId}@cybersoft.edu.vn`;
    const randomUsername = `user_${randomId}`;
    const password = "VuiHocCode123!";
    const validPhone = "0356621341";

    // Truy cập trang đăng ký
    await page.goto("/register");

    // Điền thông tin với số điện thoại hợp lệ
    await registerPage.enterUsername(randomUsername);
    await registerPage.enterFullName("Chiến Thần Automation");
    await registerPage.enterEmail(randomEmail);
    await registerPage.enterPhone(validPhone);
    await registerPage.enterPassword(password);
    await registerPage.enterConfirmPassword(password);
    await registerPage.selectDateOfBirth("1995-12-12");
    await registerPage.selectGender("Male");

    // Bấm nút Đăng Ký
    await registerPage.clickRegister();

    // Đợi xử lý
    await page.waitForTimeout(2000);

    // Verify đăng ký thành công (tuỳ theo UI của bạn)
    // await expect(page.locator("text=Register successfully")).toBeVisible();
});
test('Register with long invalid phone number: 12345678912 - Should display only first 10 digits', async ({ registerPage, page }) => {
    const randomId = new Date().getTime();
    const randomEmail = `nguoidung_${randomId}@cybersoft.edu.vn`;
    const randomUsername = `user_${randomId}`;
    const password = "VuiHocCode123!";
    const longInvalidPhone = "12345678912";
    const expectedPhone = "1234567891"; // First 10 digits

    // Truy cập trang đăng ký
    await page.goto("/register");

    // Điền thông tin
    await registerPage.enterUsername(randomUsername);
    await registerPage.enterFullName("Chiến Thần Automation");
    await registerPage.enterEmail(randomEmail);
    await registerPage.enterPhone(longInvalidPhone);
    await registerPage.enterPassword(password);
    await registerPage.enterConfirmPassword(password);
    await registerPage.selectDateOfBirth("1995-12-12");
    await registerPage.selectGender("Male");

    // Verify phone textfield displays only first 10 digits
    const phoneInput = page.locator('input[name="phone"]'); // Adjust selector based on your HTML
    const phoneValue = await phoneInput.inputValue();
    expect(phoneValue).toBe(expectedPhone);

    // Bấm nút Đăng Ký
    await registerPage.clickRegister();

    // Đợi xử lý
    await page.waitForTimeout(2000);
});
test('Register with short invalid phone number: 12345678 - Should show error alert', async ({ registerPage, page }) => {
    const randomId = new Date().getTime();
    const randomEmail = `nguoidung_${randomId}@cybersoft.edu.vn`;
    const randomUsername = `user_${randomId}`;
    const password = "VuiHocCode123!";
    const shortInvalidPhone = "12345678"; // Only 8 digits

    // Truy cập trang đăng ký
    await page.goto("/register");

    // Điền thông tin
    await registerPage.enterUsername(randomUsername);
    await registerPage.enterFullName("Chiến Thần Automation");
    await registerPage.enterEmail(randomEmail);
    await registerPage.enterPhone(shortInvalidPhone);
    await registerPage.enterPassword(password);
    await registerPage.enterConfirmPassword(password);
    await registerPage.selectDateOfBirth("1995-12-12");
    await registerPage.selectGender("Male");

    // Bấm nút Đăng Ký
    await registerPage.clickRegister();

    // Verify error alert is displayed
    await expect(page.locator("text=Số điện thoại không đúng định dạng")).toBeVisible();

    // Đợi xử lý
    await page.waitForTimeout(2000);
});

test('Register with character input in phone number: ENADFDAFS - Should show error alert', async ({ registerPage, page }) => {
    const randomId = new Date().getTime();
    const randomEmail = `nguoidung_${randomId}@cybersoft.edu.vn`;
    const randomUsername = `user_${randomId}`;
    const password = "VuiHocCode123!";
    const invalidPhoneWithCharacters = "ENADFDAFS"; // Invalid characters

    // Truy cập trang đăng ký
    await page.goto("/register");

    // Điền thông tin
    await registerPage.enterUsername(randomUsername);
    await registerPage.enterFullName("Chiến Thần Automation");
    await registerPage.enterEmail(randomEmail);
    await registerPage.enterPhone(invalidPhoneWithCharacters);
    await registerPage.enterPassword(password);
    await registerPage.enterConfirmPassword(password);
    await registerPage.selectDateOfBirth("1995-12-12");
    await registerPage.selectGender("Male");

    // Bấm nút Đăng Ký
    await registerPage.clickRegister();

    // Verify error alert is displayed
    await expect(page.locator("text=Số điện thoại không đúng định dạng")).toBeVisible();

    // Đợi xử lý
    await page.waitForTimeout(2000);
});
test('Register with special character input in phone number: @#$%&((& - Should show error alert', async ({ registerPage, page }) => {
    const randomId = new Date().getTime();
    const randomEmail = `nguoidung_${randomId}@cybersoft.edu.vn`;
    const randomUsername = `user_${randomId}`;
    const password = "VuiHocCode123!";
    const invalidPhoneWithSpecialCharacters = "@#$%&((& "; // Invalid special characters

    // Truy cập trang đăng ký
    await page.goto("/register");

    // Điền thông tin
    await registerPage.enterUsername(randomUsername);
    await registerPage.enterFullName("Chiến Thần Automation");
    await registerPage.enterEmail(randomEmail);
    await registerPage.enterPhone(invalidPhoneWithSpecialCharacters);
    await registerPage.enterPassword(password);
    await registerPage.enterConfirmPassword(password);
    await registerPage.selectDateOfBirth("1995-12-12");
    await registerPage.selectGender("Male");

    // Bấm nút Đăng Ký
    await registerPage.clickRegister();

    // Verify error alert is displayed
    await expect(page.locator("text=Số điện thoại không đúng định dạng")).toBeVisible();

    // Đợi xử lý
    await page.waitForTimeout(2000);
});
test('Register with invalid phone number starting with 1: 1234567891 - Should show error alert', async ({ registerPage, page }) => {
    const randomId = new Date().getTime();
    const randomEmail = `nguoidung_${randomId}@cybersoft.edu.vn`;
    const randomUsername = `user_${randomId}`;
    const password = "VuiHocCode123!";
    const invalidPhoneStartingWith1 = "1234567891"; // Invalid - starts with 1

    // Truy cập trang đăng ký
    await page.goto("/register");

    // Điền thông tin
    await registerPage.enterUsername(randomUsername);
    await registerPage.enterFullName("Chiến Thần Automation");
    await registerPage.enterEmail(randomEmail);
    await registerPage.enterPhone(invalidPhoneStartingWith1);
    await registerPage.enterPassword(password);
    await registerPage.enterConfirmPassword(password);
    await registerPage.selectDateOfBirth("1995-12-12");
    await registerPage.selectGender("Male");

    // Bấm nút Đăng Ký
    await registerPage.clickRegister();

    // Verify error alert is displayed
    await expect(page.locator("text=Số điện thoại không đúng định dạng")).toBeVisible();

    // Đợi xử lý
    await page.waitForTimeout(2000);
});

test('Register with existed phone number: 0356621341 - Should show error alert', async ({ registerPage, page }) => {
    const randomId = new Date().getTime();
    const randomEmail = `nguoidung_${randomId}@cybersoft.edu.vn`;
    const randomUsername = `user_${randomId}`;
    const password = "VuiHocCode123!";
    const existedPhone = "0356621341"; // Phone number that already exists

    // Truy cập trang đăng ký
    await page.goto("/register");

    // Điền thông tin với số điện thoại đã tồn tại
    await registerPage.enterUsername(randomUsername);
    await registerPage.enterFullName("Chiến Thần Automation");
    await registerPage.enterEmail(randomEmail);
    await registerPage.enterPhone(existedPhone);
    await registerPage.enterPassword(password);
    await registerPage.enterConfirmPassword(password);
    await registerPage.selectDateOfBirth("1995-12-12");
    await registerPage.selectGender("Male");

    // Bấm nút Đăng Ký
    await registerPage.clickRegister();

    // Verify error alert is displayed for existing phone number
    await expect(page.locator("text=Số điện thoại đã được sử dụng")).toBeVisible();

    // Đợi xử lý
    await page.waitForTimeout(2000);
});

test('Register with empty phone number - Should show error alert', async ({ registerPage, page }) => {
    const randomId = new Date().getTime();
    const randomEmail = `nguoidung_${randomId}@cybersoft.edu.vn`;
    const randomUsername = `user_${randomId}`;
    const password = "VuiHocCode123!";

    // Truy cập trang đăng ký
    await page.goto("/register");

    // Điền thông tin nhưng bỏ trống số điện thoại
    await registerPage.enterUsername(randomUsername);
    await registerPage.enterFullName("Chiến Thần Automation");
    await registerPage.enterEmail(randomEmail);
    // Skip: await registerPage.enterPhone(); - Leave phone field empty
    await registerPage.enterPassword(password);
    await registerPage.enterConfirmPassword(password);
    await registerPage.selectDateOfBirth("1995-12-12");
    await registerPage.selectGender("Male");

    // Bấm nút Đăng Ký
    await registerPage.clickRegister();

    // Verify error alert is displayed for empty phone number
    const input =  page.locator(`input[name="phone"]`)
    
    const validationMsg = await input.evaluate((e) => (e as HTMLInputElement).validationMessage);
    
    expect(validationMsg).toBe("Please fill out this field.");

    await page.waitForTimeout(2000);
});