/// <reference types="cypress" />

describe('Drawing on Canvas', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should populate the list when drawing', () => {
    cy.get('[data-testid="list-item"]').should('not.exist');

    // First drawing
    cy.get('[data-testid="canvas-container"] > div')
      .should('exist')
      .trigger('mousedown', { clientX: 400, clientY: 200 })
      .trigger('mousemove', { clientX: 800, clientY: 400 })
      .trigger('mousemove', { clientX: 200, clientY: 500 })
      .trigger('mouseup', { clientX: 200, clientY: 500 });

    // Second drawing
    cy.get('[data-testid="canvas-container"] > div')
      .trigger('mousedown', { clientX: 200, clientY: 300 })
      .trigger('mousemove', { clientX: 600, clientY: 500 })
      .trigger('mousemove', { clientX: 700, clientY: 600 })
      .trigger('mouseup', { clientX: 700, clientY: 500 });

    // Check that two list items exist
    cy.get('[data-testid="list-item"]').should('have.length', 2);

    // Select both list items
    cy.get('[data-testid="list-item"]').each(($el) => {
      cy.wrap($el).click();
    });

    // Click on merge button
    cy.get('[data-testid="merge-button"]').click();

    // Check that only one list item exists
    cy.get('[data-testid="list-item"]').should('have.length', 1);
  });

  it('should populate the list when uploading a .bin file', () => {
    cy.get('[data-testid="list-item"]').should('not.exist');

    // Click on load button
    cy.get('[data-testid="load-button"]').click();

    // Read the .bin file as a binary
    cy.readFile('cypress/downloads/polygon.bin', 'binary').then(
      (fileContent) => {
        // Upload the .bin file
        cy.get('[data-testid="file-input"]').attachFile({
          fileContent,
          fileName: 'polygons.bin',
          mimeType: 'application/octet-stream',
          encoding: 'binary',
        });

        // Check that the list is populated
        cy.get('[data-testid="list-item"]').should('exist');
      },
    );
  });

  it('should save the file when drawing, selecting an item, and clicking on the save button', () => {
    // Simulate drawing
    cy.get('[data-testid="canvas-container"] > div')
      .should('exist')
      .trigger('mousedown', { clientX: 400, clientY: 200 })
      .trigger('mousemove', { clientX: 800, clientY: 400 })
      .trigger('mousemove', { clientX: 200, clientY: 500 })
      .trigger('mouseup', { clientX: 200, clientY: 500 });

    // Select an item
    cy.get('[data-testid="list-item"]').first().click();

    // Click on save button
    cy.get('[data-testid="save-button"]').click();

    // Read the .bin file as a binary
    cy.readFile('cypress/downloads/polygon.bin', 'binary');
  });
});
