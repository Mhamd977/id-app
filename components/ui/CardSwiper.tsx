import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Modal, ScrollView, Pressable } from 'react-native';

interface SwiperDataItem {
    id: number;
    cardType: string;
    fullName?: string;
    carsAllowed?: string[];
    expiryDate?: string;
    issueDate?: string;
    nationality?: string;
    bloodType?: string;
    address?: string;
    governorate?: string;
    plateNumber?: string;
    color?: string;
    model?: string;
    year?: string;
    number?: string;
    cmc?: string;
}

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING = 10;

export default function CardSwiper({ data }: { data: SwiperDataItem[] }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState<SwiperDataItem | null>(null);

    const handleCardPress = (item: SwiperDataItem) => {
        setSelectedCard(item);
        setModalVisible(true);
    };

    // The model popup Card
    const renderCardModal = () => {
        if (!selectedCard) return null;

        switch (selectedCard.cardType) {
            case 'driver licence':
                return (
                    <View className="bg-white p-5 rounded-xl " style={{ width: CARD_WIDTH, height: height *0.9 }}>
                        <View className='flex flex-row justify-between items-center'>
                            <View>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    className="bg-gray-500 rounded-full w-10 h-10 flex items-center justify-center"
                                >
                                    <Text className="text-white text-center font-bold">X</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text className="text-xl font-bold text-center">{selectedCard.fullName}</Text>
                            </View>
                        </View>


                        <View className="space-y-3">
                            <Text className="text-lg font-semibold">{selectedCard.fullName}</Text>
                            <Text>Nationality: {selectedCard.nationality}</Text>
                            <Text>Blood Type: {selectedCard.bloodType}</Text>
                            <Text>Address: {selectedCard.address}</Text>
                            <Text>Governorate: {selectedCard.governorate}</Text>
                            <Text>Allowed Vehicles: {selectedCard.carsAllowed?.join(', ')}</Text>
                            <Text>Issue Date: {selectedCard.issueDate}</Text>
                            <Text>Expiry Date: {selectedCard.expiryDate}</Text>
                        </View>
                    </View>
                );
            case 'car licence':
                return (
                    <View className="bg-white p-6 rounded-xl w-full max-w-md">
                        <Text className="text-2xl font-bold mb-4 text-center">Car License</Text>
                        <View className="space-y-3">
                            <Text className="text-lg font-semibold">{selectedCard.fullName}</Text>
                            <Text>Plate Number: {selectedCard.plateNumber}</Text>
                            <Text>Model: {selectedCard.model}</Text>
                            <Text>Year: {selectedCard.year}</Text>
                            <Text>Color: {selectedCard.color}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="mt-6 bg-blue-500 py-3 rounded-lg"
                        >
                            <Text className="text-white text-center font-bold">Close</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 'visa':
                return (
                    <View className="bg-white p-6 rounded-xl w-full max-w-md">
                        <Text className="text-2xl font-bold mb-4 text-center">Visa Card</Text>
                        <View className="space-y-3">
                            <Text className="text-lg font-semibold">{selectedCard.fullName}</Text>
                            <Text>Card Number: {selectedCard.number}</Text>
                            <Text>Expiry Date: {selectedCard.expiryDate}</Text>
                            <Text>CMC: {selectedCard.cmc}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="mt-6 bg-blue-500 py-3 rounded-lg"
                        >
                            <Text className="text-white text-center font-bold">Close</Text>
                        </TouchableOpacity>
                    </View>
                );
            default:
                return (
                    <View className="bg-white p-6 rounded-xl w-full max-w-md">
                        <Text className="text-2xl font-bold mb-4 text-center">{selectedCard.cardType}</Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="mt-6 bg-blue-500 py-3 rounded-lg"
                        >
                            <Text className="text-white text-center font-bold">Close</Text>
                        </TouchableOpacity>
                    </View>
                );
        }
    };

    // The card item in the swiper
    const renderCard = ({ item }: { item: SwiperDataItem }) => {
        switch (item.cardType) {
            case 'driver licence':
                return (
                    <TouchableOpacity
                        onPress={() => handleCardPress(item)}
                        style={{ width: CARD_WIDTH }}
                        className='bg-white p-4 rounded-lg shadow-lg border border-gray-200 mx-2'
                    >
                        <Text className='text-xl font-bold mb-2'>{item.cardType}</Text>
                        <View className='space-y-2'>
                            <Text className='text-base'>{item.fullName}</Text>
                            <Text className='text-sm text-gray-600'>Allowed Vehicles: {item.carsAllowed?.join(', ')}</Text>
                            <Text className='text-sm text-gray-600'>Expiry: {item.expiryDate}</Text>
                            <Text className='text-sm text-gray-600'>Issue Date: {item.issueDate}</Text>
                        </View>
                    </TouchableOpacity>
                );
            case 'car licence':
                return (
                    <TouchableOpacity
                        onPress={() => handleCardPress(item)}
                        style={{ width: CARD_WIDTH }}
                        className='bg-white p-4 rounded-lg shadow-lg border border-gray-200 mx-2'
                    >
                        <Text className='text-xl font-bold mb-2'>{item.cardType}</Text>
                        <View className='space-y-2'>
                            <Text className='text-base'>{item.fullName}</Text>
                            <Text className='text-sm text-gray-600'>Plate: {item.plateNumber}</Text>
                            <Text className='text-sm text-gray-600'>Model: {item.model}</Text>
                            <Text className='text-sm text-gray-600'>Year: {item.year}</Text>
                            <Text className='text-sm text-gray-600'>Color: {item.color}</Text>
                        </View>
                    </TouchableOpacity>
                );
            default:
                return (
                    <TouchableOpacity
                        onPress={() => handleCardPress(item)}
                        style={{ width: CARD_WIDTH }}
                        className='bg-white p-4 rounded-lg shadow-lg border border-gray-200 mx-2'
                    >
                        <Text className='text-xl font-bold'>{item.cardType}</Text>
                    </TouchableOpacity>
                );
        }
    };

    return (
        <View className="flex-1">
            <FlatList
                data={data}
                renderItem={renderCard}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + SPACING * 2}
                decelerationRate="fast"
                contentContainerStyle={{
                    paddingHorizontal: SPACING,
                }}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    className="flex-1 justify-center items-center bg-black/50 p-4"
                    onPress={() => setModalVisible(false)}
                >
                    <Pressable onPress={(e) => e.stopPropagation()}>
                        <ScrollView>
                            {renderCardModal()}
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}
