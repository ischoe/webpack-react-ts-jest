import * as React from 'react'
import styled from 'styled-components'
import { getProducts } from '../api/productsApi'
import { ProductElement, ProductProps } from './Product'

export const Wrapper = styled.div`
  max-width: 620px;
  margin: 30px auto 0;
  position: relative;
`

export const ContentWrapper = styled.div`
  margin-top: 10px;
`

const ProductsWrapper = styled.div`
`

export const Loader = styled.div`
  color: black;
`

export const ErrorMessage = styled.div`
  color: red;
`

export const Filter = styled.input`
  width: 620px;
  font-size: 30px;
  height: 50px;
  padding-left: 5px;
  box-sizing: border-box;
`

interface Props {}

interface State {
  products: ProductProps[],
  error: boolean,
  loading: boolean,
  inputValue: string
}

interface KeyBoardEvent extends EventTarget {
  target: HTMLInputElement
}

class ProductList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { 
      products: [],
      error: false,
      loading: false,
      inputValue: ''
    }
  }

  componentDidMount() {
    this.fetchProducts()
  }

  async fetchProducts() {
    this.setState({
      loading: true
    })
    const products = await getProducts()
    if(products) {
      this.setState({
        products: products,
        loading: false,
      })
    } else {
      this.setState({
        error: true,
        loading: false
      })
    }
  }
  
  changeInput = (e: KeyBoardEvent) => {
    const { value } = e.target
    this.setState({
      inputValue: value
    })
  }

  render() {
    const { products, error, loading, inputValue } = this.state
    return (
      <Wrapper>
        <Filter placeholder={'start typing...'} onChange={this.changeInput.bind(this)} />
        <ContentWrapper>
          {error && <ErrorMessage> Products could not be loaded...</ErrorMessage>}
          {loading && <Loader> Loading...</Loader>}
          {!loading && !error && products.length === 0 && <Loader>No products found !</Loader>}
          {products && products.length > 0 &&
            <ProductsWrapper>
              {products.map((product, index) =>
                <div key={product.number}>
                  <ProductElement
                    isVisible={
                      product.name.toLowerCase().includes(inputValue.toLowerCase())
                    }
                    number={product.number} 
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                  />
                </div>
              )}
            </ProductsWrapper>
          }
        </ContentWrapper>
      </Wrapper>
    )
  }
}

export default ProductList