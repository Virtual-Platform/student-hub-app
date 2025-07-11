import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Picker,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';

// Email validation
const validateEmail = (email) => {
  const emailPattern = /^[A-Za-z0-9+_.-]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/;
  return emailPattern.test(email);
};

export default function SignUp() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    language: '',
    race: '',
    gender: '',
    careerAmbition: '',
    email: '',
    password: '',
    schoolName: '',
    schoolLocation: '',
    grade: '',
    schoolPrincipal: '',
    schoolGuidance: '',
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

      {/* --- Section 1: Personal Information --- */}
      <Text style={styles.sectionTitle}>Personal Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formData.fullName}
        onChangeText={(text) => handleChange('fullName', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={formData.age}
        onChangeText={(text) => handleChange('age', text)}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Home Language</Text>
        <Picker
          selectedValue={formData.language}
          style={styles.picker}
          onValueChange={(itemValue) => handleChange('language', itemValue)}
        >
          <Picker.Item label="Select Language" value="" />
          {[
            'Zulu',
            'Xhosa',
            'Afrikaans',
            'English',
            'Sepedi',
            'Tswana',
            'Sotho',
            'Tsonga',
            'Swati',
            'Venda',
            'Ndebele',
          ].map((lang) => (
            <Picker.Item key={lang} label={lang} value={lang} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Race"
        value={formData.race}
        onChangeText={(text) => handleChange('race', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Gender (e.g. male/female)"
        value={formData.gender}
        onChangeText={(text) => handleChange('gender', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Career Ambition"
        multiline
        value={formData.careerAmbition}
        onChangeText={(text) => handleChange('careerAmbition', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
      />

      {/* --- Section 2: School Info --- */}
      <Text style={styles.sectionTitle}>School Information</Text>

      <TextInput
        style={styles.input}
        placeholder="School Name"
        value={formData.schoolName}
        onChangeText={(text) => handleChange('schoolName', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="School Location"
        value={formData.schoolLocation}
        onChangeText={(text) => handleChange('schoolLocation', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Grade"
        keyboardType="numeric"
        value={formData.grade}
        onChangeText={(text) => handleChange('grade', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="School Principal"
        value={formData.schoolPrincipal}
        onChangeText={(text) => handleChange('schoolPrincipal', text)}
      />

      <Text style={styles.label}>School Guidance Counsellor Available?</Text>
      <View style={styles.radioContainer}>
        {['Yes', 'No'].map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioOption}
            onPress={() => handleChange('schoolGuidance', option)}
          >
            <Text style={formData.schoolGuidance === option ? styles.selectedRadio : null}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Error messages */}
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Submit Button */}
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Sign Up
      </Button>

      {/* Link to Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>
          Already have an account? <Text style={styles.linkHighlight}>Login here</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    color: '#333',
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
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontSize: 15,
    color: '#555',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  radioOption: {
    marginRight: 20,
  },
  selectedRadio: {
    fontWeight: 'bold',
    color: 'blue',
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
