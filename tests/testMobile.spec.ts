import {test,expect} from "@playwright/test"

test('testMobile',async ({page},testInfo)=>{
    await page.goto("/")
    if(testInfo.project.name=='mobile'){
        await page.locator('sidebar-toggle').click()
    }
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
    if(testInfo.project.name=='mobile'){
        await page.locator('sidebar-toggle').click()
    }
    const usingTheGridInputFeild = page.locator('nb-card').filter({hasText:"Using the Grid"}).getByRole('textbox',{name:"email"})
    await usingTheGridInputFeild.fill('Vijey@gmail.com')
    await page.pause()
    await usingTheGridInputFeild.clear()
    await usingTheGridInputFeild.pressSequentially('Vijey1@gmail.com')
})