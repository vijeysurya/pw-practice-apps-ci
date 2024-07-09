import {test as base} from "@playwright/test"
import { PageManager } from "./pageObjects/pageManager"

export type TypeOptions = {  //exporting to use in testRunner
    globalsqa : string
    fromLayOutsPage : string
    PageManager : PageManager
}

//exporting to use in testfile
//there will be already one test import in test file...just replace that with this one like importing this one so that now test will be imported alonf with base operation
export const test = base.extend<TypeOptions>({
    globalsqa : ['',{option:true}],
    
    //do not confuse fixtures with test steps because fixures are just for setting up the env before running the test
    fromLayOutsPage : async ({page},use)=>{
        await page.goto("/")
        await page.getByText("Forms").click()
        await page.getByText("Form Layouts").click()
        await use('')},

    /*fromLayOutsPage : [async ({page},use)=>{
        await page.goto("/")
        await page.getByText("Forms").click()
        await page.getByText("Form Layouts").click()
        await use('')},{auto:true}],//if we give like this means fromLayOutsPage we dont want to use along with page fixture in test file //this will get initialize before every hook that is very first thing
    */    
    PageManager : async({page,fromLayOutsPage},use)=>{
        const pm = new PageManager(page)
        await use(pm)
    }

})
