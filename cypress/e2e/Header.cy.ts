import * as cypress from 'cypress';

describe('Header E2E', () => {

  it('Portfolio should open', () => {
    cy.visit('/');

    cy.get('.header__portfolio-button').click();
    cy.get('.portfolio__empty-portfolio').should('have.text', `You don't have currency`);
  });
});
