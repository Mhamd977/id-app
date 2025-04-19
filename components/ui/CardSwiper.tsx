import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Modal, ScrollView, Pressable, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { app } from '../../firebase/firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SwiperDataItem {
    id: string;
    cardType: string;
    fullName: string;
    carsAllowed?: string[] | null;
    expiryDate?: string | null;
    issueDate?: string | null;
    nationality?: string | null;
    bloodType?: string | null;
    address?: string | null;
    governorate?: string | null;
    plateNumber?: string | null;
    color?: string | null;
    model?: string | null;
    year?: string | null;
    number?: string | null;
    cmc?: string | null;
    collectionName: string;
}

interface AddCardItem {
    id: 'add';
    cardType: 'add';
}

type CardItem = SwiperDataItem | AddCardItem;

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING = 10;

export default function CardSwiper() {
    const navigation = useNavigation<NavigationProp>();
    const [data, setData] = useState<CardItem[]>([]);
    const [cards, setCards] = useState<SwiperDataItem[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            const loadCards = async () => {
                await fetchData();
            };
            loadCards();
        }, [])
    );

    const fetchData = async () => {
        const cardTypes = [
            { type: 'driver licence', collection: 'driverLicenceCards' },
            { type: 'car licence', collection: 'carLicenceCards' },
            { type: 'dr licence', collection: 'drLicenceCards' },
        ];

        let allCards: SwiperDataItem[] = [];

        try {
            const db = getFirestore(app);
            for (const cardType of cardTypes) {
                const cardsCollection = collection(db, cardType.collection);
                const cardsSnapshot = await getDocs(cardsCollection);
                const cardList = cardsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    cardType: cardType.type,
                    collectionName: cardType.collection,
                    ...doc.data()
                })) as SwiperDataItem[];
                allCards = [...allCards, ...cardList];
            }
            
            
            if (allCards.length > 0) {
                setCards(allCards);
                const newData: CardItem[] = [...allCards, { id: 'add', cardType: 'add' }];
                setData(newData);
            } else {
                setData([{ id: 'add', cardType: 'add' }]);
            }
        } catch (error) {
            console.error('Error fetching cards from Firebase:', error);
        }
    };

    const navigateToAddCard = () => {
        navigation.navigate('AddCard');
    };

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
                    <View className="bg-white p-5 rounded-xl " style={{ width: CARD_WIDTH, height: height * 0.9 }}>
                        <View className='flex flex-row justify-between items-center'>
                            <View>
                                <Pressable
                                    onPress={() => setModalVisible(false)}
                                    className="bg-gray-500 rounded-full w-10 h-10 flex items-center justify-center"
                                >
                                    <Text className="text-white text-center font-bold">X</Text>
                                </Pressable>
                            </View>
                            <View>
                                <Text className="text-xl font-bold text-center">{selectedCard.fullName}</Text>
                            </View>
                        </View>


                        <View className="space-y-3 my-5">
                            <Text className="text-lg font-semibold">{selectedCard.fullName}</Text>
                            <Text>Nationality: {selectedCard.nationality ?? 'N/A'}</Text>
                            <Text>Blood Type: {selectedCard.bloodType ?? 'N/A'}</Text>
                            <Text>Address: {selectedCard.address ?? 'N/A'}</Text>
                            <Text>Governorate: {selectedCard.governorate}</Text>
                            <Text>Allowed Vehicles: {selectedCard.carsAllowed?.join(', ') ?? "N/A"}</Text>
                            <Text>Issue Date: {selectedCard.issueDate}</Text>
                            <Text>Expiry Date: {selectedCard.expiryDate}</Text>
                        </View>
                    </View>
                );
            case 'car licence':
                return (
                    <View className="bg-white p-5 rounded-xl " style={{ width: CARD_WIDTH, height: height * 0.9 }}>
                        <View className='flex flex-row justify-between items-center'>
                            <View>
                                <Pressable
                                    onPress={() => setModalVisible(false)}
                                    className="bg-gray-500 rounded-full w-10 h-10 flex items-center justify-center"
                                >
                                    <Text className="text-white text-center font-bold">X</Text>
                                </Pressable>
                            </View>
                            <View>
                                <Text className="text-xl font-bold text-center">{selectedCard.fullName}</Text>
                            </View>
                        </View>
                        <Text className="text-2xl font-bold mb-4 text-center">Car License</Text>
                        <View className="space-y-3">
                            <Text className="text-lg font-semibold">{selectedCard.fullName}</Text>
                            <Text>Plate Number: {selectedCard.plateNumber}</Text>
                            <Text>Model: {selectedCard.model}</Text>
                            <Text>Year: {selectedCard.year}</Text>
                            <Text>Color: {selectedCard.color}</Text>
                        </View>
                    </View>
                );
            case 'visa':
                return (
                    <View className="bg-white p-5 rounded-xl " style={{ width: CARD_WIDTH, height: height * 0.9 }}>
                        <View className='flex flex-row justify-between items-center'>
                            <View>
                                <Pressable
                                    onPress={() => setModalVisible(false)}
                                    className="bg-gray-500 rounded-full w-10 h-10 flex items-center justify-center"
                                >
                                    <Text className="text-white text-center font-bold">X</Text>
                                </Pressable>
                            </View>
                            <View className=''>
                                <Text className="text-xl font-bold text-center">{selectedCard.fullName}</Text>
                            </View>
                        </View>
                    </View>
                );
            default:
                return (
                    <View className="bg-white p-5 rounded-xl " style={{ width: CARD_WIDTH, height: height * 0.9 }}>
                        <View className='flex flex-row justify-between items-center'>
                            <View>
                                <Pressable
                                    onPress={() => setModalVisible(false)}
                                    className="bg-gray-500 rounded-full w-10 h-10 flex items-center justify-center"
                                >
                                    <Text className="text-white text-center font-bold">X</Text>
                                </Pressable>
                            </View>
                            <View className=''>
                                <Text className="text-xl font-bold text-center">{selectedCard.fullName}</Text>
                            </View>
                        </View>
                        <Text className="text-2xl font-bold mb-4 text-center">{selectedCard.cardType}</Text>
                    </View>
                );
        }
    };

    const renderCard = ({ item }: { item: CardItem }) => {
        if (item.cardType === 'add') {
            return (
                <Pressable
                    onPress={navigateToAddCard}
                    style={{ width: CARD_WIDTH }}
                    className='bg-gray-100 p-4 rounded-lg shadow-lg border border-gray-200 mx-2 flex items-center justify-center'
                >
                    <Ionicons name="add-circle" size={64} color="#007bff" />
                    <Text className='text-lg font-medium text-gray-700 mt-2'>Add More Card</Text>
                </Pressable>
            );
        }

        const cardItem = item as SwiperDataItem;

        switch (cardItem.cardType) {
            case 'driver licence':
                return (
                    <TouchableOpacity
                        onPress={() => handleCardPress(cardItem)}
                        style={{ width: CARD_WIDTH }}
                        className='bg-white p-4 rounded-lg shadow-lg border border-gray-200 mx-2'
                    >
                        <Text className='text-xl font-bold mb-2'>{cardItem.cardType}</Text>
                        <View className='space-y-2'>
                            <Text className='text-base'>{cardItem.fullName}</Text>
                            <Text className='text-sm text-gray-600'>Allowed Vehicles: {cardItem.carsAllowed?.join(', ') ?? 'N/A'}</Text>
                            <Text className='text-sm text-gray-600'>Expiry: {cardItem.expiryDate}</Text>
                            <Text className='text-sm text-gray-600'>Issue Date: {cardItem.issueDate}</Text>
                        </View>
                    </TouchableOpacity>
                );
            case 'car licence':
                return (
                    <TouchableOpacity
                        onPress={() => handleCardPress(cardItem)}
                        style={{ width: CARD_WIDTH }}
                        className='bg-white p-4 rounded-lg shadow-lg border border-gray-200 mx-2'
                    >
                        <Text className='text-xl font-bold mb-2'>{cardItem.cardType}</Text>
                        <View className='space-y-2'>
                            <Text className='text-base'>{cardItem.fullName}</Text>
                            <Text className='text-sm text-gray-600'>Plate: {cardItem.plateNumber}</Text>
                            <Text className='text-sm text-gray-600'>Model: {cardItem.model}</Text>
                            <Text className='text-sm text-gray-600'>Year: {cardItem.year}</Text>
                            <Text className='text-sm text-gray-600'>Color: {cardItem.color}</Text>
                        </View>
                    </TouchableOpacity>
                );
            default:
                return (
                    <TouchableOpacity
                        onPress={() => handleCardPress(cardItem)}
                        style={{ width: CARD_WIDTH }}
                        className='bg-white p-4 rounded-lg shadow-lg border border-gray-200 mx-2'
                    >
                        <Text className='text-xl font-bold'>{cardItem.cardType}</Text>
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




