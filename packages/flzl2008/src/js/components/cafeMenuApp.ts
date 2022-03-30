import $ from '../utils/commons';
import Component from '../types/component';
import MenuCategory from './menuCategory';
import MenuList from './menuList';

export default class CafeMenuApp extends Component {
  template() {
    return `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        <header class="header my-4">
          <a href="/" class="text-black">
            <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
          </a>
          <nav class="header__category-nav d-flex justify-center flex-wrap"></nav>
        </header>
        <main class="content mt-10 d-flex justify-center"></main>
      </div>
    </div>
    `;
  }

  componentDidMount(): void {
    new MenuCategory($('.header__category-nav'));
    new MenuList($('.content'));
  }
}
