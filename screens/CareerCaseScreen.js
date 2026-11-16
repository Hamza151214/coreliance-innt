import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

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

  return (
    <ScrollView
      style={ui.screen}
      contentContainerStyle={ui.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Overordnet information om jobbet */}
      <View style={screenStyles.detailHeader}>
        <Text style={screenStyles.detailTitle}>{careerCase.jobTitle}</Text>

        <Text style={screenStyles.detailSubtitle}>
          {[careerCase.employerType, careerCase.location, careerCase.field].filter(Boolean).join(' · ')}
        </Text>

        {careerCase.isFictional ? (
          <Text style={screenStyles.detailFictional}>
            Fictional demonstration profile, not a real person.
          </Text>
        ) : null}
      </View>

      {/* Forklaring på matchet – kun når casen er åbnet fra People Like Me */}
      {match ? (
        <View style={[ui.section, screenStyles.matchSection]}>
          <Text style={[ui.accentLabel, screenStyles.matchLabel]}>
            {isDemo ? 'Example match, not AI-generated' : 'AI-powered matching'} · {match.relevance}
          </Text>
          <Text style={ui.sectionTitle}>Why this case was suggested</Text>

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

      {/* Personens baggrund på det tidspunkt jobbet blev søgt */}
      <View style={ui.section}>
        <Text style={ui.sectionTitle}>Background</Text>
        <DetailRow label="University" value={careerCase.university} />
        <DetailRow label="Degree" value={careerCase.degree} />
        <DetailRow label="Danish level" value={careerCase.danishLevel} />
      </View>

      {/* Personens egen fortælling */}
      {careerCase.story ? (
        <View style={ui.section}>
          <Text style={ui.sectionTitle}>Their story</Text>
          <Text style={ui.bodyText}>{careerCase.story}</Text>
        </View>
      ) : null}

      {/* Tidligere erfaring før jobbet */}
      <View style={ui.section}>
        <Text style={ui.sectionTitle}>At the time of application</Text>
        <BulletList items={careerCase.previousExperience} />

        {careerCase.skills.length > 0 ? (
          <>
            <Text style={ui.subsectionTitle}>Skills</Text>
            <BulletList items={careerCase.skills} />
          </>
        ) : null}
      </View>

      {/* Nøgletal for jobsøgningen */}
      <View style={ui.section}>
        <Text style={ui.sectionTitle}>Job Search</Text>
        <DetailRow label="Applications" value={careerCase.applications} />
        <DetailRow label="Interviews" value={careerCase.interviews} />
        <DetailRow label="Offers" value={careerCase.offers} />
        <DetailRow label="Months searching" value={careerCase.monthsSearching} />

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

      {/* Resultatet af jobsøgningen */}
      <View style={ui.section}>
        <Text style={ui.sectionTitle}>Outcome</Text>
        <DetailRow label="Result" value={careerCase.outcome} />
        <DetailRow label="Role" value={careerCase.jobTitle} />
        <DetailRow label="How they got it" value={careerCase.jobRoute} />
        <DetailRow label="Referral" value={referral} />
      </View>

      {/* Personens eget råd til andre internationale */}
      {careerCase.advice ? (
        <View style={ui.section}>
          <Text style={ui.sectionTitle}>Advice</Text>
          <View style={screenStyles.adviceBlock}>
            <Text style={screenStyles.adviceQuote}>“{careerCase.advice}”</Text>
          </View>
        </View>
      ) : null}

      {/* Et konkret næste skridt: et (fiktivt) fællesskab for samme felt eller by */}
      <NextSteps
        fields={[careerCase.field]}
        city={careerCase.location}
        navigation={navigation}
        origin="case"
      />

      {/* CV-knappen er kun en placeholder i prototypen */}
      <View style={ui.section}>
        <Text style={ui.sectionTitle}>CV Snapshot</Text>

        <Text style={ui.bodyText}>
          In a full version, you could see an anonymised CV used for this application.
        </Text>

        <Pressable
          style={({ pressed }) => [ui.secondaryButton, pressed && ui.buttonPressed]}
          onPress={() => setShowCvNote(true)}
          accessibilityRole="button"
        >
          <Text style={ui.secondaryButtonText}>View CV</Text>
        </Pressable>

        {showCvNote ? (
          <View style={[ui.messageBox, ui.messageInfo, screenStyles.cvNote]}>
            <Text style={ui.messageText}>CV snapshots are not part of this prototype.</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}
