import {Page} from "@playwright/test"
import {NavigationPage} from "../pageObjects/navigation"
import {FormLayouts} from "../pageObjects/formLayout"
import {DatepickerPage} from "../pageObjects/datepicker"

export class PageManager{

    readonly page: Page
    readonly navigationpage: NavigationPage
    readonly formlayoutspage: FormLayouts
    readonly datepickerpage: DatepickerPage

    constructor(page: Page){
    this.page = page
    this.navigationpage = new NavigationPage(this.page)
    this.formlayoutspage = new FormLayouts(this.page)
    this.datepickerpage = new DatepickerPage(this.page)
    }

    navipageto(){
        return this.navigationpage
    }

    formlayouts(){
        return this.formlayoutspage
    }

    datepicker(){
        return this.datepickerpage
    }
}