## Pokemon Mobiilisovellus
Tämä mobiilisovellus hyödyntää useita teknologioita ja kirjastoja. Alla on lueteltu käytetyt teknologiat ja niiden roolit sovelluksessa:

## React Native

### React: 
Kirjasto, joka mahdollistaa komponenttipohjaisen kehittämisen. Sovellus käyttää Reactia käyttöliittymän rakentamiseen.
### React Native: 
Alusta, joka mahdollistaa mobiilisovellusten kehittämisen JavaScriptillä ja Reactilla. Se mahdollistaa sovelluksen ajamisen sekä iOS- että Android-laitteilla.
### Linking API: 
React Nativessa on Linking-API, jota käytetään avamaan ulkoisia linkkejä. Tässä projektissa sitä käytetään avamaan puhelimen oletusviestisovellus valmiiksi täytetyllä viestillä.

## State Management

### useState: 
Reactin hook, joka hallitsee komponenttien tilaa.
### useEffect: 
Reactin hook, joka hallitsee sivuvaikutuksia, kuten tietojen hakemista ja tilausten hallintaa.

## React Native -komponentit

### View: 
Layout-komponentti, joka toimii konttina muille komponenteille.
### Text: 
Tekstikomponentti, joka näyttää tekstiä käyttöliittymässä.
### TextInput: 
Syötekenttäkomponentti, joka mahdollistaa käyttäjän tekstisyötteen.
### Button: 
Painikekomponentti, joka mahdollistaa käyttäjän toiminnan.
### FlatList: 
Komponentti, joka näyttää listan tietoja tehokkaasti.
### Image: 
Komponentti, joka näyttää kuvia käyttöliittymässä.

## StyleSheet
React Nativessa käytettävä tyylitiedosto, joka määrittelee komponenttien ulkoasun.

## Axios
HTTP-kirjasto, jota käytetään tietojen hakemiseen PokeAPI-rajapinnasta.

## Firebase

### Firebase Realtime Database: 
Palvelu, jota käytetään sovelluksen tietojen tallentamiseen ja hakemiseen reaaliaikaisesti.
### Firebase Configuration: 
Firebase-projektin konfiguraatio, joka mahdollistaa yhteyden Firebase-palveluun.
### Firebase Functions: 
getDatabase, push, ref, remove, onValue, onChildAdded; funktiot, joita käytetään tietokannan kanssa työskentelyyn.

## Expo SMS
Kirjasto, joka mahdollistaa tekstiviestien lähettämisen laitteelta.
### SMS.isAvailableAsync(): 
Tarkistaa, onko laitteella tekstiviestipalvelu käytettävissä.
### SMS.sendSMSAsync(): 
Lähettää tekstiviestin.

## React Navigation
Kirjasto, joka mahdollistaa navigoinnin sovelluksen eri näkymien välillä.

Yhteenvetona tämä React Native -projekti hyödyntää monia erilaisia teknologioita, jotka yhdessä mahdollistavat pokemon-tietojen hakemisen PokeAPI:sta, tallentamisen Firebase-tietokantaan ja käyttäjän hallinnan sovelluksen sisällä.
