import { mount } from 'enzyme';
import React from 'react';
import Logo from './Logo';

describe('<Logo />', function () {
    describe('<Logo /> clean', function() {
        let logo;

        before(() => {
            logo = mount(<Logo />);
        });

        it('check .checkout--logo exist', () => {
            logo.find('div.checkout--logo').should.to.have.length(1);
        });

        it('check logo default url', () => {
            logo.find('.checkout--logo').html().should.be.equal('<div class="checkout--logo" style="background-image: url(&quot;/images/logo.png&quot;);"></div>');
        });
    });

    it('check logo url', () => {
        const logo = mount(<Logo logo="/default.jpg"/>);
        logo.find('.checkout--logo').html().should.be.equal('<div class="checkout--logo" style="background-image: url(&quot;/default.jpg&quot;);"></div>');
    });
});
