import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import IdInfoScreen from '../screens/IdInfoScreen';
import AddIdData from '../screens/AddIdData';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  IdInfo: undefined;
  AddIdData: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" options={{title: "هويتي"}} component={HomeScreen} />
      <Stack.Screen name="IdInfo" options={{title: "هويتي الرقمية"}} component={IdInfoScreen} />
      <Stack.Screen name="AddIdData" options={{title: "إضافة البيانات"}} component={AddIdData} />
      <Stack.Screen name="About" options={{title: "عن التطبيق"}} component={AboutScreen} />
    </Stack.Navigator>
  );
}
