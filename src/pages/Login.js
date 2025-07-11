import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'; // Use auth from firebase-config
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      setError('Both email and password are required!');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User Logged in Successfully!');
      navigation.navigate('Home'); // Change route name if necessary
    } catch (error) {
      console.log('Error during login:', error.message);
      switch (error.code) {
        case 'auth/invalid-email':
          setError('The email address is not valid.');
          break;
        case 'auth/user-disabled':
          setError('The user account has been disabled.');
          break;
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setError('The password you entered is incorrect.');
          break;
        default:
          setError(error.message);
      }
    }
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to your account:</Text>

      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Enter your password"
        style={styles.input}
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Login
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupLink}>
          Don't have an account? <Text style={styles.signupText}>Sign Up here</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
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
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginVertical: 15,
    paddingVertical: 6,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  signupLink: {
    textAlign: 'center',
    color: '#333',
    fontSize: 15,
  },
  signupText: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});
