import React from 'react'
import Restaurant from './page'

describe('<Restaurant />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Restaurant params={{id: 'burger-shock'}} />)
  })
})