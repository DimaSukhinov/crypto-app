import * as cypress from 'cypress';

describe('Values E2E', () => {

  sessionStorage.setItem('page', '1')

  it('the first currency of the values list must be added to portfolio', () => {
    cy.visit('/');

    cy.get('.button').first().click();
    cy.get('input[type="number"]').type('2').should('have.value', '2');
    cy.get('.modal__buttonText').should('have.text', 'Add').click();

    cy.get('.header__portfolio-button').click();
    cy.get('.portfolio__name').should('have.text', 'Bitcoin')
  });

  it('currency will not be added to the portfolio due to validation', () => {
    cy.visit('/');

    cy.get('.button').first().click();
    cy.get('input[type="number"]').type('0').should('have.value', '0');
    cy.get('.modal__buttonText').should('have.text', 'Add').click();
    cy.get('.modal__error').should('have.text', 'min 0.1, max 1000');
  });
});
