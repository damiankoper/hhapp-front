/* eslint-disable react/react-in-jsx-scope */

import {
  storiesOf,
} from '@storybook/vue';
import '@storybook/addon-links/register';

import IconButton from './IconButton.vue';

storiesOf('IconButton', module)
  .add('Simple IconButton', () => ({
    components: {
      IconButton,
    },
    template: `
        <icon-button>close</icon-button>
    `,
  }));
