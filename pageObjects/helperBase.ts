import {Page} from "@playwright/test"

export class HelperBase{
    readonly page: Page
    constructor(page: Page){
        this.page = page
    }
    async waitForMe(timeinseconds: number){
        await this.page.waitForTimeout(timeinseconds * 1000)
    }
}