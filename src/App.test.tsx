import * as React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.length).toBe(1)
});

it('has a ProductList component', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('ProductList').length).toBe(1)
});