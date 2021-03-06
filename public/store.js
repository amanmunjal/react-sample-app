import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

export default function configureStore(initialState = {}) {
  const enhancers = [
    applyMiddleware(thunk),
  ]

  const store = createStore(rootReducer, initialState, compose(...enhancers))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
