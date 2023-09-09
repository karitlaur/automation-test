beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */
it('Check that the list of radio buttons is correct', () => {
    cy.get('input[type="radio"]').should('have.length', 4)

    cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
    cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
    cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
    cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

    cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    cy.get('input[type="radio"]').eq(1).should('not.be.checked')
    cy.get('input[type="radio"]').eq(2).should('not.be.checked')
    cy.get('input[type="radio"]').eq(3).should('not.be.checked')

    cy.get('input[type="radio"]').eq(0).check().should('be.checked')
    cy.get('input[type="radio"]').eq(1).check().should('be.checked')
    cy.get('input[type="radio"]').eq(0).should('not.be.checked')
})

it('Check that the Country dropdown is correct', () => {
    cy.get('#country').find('option').should('have.length', 4)
    cy.get('#country').find('option').eq(0).should('have.text', '')
    cy.get('#country').find('option').then(options => {
        const actual = [...options].map(option => option.value)
        expect(actual).to.deep.eq(['', 'object:3', 'object:4', 'object:5'])
    })
})


it('Check that the country and city dropdowns are correct.', () => {
    cy.get('#country').find('option').should('have.length', 4)
    cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
    cy.get('#country').select('Spain')

    cy.get('#city').find('option').should('have.length', 5)
    cy.get('#city').find('option').eq(0).should('have.text', '')
    cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
    cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
    cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
    cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')

    cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
    cy.get('#country').select('Estonia')

    cy.get('#city').find('option').should('have.length', 4)
    cy.get('#city').find('option').eq(0).should('have.text', '')
    cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
    cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
    cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')
    
    cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
    cy.get('#country').select('Austria')
    
    cy.get('#city').find('option').should('have.length', 4)
    cy.get('#city').find('option').eq(0).should('have.text', '')
    cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
    cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
    cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')

    })


it('Check that the checkboxes list is correct', () => {
    cy.get('input[type="checkbox"]').next().eq(0)
    cy.get('input[type="checkbox"]').next().eq(1)

    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
    cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')

    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(0).should('be.checked')
})

it('Check that the e-mail input should support the correct format', () => {
    cy.get("input[name='email']").type('invalid')
    cy.get('#emailAlert').should('be.visible').should('contain', 'Invalid email address')

    cy.get('input[type="submit"]').eq(1).should('be.disabled')

    cy.get("input[name='email']").clear()
    cy.get("input[name='email']").type('marimaasikas@gmail.com')
    cy.get('#emailAlert').should('not.be.visible')
    
})


/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */
it('User can submit form with all fields added', ()=>{
    cy.get('#name').type('Mari Maasikas')
    cy.get("input[name='email']").type('marimaasikas@gmail.com')
    
    cy.get('#country').select('Estonia')
    cy.get('#city').select('Tallinn')
    cy.get("input[type='date']").eq(0).type('1987-04-07')
    cy.get('#birthday').type('1987-04-07')
    cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').click()
    cy.get('input[type="checkbox"]').eq(0).click()
    cy.get('input[type="checkbox"]').eq(1).click()

    cy.get('input[type="submit"]').eq(1).should('be.enabled').click()
    cy.get('h1').contains('Submission received')
    
})














