import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';

import { getGroupWithEvent } from '../services/nextStepsService';
import { colors } from '../styles/tokens';
import { ui } from '../styles/components';
import { screenStyles } from '../styles/screens';

// Én række med label og værdi, som på detaljesiden. Tomme værdier vises ikke.
function DetailRow({ label, value }) {
  if (!value) {
    return null;
  }

  return (
    <View style={screenStyles.detailRow}>
      <Text style={screenStyles.detailLabel}>{label}</Text>
      <Text style={screenStyles.detailValue}>{value}</Text>
    </View>
  );
}

export default function GroupScreen({ route }) {
  // Gruppens id sendes gennem navigation fra NextSteps-kortet.
  const { groupId } = route.params;

  // status: 'loading' | 'ready' | 'notFound'
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState(null);

  // "Attend (demo)" gemmes ikke nogen steder. Det er kun lokal state,
  // så knappen viser, hvordan funktionen kunne virke i en fuld version.
  const [isAttending, setIsAttending] = useState(false);

  useEffect(() => {
    getGroupWithEvent(groupId)
      .then((result) => {
        setData(result);
        setStatus(result ? 'ready' : 'notFound');
      })
      .catch(() => setStatus('notFound'));
  }, [groupId]);

  if (status === 'loading') {
    return (
      <View style={[ui.screen, ui.centeredState]}>
        <ActivityIndicator size="large" color={colors.navy} />
      </View>
    );
  }

  if (status === 'notFound') {
    return (
      <View style={[ui.screen, ui.centeredState]}>
        <Text style={ui.stateTitle}>Community not found</Text>
        <Text style={ui.stateText}>This community could not be loaded.</Text>
      </View>
    );
  }

  const { group, event } = data;

  return (
    <ScrollView
      style={ui.screen}
      contentContainerStyle={ui.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Tydelig besked om, at alt på siden er fiktivt */}
      <View style={[ui.messageBox, ui.messageInfo]}>
        <Text style={ui.messageText}>
          Simulated community content for this academic demo — not real members or events.
        </Text>
      </View>

      <View style={screenStyles.detailHeader}>
        <Text style={screenStyles.detailTitle}>{group.name}</Text>
        <Text style={screenStyles.detailSubtitle}>{group.purpose}</Text>
        <Text style={screenStyles.detailFictional}>{group.members} members · Simulated</Text>
      </View>

      {/* Gruppens næste event med en demo-knap til tilmelding */}
      {event ? (
        <View style={ui.section}>
          <Text style={ui.sectionTitle}>Upcoming event</Text>
          <Text style={[ui.eventTitle, ui.textSpacing]}>{event.title}</Text>

          <DetailRow label="When" value={event.dateText} />
          <DetailRow label="Format" value={event.format} />
          <DetailRow label="Where" value={[event.venue, event.city].filter(Boolean).join(', ')} />

          <Text style={[ui.bodyText, screenStyles.eventDescription]}>{event.description}</Text>

          {isAttending ? (
            <View style={[ui.messageBox, ui.messageSuccess, screenStyles.rsvpConfirmation]}>
              <Text style={ui.messageText}>You're on the list — demo only</Text>
            </View>
          ) : (
            <Pressable
              style={({ pressed }) => [ui.primaryButton, pressed && ui.buttonPressed]}
              onPress={() => setIsAttending(true)}
              accessibilityRole="button"
            >
              <Text style={ui.primaryButtonText}>Attend (demo)</Text>
            </Pressable>
          )}
        </View>
      ) : null}

      {/* De seneste emner i gruppen. Rækkerne kan ikke trykkes på. */}
      <View style={ui.section}>
        <Text style={ui.sectionTitle}>Recent discussions</Text>

        {group.topics.map((topic, index) => (
          <View
            key={topic}
            style={[screenStyles.topicRow, index === 0 ? screenStyles.topicRowFirst : screenStyles.topicDivider]}
          >
            <Text style={screenStyles.topicText}>{topic}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
