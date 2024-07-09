import {expect} from "@playwright/test"
import {test} from "../test-options"

test.beforeEach(async ({page})=>{
    await page.goto("/")
})

test.describe('Form layout',()=>{
    //test.describe.configure({retries:1}) //for retrying every failed test case inside this test suite for one time
    test.beforeEach(async ({page})=>{
        await page.getByText("Forms").click()
        await page.getByText("Form Layouts").click()
    })
    test('inputFeild @smoke @regression',async ({page})=>{
        const usingTheGridInputFeild = page.locator('nb-card').filter({hasText:"Using the Grid"}).getByRole('textbox',{name:"email"})
        await usingTheGridInputFeild.fill('Vijey@gmail.com')
        await page.pause()
        await usingTheGridInputFeild.clear()
        await usingTheGridInputFeild.pressSequentially('Vijey1@gmail.com',{delay:300})
        //generic asserion
        const usingTheGridemailInValue = await usingTheGridInputFeild.inputValue()
        expect(usingTheGridemailInValue).toEqual('Vijey1@gmail.com')
        //locator assertion
        await expect(usingTheGridInputFeild).toHaveValue('Vijey1@gmail.com') 
    })
    test('radioButton @smoke',async ({page})=>{
        const usingTheGridradioButton = page.locator('nb-card').filter({hasText:"Using the Grid"})
        
        await usingTheGridradioButton.getByLabel('Option 1').check({force:true})
        //generic assertion
        const radioGALabel = await usingTheGridradioButton.getByLabel('Option 1').isChecked()
        expect(radioGALabel).toBeTruthy()
        //locator assertion
        await expect(usingTheGridradioButton.getByLabel('Option 1')).toBeChecked()

        await usingTheGridradioButton.getByRole('radio',{name:'option 2'}).check({force:true})
        //generic assertion
        const radioGARole = await usingTheGridradioButton.getByRole('radio',{name:'option 2'}).isChecked()
        expect(radioGARole).toBeTruthy()
        const radioGARole1  =await usingTheGridradioButton.getByLabel('Option 1').isChecked()
        expect(radioGARole1).toBeFalsy()
        //locator assertion
        await expect(usingTheGridradioButton.getByRole('radio',{name:'option 2'})).toBeChecked()
    })
})

test('checkbox',async ({page})=>{
    await page.getByText("Modal & Overlays").click()
    await page.getByText("Toastr").click()

    await page.getByRole("checkbox", {name:'Hide on click'}).uncheck({force:true})
    await page.getByRole("checkbox", {name:'Prevent arising of duplicate toast'}).check({force:true})

    //to check all the checkbox
    const checkBoxes = await page.getByRole("checkbox").all()
    for(var box of checkBoxes){
        await box.check({force:true})
        expect(await box.isChecked()).toBeTruthy()
    }

})

test('list and dropdown',async ({page})=>{
    const dropDown = page.locator('nb-layout-header nb-select')
    await dropDown.click()

    //how to select the item from list, the recommended way in playwright is getByRole
    page.getByRole('list') //when the list has UL tag
    page.getByRole('listitem') //when the listitem has LI tag

    //in-order to select the item from the list the best way is to use filter
    const listItems = page.locator('nb-option-list nb-option')
    //before selecting the item from the list i need to verify the items
    await expect(listItems).toHaveText(["Light","Dark","Cosmic","Corporate"])
    //selecting the item from the list
    await listItems.filter({hasText:"Dark"}).click()
    //i need to verify if the dark is clicked using CSS property
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS("background-color","rgb(34, 43, 69)")

    //i need to verify color is correct by clicking all the color option from the list
    const colors = {
        "Light" : "rgb(255, 255, 255)",
        "Dark" : "rgb(34, 43, 69)",
        "Cosmic" : "rgb(50, 50, 89)",
        "Corporate" : "rgb(255, 255, 255)"
    }
    await dropDown.click()

    //if we are iterating through object means we have to use "in" instead of "of", "of" is for iterating through array of items
    for (var color in colors){
        console.log(color)
        await listItems.filter({hasText:color}).click()
        await expect(header).toHaveCSS("background-color",colors[color])
        if(color!="Corporate"){
            await dropDown.click()
        }
    }
})

test('tooltip',async ({page})=>{
    await page.getByText("Modal & Overlays").click()
    await page.getByText("Tooltip").click()
    const tooltip_Ex = page.locator('nb-card').filter({hasText:"Tooltip Placements"})
    await tooltip_Ex.getByRole('button',{name:"Top"}).hover()
    const verify = await page.locator('nb-tooltip').textContent()
    expect(verify).toEqual("This is a tooltip")
})

