import * as cypress from 'cypress';

describe('Value E2E', () => {

  it('Value page should open', () => {
    cy.visit('/');
    cy.get('.values-list__value').first().click();

    cy.contains('Bitcoin');
    cy.contains('Symbol: BTC');
  });

  it('Value page should close', () => {
    cy.visit('/');
    cy.get('.values-list__value').first().click();

    cy.contains('Bitcoin');

    cy.contains('Go back').click();
  });

  it('Add modal should open', () => {
    cy.visit('/');
    cy.get('.values-list__value').first().click();

    cy.contains('Add').click();
  });

});
