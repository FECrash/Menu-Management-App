import Component from '../types/component';
import cafeMenuStore from '../state/cafeMenuStore';
import * as actions from '../state/actions';

export default class MenuCategory extends Component {
  categorys: Category[];
  selectedCategory: Category;
  menuNames: string[];

  init() {
    const { categorys, selectedCategory, menuNames } = cafeMenuStore.getState() as CafeMenuState;
    this.categorys = categorys;
    this.selectedCategory = selectedCategory;
    this.menuNames = menuNames;
  }

  template(): string {
    return this.categorys
      .map(
        category =>
          `
            <button data-category-name="${category.name}" class="cafe-category-name btn bg-white shadow mx-1">
                ${category.emoji}  ${category.value}
            </button>
          `,
      )
      .join('\n');
  }

  componentDidMount(): void {
    this.$target.addEventListener('click', e => this.changeCategory(e.target as HTMLElement));
  }

  changeCategory($target: HTMLElement): void {
    const categoryName = $target?.dataset?.categoryName;
    const nowSelectCategory = this.categorys.find(category => category.name === categoryName);
    if (!nowSelectCategory) return;
    cafeMenuStore.dispatch(actions.changeCategory(nowSelectCategory));

    let savedMenuNames = localStorage.getItem(nowSelectCategory.name);
    if (!savedMenuNames) savedMenuNames = '[]';
    cafeMenuStore.dispatch(actions.setMenuNames(JSON.parse(savedMenuNames)));
  }
}
