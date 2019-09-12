/* eslint-disable react/react-in-jsx-scope */

import {
  storiesOf,
} from '@storybook/vue';
import '@storybook/addon-links/register';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Dropdown from './Dropdown.vue';
import DropdownOption from './DropdownOption.vue';
import IconButton from '../buttons/IconButton.vue';

storiesOf('Dropdown', module)
  .addDecorator(withKnobs)
  .add('Simple Dropdown', () => ({
    components: {
      Dropdown,
      IconButton,
      DropdownOption,
    },
    template: `
      <dropdown style="margin-left:40px;" :visible="visible">
        <template v-slot:reference>
          <icon-button>
            more_horiz
          </icon-button>
        </template>
        <dropdown-option v-for="item in data" :key="item.value">
          {{item.text}}
        </dropdown-option>
      </dropdown>
    `,
    data() {
      return{
        data: [
          {
            value: 0,
            text: 'Option 1',
          },
          {
            value: 1,
            text: 'Option 2',
          },
          {
            value: 2,
            text: 'Option 3',
          },
        ],
      };
    },
    props: {
      visible: {
        default: boolean('Visible', false),
      },
    },
  }));
