import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation';

export default function LinkBtn() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View>
            <TouchableOpacity className='bg-transparent w-fit' onPress={() => navigation.navigate('About')}>
                <Text className='bg-gray-500 text-white w-5 h-5 rounded-full text-center'>
                    !
                </Text>
            </TouchableOpacity>
        </View>
    )
}
