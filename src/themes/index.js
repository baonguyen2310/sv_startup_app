import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { PINK_THEME, BLUE_THEME } from '../constants/themeContants'
import pinkTheme from "./pink";
import blueTheme from "./blue";

function getTheme (themeName) {
    switch (themeName) {
        case PINK_THEME: 
            return pinkTheme
        case BLUE_THEME:
            return blueTheme
        default:
            return pinkTheme
    }
}

const useTheme = () => {
    const themeName = useSelector((state) => state.themeReducer.theme)
    const theme = getTheme(themeName)

    return StyleSheet.create({
        text: {
            color: theme.colors.text
        }
    })
}

export default useTheme