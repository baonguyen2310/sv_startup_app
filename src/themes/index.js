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
        container: {
            backgroundColor: theme.colors.background
        },
        image: {
            width: "100%",
            height: "100%"
        },
        text: {
            color: theme.colors.text
        },
        primary: {
            backgroundColor: theme.colors.primary,
            color: theme.colors.text,
            borderColor: theme.colors.border
        },
        secondary: {
            backgroundColor: theme.colors.secondary,
            color: theme.colors.text
        }
    })
}

export default useTheme