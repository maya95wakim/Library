/// <reference types='cypress'/>

const newUser = {
    first_name: "ali",
    last_name: "ali",
    email: "ali@gmail.com",
    status: "admin",
    password: "ali@123"
}
let token
describe('the authentication APIs', () => {
    it('should sign in successfully and save a new user in the data base', () => {
        cy.request({
            method: 'POST',
            url: Cypress.env('apiUrl')+'/signup',
            body: newUser
        })
            .then(result => {
                expect(result.body.message).to.be.equal('the user has been created')
                expect(result.status).to.be.equal(200)
            })
    })
    it('should throw an error that the uset is already exist', () => {
        cy.request({
            method: 'POST',
            url: Cypress.env('apiUrl')+'/signup',
            body: newUser,
            failOnStatusCode: false
        })
            .then(res => {
                expect(res.body.message).to.be.equal('the user is already exist')
                expect(res.status).to.be.equal(400)
            })
    })
    it('should give a success status when login with valid credintials', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('apiUrl')+'/login',
            body: newUser,
            failOnStatusCode: false
        })
            .its('body').then(body => {
                token = body.token
                expect(body.message).to.equal('logged in successfully')
                expect(body).to.have.property('token')
                expect(body.message).to.exist
            })
    })
    it('should give a fail status when login with invalid email(user is not found)', () => {
        const user = {
            first_name: "maya",
            last_name: "maya",
            email: "maya@gmail.com",
            status: "admin",
            password: "maya@123"
        }
        cy.request({
            method: 'GET',
            url: Cypress.env('apiUrl')+'/login',
            body: user,
            failOnStatusCode: false
        }).then(result => {
                expect(result.body.message).to.be.equal('there is no such a user')
                expect(result.status).to.be.equal(401)
            })
    })
    it('should give a fail status when login with invalid email(password is wrong)', () => {
        const user = {
            first_name: "maya",
            last_name: "maya",
            email: "ali@gmail.com",
            status: "admin",
            password: "maya@123"
        }
        cy.request({
            method: 'GET',
            url: Cypress.env('apiUrl')+'/login',
            body: user,
            failOnStatusCode: false
        }).then(result => {
                expect(result.body.message).to.be.equal('the password is not correct')
                expect(result.status).to.be.equal(401)
            })
    })
})