import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

import FieldTag from '../components/FieldTag';
import NextSteps from '../components/NextSteps';
import { ui } from '../styles/components';
import { screenStyles } from '../styles/screens';

// Én række med label og værdi. Hvis værdien mangler, vises rækken ikke,
// så ufuldstændige cases ikke viser tomme felter.
function DetailRow({ label, value }) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return (
    <View style={screenStyles.detailRow}>
      <Text style={screenStyles.detailLabel}>{label}</Text>
      <Text style={screenStyles.detailValue}>{value}</Text>
    </View>
  );
}

// En simpel punktliste, som bruges til erfaring, skills og match-forklaringer.
function BulletList({ items }) {
  return items.map((item, index) => (
    <Text key={index} style={screenStyles.bulletItem}>
      • {item}
    </Text>
  ));
}

export default function CareerCaseScreen({ route, navigation }) {
  // Den valgte career case bliver sendt gennem navigation.
  // Hvis brugeren kommer fra People Like Me, sendes "match" også med,
  // så jeg kan vise hvorfor casen blev foreslået.
  // isDemo er true, når matchet er et forudskrevet eksempel og ikke lavet af AI'en.
  const { careerCase, match, isDemo } = route.params;

  // Prototypen har ingen CV-filer. Knappen viser derfor kun en forklaring.
  // Forklaringen står i skærmen i stedet for i en Alert, fordi Alert ikke virker på web.
  const [showCvNote, setShowCvNote] = useState(false);

  const referral = careerCase.referral === null ? null : careerCase.referral ? 'Yes' : 'No';

  // Nøgletallene vises som tre små felter øverst, så de kan læses med ét blik.
  // Tal, der mangler, springes over.
  const stats = [
    { label: 'Applications', value: careerCase.applications },
    { label: 'Interviews', value: careerCase.interviews },
    { label: 'Months searching', value: careerCase.monthsSearching },
  ].filter((stat) => stat.value !== null && stat.value !== undefined);

  return (
    <ScrollView
      style={ui.screen}
      contentContainerStyle={ui.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Overordnet information om jobbet */}
      <View style={screenStyles.detailHeader}>
        <FieldTag field={careerCase.field} />
        <Text style={screenStyles.detailTitle}>{careerCase.jobTitle}</Text>

        <Text style={screenStyles.detailSubtitle}>
          {[careerCase.employerType, careerCase.location].filter(Boolean).join(' · ')}
        </Text>

        {careerCase.isFictional ? (
          <Text style={screenStyles.detailFictional}>
            Fictional demonstration profile, not a real person.
          </Text>
        ) : null}
      </View>

      {/* Jobsøgningen i tal */}
      {stats.length > 0 ? (
        <View style={screenStyles.statRow}>
          {stats.map((stat) => (
            <View key={stat.label} style={screenStyles.statTile}>
              <Text style={screenStyles.statValue}>{stat.value}</Text>
              <Text style={screenStyles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {/* Forklaring på matchet – kun når casen er åbnet fra People Like Me. Blå = AI-matching. */}
      {match ? (
        <View style={[ui.section, ui.sectionMatch]}>
          <Text style={[ui.accentLabel, screenStyles.matchLabel]}>
            {isDemo ? 'Example match, not AI-generated' : 'AI-powered matching'} · {match.relevance}
          </Text>
          <Text style={screenStyles.blockTitle}>Why this case was suggested</Text>

          {match.summary ? <Text style={[ui.bodyText, ui.textSpacing]}>{match.summary}</Text> : null}
          <BulletList items={match.similarities} />

          {match.differences.length > 0 ? (
            <>
              <Text style={ui.subsectionTitle}>Differences to keep in mind</Text>
              <BulletList items={match.differences} />
            </>
          ) : null}

          {match.lessons.length > 0 ? (
            <>
              <Text style={ui.subsectionTitle}>What you could learn</Text>
              <BulletList items={match.lessons} />
            </>
          ) : null}
        </View>
      ) : null}

      {/* Personens eget råd står højt oppe, fordi det er det mest brugbare. Sand = råd. */}
      {careerCase.advice ? (
        <View style={[ui.section, ui.sectionAdvice]}>
          <Text style={[ui.sectionTitle, screenStyles.adviceKicker]}>Their advice</Text>
          <Text style={screenStyles.adviceQuote}>“{careerCase.advice}”</Text>
        </View>
      ) : null}

      {/* Personens fortælling: hvad var svært, og hvad virkede */}
      {careerCase.story || careerCase.challenges || careerCase.strategy ? (
        <View style={ui.section}>
          <Text style={screenStyles.blockTitle}>Their journey</Text>
          {careerCase.story ? <Text style={ui.bodyText}>{careerCase.story}</Text> : null}

          {careerCase.challenges ? (
            <>
              <Text style={ui.subsectionTitle}>Biggest challenges</Text>
              <Text style={ui.bodyText}>{careerCase.challenges}</Text>
            </>
          ) : null}

          {careerCase.strategy ? (
            <>
              <Text style={ui.subsectionTitle}>What worked</Text>
              <Text style={ui.bodyText}>{careerCase.strategy}</Text>
            </>
          ) : null}
        </View>
      ) : null}

      {/* Baggrund og resultat samlet i én kasse i stedet for fire små */}
      <View style={ui.section}>
        <Text style={screenStyles.blockTitle}>Profile</Text>
        <DetailRow label="University" value={careerCase.university} />
        <DetailRow label="Degree" value={careerCase.degree} />
        <DetailRow label="Danish level" value={careerCase.danishLevel} />
        <DetailRow label="Result" value={careerCase.outcome} />
        <DetailRow label="How they got it" value={careerCase.jobRoute} />
        <DetailRow label="Referral" value={referral} />
        <DetailRow label="Offers" value={careerCase.offers} />

        {careerCase.previousExperience.length > 0 ? (
          <>
            <Text style={ui.subsectionTitle}>Experience at the time</Text>
            <BulletList items={careerCase.previousExperience} />
          </>
        ) : null}

        {careerCase.skills.length > 0 ? (
          <>
            <Text style={ui.subsectionTitle}>Skills</Text>
            <Text style={ui.bodyText}>{careerCase.skills.join(', ')}</Text>
          </>
        ) : null}

        {/* CV-knappen er kun en placeholder i prototypen, så den er en stille tekstknap */}
        <Pressable
          style={({ pressed }) => [screenStyles.cvLink, pressed && ui.buttonPressed]}
          onPress={() => setShowCvNote(true)}
          accessibilityRole="button"
        >
          <Text style={ui.viewCase}>View anonymised CV</Text>
        </Pressable>

        {showCvNote ? (
          <View style={[ui.messageBox, ui.messageInfo, screenStyles.cvNote]}>
            <Text style={ui.messageText}>CV snapshots are not part of this prototype.</Text>
          </View>
        ) : null}
      </View>

      {/* Et konkret næste skridt: et (fiktivt) fællesskab for samme felt eller by. Grøn = fællesskab. */}
      <NextSteps
        fields={[careerCase.field]}
        city={careerCase.location}
        navigation={navigation}
        origin="case"
      />
    </ScrollView>
  );
}
