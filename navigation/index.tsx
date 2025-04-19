import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import IdInfoScreen from '../screens/IdInfoScreen';
import AddCardScreen from '../screens/AddCardScreen';
import AddDriveLicCardScreen from '../screens/AddDriveLicCardScreen';
import AddCarLicCardScreen from '../screens/AddCarLicCardScreen';
import AddDrLicCardScreen from '../screens/AddDrLicCardScreen';
import AddIdData from '../screens/AddIdData';
import LinkBtn from '../components/ui/about-us/LinkBtn';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  IdInfo: undefined;
  AddIdData: undefined;
  AddCard: undefined;
  AddDriveLicCard: undefined;
  AddCarLicCard: undefined;
  AddDrLicCard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" options={{ title: "هويتي", headerTitleAlign: "center", headerRight: () => <LinkBtn /> }} component={HomeScreen} />
      <Stack.Screen name="IdInfo" options={{title: "هويتي الرقمية"}} component={IdInfoScreen} />
      <Stack.Screen name="AddIdData" options={{title: "إضافة البيانات"}} component={AddIdData} />
      <Stack.Screen name="AddCard" options={{title: "إضافة بطاقة"}} component={AddCardScreen} />
      <Stack.Screen name="AddDriveLicCard" options={{title: "إضافة رخصة قيادة"}} component={AddDriveLicCardScreen} />
      <Stack.Screen name="AddCarLicCard" options={{title: "إضافة رخصة مركبة"}} component={AddCarLicCardScreen} />
      <Stack.Screen name="AddDrLicCard" options={{title: "إضافة رخصة طبيب"}} component={AddDrLicCardScreen} />
      <Stack.Screen name="About" options={{title: "عن التطبيق"}} component={AboutScreen} />
    </Stack.Navigator>
  );
}
