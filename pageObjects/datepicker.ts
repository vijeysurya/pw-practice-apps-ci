import {Page,expect} from "@playwright/test"

export class DatepickerPage{
    readonly page: Page
    constructor(page: Page){
        this.page = page
    }
    
    async commonDatePicker(numberofdays:number){
        var formPicker = this.page.locator('nb-card',{hasText:"Common Datepicker"}).getByPlaceholder("Form Picker")
        await formPicker.click()
        await this.page.locator('nb-card',{hasText:"Common Datepicker"}).screenshot({path:'screenshot/commondatapicker.png'})
        const {dateAssert: dateAssert,expectedDate: expectedDate} = await this.datePickerOperation(numberofdays)
        //selecting the date from the calendar
        await this.page.locator('nb-calendar-picker-row nb-calendar-day-cell[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact:true}).click() 
        //asserting the selected date
        await expect(formPicker).toHaveValue(dateAssert)

    }
    //+
    //rangeDatePicker will work fine for range with future dates for the same month eg(30,40) but assertion will get passed
    //rangeDatePicker will work fine for range with past dates for the same month eg(40,30) but assertion will get failed
    //rangeDatePicker will not work fine for range with past dates with different months eg(100,30) will stuck in while loop
    //()-->in this first argument value should be less than second argument value
    //-
    //rangeDatePicker will work fine for range with past dates for the same month eg(30,40) but assertion will get failed
    //rangeDatePicker will work fine for range with past dates for the same month eg(40,30) but assertion will get passed
    //rangeDatePicker will work fine for range with past dates with the different month eg(100,30) will stuck in while loop
    //()-->in this first argument value should be less than second argument value
    // later need to fix this

    async rangeDatePicker(startDate:number,endDate:number){
        var rangePicker = this.page.locator('nb-card',{hasText:"Datepicker With Range"}).getByPlaceholder("Range Picker")
        await rangePicker.click()
        const {dateAssert: dateAssertStart,expectedDate: expectedDateStart}  = await this.datePickerOperation(startDate)
        //selecting the date from the calendar
        await this.page.locator('nb-calendar-picker-row nb-calendar-range-day-cell[class="range-cell day-cell ng-star-inserted"]').getByText(expectedDateStart,{exact:true}).click() 
        const {dateAssert: dateAssertEtart,expectedDate: expectedDateEtart}  = await this.datePickerOperation(endDate)
        //selecting the date from the calendar
        await this.page.locator('nb-calendar-picker-row nb-calendar-range-day-cell[class="range-cell day-cell ng-star-inserted"]').getByText(expectedDateEtart,{exact:true}).click() 
        const dateAssert = `${dateAssertStart} - ${dateAssertEtart}`
        //asserting the selected date
        await expect(rangePicker).toHaveValue(dateAssert)
    }

    private async datePickerOperation(numberofdays:number){
        
        //getting todays date
        var date = new Date()
        //setting + or - from todays date
        date.setDate(date.getDate()+numberofdays)

        //extracting only date value
        const expectedDate = date.getDate().toString()
        //extracting only month with long value
        const expectedMonthLong = date.toLocaleDateString('En-US',{month:'long'})
        //extracting only month with shot value
        const expectedMonthShort = date.toLocaleDateString('En-US',{month:'short'})
        //extracting only month with twodigit value
        const expectedMonthTwoDigit = date.toLocaleDateString('En-US',{month:'2-digit'})
        //extracting only year value
        const expectYear = date.getFullYear()

        //forming the month&year value to check if value is equal to calendar month&year value
        const expectedMonthYear = `${expectedMonthLong} ${expectYear}`
        //forming the calendar month&year value
        var calendarMonthYear = await this.page.locator("nb-calendar-view-mode button").textContent()
        
        //forming the value in date format so that it can be compared with system date value
        const expectedforPastFutureDate = `${expectYear}-${expectedMonthTwoDigit}-${expectedDate}`
        //extracting the system date value excluding timestamps
        var forPastFutureDate = new Date().toISOString().split('T')[0]
        if(expectedforPastFutureDate<forPastFutureDate){  //condition to check whether based on the calendar displaying month&Year with user month&Year, so that we can change the calendar month to future or past
            while(calendarMonthYear.trim()!=expectedMonthYear){
                await this.page.locator('nb-card nb-icon g[data-name="chevron-left"]').click()
                calendarMonthYear = await this.page.locator("nb-calendar-view-mode button").textContent()
            }
        }
        else{
            while(calendarMonthYear.trim()!=expectedMonthYear){2
                await this.page.locator('nb-icon g[data-name="chevron-right"]').click()
                calendarMonthYear = await this.page.locator("nb-calendar-view-mode button").textContent()
            }
        } //calendar month&year selection is done

       

        //extracting the date from user and returning it to assert
        const dateAssert = `${expectedMonthShort} ${expectedDate}, ${expectYear}`
        return {dateAssert,expectedDate}

    }
}