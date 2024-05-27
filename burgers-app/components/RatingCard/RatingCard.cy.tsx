import React from 'react'
import RatingCard from './RatingCard'

describe('<RatingCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RatingCard name='John Doe' rating={3.5} comment="Good one" />)
  })
  it('uses the proper name for title in Title Description component', () => {
    cy.mount(<RatingCard name='John Doe' rating={3.5} comment="Good one" />)
    cy.get('h2').should('contains.text', 'John Doe')
  })
})