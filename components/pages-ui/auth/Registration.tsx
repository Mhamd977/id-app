// components/pages-ui/auth/Registration.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

interface RegistrationProps {
  onSuccess: () => void;
  switchToLogin: () => void;
}

export default function Registration({ onSuccess, switchToLogin }: RegistrationProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  const validateForm = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleRegistration = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        phoneNumber: phoneNumber || '',
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Success', 'Your account has been created successfully!');
      onSuccess();
    } catch (error: any) {
      let errorMessage = 'An error occurred during registration';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered';
      }
      Alert.alert('Registration Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View className="mt-5 p-6 bg-white rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-center mb-6">Create Account</Text>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">First Name*</Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            className="border border-gray-300 p-3 rounded-md"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Last Name*</Text>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
            className="border border-gray-300 p-3 rounded-md"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Email*</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
            className="border border-gray-300 p-3 rounded-md"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Phone Number</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            className="border border-gray-300 p-3 rounded-md"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Password*</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
            className="border border-gray-300 p-3 rounded-md"
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 mb-2">Confirm Password*</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
            className="border border-gray-300 p-3 rounded-md"
          />
        </View>

        <TouchableOpacity 
          onPress={handleRegistration}
          disabled={loading}
          className={`p-3 rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
        >
          <Text className="text-white text-center font-bold">
            {loading ? 'Creating Account...' : 'Register'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={switchToLogin} className="mt-4">
          <Text className="text-blue-500 text-center">
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
