import {createStore} from "redux";
import userReducer from './userReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'





 
const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, userReducer)
 


// export default createStore(userReducer)
export const store = createStore(persistedReducer)
export const persistor =  persistStore(store)

