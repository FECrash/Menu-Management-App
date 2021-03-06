import $ from '../utils/commons.js';
import Component from '../types/component.js';
import MenuList from './menuList.js';
import cafeMenuStore from '../cafeMenuStore.js';

export default class CafeMenuApp extends Component {
  template() {
    return `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        <header class="my-4">
          <a href="/" class="text-black">
            <h1 class="text-center font-bold">π λ¬Έλ²μ€ λ©λ΄ κ΄λ¦¬</h1>
          </a>
          <nav class="d-flex justify-center flex-wrap">
            <button data-category-name="espresso" class="cafe-category-name btn bg-white shadow mx-1">
                β μμ€νλ μ
            </button>
            <button data-category-name="frappuccino" class="cafe-category-name btn bg-white shadow mx-1">
                π₯€ νλΌνΈμΉλΈ
            </button>
            <button data-category-name="blended" class="cafe-category-name btn bg-white shadow mx-1">
                πΉ λΈλ λλ
            </button>
            <button data-category-name="teavana" class="cafe-category-name btn bg-white shadow mx-1">
                π« ν°λ°λ
            </button>
            <button data-category-name="desert" class="cafe-category-name btn bg-white shadow mx-1">
                π° λμ νΈ
            </button>
          </nav>
        </header>
        <main class="mt-10 d-flex justify-center"></main>
      </div>
    </div>
    `;
  }

  componentDidMount() {
    const menuList = new MenuList($('main'));
    cafeMenuStore.subscribe(() => menuList.render());
  }
}
