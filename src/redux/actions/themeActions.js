import { CHANGE_THEME } from '../actionTypes/themeActionTypes'

export const changeTheme = (theme) => ({
    type: CHANGE_THEME,
    payload: theme
})