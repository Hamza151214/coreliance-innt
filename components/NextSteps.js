import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import { getNextStep } from '../services/nextStepsService';
import { ui } from '../styles/components';

// Indledningen afhænger af, hvor kortet vises:
// under en enkelt historie eller under brugerens egne matches.
const LEADS = {
  case: 'People on a similar path meet here:',
  matches: 'People with goals like yours meet here:',
};

// NextSteps viser ét kort med ét fællesskab og dets næste event.
// Komponenten modtager:
// - fields: de felter, der skal matches på (fx casens felt eller profilens brancher)
// - city: byen, som bruges, hvis intet felt passer
// - navigation: så kortet kan åbne gruppesiden
// - origin: 'case' eller 'matches', som styrer indledningen
// Alt indhold er fiktivt demo-indhold fra data/nextSteps.json.
export default function NextSteps({ fields = [], city = '', navigation, origin = 'case' }) {
  const [nextStep, setNextStep] = useState(null);

  // Jeg laver felterne om til en tekst, så effekten kun kører igen,
  // når indholdet ændrer sig, og ikke hver gang der kommer et nyt array.
  const fieldsKey = (fields || []).join('|');

  useEffect(() => {
    getNextStep({ fields: fieldsKey ? fieldsKey.split('|') : [], city })
      .then(setNextStep)
      .catch(() => setNextStep(null));
  }, [fieldsKey, city]);

  // Uden et match viser jeg ingenting, så skærmen ikke får en tom boks.
  if (!nextStep) {
    return null;
  }

  const { group, event } = nextStep;

  const openGroup = () => {
    navigation.navigate('Group', { groupId: group.id, groupName: group.name });
  };

  return (
    <Pressable
      style={({ pressed }) => [ui.section, pressed && ui.cardPressed]}
      onPress={openGroup}
      accessibilityRole="button"
      accessibilityLabel={`Next step: ${group.name}`}
    >
      <Text style={ui.sectionTitle}>Next step</Text>
      <Text style={ui.nextStepLead}>{LEADS[origin] || LEADS.case}</Text>

      <Text style={ui.nextStepGroupName}>{group.name}</Text>
      <Text style={ui.cardSubtitle} numberOfLines={2}>
        {group.purpose}
      </Text>

      {/* Gruppens næste event som én kort linje under en skillelinje */}
      {event ? (
        <View style={ui.nextStepEvent}>
          <Text style={ui.accentLabel}>Upcoming event</Text>
          <Text style={ui.eventTitle}>{event.title}</Text>
          <Text style={ui.cardMeta}>
            {[event.dateText, event.format, event.city].filter(Boolean).join(' · ')}
          </Text>
        </View>
      ) : null}

      <View style={ui.cardFooter}>
        <Text style={ui.fictionalTag}>{group.members} members · Simulated demo community</Text>
        <Text style={ui.viewCase}>View group →</Text>
      </View>
    </Pressable>
  );
}
