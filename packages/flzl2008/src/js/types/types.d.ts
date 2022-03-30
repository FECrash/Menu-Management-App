interface Category {
  emoji: string;
  name: string;
  value: string;
}

interface CafeMenuState {
  categorys: Category[];
  selectedCategory: Category;
  menuNames: string[];
}

interface editMenuData {
  index: number;
  changeValue: string;
}

declare namespace Redux {
  interface Store {
    subscribe: subscribe;
    getState: getState;
    dispatch: dispatch;
  }

  interface Action {
    type: string;
    data?: any;
  }

  interface dispatch {
    (action: Action): void;
  }

  interface getState {
    (): any;
  }

  interface subscribe {
    (fn: subscribeFunction): void;
  }

  interface reducer {
    (action: Action, state?: any): any;
  }

  interface subscribeFunction {
    (): void;
  }
}
