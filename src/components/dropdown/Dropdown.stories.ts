/* eslint-disable react/react-in-jsx-scope */

import {
  storiesOf,
} from '@storybook/vue';
import '@storybook/addon-links/register';
import Dropdown from './Dropdown.vue';
import IconButton from '../buttons/IconButton.vue';

storiesOf('Dropdown', module)
  .add('Simple Dropdown', () => ({
    components: {
      Dropdown,
      IconButton,
    },
    template: `
      <dropdown>
        <icon-button>
          more_horiz
        </icon-button>
      </dropdown>
    `,
  }));
