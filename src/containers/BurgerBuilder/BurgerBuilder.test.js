import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    it('should render <BuildControls /> when receiving ingredients', () => {
        const wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}} />);
        wrapper.setProps({ings: {salad:0, bacon:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});