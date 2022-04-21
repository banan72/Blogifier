import { Selector, ClientFunction } from 'testcafe'

fixture("UI Tests")


/***
 * Function used to generate a random string of specified characters, used for creating new random emails for testing purpose
 * @param length length of the random string wanted
 * @returns a random string of desired length
 */
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


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
    const getLocation = ClientFunction(() => document.location.href)    //Utility function

    let randomEmail = "testing" + makeid(5) + "@test.com"

    await t
        .typeText("#registerEmail", randomEmail)
        .typeText("#registerName", "testing")
        .typeText("#registerPassword", "realPassword")
        .typeText("#registerConfirmPassword", "realPassword")
        .click(".btn")
        .expect(getLocation()).contains("http://localhost:9888/admin/login/?returnUrl=http%3A%2F%2Flocalhost%3A9888%2Fadmin")
        .takeScreenshot()
})





test.page("http://localhost:9888/admin/login")("Testing email doesn't exist on login", async t => {
    await t
        .typeText("#loginEmail", "doesNotExist@nope.com")
        .typeText("#loginPassword", "randomPass")
        .click(".btn")
        .expect(Selector(".account-message").innerText).eql("Login failed, please try again.")
        .takeScreenshot()
})

test.page("http://localhost:9888/admin/login")("Testing password not correct on login", async t => {
    await t
        .typeText("#loginEmail", "testing@test.com")
        .typeText("#loginPassword", "notTheCorrectPassword")
        .click(".btn")
        .expect(Selector(".account-message").innerText).eql("Login failed, please try again.")
        .takeScreenshot()
})

test.page("http://localhost:9888/admin/login")("Testing redirect on successful login", async t => {
    const getLocation = ClientFunction(() => document.location.href)    //Utility function

    await t
        .typeText("#loginEmail", "testing@test.com")
        .typeText("#loginPassword", "realPassword")
        .click(".btn")
        .expect(getLocation()).contains("http://localhost:9888/admin/")
        .takeScreenshot()
})