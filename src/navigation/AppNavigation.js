import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Logo from '../components/Logo';
import MenuButton from '../components/MenuButton';
import {
    HomeScreen,
    CategoryListScreen,
    LevelListScreen,
    MenuScreen,
    GameScreen
} from "../screens/Main"
import {
    LandingScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen
} from "../screens/Auth"

import MenuNavigation from './MenuNavigation'
import AuthNavigation from './AuthNavigation'

const AppStack = createNativeStackNavigator();

export default function AppNavigation() {
    return(
        <NavigationContainer>
            <AppStack.Navigator
                initialRouteName="Landing"
                screenOptions={( {route, navigation} ) => ({
                    headerShown: true,
                    headerTitle: (props) => <Logo />,
                    headerTitleAlign: "left",
                    headerRight: () => <MenuButton navigation={navigation} />
                })}
            >
                <AppStack.Screen name="AuthNavigation" component={AuthNavigation} />
                <AppStack.Screen name="Menu" component={MenuScreen} />
                <AppStack.Screen name="MenuNavigation" component={MenuNavigation} />
                <AppStack.Screen name="Home" component={HomeScreen} />
                <AppStack.Screen name="CategoryList" component={CategoryListScreen} />
                <AppStack.Screen name="LevelList" component={LevelListScreen} />
                <AppStack.Screen name="Game" component={GameScreen} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}