import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    LanguageSettingScreen,
    NotificationSettingScreen,
    PrivacySettingScreen,
    ProfileSettingScreen,
    SecuritySettingScreen,
    SoundSettingScreen
} from "../screens/Setting"

const SettingsStack = createNativeStackNavigator();

export default function SettingsNavigation() {
  return (
    <SettingsStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
      <SettingsStack.Screen name="LanguageSetting" component={LanguageSettingScreen} />
      <SettingsStack.Screen name="NotificationSetting" component={NotificationSettingScreen} />
      <SettingsStack.Screen name="PrivacySetting" component={PrivacySettingScreen} />
      <SettingsStack.Screen name="ProfileSetting" component={ProfileSettingScreen} />
      <SettingsStack.Screen name="SecuritySetting" component={SecuritySettingScreen} />
      <SettingsStack.Screen name="SoundSetting" component={SoundSettingScreen} />
    </SettingsStack.Navigator>
  );
}
