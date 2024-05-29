import React from 'react'
import FileUpload from './FileUpload'
import 'cypress-file-upload'

describe('<FileUpload />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FileUpload />)
  })
  it('renders the input element', () => {
    cy.mount(<FileUpload />)
    cy.get('input[type="file"]').should('exist')
  })
  it('renders the button element', () => {
    cy.mount(<FileUpload />)
    cy.get('button').should('exist')
  })
  it('if file is uploaded, displays the file name', () => {
    cy.mount(<FileUpload />)
    cy.get('input[type="file"]').attachFile('blue-burger.jpg')
    cy.get('#file-name').should('contain.text', 'burger.jpg')
  })
})