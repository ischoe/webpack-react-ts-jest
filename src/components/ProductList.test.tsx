import * as React from 'react'
import { shallow } from 'enzyme'
import ProductList, { Wrapper, Loader, ErrorMessage, Filter } from './ProductList'
import { ProductElement } from './Product'

const mockProducts = [
  {
    name: '123',
    number: 1
  },
  {
    name: '456',
    number: 2
  }
]

it('renders without crashing', () => {
  const wrapper = shallow(<ProductList />)
  expect(wrapper.length).toBe(1)
});

it('fetches results from the api', () => {
  const fetchSpy = jest.spyOn(ProductList.prototype, 'fetchProducts')
  const wrapper = shallow(<ProductList />)
  wrapper.update()
  expect(fetchSpy.mock.calls.length).toBe(1)
});

it('renders ProductsWrapper when products available', () => {  
  const wrapper = shallow(<ProductList />)
  expect(wrapper.find(Loader).length).toBe(1)

  wrapper.setState({ products : mockProducts })
  expect(wrapper.find(Wrapper).length).toBe(1)
});

it('renders an error message when something is going wrong', () => {  
  const wrapper = shallow(<ProductList />).setState({ error: true })
  expect(wrapper.find(ErrorMessage).length).toBe(1)
});

it('renders an error message when something is going wrong', () => {  
  const wrapper = shallow(<ProductList />).setState({ error: true })
  expect(wrapper.find(ErrorMessage).length).toBe(1)
});

it('has a filter box', () => {  
  const wrapper = shallow(<ProductList />)
  expect(wrapper.find(Filter).length).toBe(1)
});

it('can filter products by name', () => {  
  const wrapper = shallow(<ProductList />).setState({ 
    products: mockProducts
  })

  wrapper.find(Filter).simulate('change', { target : { value: '4' }})
  expect(wrapper.find(ProductElement).length).toBe(2)
  expect(wrapper.find(ProductElement).at(0).prop('isVisible')).toBe(false)
  expect(wrapper.find(ProductElement).at(1).prop('isVisible')).toBe(true)

  wrapper.find(Filter).simulate('change', { target : { value: '' }})
  expect(wrapper.find(ProductElement).at(0).prop('isVisible')).toBe(true)
  expect(wrapper.find(ProductElement).at(1).prop('isVisible')).toBe(true)
});

