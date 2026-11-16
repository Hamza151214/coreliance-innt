import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';

import CareerCard from '../components/CareerCard';
import { getCareerCases } from '../services/careerCaseService';
import { loadIntroSeen, markIntroSeen } from '../services/onboardingService';
import { ui } from '../styles/components';
import { screenStyles } from '../styles/screens';

export default function ExploreScreen({ navigation }) {
  // Jeg henter career cases gennem careerCaseService,
  // så skærmen ikke selv ved, hvor data kommer fra.
  const [careerCases, setCareerCases] = useState([]);
  const [loadFailed, setLoadFailed] = useState(false);

  // Jeg bruger state til at huske hvilket filter brugeren har valgt.
  // Appen starter med "All", så alle career cases bliver vist.
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Velkomstkortet vises kun første gang. Det starter skjult, så det ikke
  // blinker frem og forsvinder igen for brugere, der allerede har set det.
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    getCareerCases()
      .then(setCareerCases)
      .catch(() => setLoadFailed(true));

    // Hvis lageret fejler, viser jeg bare ikke kortet. Det er ikke vigtigt nok til en fejlbesked.
    loadIntroSeen()
      .then((seen) => setShowIntro(!seen))
      .catch(() => setShowIntro(false));
  }, []);

  // Kortet lukkes med det samme. Hvis det ikke kan gemmes, vises det bare igen næste gang.
  const closeIntro = () => {
    setShowIntro(false);
    markIntroSeen().catch(() => {});
  };

  const createProfile = () => {
    closeIntro();
    navigation.navigate('MyProfile');
  };

  // Filtrene bygges ud fra de felter, der findes i data,
  // så jeg ikke skal vedligeholde en separat liste.
  const filters = ['All', ...new Set(careerCases.map((careerCase) => careerCase.field).filter(Boolean))];

  // Hvis brugeren vælger "All", bruger jeg hele datasættet.
  // Ellers filtrerer jeg efter careerCase.field.
  const filteredCases =
    selectedFilter === 'All'
      ? careerCases
      : careerCases.filter((careerCase) => careerCase.field === selectedFilter);

  // Når jeg trykker på et CareerCard, sender jeg hele den valgte case
  // videre til detaljesiden gennem navigation.
  const openCareerCase = (careerCase) => {
    navigation.navigate('CareerCase', { careerCase: careerCase });
  };

  // Denne funktion bestemmer hvordan én filterknap bliver vist.
  // Jeg bruger en FlatList til filtrene, så rækken får en fast højde
  // og ikke kan vokse mærkeligt, når en knap bliver aktiv.
  const renderFilter = ({ item }) => {
    const isActive = selectedFilter === item;

    return (
      <Pressable
        style={[ui.pill, isActive && ui.pillActive]}
        onPress={() => setSelectedFilter(item)}
        accessibilityRole="button"
        accessibilityState={{ selected: isActive }}
      >
        <Text numberOfLines={1} style={[ui.pillText, isActive && ui.pillTextActive]}>
          {item}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={ui.screen}>
      {/* Jeg bruger en separat horizontal FlatList til filtrene. */}
      <FlatList
        data={filters}
        horizontal
        keyExtractor={(item) => item}
        renderItem={renderFilter}
        showsHorizontalScrollIndicator={false}
        style={screenStyles.filterList}
        contentContainerStyle={screenStyles.filterListContent}
      />

      {/* Appens hovedliste med de career cases, der passer til det valgte filter. */}
      <FlatList
        data={filteredCases}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={ui.listContent}
        ListHeaderComponent={
          <>
            {/* Kort velkomst ved første åbning: hvad appen kan, og én tydelig næste handling */}
            {showIntro ? (
              <View style={ui.section}>
                <Text style={screenStyles.introTitle}>Welcome to Coreliance</Text>
                <Text style={ui.bodyText}>
                  See how other internationals found jobs in Denmark — then let AI find the
                  stories most relevant to you.
                </Text>

                <Pressable
                  style={({ pressed }) => [ui.primaryButton, pressed && ui.buttonPressed]}
                  onPress={createProfile}
                  accessibilityRole="button"
                >
                  <Text style={ui.primaryButtonText}>Create my profile</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [screenStyles.textButton, pressed && ui.buttonPressed]}
                  onPress={closeIntro}
                  accessibilityRole="button"
                >
                  <Text style={screenStyles.textButtonText}>Browse first</Text>
                </Pressable>
              </View>
            ) : null}

            <Text style={[ui.caption, screenStyles.exploreNote, loadFailed && ui.errorText]}>
              {loadFailed
                ? 'Career cases could not be loaded.'
                : 'All career cases are fictional demonstration profiles made for this academic prototype.'}
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <CareerCard careerCase={item} onPress={() => openCareerCase(item)} />
        )}
      />
    </View>
  );
}
