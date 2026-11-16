import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CareerCard from '../components/CareerCard';
import { getCareerCases } from '../services/careerCaseService';
import { loadIntroSeen, markIntroSeen } from '../services/onboardingService';
import { colors, getFieldColor } from '../styles/tokens';
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

  // Filterlisten er foldet sammen som standard, så skærmen ikke starter
  // med en lang række knapper. Brugeren åbner den med "Field"-knappen.
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  // Antal cases i hvert felt, som vises ved siden af feltets navn i filterlisten.
  const countFor = (filter) =>
    filter === 'All'
      ? careerCases.length
      : careerCases.filter((careerCase) => careerCase.field === filter).length;

  // Når brugeren vælger et felt, lukker jeg listen igen.
  const chooseFilter = (filter) => {
    setSelectedFilter(filter);
    setFiltersOpen(false);
  };

  return (
    <View style={ui.screen}>
      {/* Én knap viser det valgte felt. Et tryk folder listen med alle felter ud. */}
      <Pressable
        style={screenStyles.filterBar}
        onPress={() => setFiltersOpen(!filtersOpen)}
        accessibilityRole="button"
        accessibilityState={{ expanded: filtersOpen }}
      >
        <Text style={screenStyles.filterBarLabel}>Field</Text>
        <Text style={screenStyles.filterBarValue} numberOfLines={1}>
          {selectedFilter === 'All' ? 'All fields' : selectedFilter} ({filteredCases.length})
        </Text>
        <Ionicons name={filtersOpen ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textMuted} />
      </Pressable>

      {filtersOpen ? (
        <View style={screenStyles.filterPanel}>
          {filters.map((filter) => {
            const isActive = selectedFilter === filter;

            return (
              <Pressable
                key={filter}
                style={({ pressed }) => [
                  screenStyles.filterOption,
                  (isActive || pressed) && screenStyles.filterOptionActive,
                ]}
                onPress={() => chooseFilter(filter)}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                {/* "All" har ingen farve. De andre felter har deres egen prik. */}
                <View
                  style={[
                    ui.fieldDot,
                    { backgroundColor: filter === 'All' ? colors.borderStrong : getFieldColor(filter) },
                  ]}
                />
                <Text style={[screenStyles.filterOptionText, isActive && screenStyles.filterOptionTextActive]}>
                  {filter === 'All' ? 'All fields' : filter}
                </Text>
                <Text style={screenStyles.filterOptionCount}>{countFor(filter)}</Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}

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
              <View style={[ui.section, ui.sectionMatch]}>
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
