import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const image = require('../../images/img.png');


const fadeIn = keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 0;
  }

  to {
    transform: scale(.25);
    opacity: 1;
  }
`;

const fadeInAnimation = `${fadeIn} 0.3s`;
const fadeOutAnimation = `${fadeOut} 0.3s`;

const ProductWrapper = styled('ul')`
  list-style-type: none;
  background-color: beige;
  margin-bottom: ${(props: ProductWrapperProps) => props.isDisplayed ? '10px' : '0px'};
  padding: ${(props: ProductWrapperProps) => props.isDisplayed ? '10px' : '0px'};
  font-size: 20px;
  text-align: center;
  visibility: ${(props: ProductWrapperProps) => props.isVisible ? 'visible' : 'hidden'};
  animation: ${(props: ProductWrapperProps) => 
    props.isVisible ? fadeInAnimation : fadeOutAnimation};
  transition: visibility 0.3s linear;
  height: ${(props: ProductWrapperProps) => props.isDisplayed ? 'auto' : '0px'};
  opacity: ${(props: ProductWrapperProps) => props.isDisplayed ? '1' : '0'};
  overflow: ${(props: ProductWrapperProps) => props.isDisplayed ? 'auto' : 'hidden'};
`

const ProductProp = styled('li')`
  margin-bottom: 5px;
`

const ProductPropLeft = styled('li')`
  float: left;
`

const ProductImg = styled('img')`
  width: 150px;
`

const ProductPropName = styled(ProductProp)`
  font-weight: bold;
`

export interface ProductProps { 
  name: string,
  number: number,
  description: string,
  image: string,
  price: string,
  isVisible: boolean
}

interface ProductWrapperProps {
  isDisplayed: boolean,
  isVisible: boolean
}

interface ProductElementState {
  isDisplayed: boolean
}

export class ProductElement extends React.Component<ProductProps, ProductElementState> {
  state = {
    isDisplayed: true
  }

  handleTransition = () => {    
    const { isVisible } = this.props
    this.setState({
      isDisplayed: isVisible
    })
  }

  render() {
    return (
      <ProductWrapper 
          isDisplayed={this.state.isDisplayed || this.props.isVisible}
          isVisible={this.props.isVisible} 
          onTransitionEnd={this.handleTransition.bind(this)}>
        <ProductPropLeft>
            <ProductImg src={image} />
        </ProductPropLeft>
        <ProductPropName>Product: {this.props.name}</ProductPropName>
        <ProductProp>Number: {this.props.number}</ProductProp>
        <ProductProp>Description: {this.props.description}</ProductProp>
        <ProductProp>Price: {this.props.price} €</ProductProp>
      </ProductWrapper>
    )
  }
}
