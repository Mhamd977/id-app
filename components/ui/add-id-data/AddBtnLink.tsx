import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation';
import { useNavigation } from "@react-navigation/native";

export default function AddBtnLink(){
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View>
            <View>
                <TouchableOpacity className='mt-5 mb-5 bg-blue-500 px-4 py-2 rounded-md ' onPress={() => navigation.navigate('AddIdData')}>
                    <Text className='text-white text-center'>إضافة البيانات الهوية</Text>
                </TouchableOpacity>
            </View>
            <Text className='text-gray-500 text-right'>جاري التحقق من البيانات الهوية</Text>
        </View>
    )
}