import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl">Home Screen</Text>
      {/* <Text className='p-10 text-red-500'>Hello Mohammad</Text> */}
      <Button title="Go to About" onPress={() => navigation.navigate('About')} />
    </View>
  );
}
