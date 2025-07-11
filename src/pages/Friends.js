// FriendsScreen.js
import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, TextInput,
  TouchableOpacity, FlatList, Linking
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // for icons like FaUserCircle
import MainLayout from '../components/MainLayout';


export default function FriendsScreen() {
  const [comment, setComment] = useState('');

  const userData = {
    name: "John Doe",
    grade: "11",
    school: "PE High School",
    profileImage: require('../../assets/student.png'), // local image
  };

  const posts = [
    {
      id: 1,
      user: "Sarah Johnson",
      school: "Riverside High",
      content: "Just finished my science project on renewable energy! 🌞",
      image: require('../../assets/Screenshot 2025-02-05 112724.png'),
      likes: 45,
      comments: [
        { user: "Mike", text: "Amazing work!" },
        { user: "Lisa", text: "Can you share more details?" }
      ]
    },
    {
      id: 2,
      user: "David Smith",
      school: "Central High",
      content: "Check out our robotics team's latest creation!",
    //   video: require('./assets/robot-video.mp4'), // RN doesn't natively support video w/o 3rd-party lib
      likes: 32,
      comments: [
        { user: "John", text: "This is incredible!" }
      ]
    }
  ];

  const jobOpportunities = [
    { company: "Tech Corp", position: "Student Internship", field: "Software Development" },
    { company: "Bio Labs", position: "Research Assistant", field: "Biotechnology" }
  ];

  const interestedStudents = [
    { name: "Emma Wilson", province: "Western Cape", school: "Cape Town High", interest: "Marine Biology" },
    { name: "Thabo Molefe", province: "Gauteng", school: "Pretoria High", interest: "Aerospace Engineering" },
    { name: "Lerato Ndlovu", province: "KwaZulu-Natal", school: "Durban Academy", interest: "Medicine" }
  ];

  const handleComment = (postId) => {
    console.log(`New comment on post ${postId}: ${comment}`);
    setComment('');
  };

  return (
    <MainLayout>
    <ScrollView style={styles.container}>
      {/* Profile Card */}
      <View style={styles.card}>
        <Image source={userData.profileImage} style={styles.profileImage} />
        <Text style={styles.name}>{userData.name}</Text>
        <Text>Grade: {userData.grade}</Text>
        <Text>School: {userData.school}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Job Opportunities */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Company Job Opportunities</Text>
        {jobOpportunities.map((job, idx) => (
          <View key={idx} style={styles.jobItem}>
            <Text style={styles.jobCompany}>{job.company}</Text>
            <Text>{job.position}</Text>
            <Text style={styles.mutedText}>{job.field}</Text>
          </View>
        ))}
      </View>

      {/* Posts Feed */}
      {posts.map(post => (
        <View key={post.id} style={styles.card}>
          <View style={styles.userInfo}>
            <FontAwesome name="user-circle" size={30} style={styles.icon} />
            <View>
              <Text style={styles.name}>{post.user}</Text>
              <Text style={styles.mutedText}>{post.school}</Text>
            </View>
          </View>

          <Text style={styles.postText}>{post.content}</Text>
          {post.image && <Image source={post.image} style={styles.postImage} />}

          {/* Interaction Buttons */}
          <View style={styles.interactionRow}>
            <Text><FontAwesome name="thumbs-up" /> {post.likes} Likes</Text>
            <Text><FontAwesome name="comment" /> Comment</Text>
            <Text><FontAwesome name="share" /> Share</Text>
          </View>

          {/* Comments */}
          {post.comments.map((c, i) => (
            <Text key={i}><Text style={styles.bold}>{c.user}:</Text> {c.text}</Text>
          ))}

          <View style={styles.commentBox}>
            <TextInput
              style={styles.input}
              placeholder="Write a comment..."
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity onPress={() => handleComment(post.id)} style={styles.sendButton}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Science Topics */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Science Topics That Might Interest You</Text>
        <Text>Explore fascinating scientific discoveries and research.</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.sciencedaily.com')}>
          <Text style={styles.link}>Learn More →</Text>
        </TouchableOpacity>
      </View>

      {/* Connect with Other Students */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Connect</Text>
        <Text>Students Also Interested In:</Text>
        {interestedStudents.map((student, idx) => (
          <View key={idx} style={styles.studentItem}>
            <View style={styles.userInfo}>
              <FontAwesome name="user-circle" size={30} style={styles.icon} />
              <View>
                <Text>{student.name}</Text>
                <Text style={styles.mutedText}>{student.interest}</Text>
                <Text style={styles.mutedText}>{student.province}</Text>
                <Text style={styles.mutedText}>{student.school}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
    </MainLayout>
  );
}

// Styling
