export const ItemListReducer = (state, action) => {
  switch (action.type) {
    case "SET_CREATE_MENU":
      return { ...state, createMenu: action.payload };
    case "SET_GET_ITEMS":
      return { ...state, getItems: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_OPEN_EDIT_CONFIRMATION":
      return { ...state, openEditConfirmation: action.payload };
    case "SET_OPEN_CONFIRMATION_SAVE":
      return { ...state, openConfirmationSave: action.payload };
    case "SET_OPEN_DELETE":
      return { ...state, openDelete: action.payload };
    case "SET_AUTH_EDIT":
      return { ...state, authEdit: action.payload };
    case "SET_EDIT_ITEM_ID":
      return { ...state, editItemId: action.payload };
    case "SET_EDIT_DATA":
      return { ...state, editData: action.payload };
    case "SET_DELETE_ITEM_ID":
      return { ...state, deleteItemId: action.payload };
    case "SET_CURRENT_ITEM":
      return { ...state, currentItem: action.payload };
    default:
      return state;
  }
};

export const InitState = {
  createMenu: false,
  getItems: [],
  page: 1,
  openEditConfirmation: false,
  openConfirmationSave: false,
  openDelete: false,
  authEdit: false,
  editItemId: null,
  editData: {},
  deleteItemId: null,
  currentItem: null,
};

export const SizeReducer = (state, action) => {
  switch (action.type) {
    case "Appetizers":
      return ["Small", "Medium", "Large"];
    case "Soups":
      return ["Cup", "Bowl"];
    case "Salads":
      return ["Side", "Regular", "Large"];
    case "Main Course":
      return ["Regular", "Large"];
    case "Sides":
      return ["Small", "Medium", "Large"];
    case "Desserts":
      return ["Single", "Double"];
    case "Beverage":
      return ["Small", "Medium", "Large"];
    default:
      return [];
  }
};
