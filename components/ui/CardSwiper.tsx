import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Modal,
    ScrollView,
    Pressable,
    Button
} from 'react-native';
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

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING = 10;

// A simple helper to translate card types (can be extended later)
const translateCardType = (type: string): string => {
    switch (type) {
        case 'driver licence':
            return 'رخصة قيادة';
        case 'car licence':
            return 'رخصة مركبة';
        case 'dr licence':
            return 'رخصة دكتور';
        case 'visa':
            return 'بطاقة فيزا';
        default:
            return type;
    }
};

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
            console.error('حدث خطأ أثناء جلب البطاقات من Firebase:', error);
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

    const renderCardModal = () => {
        if (!selectedCard) return null;

        const translatedCardType = translateCardType(selectedCard.cardType);

        switch (selectedCard.cardType) {
            case 'driver licence':
                return (
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: CARD_WIDTH, height: height * 0.9 }}>
                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 20 }}>
                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={{ backgroundColor: '#555', borderRadius: 50, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>X</Text>
                            </Pressable>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1, marginHorizontal: 10 }}>
                                {selectedCard.fullName}
                            </Text>
                        </View>
                        <ScrollView>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>الجنسية: <Text style={{ fontWeight: 'normal' }}>{selectedCard.nationality ?? 'غير متوفر'}</Text></Text>
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>فصيلة الدم: <Text style={{ fontWeight: 'normal' }}>{selectedCard.bloodType ?? 'غير متوفر'}</Text></Text>
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>العنوان: <Text style={{ fontWeight: 'normal' }}>{selectedCard.address ?? 'غير متوفر'}</Text></Text>
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>المحافظة: <Text style={{ fontWeight: 'normal' }}>{selectedCard.governorate ?? 'غير متوفر'}</Text></Text>
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>المركبات المسموحة: <Text style={{ fontWeight: 'normal' }}>{selectedCard.carsAllowed?.join(', ') ?? 'غير متوفر'}</Text></Text>
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>تاريخ الإصدار: <Text style={{ fontWeight: 'normal' }}>{selectedCard.issueDate ?? 'غير متوفر'}</Text></Text>
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>تاريخ الانتهاء: <Text style={{ fontWeight: 'normal' }}>{selectedCard.expiryDate ?? 'غير متوفر'}</Text></Text>
                            </View>
                        </ScrollView>
                    </View>
                );
            case 'car licence':
                return (
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: CARD_WIDTH, height: height * 0.9 }}>
                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 20 }}>
                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={{ backgroundColor: '#555', borderRadius: 50, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>X</Text>
                            </Pressable>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1, marginHorizontal: 10 }}>
                                {selectedCard.fullName}
                            </Text>
                        </View>
                        <ScrollView>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>رقم اللوحة: <Text style={{ fontWeight: 'normal' }}>{selectedCard.plateNumber ?? 'غير متوفر'}</Text></Text>
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>الطراز: <Text style={{ fontWeight: 'normal' }}>{selectedCard.model ?? 'غير متوفر'}</Text></Text>
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>السنة: <Text style={{ fontWeight: 'normal' }}>{selectedCard.year ?? 'غير متوفر'}</Text></Text>
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>اللون: <Text style={{ fontWeight: 'normal' }}>{selectedCard.color ?? 'غير متوفر'}</Text></Text>
                            </View>
                        </ScrollView>
                    </View>
                );
            case 'visa':
                return (
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: CARD_WIDTH, height: height * 0.9 }}>
                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 20 }}>
                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={{ backgroundColor: '#555', borderRadius: 50, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>X</Text>
                            </Pressable>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1, marginHorizontal: 10 }}>
                                {selectedCard.fullName}
                            </Text>
                        </View>
                        <ScrollView>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>رقم البطاقة: <Text style={{ fontWeight: 'normal' }}>{selectedCard.number ?? 'غير متوفر'}</Text></Text>
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>تاريخ الانتهاء: <Text style={{ fontWeight: 'normal' }}>{selectedCard.expiryDate ?? 'غير متوفر'}</Text></Text>
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>رمز CMC: <Text style={{ fontWeight: 'normal' }}>{selectedCard.cmc ?? 'غير متوفر'}</Text></Text>
                            </View>
                        </ScrollView>
                    </View>
                );
            default:
                return (
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: CARD_WIDTH, height: height * 0.9 }}>
                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 20 }}>
                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={{ backgroundColor: '#555', borderRadius: 50, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>X</Text>
                            </Pressable>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1, marginHorizontal: 10 }}>
                                {selectedCard.fullName}
                            </Text>
                        </View>
                        <ScrollView>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>
                                {selectedCard.cardType}
                            </Text>
                        </ScrollView>
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
                    className="bg-gray-100 p-4 rounded-lg shadow-lg border border-gray-200 mx-2 flex items-center justify-center"
                >
                    <Ionicons name="add-circle" size={64} color="#007bff" />
                    <Text className="text-lg font-medium text-gray-700 mt-2">إضافة بطاقة جديدة</Text>
                </Pressable>
            );
        }

        const cardItem = item as SwiperDataItem;
        const translatedCardType = translateCardType(cardItem.cardType);

        switch (cardItem.cardType) {
            case 'driver licence':
                return (
                    <TouchableOpacity
                        onPress={() => handleCardPress(cardItem)}
                        style={{ width: CARD_WIDTH }}
                        className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 mx-2"
                    >
                        <Text className="text-xl font-bold mb-2">{translatedCardType}</Text>
                        <View className="space-y-2">
                            <Text className="text-base">{cardItem.fullName}</Text>
                            <Text className="text-sm text-gray-600">المركبات المسموحة: {cardItem.carsAllowed?.join(', ') ?? 'غير محدد'}</Text>
                            <Text className="text-sm text-gray-600">تاريخ الانتهاء: {cardItem.expiryDate ?? 'غير محدد'}</Text>
                            <Text className="text-sm text-gray-600">تاريخ الإصدار: {cardItem.issueDate ?? 'غير محدد'}</Text>
                        </View>
                    </TouchableOpacity>
                );
            case 'car licence':
                return (
                    <TouchableOpacity
                        onPress={() => handleCardPress(cardItem)}
                        style={{ width: CARD_WIDTH }}
                        className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 mx-2"
                    >
                        <Text className="text-xl font-bold mb-2">{translatedCardType}</Text>
                        <View className="space-y-2">
                            <Text className="text-base">{cardItem.fullName}</Text>
                            <Text className="text-sm text-gray-600">رقم اللوحة: {cardItem.plateNumber ?? 'غير محدد'}</Text>
                            <Text className="text-sm text-gray-600">الطراز: {cardItem.model ?? 'غير محدد'}</Text>
                        </View>
                    </TouchableOpacity>
                );
            default:
                return (
                    <TouchableOpacity
                        onPress={() => handleCardPress(cardItem)}
                        style={{ width: CARD_WIDTH }}
                        className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 mx-2"
                    >
                        <Text className="text-xl font-bold">{cardItem.cardType}</Text>
                    </TouchableOpacity>
                );
        }
    };
    

    return (
        <View className="flex-1">
            {data.length > 0 ? (
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
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>جاري تحميل البطاقات...</Text>
                </View>
            )}

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
