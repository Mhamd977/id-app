import { View, Text, Button, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Container } from '../components/container/Container';
import IdCard from '../components/ui/IdCard';
import CardSwiper from '../components/ui/CardSwiper';

import idData from '../assets/data/data.json'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView>
      <Container className=''>
        <View className='mt-3'>
          <IdCard data={idData.data} homePage={true} />
        </View>
        <View className='mt-5'>
          <CardSwiper data={idData.swiperData} />
        </View>
      </Container>
    </ScrollView>
  );
}
