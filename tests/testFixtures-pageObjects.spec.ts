import {test} from "../test-options"
import {faker} from "@faker-js/faker"




test('parameterized methods',async ({PageManager})=>{
    const fullName = faker.person.fullName()
    const emailId = `${fullName.replace(' ','')}${faker.number.int(100)}@gmail.com`
    const passwordStr = faker.string.alphanumeric({length:9})
    
    await PageManager.formlayouts().usingthegrid(emailId,passwordStr)
    await PageManager.formlayouts().inlineform(fullName,emailId,true)
})