import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const logo = require('../../assets/logo.png'); // Ensure the path is correct

const Navigation = () => {
  const navigation = useNavigation();

  const navItems = [
    { label: 'Home', icon: 'home', route: 'Home' },
    { label: 'Help Desk', icon: 'question-circle', route: 'HelpDesk' },
    { label: 'My Friends', icon: 'users', route: 'Friends' },
    { label: 'Career Path', icon: 'road', route: 'CareerPath' },
    { label: 'Notifications', icon: 'bell', route: 'Notifications' },
    { label: 'Messages', icon: 'envelope', route: 'Messages' },
    { label: 'Bursary', icon: 'graduation-cap', route: 'Bursary' },
    { label: 'Institutions', icon: 'university', route: 'Institutions' },
    { label: 'Career Room', icon: 'briefcase', route: 'CareerRoom' },
    { label: 'Profile', icon: 'user', route: 'Profile' },
  ];

  return (
    <View style={styles.navContainer}>
      {/* Logo and Search */}
      <View style={styles.topBar}>
  <Image source={logo} style={styles.logo} />
  <TouchableOpacity
    onPress={() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LandingPage' }],
      });
    }}
    style={styles.logoutButton}
  >
    <Text style={styles.logoutText}>Logout</Text>
    <FontAwesome name="sign-out" size={16} color="#e74c3c" style={{ marginLeft: 5 }} />
  </TouchableOpacity>
</View>
      <View style={styles.searchContrainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#777"
        />
      </View>

      {/* Navigation Links */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navLinks}
      >
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => navigation.navigate(item.route)}
          >
            <FontAwesome name={item.icon} size={18} color="#333" />
            <Text style={styles.navText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  searchContrainer: {
    alignItems: 'flex-end',
    marginTop: 12,
  },
  searchInput: {
     
    flex: 1,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 36,
    color: '#333',
  
  },
  navLinks: {
    paddingLeft: 15,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  navText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  logoutButton: {
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: 10,
  backgroundColor: '#fce4e4',
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 15,
},
logoutText: {
  color: '#e74c3c',
  fontWeight: 'bold',
},

});

export default Navigation;
