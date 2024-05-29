import React from 'react'
import Restaurants from './page'

describe('<Restaurants />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Restaurants />)
  })
})