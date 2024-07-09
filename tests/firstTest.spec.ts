import {expect, test} from '@playwright/test'

/*test('firstTest',async ({page})=>{
    await page.goto("http://localhost:4200/")
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
})*/

test.beforeEach(async ({page})=>{
    await page.goto("/")
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
})

test('User-Facing Locators',async ({page})=>{
    await page.getByRole('textbox',{name:"Email"}).nth(3).click()
    await page.getByRole('textbox',{name:"Password"}).nth(2).click()
    await page.getByRole('button',{name:"send"}).click()
    await page.getByLabel('Email address').click()
    await page.getByPlaceholder('Recipients').click()
    await page.getByText('Inline form').click()
    await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements',async({page})=>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', {name:"sign in"}).nth(1).click()
})

test('locating parent elements',async({page})=>{
    await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:"email"}).click()
    await page.locator('nb-card',{has: page.locator('#exampleInputEmail1')}).getByRole('textbox',{name:"email"}).click()

    await page.locator('nb-card').filter({hasText:"Using the Grid"}).getByRole('textbox',{name:"password"}).click()
    await page.locator('nb-card').filter({has: page.locator('#exampleInputEmail1')}).getByRole('textbox',{name:"password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText:"sign in"}).getByRole('textbox',{name:"password"}).click()

})

test('Reusing the locator',async ({page})=>{
    const basicForm = page.locator('nb-card').filter({hasText:"Using the Grid"})
    const emailFeild = basicForm.getByRole('textbox',{name:"email"})
    await emailFeild.fill('vijey@gmail.com')
    await basicForm.getByRole('textbox',{name:"password"}).fill('AusSyd@*394948')
    await basicForm.getByRole('button',{name:"sign in"}).click()
    await expect(emailFeild).toHaveValue("vijey@gmail.com")
})

test('Extracting the values',async ({page})=>{
    const basicForm = page.locator('nb-card').filter({hasText:"Using the Grid"})
    /*
    //single textvalues
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Sign in')
    */
    /*
    //all textvalues
    const allOption = await basicForm.locator('nb-radio').allTextContents()
    expect(allOption).toContain('Option 2')
    */
    /*
    //inputvalue
    const fillEmail = basicForm.locator("#inputEmail1")
    await fillEmail.fill("Vijey@gmail.com")
    const filledEmail = await fillEmail.inputValue()
    expect(filledEmail).toEqual("Vijey@gmail.com")
    */
    //getAttribute
    const getAttri = await basicForm.locator("#inputEmail1").getAttribute('placeholder')
    expect(getAttri).toEqual("Email")
})

test('assertions',async ({page})=>{
    const basicForm = page.locator('nb-card').filter({hasText:"Using the Grid"}).locator('button')

    //generic assertion
    const value = 6
    expect(value).toEqual(6)
    const button_text = await basicForm.textContent()
    expect(button_text).toEqual('Sign in')

    //locator
    await expect(basicForm).toHaveText('Sign in')

    //soft assertion
    await expect.soft(basicForm).toHaveText('Sign in')
    await basicForm.click()
})