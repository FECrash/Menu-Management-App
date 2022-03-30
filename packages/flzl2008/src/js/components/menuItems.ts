import Component from '../types/component';
import cafeMenuStore from '../state/cafeMenuStore';
import * as actions from '../state/actions';
import $ from '../utils/commons';

export default class MenuItems extends Component {
  menuNames: string[];
  selectedCategory: Category;

  init() {
    const { menuNames, selectedCategory } = cafeMenuStore.getState() as CafeMenuState;
    this.menuNames = menuNames;
    this.selectedCategory = selectedCategory;
  }

  template(): string {
    return this.menuNames
      .map(
        (value, index) =>
          `
          <li data-menu-id=${index} class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${value}</span>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-delete-button">삭제</button>
          </li>
          `,
      )
      .join('');
  }

  componentDidMount(): void {
    $('#espresso-menu-list').addEventListener('click', e => {
      const $target = e.target as HTMLElement;

      const $targetLi = $target.closest('.menu-list-item') as HTMLElement;
      if ($target.classList.contains('menu-edit-button')) {
        this.editMenuName($targetLi);
      }

      if ($target.classList.contains('menu-delete-button')) {
        this.deleteMenuName($targetLi);
      }

      e.preventDefault();
    });
  }

  deleteMenuName($target: HTMLElement): void {
    const isDelete = confirm('정말 삭제하시겠습니까?');
    if (!isDelete || !$target.dataset?.menuId) return;

    const removeIndex = parseInt($target.dataset.menuId);
    cafeMenuStore.dispatch(actions.deleteMenuName(removeIndex));
    this.init();
    localStorage.setItem(this.selectedCategory.name, JSON.stringify(this.menuNames));
  }

  editMenuName($target: HTMLElement): void {
    const changeValue = prompt('메뉴명을 수정하세요')?.trim();
    if (!changeValue || !$target.dataset?.menuId) return;

    const index = parseInt($target.dataset.menuId);
    cafeMenuStore.dispatch(actions.editMenuName({ changeValue, index }));
    this.init();
    localStorage.setItem(this.selectedCategory.name, JSON.stringify(this.menuNames));
  }
}
