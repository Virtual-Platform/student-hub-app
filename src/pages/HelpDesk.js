import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MainLayout from '../components/MainLayout';
import { Avatar, Button, Card, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import styles from the new styles file
import { helpDeskStyles as styles } from '../styles/styles';

export default function HelpDesk() {
  const [chatMessage, setChatMessage] = useState('');

  const userData = {
    name: 'John Doe',
    grade: '11',
    school: 'PE High School',
    profileImage: null,
  };

  const faqs = [
    {
      question: 'How do I apply for a bursary?',
      answer:
        'To apply for a bursary, check your eligibility on our Bursary page. Make sure you have your latest academic results and ID document ready. Follow the application process outlined for each specific bursary.',
    },
    {
      question: 'What documents do I need for NSFAS?',
      answer:
        "For NSFAS applications, you need: Your South African ID, your parents' IDs, proof of income (if applicable), latest academic results, and proof of residence.",
    },
    {
      question: 'How can I change my career path?',
      answer:
        "Visit the Career Room section, take our career assessment test, and consult with our career guidance counselors. We'll help you explore options based on your interests and abilities.",
    },
  ];

  return (
    <MainLayout>
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <Card style={styles.card}>
        <Card.Content style={styles.centerContent}>
          {userData.profileImage ? (
            <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
          ) : (
            <Icon name="user-circle" size={100} color="#888" />
          )}
          <Text style={styles.userName}>{userData.name}</Text>
          <Text>Grade: {userData.grade}</Text>
          <Text>School: {userData.school}</Text>
          <Button mode="outlined" onPress={() => console.log('Navigate to profile update')}>
            Update Profile
          </Button>
        </Card.Content>
      </Card>

      {/* Links Section */}
      <Card style={styles.card}>
        <Card.Content style={styles.centerContent}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.nsfas.org.za')}>
            <Image source={require('../../assets/NSFAS-logo.jpg')} style={styles.logo} />
            <Text>Visit NSFAS Website</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.centerContent}>
          <TouchableOpacity onPress={() => Linking.openURL('https://lovelife.org.za')}>
            <Image source={require('../../assets/loveLife.jpg')} style={styles.logo} />
            <Text>Visit LoveLife Website</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>

      {/* Info Cards */}
      <Card style={styles.card}>
        <Card.Title title="SASSA Assistance" />
        <Card.Content>
          <Text>Learn more about SASSA and how they can assist you with various grants and support programs.</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => Linking.openURL('https://www.sassa.gov.za')}>Visit SASSA Website</Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Mental Health Assessment" />
        <Card.Content>
          <Text>Take the questionnaire to learn more about mental health and how to manage it.</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => console.log('Navigate to mental health quiz')}>Take Mental Health Quiz</Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Career Path Assessment" />
        <Card.Content>
          <Text>Take the following questionnaire and learn which career suits you best.</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => console.log('Navigate to career quiz')}>Take Career Quiz</Button>
        </Card.Actions>
      </Card>

      {/* FAQ Section */}
      <Card style={styles.card}>
        <Card.Title title="Frequently Asked Questions" />
        <Card.Content>
          {faqs.map((faq, index) => (
            <List.Accordion
              title={faq.question}
              key={index}
              style={{ backgroundColor: '#f0f0f0' }}
            >
              <List.Item title={faq.answer} />
            </List.Accordion>
          ))}
        </Card.Content>
      </Card>

      {/* Chat Box */}
      <Card style={styles.card}>
        <Card.Title title="Chat with Help Desk" />
        <Card.Content style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Welcome to Help Desk Support</Text>
          <Text>How can we assist you today?</Text>
        </Card.Content>
        <Card.Actions style={styles.chatInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message..."
            value={chatMessage}
            onChangeText={setChatMessage}
          />
          <Button mode="contained" onPress={() => console.log('Send message')}>
            <Icon name="paper-plane" size={16} color="#fff" />
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
    </MainLayout>
  );
}
