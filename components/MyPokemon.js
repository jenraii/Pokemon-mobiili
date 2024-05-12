import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, remove, ref, onValue } from 'firebase/database';

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


const MyPokemon = ({ navigation }) => {
  const [type, setType] = useState('');
  const [pokemon, setPokemon] = useState('');
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const pokemonRef = ref(database, 'pokemon/');
    onValue(pokemonRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const pokemonList = Object.entries(data).map(([key, value]) => ({ ...value, key }));
        setPokemons(pokemonList);
      } else {
        setPokemons([]);
      }
    });
  }, []);

  const savePokemon = () => {
    if (pokemon && type) {
      const pokemonRef = ref(database, 'pokemon/');
      push(pokemonRef, { pokemon, type });
      setPokemon('');
      setType('');
    }
  };

  const tradePokemon = (pokemonKey) => {
    remove(ref(database, `pokemon/${pokemonKey}`))
      .then(() => {
        const updatedPokemon = pokemons.filter((item) => item.key !== pokemonKey);
        setPokemons(updatedPokemon);
      })
      .catch((error) => {
        console.error('Error trading a pokemon:', error);
      });
  };

const listSeparator = () => <View style={styles.separator} />;

return (
  <View style={styles.container}>
    <Text style={styles.title}>My Pokemon</Text>
    <View style={styles.inputContainer}>
      <TextInput
        placeholder='Pokemon'
        style={styles.input}
        value={pokemon}
        onChangeText={(text) => setPokemon(text)}
      />
      <TextInput
        placeholder='Type'
        style={styles.input}
        value={type}
        onChangeText={(text) => setType(text)}
      />
      <Button color="green" onPress={savePokemon} title="Catch" />
    </View>

    <FlatList
      style={styles.list}
      data={pokemons}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.pokemon}, {item.type}</Text>
          <Button color="red" title="Trade" onPress={() => tradePokemon(item.key)} />
        </View>
      )}
      ItemSeparatorComponent={listSeparator}
    />
    <View style={styles.navigation}>
        <Button
            title="PokeSearch"
            onPress={() => navigation.navigate('PokeSearch')}
        />
        <Button
            title="PokeChat"
            onPress={() => navigation.navigate('PokeChat')}
        />
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'vertical',
    marginBottom: 10,
  },
  input: {

    marginBottom: 10,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  }
});

export default MyPokemon;