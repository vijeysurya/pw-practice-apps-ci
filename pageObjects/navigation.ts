import {Page} from "@playwright/test"
import { HelperBase } from "./helperBase"

export class NavigationPage extends HelperBase{
    constructor(page: Page){
        super(page)
    }
    async formLayoutPage(){
        await this.groupItem("Forms")
        await this.page.getByText("Form Layouts").click()
        //const waitForMe = new HelperBase(this.page)  //or we can extend the specific class using inheritance so that we can use or access the method straight away without creating instance for the class
        //await waitForMe.waitForMe(5)
        await this.waitForMe(5)
    }
    async datepickerPage(){
        await this.groupItem("Forms")
        await this.page.getByText("Datepicker").click()
    }
    async tooltipPage(){
        await this.groupItem("Modal & Overlays")
        await this.page.getByText("Tooltip").click()
    }
    async toastrPage(){
        await this.groupItem("Modal & Overlays")
        await this.page.getByText("Toastr").click()
    }
    async smartTablePage(){
        await this.page.getByText("Tables & Data").click()
        await this.page.getByText("Smart Table").click()
    }

    private async groupItem(getTitle: string){
        const expanedCheck = await this.page.getByTitle(getTitle).getAttribute('aria-expanded')
        if(expanedCheck.includes('false')){
            await this.page.getByTitle(getTitle).click()
        }
    }
}
