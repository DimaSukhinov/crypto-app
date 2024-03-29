import * as cypress from 'cypress';

describe('Pagination E2E', () => {

  sessionStorage.setItem('page', '1');

  it('Page value should change', () => {
    cy.visit('/');

    cy.get('[data-testid="pagination-elem"]').first()
      .should('have.text', '1')
      .should('have.css', 'background-color', 'rgb(182, 182, 185)'); // expect number one have a background

    cy.get('[data-testid="pagination-elem"]').eq(2).click();

    cy.get('[data-testid="pagination-elem"]').first()
      .should('have.text', '1')
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)'); // expect number one has no background

    cy.get('[data-testid="pagination-elem"]').eq(2)
      .should('have.text', '3')
      .should('have.css', 'background-color', 'rgb(182, 182, 185)'); // expect number three have a background
  });
});
