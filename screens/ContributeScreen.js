import { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import FormField from '../components/FormField';
import { ui } from '../styles/components';

// Denne formular er til personer, der ALLEREDE har fået job.
// Det er en lokal demo: indholdet bliver ikke sendt eller gemt nogen steder.
// (Jobsøgerens egen profil ligger i JobSeekerProfileScreen.)
//
// Jeg beskriver felterne i en liste i stedet for at skrive hvert TextInput ud,
// så jeg kun behøver én state og én FormField-komponent.
// "scrollY" bruges til de nederste felter, så de ikke gemmer sig bag tastaturet.
const CONTRIBUTE_FIELDS = [
  { key: 'currentRole', label: 'Current role', required: true, placeholder: 'e.g. Junior Financial Analyst' },
  { key: 'field', label: 'Field', placeholder: 'e.g. Finance' },
  { key: 'university', label: 'University', required: true, placeholder: 'e.g. CBS' },
  { key: 'degree', label: 'Degree', required: true, placeholder: 'e.g. MSc Finance' },
  { key: 'nationality', label: 'Nationality', placeholder: 'e.g. German' },
  { key: 'danishLevel', label: 'Danish level', placeholder: 'e.g. A2 or No Danish' },
  {
    key: 'previousExperience',
    label: 'Previous experience',
    multiline: true,
    placeholder: 'What experience did you have before getting the role?',
  },
  { key: 'applications', label: 'Number of applications', keyboardType: 'numeric', placeholder: 'e.g. 32' },
  { key: 'interviews', label: 'Number of interviews', keyboardType: 'numeric', placeholder: 'e.g. 5' },
  { key: 'jobRoute', label: 'How did you get the job?', placeholder: 'e.g. LinkedIn application', scrollY: 350 },
  {
    key: 'advice',
    label: 'Advice for others',
    multiline: true,
    placeholder: 'What would you tell another international student?',
    scrollY: 450,
  },
];

const EMPTY_FORM = Object.fromEntries(CONTRIBUTE_FIELDS.map((field) => [field.key, '']));

export default function ContributeScreen() {
  // Jeg bruger useRef til at få adgang til ScrollView'en,
  // så jeg kan flytte formularen, når de nederste felter får fokus.
  const scrollViewRef = useRef(null);

  // Hele formularen ligger i ét state-objekt, fx { currentRole: '', field: '' }.
  const [form, setForm] = useState(EMPTY_FORM);

  // Beskeden vises i selve skærmen i stedet for med Alert, fordi Alert ikke virker
  // i web-versionen. Det er det samme mønster som på My Profile.
  const [message, setMessage] = useState(null);

  const updateField = (key, value) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  // Jeg bruger en kort timeout, så tastaturet når at åbne først.
  // Ellers kan ScrollView'en beregne positionen før skærmens størrelse ændres.
  const scrollToPosition = (yPosition) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: yPosition, animated: true });
    }, 200);
  };

  const submitCareerCase = () => {
    // Jeg kræver kun de vigtigste felter i denne prototype.
    const isMissingRequired = CONTRIBUTE_FIELDS.some(
      (field) => field.required && form[field.key].trim() === ''
    );

    if (isMissingRequired) {
      setMessage({
        type: 'error',
        text: 'Please fill in your current role, university and degree.',
      });
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });

      return;
    }

    // Formularen er kun en demo. Beskeden siger derfor ærligt, at intet er sendt.
    setMessage({
      type: 'success',
      text: 'Thank you! This is a demo, so your answers were not saved or sent.',
    });

    // Jeg nulstiller formularen og scroller tilbage til toppen, hvor beskeden står.
    setForm(EMPTY_FORM);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <KeyboardAvoidingView
      style={ui.keyboardAvoidingView}
      // På iOS bruger jeg padding, så tastaturet ikke lægger sig oven på formularen.
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // Offset tager højde for headeren øverst i appen.
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        style={ui.screen}
        contentContainerStyle={ui.formContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        {message ? (
          <View
            style={[
              ui.messageBox,
              message.type === 'success' ? ui.messageSuccess : ui.messageError,
            ]}
          >
            <Text style={ui.messageText}>{message.text}</Text>
          </View>
        ) : null}

        <Text style={[ui.bodyText, ui.textSpacing]}>
          Already working in Denmark? This form shows how you could share your
          experience to help other international students.
        </Text>

        <View style={[ui.messageBox, ui.messageInfo]}>
          <Text style={ui.messageText}>
            Demo form: nothing you enter here is saved or sent anywhere.
          </Text>
        </View>

        {CONTRIBUTE_FIELDS.map((field) => (
          <FormField
            key={field.key}
            field={field}
            value={form[field.key]}
            onChange={(value) => updateField(field.key, value)}
            onFocus={field.scrollY ? () => scrollToPosition(field.scrollY) : undefined}
          />
        ))}

        <Pressable
          style={({ pressed }) => [ui.primaryButton, ui.formSubmit, pressed && ui.buttonPressed]}
          onPress={submitCareerCase}
          accessibilityRole="button"
        >
          <Text style={ui.primaryButtonText}>Submit career case</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
