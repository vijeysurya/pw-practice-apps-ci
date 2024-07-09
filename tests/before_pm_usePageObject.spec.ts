import {test} from "@playwright/test"
import {NavigationPage} from "../pageObjects/navigation"  //pageManager we will use instead
import {FormLayouts} from "../pageObjects/formLayout" //pageManager we will use instead
import {DatepickerPage} from "../pageObjects/datepicker" //pageManager we will use instead


test.beforeEach(async ({page})=>{
    await page.goto("/")
})

test('navigate page',async ({page})=>{
    const navipageto =  new NavigationPage(page) //pageManager we will use instead

    await navipageto.formLayoutPage()
    await navipageto.datepickerPage()
    await navipageto.tooltipPage()
    await navipageto.toastrPage()
    await navipageto.smartTablePage()

})

test('parameterized methods',async ({page})=>{
    const navipageto =  new NavigationPage(page) //pageManager we will use instead
    const formlayouts =  new FormLayouts(page) //pageManager we will use instead
    const datepicker =  new DatepickerPage(page) //pageManager we will use instead
    
    await navipageto.formLayoutPage()
    await formlayouts.usingthegrid('Vijey@gmail.com','AusSyd@*394948')
    await formlayouts.inlineform("Vijey","Surya@gmail.com",true)
    await navipageto.datepickerPage()
    await datepicker.commonDatePicker(5)
    await datepicker.rangeDatePicker(10,20)

})