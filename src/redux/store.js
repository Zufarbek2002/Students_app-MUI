import { combineReducers, createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import userReducer from "./users/userReducer"
import { thunk } from "redux-thunk"

const rootReducer = combineReducers({
    user: userReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(logger, thunk)
)

export default store