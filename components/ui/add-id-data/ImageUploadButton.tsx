import React, { useState } from 'react';
import { View, Button, Image, Alert, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, UploadTaskSnapshot } from "firebase/storage";
import { FirebaseApp } from 'firebase/app';
import { app } from '../../../firebase/firebaseConfig';

interface ImageUploadButtonProps {
    /** The path within Firebase Storage where the image should be saved (e.g., 'avatars/', 'id_images/'). Must end with '/'. */
    storagePath: string;
    /** Callback function triggered on successful upload, receiving the download URL. */
    onUploadSuccess: (downloadUrl: string) => void;
    /** Optional callback for handling upload errors. */
    onUploadError?: (error: Error) => void;
    /** Optional title for the button. Defaults to 'Pick & Upload Image'. */
    buttonTitle?: string;
    /** Optional: Style the button */
    buttonStyle?: object;
    /** Optional: Style the button text */
    buttonTextStyle?: object;
}

const storage = getStorage(app as FirebaseApp);

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
    storagePath,
    onUploadSuccess,
    onUploadError,
    buttonTitle = 'Pick & Upload Image',
    buttonStyle,
    buttonTextStyle,
}) => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

    const pickAndUploadImage = async () => {
        // 1. Pick Image
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], // Corrected mediaTypes
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7, // Slightly reduce quality for faster uploads
        });

        if (result.canceled || !result.assets || result.assets.length === 0) {
            console.log("Image picking cancelled or failed.");
            return; // Exit if cancelled
        }

        const localUri = result.assets[0].uri;
        setSelectedImageUri(localUri); // Show selected image preview
        setUploading(true);
        setProgress(0);

        // 2. Convert to Blob
        let blob: Blob;
        try {
            blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () { resolve(xhr.response); };
                xhr.onerror = function (e) { reject(new TypeError("Network request failed")); };
                xhr.responseType = "blob";
                xhr.open("GET", localUri, true);
                xhr.send(null);
            });
        } catch (error) {
            console.error("Error creating blob: ", error);
            Alert.alert("Error", "Could not prepare image for upload.");
            setUploading(false);
            onUploadError?.(error as Error);
            return;
        }

        // 3. Upload to Firebase Storage
        try {
            const filename = localUri.substring(localUri.lastIndexOf('/') + 1);
            // Ensure storagePath ends with '/'
            const fullPath = storagePath.endsWith('/') ? storagePath : `${storagePath}/`;
            const storageRef = ref(storage, `${fullPath}${Date.now()}_${filename}`); // Add timestamp for uniqueness

            const metadata = { contentType: result.assets[0].mimeType || 'image/jpeg' }; // Use detected mimeType

            const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot: UploadTaskSnapshot) => {
                    // Get task progress
                    const currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes);
                    setProgress(currentProgress);
                    console.log('Upload is ' + (currentProgress * 100) + '% done');
                },
                (error) => {
                    console.error("Upload Error: ", error);
                    setUploading(false);
                    setProgress(0);
                    setSelectedImageUri(null); // Clear preview on error
                    // Close the blob if possible/needed on error
                    (blob as any)?.close?.();
                    Alert.alert("Upload Error", `Failed to upload image: ${error.code}`);
                    onUploadError?.(error);
                },
                async () => {
                    // Upload completed successfully, now get the download URL
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('File available at', downloadURL);
                    setUploading(false);
                    setProgress(1); // Mark as complete
                    // Close the blob on success
                    (blob as any)?.close?.();
                    onUploadSuccess(downloadURL); // Call the success callback
                    // Optionally clear preview after successful upload
                    // setSelectedImageUri(null);
                }
            );

        } catch (error) {
            console.error("Error setting up upload: ", error);
            setUploading(false);
            setProgress(0);
            setSelectedImageUri(null);
            (blob as any)?.close?.();
            Alert.alert("Error", "Could not start image upload.");
            onUploadError?.(error as Error);
        }
    };

    return (
        <View style={styles.container}>
            {selectedImageUri && !uploading && (
                <Image source={{ uri: selectedImageUri }} style={styles.previewImage} />
            )}

            <TouchableOpacity
                style={[styles.button, buttonStyle, uploading && styles.disabledButton]}
                onPress={pickAndUploadImage}
                disabled={uploading}
            >
                {uploading ? (
                    <View style={styles.progressContainer}>
                        <ActivityIndicator color="#fff" size="small" />
                        <Text style={[styles.buttonText, buttonTextStyle]}> Uploading... ({Math.round(progress * 100)}%)</Text>
                    </View>
                ) : (
                    <Text style={[styles.buttonText, buttonTextStyle]}>{buttonTitle}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#007AFF', // Example blue color
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 150,
    },
    disabledButton: {
        backgroundColor: '#a0a0a0', // Grey out when disabled
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    }
});

export default ImageUploadButton;
