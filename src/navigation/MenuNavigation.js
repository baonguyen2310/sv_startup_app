import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    ContactScreen,
    HistoryScreen,
    NotificationScreen,
    PremiumScreen,
    ProfileScreen,
    SettingsScreen,
    StatisticScreen,
    TermsOfServiceScreen
} from "../screens/Menu"

import SettingsNavigation from './SettingsNavigation'

const MenuStack = createNativeStackNavigator();

export default function MenuNavigation() {
  return (
    <MenuStack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
      <MenuStack.Screen name="Profile" component={ProfileScreen} />
      <MenuStack.Screen name="Premium" component={PremiumScreen} />
      <MenuStack.Screen name="Statistic" component={StatisticScreen} />
      <MenuStack.Screen name="History" component={HistoryScreen} />
      <MenuStack.Screen name="Notification" component={NotificationScreen} />
      <MenuStack.Screen name="Settings" component={SettingsScreen} />
      <MenuStack.Screen name="SettingsNavigation" component={SettingsNavigation} />
      <MenuStack.Screen name="Contact" component={ContactScreen} />
      <MenuStack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
    </MenuStack.Navigator>
  );
}
