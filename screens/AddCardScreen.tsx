import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AddCardScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    const navigateTo = (screenName: keyof RootStackParamList) => {
        navigation.navigate(screenName);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigateTo('AddDriveLicCard')}>
                    <Text style={styles.buttonText}>Drive Licence Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigateTo('AddCarLicCard')}>
                    <Text style={styles.buttonText}>Car License</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigateTo('AddDrLicCard')}>
                    <Text style={styles.buttonText}>Dr. License</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    buttonContainer: {
        width: '100%',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddCardScreen;