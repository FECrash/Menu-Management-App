import CafeMenuApp from './src/js/components/cafeMenuApp';
import $ from './src/js/utils/commons';
import cafeMenuStore from './src/js/state/cafeMenuStore';

const cafeMenuApp = new CafeMenuApp($('.app'));
cafeMenuStore.subscribe(() => cafeMenuApp.render());
