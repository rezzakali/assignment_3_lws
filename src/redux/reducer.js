import { DECREASEPRODUCTQUANTITY, PRODUCTADDED } from '../redux/actionTypes';
import { initialState } from './initialState';

const nextProductId = (products) => {
  const maxId = products.reduce(
    (maxId, product) => Math.max(product.id, maxId),
    -1
  );
  return maxId + 1;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTADDED:
      return [
        ...state,
        {
          id: nextProductId(state),
          name: action.payload.name,
          category: action.payload.category,
          image: action.payload.image,
          price: action.payload.price,
          quantity: action.payload.quantity,
        },
      ];
    case DECREASEPRODUCTQUANTITY:
      const productId = action.payload;

      const products = state.map((product) => {
        if (product.id === productId) {
          return {
            ...state,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
      return {
        products,
      };
    default:
      return state;
  }
};

export default reducer;
