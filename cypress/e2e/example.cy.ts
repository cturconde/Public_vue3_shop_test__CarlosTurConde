// https://on.cypress.io/api

describe('Products loaded correctly', () => {
  it('Verify the url is working and loads products', () => {
    cy.request('GET', 'https://dummyjson.com/products?limit=10&skip=10').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('products')
      expect(response.body).to.have.property('total')
      expect(response.body.products).to.be.an('array').and.to.have.length.above(0)
      expect(localStorage.getItem('productsCart')).to.be.null
    })
  })
  it('Add and Remove products one by one', () => {
    cy.visit('/')
    cy.get('.toggle-button').click()
    cy.get('.addToCart').eq(1).click()
    cy.get('.addToCart').eq(3).click()

    cy.window().then((win) => {
      expect(win.localStorage.cartProducts).to.have.length.above(0)
    })
    cy.get('.removeProduct').eq(1).click()
    cy.get('.removeProduct').eq(0).click()

    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.totalPrice)).to.be.equal(0)
      expect(JSON.parse(win.localStorage.cartProducts)).to.be.deep.equal([])
    })
  })
  it('Verify localstorage has products added', () => {
    cy.visit('/')
    cy.get('.toggle-button').click()
    cy.get('.addToCart').click({ multiple: true })

    cy.window().then((win) => {
      const totalPrice = parseInt(win.localStorage.totalPrice)
      expect(totalPrice).to.above(0)
      const cartProducts = JSON.parse(win.localStorage.cartProducts)
      cy.get('.addToCart').then(($elements) => {
        // Get the length of the elements array
        const numElements = $elements.length
        expect(cartProducts.length).to.be.equal(numElements)
      })
    })
  })
  it('Verify de cart es correctly cleared', () => {
    cy.visit('/')
    cy.get('.toggle-button').click()
    cy.get('.clearCart').click()
    cy.window().then((win) => {
      expect(win.localStorage.cartProducts).to.be.undefined
    })
    cy.get('.toggle-button').click()
  })
})
