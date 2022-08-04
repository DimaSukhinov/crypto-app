import * as cypress from 'cypress';

describe('Portfolio E2E', () => {

  it('Currency must be removed from the portfolio', () => {
    cy.visit('/');

    cy.get('.button').first().click();
    cy.get('input[type="number"]').type('2').should('have.value', '2');
    cy.get('.modal__buttonText').should('have.text', 'Add').click();

    cy.get('.header__portfolio-button').click();
    cy.contains('Bitcoin');

    cy.get('.portfolio__delete-button').click();
    cy.contains('Yes').click();

    cy.get('.portfolio__empty-portfolio').should('have.text', `You don't have currency`);
  });

  it('Portfolio should be closed', () => {
    cy.visit('/');

    cy.get('.header__portfolio-button').click();
    cy.get('.portfolio__empty-portfolio').should('have.text', `You don't have currency`);
    cy.get('.reusableModal__close').click();
  });

});
