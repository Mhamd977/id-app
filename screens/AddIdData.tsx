import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebaseConfig"


type Gender = 'Male' | 'Female';

interface FormValues {
    name: string;
    lastName: string;
    fatherName: string;
    motherName: string;
    gender: Gender;
    dateOfBirth: string;
    locationOfBirth: string;
    governorate: string;
    civilRegistryNumber: string;
    maritalStatus: string;
    bloodType: string;
    idIssueDate: string;
    address: string;
    idNumber: string;
    status: string;
}

function AddIdData() {
    const db = getFirestore(app);
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            name: '',
            lastName: '',
            fatherName: '',
            motherName: '',
            gender: 'Male',
            dateOfBirth: '',
            locationOfBirth: '',
            governorate: '',
            civilRegistryNumber: '',
            maritalStatus: '',
            bloodType: '',
            idIssueDate: '',
            address: '',
            idNumber: '',
            status: 'pending',
        },
    });
    const handleSendData = async (data: FormValues) => {
        try {

            console.log("data:", data);

            const docRef = await addDoc(collection(db, "IdData"), {
                ...data, status: 'pending',

            });

            console.log('Document written with ID: ', docRef.id);

            Alert.alert("Success", "Data saved successfully!");



        } catch (e) {
            console.error("Error adding document: ", e);
            Alert.alert("Error", "Failed to save data. Please try again.");
        }
    };


    const onSubmit = (data: FormValues) => {
        handleSendData(data)
    };



    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Name</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="name"
                />
                {errors.name && <Text>This is required.</Text>}

                <Text style={styles.label}>Last Name</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='lastName'
                />
                {errors.lastName && <Text>This is required.</Text>}

                <Text style={styles.label}>Date of Birth</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='dateOfBirth'
                />
                {errors.dateOfBirth && <Text>This is required.</Text>}
                <Text style={styles.label}>Father's Name</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='fatherName'
                />
                {errors.fatherName && <Text>This is required.</Text>}

                <Text style={styles.label}>Mother's Name</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='motherName'
                />
                {errors.motherName && <Text>This is required.</Text>}

                <Text style={styles.label}>Gender</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='gender'
                />
                {errors.gender && <Text>This is required.</Text>}

                <Text style={styles.label}>Place of Birth</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='locationOfBirth'
                />
                {errors.locationOfBirth && <Text>This is required.</Text>}

                <Text style={styles.label}>Governorate</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='governorate'
                />
                {errors.governorate && <Text>This is required.</Text>}

                <Text style={styles.label}>Civil Registry Number</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='civilRegistryNumber'
                />
                {errors.civilRegistryNumber && <Text>This is required.</Text>}
                <Text style={styles.label}>Marital Status</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='maritalStatus'
                />
                {errors.maritalStatus && <Text>This is required.</Text>}
                <Text style={styles.label}>Blood Type</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='bloodType'
                />
                {errors.bloodType && <Text>This is required.</Text>}
                <Text style={styles.label}>ID Issue Date</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='idIssueDate'
                />
                {errors.idIssueDate && <Text>This is required.</Text>}

                {errors.dateOfBirth && <Text>This is required.</Text>}

                <Text style={styles.label}>Address</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} />
                    )}
                    name="address"
                />
                {errors.address && <Text>This is required.</Text>}
                <Text style={styles.label}>ID Number</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} />
                    )}
                    name="idNumber"
                />
                {errors.idNumber && <Text>This is required.</Text>}

                <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 15,
        padding: 10,
    },
});

export default AddIdData;