

describe('App', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3001', { timeout: 10000 })
    })
    
    it("Loads the app", () => {
        const title = cy.get('h1');
        title.should('contain', 'PhoenixTrader');
    }) 

    it('search bar should allow symbol input and search and modal displays ticker name', () => {
        cy.get('[data-testid="search-input"]').type('AAPL');
        cy.get('[data-testid="search-button"]').click(); 
        cy.get('[data-testid="modal-name"]').should('have.text', 'Apple Inc');

  })
})
