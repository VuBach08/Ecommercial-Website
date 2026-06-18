import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import cartReducer from './reducers/cart'
import productReducer from './reducers/product'
import themeReducer from './reducers/theme'

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  theme: themeReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export const persistor = persistStore(store)
export default store
