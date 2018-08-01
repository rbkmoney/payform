import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Icon } from './icon';
import { IconType } from './icon-type';

it('renders correctly', () => {
    const tree = renderer.create(<Icon className={'test-class'} icon={IconType.amount} />).toJSON();
    expect(tree).toMatchSnapshot();
});
