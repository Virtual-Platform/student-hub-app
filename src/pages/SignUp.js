import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'; // ✅ Correct import

// Email validation
const validateEmail = (email) => {
  const emailPattern = /^[A-Za-z0-9+_.-]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/;
  return emailPattern.test(email);
};

export default function SignUp() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    age: '',
    grade: '',
    schoolName: '',
    schoolLocation: '',
    schoolPrincipal: '',
    careerAmbition: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'email') {
      if (!validateEmail(value) && value !== '') {
        setEmailError('Please use a valid email (gmail, hotmail, yahoo, outlook)');
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      setError('Email and Password are required!');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please use a valid email (gmail, hotmail, yahoo, outlook)');
      return;
    }

    setError('');
    setEmailError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Signup successful!', 'You can now log in.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Signup Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create your account</Text>

      {[
        { label: 'Full Name', name: 'fullName' },
        { label: 'Gender (e.g. male/female)', name: 'gender' },
        { label: 'Age', name: 'age', keyboardType: 'numeric' },
        { label: 'Grade', name: 'grade', keyboardType: 'numeric' },
        { label: 'School Name', name: 'schoolName' },
        { label: 'School Location', name: 'schoolLocation' },
        { label: 'School Principal', name: 'schoolPrincipal' },
        { label: 'Career Ambition', name: 'careerAmbition', multiline: true },
        { label: 'Email Address', name: 'email' },
        { label: 'Password', name: 'password', secureTextEntry: true },
      ].map((field, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={field.label}
          value={formData[field.name]}
          onChangeText={(text) => handleChange(field.name, text)}
          keyboardType={field.keyboardType || 'default'}
          secureTextEntry={field.secureTextEntry || false}
          multiline={field.multiline || false}
        />
      ))}

      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Sign Up
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>
          Already have an account?{' '}
          <Text style={styles.linkHighlight}>Login here</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginVertical: 20,
    paddingVertical: 6,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  linkText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 15,
  },
  linkHighlight: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});
