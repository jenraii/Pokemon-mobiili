import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const PokeSearch = ({ navigation }) => {
  const [keyword, setKeyword] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

 // Etsitään pokemonien tiedot PokeAPI-rajapinnasta hakusanan avulla ja tallennetaan ne komponentin tilaan.
  const searchPokemon = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${keyword.toLowerCase()}`);
      const { name, height, weight, types, sprites } = response.data;
      const pokemonTypes = types.map(type => type.type.name);
      setPokemonData({ name, height, weight, types: pokemonTypes });
      setImageUrl(sprites.front_default);
      setError(null);
    } catch (error) {
      setError('Pokemon not found!');
      setPokemonData(null);
    }
  };

  // Muutetaan pituus metreiksi.
  const convertHeightToMeters = (height) => {
    return (height / 10).toFixed(2); 
  };

  // Muutetaan paino kiloiksi.
  const convertWeightToKilograms = (weight) => {
    return (weight / 10).toFixed(2); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Pokemon Name"
          style={styles.input}
          value={keyword}
          onChangeText={setKeyword}
        />
        <Button title="Search" onPress={searchPokemon} />
      </View>

      {error && <Text>{error}</Text>}
      {pokemonData && (
        <View style={styles.item}>
          <Text style={{ fontSize: 20, fontWeight: "bold", paddingBottom: 20 }}>Name: {pokemonData.name.toUpperCase()}</Text>
          <Text style={{ fontSize: 20, paddingBottom: 20 }}>Height: {convertHeightToMeters(pokemonData.height)} m</Text>
          <Text style={{ fontSize: 20, paddingBottom: 20 }}>Weight: {convertWeightToKilograms(pokemonData.weight)} kg</Text>
          <Text style={{ fontSize: 20, paddingBottom: 20 }}>Types: {pokemonData.types.join(', ')}</Text>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: imageUrl }}
          />
        </View>
      )}
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
    marginTop: 20,
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

  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  navigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  }
});

export default PokeSearch;





