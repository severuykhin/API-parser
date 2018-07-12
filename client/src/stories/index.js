import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import Select from '../components/Select/Select';


const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4'
];

storiesOf('Select', module)
  .add('Test', () => 
    <Select
      value="Some item" 
      items={items}
      onChange={(data) => {console.log(data)}}/>
  );

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  
