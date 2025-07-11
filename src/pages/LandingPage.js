import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../components/MainLayout';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LandingPage() {
  const navigation = useNavigation();

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome to your Career Community</Text>

        {/* Card Columns */}
        <View style={styles.cardRow}>
          {/* EDUCATION */}
          <View style={styles.card}>
            <Icon name="book" size={30} color="#4B8DF8" />
            <Text style={styles.cardTitle}>Education</Text>
            <Text style={styles.cardText}>Comprehensive career education tailored for South African Students</Text>
            <View style={styles.bullets}>
              <Text style={styles.bulltetItem}>• Interactive crareer exploration tools</Text>
              <Text style={styles.bulltetItem}>• Skill development programs</Text>
              <Text style={styles.bulltetItem}>• Industry-aligned learning paths</Text>
              <Text style={styles.bulltetItem}>• Assessment and Certification</Text>
            </View>
          </View>

          {/* INFORMATION */}
          <View style={styles.card}>
            <Icon name="exclamation-circle" size={30} color="#F89E4B" />
            <Text style={styles.cardTitle}>Information</Text>
            <Text style={styles.cardText}>Real-time insights into career opportunities and marked trends</Text>
            <View style={styles.bullets}>
              <Text style={styles.bulltetItem}>• Live job market analytics</Text>
              <Text style={styles.bulltetItem}>• Salary benchmarking tools</Text>
              <Text style={styles.bulltetItem}>• Educational pathway guidance</Text>
              <Text style={styles.bulltetItem}>• Industry trend reports</Text>
            </View>
          </View>

          {/* INSPIRE */}
          <View style={styles.card}>
            <Icon name="lightbulb-o" size={30} color="#F8C84B" />
            <Text style={styles.cardTitle}>Inspire</Text>
            <Text style={styles.cardText}>Stories and mentorship from successful South African professionals</Text>
            <View style={styles.bullets}>
              <Text style={styles.bulltetItem}>• Success story showcases</Text>
              <Text style={styles.bulltetItem}>• Mentor matching system</Text>
              <Text style={styles.bulltetItem}>• Virtual career talks</Text>
              <Text style={styles.bulltetItem}>• Peer success celebrations</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('SignUp')}
            style={styles.primaryButton}
          >
            Sign Up
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Login')}
            style={styles.outlinedButton}
          >
            Login
          </Button>
        </View>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 3, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  cardText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  bullets: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
  },
  bulltetItem: {
    marginBottom: 6,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  primaryButton: {
    width: '80%',
    marginBottom: 10,
  },
  outlinedButton: {
    width: '80%',
  },
});