test('dialogBox',async ({page})=>{
    await page.getByText("Tables & Data").click()
    await page.getByText("Smart Table").click()

    page.on('dialog',(dialog)=>{
        expect(dialog.message()).toEqual("Are you sure you want to delete?")
        dialog.accept()
    })
    await page.locator('table tbody tr').filter({hasText:"mdo@gmail.com"}).locator('td i.nb-trash').click()
    expect(page.locator('table tbody tr').first()).not.toHaveText("mdo@gmail.com")
})

test('webTables',async ({ page })=>{ //need to understand the webtable properly before writing the code
    await page.getByText("Tables & Data").click()
    await page.getByText("Smart Table").click()

    
    //1 get into the row by any text in the row
    const firstrow = page.getByRole('row',{name:'mdo@gmail.com'}) //before clicking edit this text value is a text value so we used like this
    await firstrow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear() //after clicking the edit the row's text value will get changed into placeholder vale inputtag...so we need to use placeholder
    await page.locator('input-editor').getByPlaceholder('Age').fill('34')
    await page.locator('.nb-checkmark').click()

    //2 get the row based on the value in the specific column
    await page.locator(".ng2-smart-pagination",{hasText:'2'}).click()
    const specificrow = page.getByRole('row',{name:'11'}).filter({has: page.locator('td').nth(1).getByText('11')}) //after selecting the row if we  get two or more rows we can filter using column value
    await specificrow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill("VijeySurya@gmail.com")
    await page.locator('.nb-checkmark').click()
    expect(specificrow.locator('td').nth(5)).toHaveText('VijeySurya@gmail.com')

    //3 test filter of the table
    const age_1 = ["20","30","40","50"]
    const input_filt_age = page.locator("input-filter").getByPlaceholder("Age")

    for (var age_2 of age_1){
        await input_filt_age.clear()
        await input_filt_age.fill(age_2)
        await page.waitForTimeout(2000)
        const rows_new = page.locator('tbody tr')
        for (var row_3 of await rows_new.all()){
            const check_r_data = await row_3.locator('td').last().textContent()
            if (age_2=="50"){
                expect(check_r_data).toContain("No data found")
            }
            else{
                expect(check_r_data).toEqual(age_2)
            }
        }
    }

})

test('dataPicker',async ({page})=>{
    await page.getByText("Forms").click()
    await page.getByText("Datepicker").click()

    var formPicker = page.locator('nb-card',{hasText:"Common Datepicker"}).getByPlaceholder("Form Picker")
    await formPicker.click()
    var date = new Date()
    date.setDate(date.getDate()+50)
    const expectDate = date.getDate().toString()
    const expectMonthLong = date.toLocaleDateString('En-US',{month:'long'})
    const expectMonthShort = date.toLocaleDateString('En-US',{month:'short'})
    const expectYear = date.getFullYear()
    const dateAssert = `${expectMonthShort} ${expectDate}, ${expectYear}`
    var calendarMonthYear = await page.locator("nb-calendar-view-mode button").textContent()
    const expectMonthYear = `${expectMonthLong} ${expectYear}`
    while(!calendarMonthYear.includes(expectMonthYear)){
        await page.locator('nb-icon g[data-name="chevron-right"]').click()
        calendarMonthYear = await page.locator("nb-calendar-view-mode button").textContent()
    }
    await page.locator('nb-calendar-picker-row nb-calendar-day-cell[class="day-cell ng-star-inserted"]').getByText(expectDate,{exact:true}).click()
    
    await expect(formPicker).toHaveValue(dateAssert)
    await page.pause()
})

