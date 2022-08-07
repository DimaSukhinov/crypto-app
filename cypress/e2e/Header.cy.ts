import * as cypress from 'cypress';

describe('Header E2E', () => {

  it('Portfolio should open', () => {
    cy.visit('/');

    cy.get('[data-testid="portfolio-button"]').click();
    cy.get('[data-testid="empty-portfolio"]').should('have.text', `You don't have currency`);
  });
});
