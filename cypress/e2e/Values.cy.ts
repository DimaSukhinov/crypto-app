import * as cypress from 'cypress';

describe('Values E2E', () => {

  sessionStorage.setItem('page', '1')

  it('the first currency of the values list must be added to portfolio', () => {
    cy.visit('/');

    cy.get('[data-testid="button"]').first().click();
    cy.get('[data-testid="value-input"]').type('2').should('have.value', '2');
    cy.get('[data-testid="add-button"]').should('have.text', 'Add').click();

    cy.get('[data-testid="portfolio-button"]').click();
    cy.get('[data-testid="portfolio-value-name"]').should('have.text', 'Bitcoin')
  });

  it('currency will not be added to the portfolio due to validation', () => {
    cy.visit('/');

    cy.get('[data-testid="button"]').first().click();
    cy.get('[data-testid="value-input"]').type('0').should('have.value', '0');
    cy.get('[data-testid="add-button"]').should('have.text', 'Add').click();
    cy.get('[data-testid="add-error"]').should('have.text', 'min 0.1, max 1000');
  });
});
