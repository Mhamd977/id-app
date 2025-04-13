import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Container } from '../components/container/Container';
import IdCard from '../components/ui/IdCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <Container className=''>
      <View className='mt-3'>
        <IdCard />
      </View>
      <View className="">
        <Text className="text-2xl">Home Screen</Text>
        <Text className='p-10 text-red-500 bg-blue-200 rounded-lg'>Hello Mohammad</Text>
        <Button title="Go to About" onPress={() => navigation.navigate('About')} />
      </View>
    </Container>
  );
}
