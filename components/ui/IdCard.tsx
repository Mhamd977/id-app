import { View, TouchableOpacity, Image, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/index';

import CardTitle from './CardTitle'
import SubCardTitle from './SubCardTitle'

import IdCardDataSection from './IdCardDataSection';

import idData from '../../assets/data/data.json'
import profileImage from '../../assets/images/profile-blank.jpg';
import treeLogo from '../../assets/images/tree-logo.png';

interface IdCardProps {
    homePage?: boolean;
    data: typeof idData.data;
}

export default function IdCard({ homePage = false, data }: IdCardProps) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handlePress = () => {
        navigation.navigate('IdInfo');
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
            <View className=' w-full bg-white p-4 rounded-lg shadow-lg border border-gray-200'>
                {/* Header Section */}
                <View className='flex flex-row justify-between items-center mb-4'>
                    <View className='w-12 h-12 flex justify-center items-center'>
                        <Image className='w-full h-full object-cover' source={treeLogo} />
                    </View>
                    <View className='flex items-end'>
                        <CardTitle />
                        <SubCardTitle />
                    </View>
                </View>

                {/* Main Content */}
                <View className='flex flex-row gap-6'>
                    {/* Photo Section */}
                    <View className='flex justify-center items-center p-2 rounded-md'>
                        <Image className='w-36 h-44 object-cover' source={profileImage} />
                    </View>

                    {/* Data Section */}
                    <IdCardDataSection idData={data} />
                </View>

                {homePage ? (
                    <View className='mt-4 pt-2 border-t border-gray-200'>
                        {/* Footer Section */}
                        <View className='flex flex-row justify-between items-center'>
                            <View className='w-24 h-8 bg-gray-200'></View>
                            <Text className='text-sm text-gray-600'>تاريخ الإصدار: {data.idIssueDate}</Text>
                        </View>
                    </View>
                ) : (
                    <View className='mt-1 flex flex-row justify-end'>
                        <View className='w-full flex flex-row gap-2 justify-between'>
                            <View>
                                <Text className='text-lg font-bold'>A+</Text>
                            </View>
                            <View className='min-h-[200px]'>
                                <View className='flex flex-row gap-2 justify-end items-center'>
                                    <Text className='text-base text-gray-600'>{data.civilRegistryNumber}</Text>
                                    <Text className='font-semibold text-black'>رقم السجل:</Text>
                                </View>
                                <View className='flex flex-row gap-2 justify-end items-center'>
                                    <Text className='text-base text-gray-600'>{data.address}</Text>
                                    <Text className='font-semibold text-black'>المحلة او القرية:</Text>
                                </View>
                                <View className='mb-auto flex flex-row gap-2 justify-end items-center'>
                                    <Text className='text-base text-gray-600'>{data.governorate}</Text>
                                    <Text className='font-semibold text-black'>المحافظة:</Text>
                                </View>
                                {/* ui free space here using the mb-auto ^ */}
                                <View className='flex flex-row gap-2 justify-end items-center'>
                                    <Text className='text-base text-gray-600'>{data.gender}</Text>
                                    <Text className='font-semibold text-black'>الجنس:</Text>
                                </View>
                                <View className='flex flex-row gap-2 justify-end items-center'>
                                    <Text className='text-base text-gray-600'>{data.maritalStatus}</Text>
                                    <Text className='font-semibold text-black'>الوضع العائلي:</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </TouchableOpacity >
    );
}
