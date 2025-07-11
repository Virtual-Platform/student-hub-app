// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
// import { Button, Card } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import { auth } from '../firebase-config';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase-config';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const studentImage = require('../../assets/student.png');

// export default function Home() {
//   const navigation = useNavigation();
//   const currentUser = auth.currentUser;

//   const [profileData, setProfileData] = useState({
//     name: '',
//     grade: '',
//     school: '',
//   });

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (currentUser) {
//         try {
//           const docRef = doc(db, 'users', currentUser.uid);
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             const data = docSnap.data();
//             setProfileData({
//               name: data.fullName || 'Anonymous User',
//               grade: data.grade || 'N/A',
//               school: data.schoolName || 'N/A',
//             });
//           } else {
//             console.log('No user document found.');
//           }
//         } catch (error) {
//           console.error('Error fetching user profile:', error);
//         }
//       }
//     };

//     fetchUserProfile();
//   }, [currentUser]);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.row}>
//         <View style={styles.column}>
//           <Card style={styles.card}>
//             <Card.Content style={styles.center}>
//               <Image source={studentImage} style={styles.profileImage} />
//               <Text style={styles.name}>{profileData.name}</Text>
//               <Text>Grade: {profileData.grade}</Text>
//               <Text>School: {profileData.school}</Text>
//               <Text>Email: {currentUser?.email}</Text>

//               <Button
//                 mode="outlined"
//                 onPress={() => navigation.navigate('Profile')}
//                 style={styles.button}
//               >
//                 Update Profile
//               </Button>
//             </Card.Content>
//           </Card>

//           <Card style={styles.card}>
//             <Card.Title title="Career Updates" />
//             <Card.Content>
//               <Text>Stay tuned for career-related updates and news here.</Text>
//             </Card.Content>
//           </Card>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     backgroundColor: '#fff',
//     flexGrow: 1,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   column: {
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   card: {
//     marginBottom: 15,
//   },
//   center: {
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   name: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     marginBottom: 5,
//   },
//   button: {
//     marginTop: 10,
//   },
// });
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { auth, db } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Home() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state change
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Fetch Firestore user profile data
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Clean up listener on unmount
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Please log in to view your profile.</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>No profile data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {profile.fullName}!</Text>
      <Text style={styles.info}>Grade: {profile.grade}</Text>
      <Text style={styles.info}>School: {profile.schoolName}</Text>
      <Text style={styles.info}>School Location: {profile.schoolLocation}</Text>
      <Text style={styles.info}>Career Ambition: {profile.careerAmbition}</Text>
      {/* Add more fields as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});