test('frames',async ({page,globalsqa})=>{
    await page.goto(globalsqa)
    const frame = page.frameLocator('div[rel-title="Photo Manager"] iframe')
    await frame.locator('li h5',{hasText:"High Tatras 2"}).dragTo(frame.locator('#trash'))

    //mouse operation
    await frame.locator('li h5',{hasText:"High Tatras 4"}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()
  

    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2","High Tatras 4"])
})

//my way
test.skip('sorting',async ({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    //login
    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.getByRole('button',{name:' Login '}).click()
    await page.waitForLoadState('networkidle')
    await expect(page.locator('li[class="oxd-userdropdown"]')).toBeVisible()
    //navigate to admin
    await page.locator('ul[class="oxd-main-menu"] li').filter({hasText:'Admin'}).click()
    await page.waitForSelector('.oxd-table-body[role="rowgroup"] .oxd-table-card [role="cell"]:nth-child(2) div')
    //testing the sorting functionality of the table
    //1.getting the default value before sort which is ascending for this table
    const userNameOrgSort = page.locator('.oxd-table-body[role="rowgroup"] .oxd-table-card [role="cell"]:nth-child(2) div')
    const orginalDataArray = await userNameOrgSort.allTextContents()
    console.log("orginalData: " + orginalDataArray)
    
    //descend
    //2.click on username sort for desc check
    const userNameClick = page.locator('[role="columnheader"]',{hasText:"Username"}).locator('.oxd-table-header-sort')
    await userNameClick.click()
    //3.click on descend sort and print the array
    await page.locator('[role="columnheader"]:text-is("Username") [role="dropdown"] li:has-text("Descending")').click()
    await page.waitForLoadState('networkidle')
    const userNameDescSort = page.locator('.oxd-table-body[role="rowgroup"] .oxd-table-card [role="cell"]:nth-child(2) div')
    const descDataArray = await userNameDescSort.allTextContents()
    console.log("descData: " + descDataArray)
    
    //ascend
    //4.click on username sort for asc check
    await userNameClick.click()
    //5.click on ascend sort and print the array
    await page.locator('[role="columnheader"]:text-is("Username") [role="dropdown"] li:has-text("Ascending")').click()
    await page.waitForSelector('.oxd-table-body[role="rowgroup"] .oxd-table-card [role="cell"]:nth-child(2) div')
    const userNameAscSort = page.locator('.oxd-table-body[role="rowgroup"] .oxd-table-card [role="cell"]:nth-child(2) div')
    const ascDataArray = await userNameAscSort.allTextContents()
    console.log("ascData: " + ascDataArray)



    //we will use .sort() in orginal data array to do sort operation for an assertion purpose
    //desc
    const descSortOrg = orginalDataArray.sort((a,b) => b.localeCompare(a))
    console.log(descSortOrg)
    //asc
    const ascSortOrg = orginalDataArray.sort((a,b) => a.localeCompare(b))
    console.log(ascSortOrg)

    //assertion
    expect(descSortOrg).toEqual(descDataArray)
    expect(ascSortOrg).toEqual(ascDataArray)


})

//chatgpt way
test('sorting chat', async ({ page }) => {
    await page.goto(process.env.URL);

    // Login
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: ' Login ' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('li[class="oxd-userdropdown"]')).toBeVisible();

    // Navigate to Admin
    await page.locator('ul[class="oxd-main-menu"] li').filter({ hasText: 'Admin' }).click();
    await page.waitForSelector('.oxd-table-body[role="rowgroup"] .oxd-table-card [role="cell"]:nth-child(2) div');

    // Locators
    const userNameCellLocator = page.locator('.oxd-table-body[role="rowgroup"] .oxd-table-card [role="cell"]:nth-child(2) div');
    const userNameSortButton = page.locator('[role="columnheader"]', { hasText: "Username" }).locator('.oxd-table-header-sort');
    const userNameDropdown = page.locator('[role="columnheader"]:text-is("Username") [role="dropdown"]');

    // Get original data
    const originalDataArray = await userNameCellLocator.allTextContents();
    console.log("Original Data: " + originalDataArray);

    // Function to sort and verify
    async function sortAndVerify(sortOrder, expectedData) {
        await userNameSortButton.click();
        await userNameDropdown.locator(`li:has-text("${sortOrder}")`).click();
        await page.waitForSelector('.oxd-table-body[role="rowgroup"] .oxd-table-card [role="cell"]:nth-child(2) div');
        const sortedDataArray = await userNameCellLocator.allTextContents();
        console.log(`${sortOrder} Data: ` + sortedDataArray);
        expect(sortedDataArray).toEqual(expectedData);
    }

    // Expected sorted arrays
    const descSortExpected = [...originalDataArray].sort((a, b) => b.localeCompare(a));
    const ascSortExpected = [...originalDataArray].sort((a, b) => a.localeCompare(b));

    console.log("Expected Descending Sort: " + descSortExpected);
    console.log("Expected Ascending Sort: " + ascSortExpected);

    // Verify sorting
    await sortAndVerify("Descending", descSortExpected);
    await sortAndVerify("Ascending", ascSortExpected);
});

