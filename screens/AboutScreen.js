import { ScrollView, View, Text } from 'react-native';

import { ui } from '../styles/components';
import { screenStyles } from '../styles/screens';

export default function AboutScreen() {
  return (
    <ScrollView style={ui.screen} contentContainerStyle={ui.scrollContent}>
      {/*
        Jeg bruger denne screen til kort at forklare idéen bag Coreliance.
        Den åbnes fra info-ikonet i headeren og er derfor ikke en tab.
      */}
      <Text style={screenStyles.aboutTitle}>
        How Coreliance works
      </Text>

      <Text style={[ui.bodyText, screenStyles.aboutIntro]}>
        Coreliance helps international students and graduates learn how others
        have entered the Danish job market. In this prototype, all career cases
        are fictional demonstration profiles.
      </Text>

      {/* Brugerrejsen vises som en nummereret liste i én hvid blok.
          Trin 2-4 får en tynd linje over sig, så trinene er tydeligt adskilt. */}
      <View style={screenStyles.aboutSteps}>
        {/* Første del af brugerrejsen */}
        <View style={screenStyles.aboutStep}>
          <Text style={screenStyles.aboutStepTitle}>
            1. Explore career cases
          </Text>

          <Text style={screenStyles.aboutStepDescription}>
            Browse 14 fictional career stories showing education, experience,
            applications, interviews and how the job was found.
          </Text>
        </View>

        {/* Anden del af brugerrejsen */}
        <View style={[screenStyles.aboutStep, screenStyles.aboutStepDivider]}>
          <Text style={screenStyles.aboutStepTitle}>
            2. Learn what worked
          </Text>

          <Text style={screenStyles.aboutStepDescription}>
            See what each person's background looked like, what was hard
            and which strategies helped.
          </Text>
        </View>

        {/* Tredje del af brugerrejsen */}
        <View style={[screenStyles.aboutStep, screenStyles.aboutStepDivider]}>
          <Text style={screenStyles.aboutStepTitle}>
            3. Find people like you
          </Text>

          <Text style={screenStyles.aboutStepDescription}>
            Create a short profile in My Profile. With your consent, AI finds
            the fictional career stories most relevant to you.
          </Text>
        </View>

        {/* Fjerde del af brugerrejsen */}
        <View style={[screenStyles.aboutStep, screenStyles.aboutStepDivider]}>
          <Text style={screenStyles.aboutStepTitle}>
            4. Contribute your experience
          </Text>

          <Text style={screenStyles.aboutStepDescription}>
            The Contribute tab shows how employed internationals could share
            their story. In this prototype it is a demo, and nothing is saved or sent.
          </Text>
        </View>
      </View>

      <Text style={ui.caption}>
        Coreliance is an academic demonstration app (CBS INNT). Your profile and
        AI matches are stored only on this device.
      </Text>
    </ScrollView>
  );
}
