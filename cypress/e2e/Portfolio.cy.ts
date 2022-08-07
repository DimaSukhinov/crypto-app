import * as cypress from 'cypress';

describe('Portfolio E2E', () => {

  it('Currency must be removed from the portfolio', () => {
    cy.visit('/');

    cy.get('[data-testid="button"]').first().click();
    cy.get('[data-testid="value-input"]').type('2').should('have.value', '2');
    cy.get('[data-testid="add-button"]').should('have.text', 'Add').click();

    cy.get('[data-testid="portfolio-button"]').click();
    cy.contains('Bitcoin');

    cy.get('[data-testid="delete-button"]').click();
    cy.contains('Yes').click();

    cy.get('[data-testid="empty-portfolio"]').should('have.text', `You don't have currency`);
  });

  it('Portfolio should be closed', () => {
    cy.visit('/');

    cy.get('[data-testid="portfolio-button"]').click();
    cy.get('[data-testid="empty-portfolio"]').should('have.text', `You don't have currency`);
    cy.get('[data-testid="close-modal"]').click();
  });

});
