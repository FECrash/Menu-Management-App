import createStore from './redux';
import * as actions from './actions';

const initialCategorys: Category[] = [
  { emoji: '☕', name: 'espresso', value: '에스프레소' },
  { emoji: '🥤', name: 'frappuccino', value: '프라푸치노' },
  { emoji: '🍹', name: 'blended', value: '블렌디드' },
  { emoji: '🫖', name: 'teavana', value: '티바나' },
  { emoji: '🍰', name: 'desert', value: '디저트' },
];

const initialState: CafeMenuState = {
  categorys: initialCategorys,
  selectedCategory: initialCategorys[0],
  menuNames: [],
};

const cafeMenuReducer = (
  action: Redux.Action,
  state: CafeMenuState = initialState,
): CafeMenuState => {
  switch (action.type) {
    case actions.ADD_MENU_NAME:
      return {
        ...state,
        menuNames: addMenuName(state.menuNames, action.data),
      };
    case actions.DELETE_MENU_NAME:
      return {
        ...state,
        menuNames: removeMenuName(state.menuNames, action.data),
      };
    case actions.EDIT_MENU_NAME:
      return {
        ...state,
        menuNames: editMenuName(state.menuNames, action.data),
      };
    case actions.CHANGE_CATEGORY:
      return {
        ...state,
        selectedCategory: action.data,
      };
    case actions.SET_MENU_NAMES:
      return {
        ...state,
        menuNames: action.data,
      };
    case actions.INIT_STATE:
      return { ...state };
    default:
      return { ...state };
  }
};

const addMenuName = (previousMenuNames: string[], data: string): string[] => {
  const newMenuNames = previousMenuNames.slice();
  newMenuNames.push(data);
  return newMenuNames;
};

const removeMenuName = (previousMenuNames: string[], removeIndex: number): string[] => {
  return previousMenuNames.filter((value, index) => index !== removeIndex);
};

const editMenuName = (previousMenuNames: string[], data: editMenuData): string[] => {
  return previousMenuNames.map((name, index) => {
    if (index !== data.index) return name;

    return data.changeValue;
  });
};

const cafeMenuStore = createStore(cafeMenuReducer);
cafeMenuStore.dispatch(actions.initState());

let savedMenuNames = localStorage.getItem(initialState.selectedCategory.name);
if (!savedMenuNames) savedMenuNames = '[]';
cafeMenuStore.dispatch(actions.setMenuNames(JSON.parse(savedMenuNames)));

export default cafeMenuStore;
