import { configure, addParameters } from '@storybook/vue';
import { themes } from '@storybook/theming';
import '../src/assets/scss/main_once.scss'

// Option defaults.
themes.normal.gridCellSize = 8;
addParameters({
  options: {
    theme: themes.normal,
  },
});

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.ts$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
