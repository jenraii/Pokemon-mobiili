import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPokemon from './components/MyPokemon';
import PokeChat from './components/PokeChat';
import PokeSearch from './components/PokeSearch';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MyPokemon'>
        <Stack.Screen name="MyPokemon" component={MyPokemon}/>
        <Stack.Screen name="PokeSearch" component={PokeSearch}/>
        <Stack.Screen name="PokeChat" component={PokeChat}/>
      </Stack.Navigator>    
    </NavigationContainer>
  );
}