/// <reference types='cypress'/>
import data from '../fixtures/data.json'
describe('this description is to test library interactions', () => {
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
    data.info.forEach(testInfo => {
        it(testInfo.description, () => {
            cy.request({
                method: 'POST',
                url: Cypress.env('apiUrl') + '/addBook',
                body: testInfo.bookInfo,
                headers: {
                    authorization: token
                },
                failOnStatusCode: false

            }).then(res => {
                expect(res.body.message).to.be.equal(testInfo.message)
                expect(res.status).to.be.equal(testInfo.status)
                expect(res.body).to.have.property('newBook')
                expect(res.body.newBook.title).to.be.equal(testInfo.bookInfo.title)
            })
        })
    })
})