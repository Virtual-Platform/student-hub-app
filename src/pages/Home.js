import React, { useLayoutEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
// ⚠️ Only use MainLayout if it doesn't override the native header
import MainLayout from '../components/MainLayout';

const studentImage = require('../../assets/student.png');

export default function Home() {
  const navigation = useNavigation();

  const userData = {
    name: 'John Doe',
    grade: '11',
    school: 'PE High School',
    profileImage: studentImage,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'LandingPage' }],
            });
          }}
          mode="text"
          compact
          labelStyle={{ color: '#e74c3c', fontWeight: 'bold' }}
        >
          Logout
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.row}>
          {/* Left Column */}
          <View style={styles.columnLeft}>
            <Card style={styles.card}>
              <Card.Content style={styles.center}>
                {userData.profileImage ? (
                  <Image source={userData.profileImage} style={styles.profileImage} />
                ) : (
                  <Icon name="user-circle" size={100} color="#888" />
                )}
                <Text style={styles.name}>{userData.name}</Text>
                <Text>Grade: {userData.grade}</Text>
                <Text>School: {userData.school}</Text>
                <Button
                  mode="outlined"
                  onPress={() => navigation.navigate('Profile')}
                  style={styles.button}
                >
                  Update Profile
                </Button>
              </Card.Content>
            </Card>

            <Card style={styles.card}>
              <Card.Title title="Career Updates" />
              <Card.Content>
                <Text>Stay tuned for career-related updates and news here.</Text>
              </Card.Content>
            </Card>
          </View>

          {/* Middle Column */}
          <View style={styles.columnMiddle}>
            <Card style={styles.card}>
              <Card.Title title="News Updates" />
              <Card.Content>
                <Text>Catch up with the latest news that matters to you.</Text>
              </Card.Content>
            </Card>

            <Card style={styles.card}>
              <Card.Title title="Sponsor Information" />
              <Card.Content>
                <Text>Meet our sponsors and how they support your journey.</Text>
              </Card.Content>
            </Card>
          </View>

          {/* Right Column */}
          <View style={styles.columnRight}>
            {[
              { title: 'Learn to play chess', route: 'Chess' },
              { title: 'Coding Bootcamps', route: 'Bootcamps' },
              { title: 'Take a Survey', route: 'Survey' },
              { title: 'K53 Learners Practice', route: 'K53' },
              { title: 'Add to your Feed', route: 'Feed' },
            ].map((item, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Button
                    mode="outlined"
                    onPress={() => navigation.navigate(item.route)}
                    compact
                  >
                    {item.title.includes('Learn')
                      ? 'Learn More'
                      : item.title.includes('Coding')
                      ? 'Explore'
                      : item.title.includes('Survey')
                      ? 'Start Survey'
                      : item.title.includes('K53')
                      ? 'Start Practice'
                      : 'Customize'}
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnLeft: {
    flex: 1,
    marginRight: 5,
  },
  columnMiddle: {
    flex: 1,
    marginHorizontal: 5,
  },
  columnRight: {
    flex: 1,
    marginLeft: 5,
  },
  card: {
    marginBottom: 15,
  },
  center: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
});
