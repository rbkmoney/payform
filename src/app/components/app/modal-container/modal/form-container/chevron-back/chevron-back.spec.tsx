import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ChevronBack } from './chevron-back';

it('renders correctly', () => {
    const tree = renderer
        .create(<ChevronBack className={'test-class'} back={() => null} id={'test-id'}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
