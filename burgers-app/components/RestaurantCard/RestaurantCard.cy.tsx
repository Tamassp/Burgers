import React from 'react'
import RestaurantCard from './RestaurantCard'

describe('<RestaurantCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RestaurantCard />)
  })
})