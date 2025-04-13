import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/index'; 

import CardTitle from './CardTitle'
import SubCardTitle from './SubCardTitle'

import profileImage from '../../assets/images/profile-blank.jpg';
import idData from '../../assets/data/data.json'
import IdCardDataSection from './IdCardDataSection';

export default function IdCard() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handlePress = () => {
        navigation.navigate('IdInfo');
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
            <View className='w-full bg-red-100 p-3 rounded-md'>

                {/* title section */}
                <View className='flex flex-row'>
                    <View className='flex-1'></View>
                    <View className='flex items-end'>
                        <CardTitle />
                        <SubCardTitle />
                    </View>
                </View>

                {/* second section */}
                <View className='flex flex-row gap-5'>
                    {/* image */}
                    <View className='flex justify-center items-center'>
                        <Image className='w-40 h-44' source={profileImage} />
                    </View>

                    {/* data list */}
                    <IdCardDataSection idData={idData.data} />
                </View>

            </View>
        </TouchableOpacity>
    );
}
