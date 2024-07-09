import { test,expect } from "@playwright/test"
test('sliders',async({page})=>{
    await page.goto("http://localhost:4200/pages/iot-dashboard")
    /*
    //slider navigation using updating the attribute value
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger div svg g circle')
    await tempGauge.evaluate(Node=>{
        Node.setAttribute('cx','270.820')
        Node.setAttribute('cy','133.143')
    })
    await tempGauge.click() //this will make necessary UI changes for the slider
    */
    //simulating the slider
    //first we need to form the bounding box for mouse element of the slider
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded() //we are doing the scroll operation to the locator 
    const box= await tempBox.boundingBox() //creating the bounding box where x and y value is 0,0
    var x = box.x +box.width/2 
    var y = box.y +box.width/2
    await page.mouse.move(x,y)
    await page.mouse.down()
    await page.mouse.move(x + 100, y)
    await page.mouse.move(x+100, y+100)
    await page.mouse.up()

})

test('sliders_own_eg',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    //slider navigation using updating the attribute value
    const slider_eg = page.locator('#slider span')
    await slider_eg.scrollIntoViewIfNeeded()
    await slider_eg.evaluate(Node=>{
        Node.setAttribute('style','left: 64%;')
    })   
    //await tempGauge.click() //this will make necessary UI changes for the slider
})