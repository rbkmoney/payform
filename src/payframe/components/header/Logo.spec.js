import { mount } from 'enzyme';
import React from 'react';
import Logo from './Logo';

describe('Logo component', function () {
    it('check .checkout--logo exist', () => {
        const logo = mount(<Logo/>);
        logo.find('div.checkout--logo');
    });

    it('check logo default url', () => {
        const logo = mount(<Logo/>);
        logo.find('.checkout--logo').html().should.be.equal('<div class="checkout--logo" style="background-image: url(&quot;/images/logo.png&quot;);"></div>');
    });

    it('check logo url', () => {
        const logo = mount(<Logo logo="/default.jpg"/>);
        logo.find('.checkout--logo').html().should.be.equal('<div class="checkout--logo" style="background-image: url(&quot;/default.jpg&quot;);"></div>');
    });
});
