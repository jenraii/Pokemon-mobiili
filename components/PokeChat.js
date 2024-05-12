import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Linking } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onChildAdded } from 'firebase/database';
import * as SMS from 'expo-sms';

const firebaseConfig = {
    apiKey: "AIzaSyCYkNraCBVHEWcP8oqRUm27qH2BFr8pEfw",
    authDomain: "pokemon-95e84.firebaseapp.com",
    databaseURL: "https://pokemon-95e84-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pokemon-95e84",
    storageBucket: "pokemon-95e84.appspot.com",
    messagingSenderId: "505106277057",
    appId: "1:505106277057:web:e1238d7321436d4088ea40"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const PokeChat = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatRef = ref(database, 'chat');
    onChildAdded(chatRef, (snapshot) => {
      const newMessage = snapshot.val();
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });
  }, []);

  const sendMessage = async () => {
    if (message.trim() !== '') {
      const chatRef = ref(database, 'chat');
      push(chatRef, {
        text: message,
        timestamp: Date.now()
      });
      setMessage('');

      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        await SMS.sendSMSAsync([], message);
      } else {
        Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PokeChat</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.timestamp.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  messageContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default PokeChat;
