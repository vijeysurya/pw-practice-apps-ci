import {expect, test} from '@playwright/test'

/*test('firstTest',async ({page})=>{
    await page.goto("http://localhost:4200/")
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
})*/

test.beforeEach(async ({page})=>{
    await page.goto("http://uitestingplayground.com/ajax")
    await page.getByText("Button Triggering AJAX Request").click()
})

test('autowaiting',async ({page})=>{
    const successButton = page.locator('.bg-success')
    await successButton.click() //this will wait for 30 seconds as default for the element "successButton" to be fully loaded to perform click action
    const text = await successButton.textContent() //this will wait for 30 seconds as default for the element "successButton" to be fully loaded to perform grab text action
    console.log(text)
    await successButton.waitFor({state: "attached"}) //this will for until successButton element is fully loaded so that below step can execute the action
    const text1 = await successButton.allTextContents() //this will not wait for 30 seconds as default for the element "successButton" to be fully loaded to perform grab text action
    console.log(text1)
    //await expect(successButton).toHaveText("Data loaded with AJAX get request.")//this will wait for 5seconds but in this case will fail because successButton will take 15 seconds to load so we can do by below step
    await expect(successButton).toHaveText("Data loaded with AJAX get request.",{timeout: 17000})
})

test('alternative waits',async ({page})=>{
    const successButton = page.locator('.bg-success')
    //wait for an element
    await page.waitForSelector('.bg-success')
    //wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
    //wait fot load state NOT recommended
    await page.waitForLoadState("networkidle")
    const text1 = await successButton.allTextContents()
    expect(text1).toContain("Data loaded with AJAX get request.")
})

test('timeout',async ({page})=>{
    test.setTimeout(20000)//this will reset the test timeout for this testcase to 10seconds only from default 30s
    //test.slow()//into 3 of default test timeout
    const successButton = page.locator('.bg-success')
    await successButton.click()
})