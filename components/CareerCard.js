import { View, Text, Pressable } from 'react-native';
import FieldTag from './FieldTag';
import { ui } from '../styles/components';

// Samler de felter, der findes, med " · " og springer tomme felter over.
function joinParts(parts) {
  return parts.filter(Boolean).join(' · ');
}

// CareerCard viser én career case som et kort.
// Komponenten modtager:
// - careerCase: objektet med al data om den pågældende case
// - onPress: funktionen der kaldes når man trykker på kortet (åbner detaljesiden)
// - children: valgfrit ekstra indhold, fx forklaringen på et match i People Like Me
// Vi bruger Pressable, så hele kortet fungerer som en knap
export default function CareerCard({ careerCase, onPress, children }) {
  // "No Danish" skal ikke blive til "Danish No Danish".
  const danish =
    careerCase.danishLevel && careerCase.danishLevel !== 'No Danish'
      ? `Danish ${careerCase.danishLevel}`
      : careerCase.danishLevel;

  return (
    <Pressable
      style={({ pressed }) => [ui.card, pressed && ui.cardPressed]}
      onPress={onPress}
      accessibilityRole="button"
    >
      {/* Feltet står øverst med sin egen farve, så listen er let at skimme */}
      <FieldTag field={careerCase.field} />

      {/* Øverste række: jobtitel og et lille badge der viser outcome (fx HIRED) */}
      <View style={ui.cardTopRow}>
        <Text style={ui.cardTitle}>{careerCase.jobTitle}</Text>
        <View style={ui.badge}>
          <Text style={ui.badgeText}>{careerCase.outcome}</Text>
        </View>
      </View>

      {/* Universitet og uddannelse */}
      <Text style={ui.cardSubtitle}>
        {joinParts([careerCase.university, careerCase.degree])}
      </Text>

      {/* Type arbejdsgiver, by og dansk-niveau som én stille meta-linje */}
      <Text style={ui.cardMeta}>
        {joinParts([careerCase.employerType, careerCase.location, danish])}
      </Text>

      {/* Nøgletal om jobsøgningen vises kun, hvis de findes */}
      {careerCase.applications !== null && careerCase.interviews !== null ? (
        <View style={ui.cardFacts}>
          <Text style={ui.cardFact}>
            <Text style={ui.cardFactValue}>{careerCase.applications}</Text> applications
          </Text>
          <Text style={ui.cardFact}>
            <Text style={ui.cardFactValue}>{careerCase.interviews}</Text> interviews
          </Text>
        </View>
      ) : null}

      {children}

      {/* Bunden af kortet: "fiktiv"-noten og en tydelig "View case", der viser at kortet kan trykkes på */}
      <View style={ui.cardFooter}>
        {careerCase.isFictional ? (
          <Text style={ui.fictionalTag}>Fictional demonstration profile</Text>
        ) : null}
        <Text style={ui.viewCase}>View case →</Text>
      </View>
    </Pressable>
  );
}
