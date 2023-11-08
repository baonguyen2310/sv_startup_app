import { CHANGE_THEME } from '../actionTypes/themeActionTypes'
import { PINK_THEME } from '../../constants/themeContants'

const initialState = {
    theme: PINK_THEME
}

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                theme: action.payload
            }
        default:
            return state
    }
}

export default themeReducer