import { View, Text, Button, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Container } from '../components/container/Container';
import IdCard from '../components/ui/IdCard';
import CardSwiper from '../components/ui/CardSwiper';

import idData from '../assets/data/data.json'

import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCFMidDp5HQYM1Wj-xoIBIpnq6xSwvgOdA",
  authDomain: "digital-id-af592.firebaseapp.com",
  projectId: "digital-id-af592",
  storageBucket: "digital-id-af592.firebasestorage.app",
  messagingSenderId: "398825313124",
  appId: "1:398825313124:web:3b83ad7e1c0a59822f6071",
  measurementId: "G-EC0VB88Z5J"
};

const app = initializeApp(firebaseConfig);

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }: Props) {
  return (
    <ScrollView>
      <Text>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
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
