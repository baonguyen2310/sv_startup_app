import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { PINK_THEME, BLUE_THEME } from '../constants/themeContants'
import pinkTheme from "./pink";
import blueTheme from "./blue";
import { useFonts, Merienda_400Regular } from '@expo-google-fonts/merienda';

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

    let [fontsLoaded, fontError] = useFonts({
        Merienda_400Regular,
      });

    return StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background
        },
        image: {
            width: "100%",
            height: "100%"
        },
        primaryText: {
            fontFamily: "Merienda_400Regular"
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