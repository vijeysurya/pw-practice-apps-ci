import {Page, expect} from "@playwright/test"

export class FormLayouts{
    readonly page: Page
    constructor(page: Page){
        this.page = page
    }

    async usingthegrid(email_in:string,password_in:string){
        
        const grid_loc = this.page.locator('nb-card').filter({hasText:'Using the Grid'})

        await grid_loc.getByRole('textbox',{name:'Email'}).fill(email_in)
        expect(grid_loc.getByRole('textbox',{name:'Email'})).toHaveValue(email_in)

        await grid_loc.getByRole('textbox',{name:'Password'}).fill(password_in)
        await expect(grid_loc.getByRole('textbox',{name:'Password'})).toHaveValue(password_in)

        await grid_loc.locator('nb-radio').locator(':text-is("Option 2")').click()
        await expect(grid_loc.locator('nb-radio').locator(':text-is("Option 2")')).toBeChecked()

        await this.page.screenshot({path:'screenshot/formLayoutPage/usingthegrid.png'}) //for taking screenshot of whole page after particular step execution

        await grid_loc.getByRole('button',{name:'Sign In'}).click()
    }

    /**
     * This method is going to fill the inline form
     * @param name_in name should be string
     * @param email_in email should be string with appropriate feilds 
     * @param remember_me based on the boolean value this checkbox will be checked
     */
    async inlineform(name_in:string,email_in:string,remember_me:boolean){
        const inline_loc = this.page.locator('nb-card').filter({hasText:'Inline form'})
        await inline_loc.screenshot({path:'screenshot/formLayoutPage/inlineForm.png'})  //for taking screenshot of particular element after that element is appearing in the webpage
        await inline_loc.getByRole('textbox',{name:'Jane Doe'}).fill(name_in)
        expect(inline_loc.getByRole('textbox',{name:'Jane Doe'})).toHaveValue(name_in)

        await inline_loc.getByRole('textbox',{name:'Email'}).fill(email_in)
        expect(inline_loc.getByRole('textbox',{name:'Email'})).toHaveValue(email_in)

        if (remember_me){
            await inline_loc.locator('nb-checkbox :text-is("Remember me")').check({force:true})
            await expect(inline_loc.locator('nb-checkbox :text-is("Remember me")')).toBeChecked()
        }
        else{
            await expect(inline_loc.locator('nb-checkbox :text-is("Remember me")')).not.toBeChecked()
        }
    }
    
}