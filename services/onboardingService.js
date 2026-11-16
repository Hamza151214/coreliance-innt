import AsyncStorage from '@react-native-async-storage/async-storage';

// Husker, om brugeren har set velkomstkortet på Explore.
// Kortet vises kun ved første åbning, så det ikke er i vejen bagefter.
// Ligesom de andre services kaster funktionerne en fejl, hvis lageret fejler,
// og skærmen bestemmer selv, hvad der så skal ske.
const INTRO_KEY = 'coreliance:introSeen';

// Returnerer true, hvis velkomstkortet allerede er blevet lukket.
export async function loadIntroSeen() {
  return (await AsyncStorage.getItem(INTRO_KEY)) === 'true';
}

// Gemmer, at brugeren har lukket kortet eller er gået videre til My Profile.
export async function markIntroSeen() {
  await AsyncStorage.setItem(INTRO_KEY, 'true');
}
