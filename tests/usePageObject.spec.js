import {test,expect} from "@playwright/test"
import {PageManager} from "../pageObjects/pageManager"
import {faker} from "@faker-js/faker"


test.beforeEach(async ({page})=>{
    await page.goto("/")
})

test.describe.configure({retries:1})
test('navigate page @navitest',async ({page})=>{
    const pm = new PageManager(page)

    await pm.navipageto().formLayoutPage()
    await pm.navipageto().datepickerPage()
    await pm.navipageto().tooltipPage()
    await pm.navipageto().toastrPage()
    await pm.navipageto().smartTablePage()

})

test.describe.configure({retries:1})
test('parameterized methods @paramtest',async ({page})=>{
    const pm = new PageManager(page)
    const fullName = faker.person.fullName()
    const emailId = `${fullName.replace(' ','')}${faker.number.int(100)}@gmail.com`
    const passwordStr = faker.string.alphanumeric({length:9})
    
    await pm.navipageto().formLayoutPage()
    await pm.formlayouts().usingthegrid(emailId,passwordStr)
    await pm.formlayouts().inlineform(fullName,emailId,true)
    await pm.navipageto().datepickerPage()
    await pm.datepicker().commonDatePicker(5)
    await pm.datepicker().rangeDatePicker(50,60)

})