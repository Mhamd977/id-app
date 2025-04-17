import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import IdInfoScreen from '../screens/IdInfoScreen'
import { Text, View } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  IdInfo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{title: "هويتي"}} component={HomeScreen} />
        <Stack.Screen name="IdInfo" options={{title: "هويتي الرقمية"}} component={IdInfoScreen} />
        <Stack.Screen name="About" options={{title: "عن التطبيق"}} component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
