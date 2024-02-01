/// <reference types='cypress'/>
import data from '../fixtures/orders.json'
describe('this description is to test orders interactions', () => {
    let token
    before('login with an existing user to get the token for authorization', () => {
        const loggedUser = {
            email: "ali@gmail.com",
            password: "ali@123"
        }
        cy.request('GET', Cypress.env('apiUrl') + '/login', loggedUser).its('body').then(body => {
            token = body.token
        })
    })
    data.testInfo.forEach(dataInput => {
        it(dataInput.description, () => {
            cy.request({
                method:dataInput.method,
                url: Cypress.env('apiUrl') + dataInput.url,
                headers: {
                    authorization: token
                },
                failOnStatusCode: false
            }).then(result => {
                expect(result.body.message).to.be.equal(dataInput.message)
                expect(result.status).to.be.equal(dataInput.statusCode)
            })
        })
    })
})