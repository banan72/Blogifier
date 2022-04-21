import { Selector, ClientFunction } from 'testcafe'

fixture("UI Tests")

test.page("http://localhost:9888/admin/register")("Testing no input", async t => {
    await t
        .click(".btn")
        .expect(Selector("div.form-floating:nth-child(1) > div:nth-child(3)").innerText).eql("The Email field is required.")
        .expect(Selector("div.form-floating:nth-child(2) > div:nth-child(3)").innerText).eql("The Name field is required.")
        .expect(Selector("div.form-floating:nth-child(3) > div:nth-child(3)").innerText).eql("The Password field is required.")
        .expect(Selector("div.form-floating:nth-child(4) > div:nth-child(3)").innerText).eql("The PasswordConfirm field is required.")
        .takeScreenshot()
})

test.page("http://localhost:9888/admin/register")("Testing no match password", async t => {
    await t
        .typeText("#registerEmail", "test@test.com")
        .typeText("#registerName", "testName")
        .typeText("#registerPassword", "firstPassword")
        .typeText("#registerConfirmPassword", "secondPassword")
        .click(".btn")
        .expect(Selector(".validation-message").innerText).eql("Passwords do not match")
        .takeScreenshot()
})

test.page("http://localhost:9888/admin/register")("Testing redirect on success", async t => {
    const getLocation = ClientFunction(() => document.location.href)
    await t
        .typeText("#registerEmail", "testing@test.com")
        .typeText("#registerName", "testing")
        .typeText("#registerPassword", "realPassword")
        .typeText("#registerConfirmPassword", "realPassword")
        .click(".btn")
        .expect(getLocation()).contains("http://localhost:9888/admin/login/?returnUrl=http%3A%2F%2Flocalhost%3A9888%2Fadmin")
})