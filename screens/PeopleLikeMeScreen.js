import { useCallback, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import CareerCard from '../components/CareerCard';
import NextSteps from '../components/NextSteps';
import { loadProfile, giveAiConsent } from '../services/profileService';
import {
  loadCachedMatches,
  requestMatches,
  getProfileSignature,
  getDemoMatches,
} from '../services/matchingService';
import { colors } from '../styles/tokens';
import { ui } from '../styles/components';

export default function PeopleLikeMeScreen({ navigation }) {
  // status styrer hvad skærmen viser: 'loading' | 'noProfile' | 'ready' | 'error'
  const [status, setStatus] = useState('loading');
  const [profile, setProfile] = useState(null);

  // cache er de gemte AI-matches (eller null). De vises uden et nyt OpenAI-kald.
  const [cache, setCache] = useState(null);
  const [isMatching, setIsMatching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Demo-matches ligger i deres egen state og aldrig i "cache".
  // Så kan de ikke overskrive rigtige AI-matches, og de bliver aldrig gemt.
  const [demoResults, setDemoResults] = useState(null);

  // En ref ændrer sig med det samme, i modsætning til state.
  // Den forhindrer to OpenAI-kald, hvis brugeren trykker hurtigt to gange.
  const isMatchingRef = useRef(false);

  // Henter profil og gemte matches fra AsyncStorage. Her kaldes OpenAI aldrig.
  const loadScreen = useCallback(async () => {
    try {
      const savedProfile = await loadProfile();

      if (!savedProfile) {
        setStatus('noProfile');
        return;
      }

      setProfile(savedProfile);
      setCache(await loadCachedMatches());
      setStatus('ready');
    } catch (error) {
      setStatus('error');
    }
  }, []);

  // Jeg læser data igen, hver gang tabben åbnes, så en redigeret profil
  // med det samme kan markere de gamle matches som forældede.
  useFocusEffect(
    useCallback(() => {
      loadScreen();
    }, [loadScreen])
  );

  // Det eneste sted, hvor OpenAI bliver kaldt, og kun efter et tryk fra brugeren.
  const runMatching = async (profileToMatch) => {
    if (isMatchingRef.current) {
      return;
    }

    isMatchingRef.current = true;
    setIsMatching(true);
    setErrorMessage('');

    try {
      setCache(await requestMatches(profileToMatch));
      // Rigtige matches erstatter eventuelle eksempler på skærmen.
      setDemoResults(null);
    } catch (error) {
      // De gamle matches beholdes, så en fejl ikke sletter gyldige resultater.
      setErrorMessage(error.message);
    } finally {
      isMatchingRef.current = false;
      setIsMatching(false);
    }
  };

  // Bruges kun, når AI-matchingen er fejlet, så en præsentation stadig kan vise funktionen.
  // Eksemplerne er forudskrevne og ikke lavet ud fra brugerens profil.
  const showDemoMatches = async () => {
    try {
      setDemoResults(await getDemoMatches());
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('The example matches could not be loaded.');
    }
  };

  // Knap og forklaring til eksemplerne. Vises sammen med en fejlbesked.
  const demoOffer = (
    <>
      <Pressable
        style={({ pressed }) => [ui.secondaryButton, pressed && ui.buttonPressed]}
        onPress={showDemoMatches}
        accessibilityRole="button"
      >
        <Text style={ui.secondaryButtonText}>Show example matches</Text>
      </Pressable>
      <Text style={ui.stateCaption}>Precomputed examples — not AI and not based on your profile.</Text>
    </>
  );

  const acceptConsent = async () => {
    try {
      const consentedProfile = await giveAiConsent(profile);
      setProfile(consentedProfile);
      await runMatching(consentedProfile);
    } catch (error) {
      setErrorMessage('Your consent could not be saved. Please try again.');
    }
  };

  if (status === 'loading') {
    return (
      <View style={[ui.screen, ui.centeredState]}>
        <ActivityIndicator size="large" color={colors.navy} />
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={[ui.screen, ui.centeredState]}>
        <Text style={ui.stateTitle}>Something went wrong</Text>
        <Text style={ui.stateText}>Your profile or saved matches could not be loaded.</Text>

        <Pressable
          style={({ pressed }) => [ui.primaryButton, pressed && ui.buttonPressed]}
          onPress={loadScreen}
          accessibilityRole="button"
        >
          <Text style={ui.primaryButtonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  // Uden profil leder jeg brugeren videre til My Profile.
  if (status === 'noProfile') {
    return (
      <View style={[ui.screen, ui.centeredState]}>
        <Text style={ui.stateTitle}>Find people like you</Text>
        <Text style={ui.stateText}>
          Answer a few short questions about your background and goals. You can then
          ask the AI to find fictional career stories with a similar path into the
          Danish job market.
        </Text>

        <Pressable
          style={({ pressed }) => [ui.primaryButton, pressed && ui.buttonPressed]}
          onPress={() => navigation.navigate('MyProfile')}
          accessibilityRole="button"
        >
          <Text style={ui.primaryButtonText}>Create my profile</Text>
        </Pressable>
      </View>
    );
  }

  // Eksplicit samtykke, før profilen sendes til OpenAI første gang.
  if (!profile.aiConsentAt) {
    return (
      <View style={[ui.screen, ui.centeredState]}>
        <Text style={ui.stateTitle}>Before we use AI</Text>
        <Text style={ui.stateText}>
          To find people like you, your profile answers are sent to OpenAI through the
          local Coreliance server, together with the fictional career cases. OpenAI uses
          them to suggest matches and explain them. The server does not store your answers.
        </Text>
        <Text style={ui.stateCaption}>
          This is an academic demonstration. AI can make mistakes, and the results say
          nothing about your chances of being hired.
        </Text>

        <Pressable
          style={({ pressed }) => [
            ui.primaryButton,
            pressed && ui.buttonPressed,
            isMatching && ui.buttonDisabled,
          ]}
          onPress={acceptConsent}
          disabled={isMatching}
          accessibilityRole="button"
        >
          <Text style={ui.primaryButtonText}>
            {isMatching ? 'Finding matches…' : 'I agree, find my matches'}
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [ui.secondaryButton, pressed && ui.buttonPressed]}
          onPress={() => navigation.navigate('Explore')}
          accessibilityRole="button"
        >
          <Text style={ui.secondaryButtonText}>Not now</Text>
        </Pressable>

        {errorMessage ? (
          <View style={[ui.messageBox, ui.messageError, ui.stateMessage]}>
            <Text style={ui.messageText}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>
    );
  }

  // Samtykke er givet, men der findes ingen gyldige gemte matches (og ingen eksempler vises).
  if (!cache && !demoResults) {
    return (
      <View style={[ui.screen, ui.centeredState]}>
        <Text style={ui.stateTitle}>Ready to find people like you</Text>
        <Text style={ui.stateText}>
          The AI compares your profile with the fictional career cases. This can take
          up to 30 seconds.
        </Text>

        <Pressable
          style={({ pressed }) => [
            ui.primaryButton,
            pressed && ui.buttonPressed,
            isMatching && ui.buttonDisabled,
          ]}
          onPress={() => runMatching(profile)}
          disabled={isMatching}
          accessibilityRole="button"
        >
          <Text style={ui.primaryButtonText}>
            {isMatching ? 'Finding matches…' : 'Find my matches'}
          </Text>
        </Pressable>

        {errorMessage ? (
          <>
            <View style={[ui.messageBox, ui.messageError, ui.stateMessage]}>
              <Text style={ui.messageText}>{errorMessage}</Text>
            </View>
            {demoOffer}
          </>
        ) : null}
      </View>
    );
  }

  // Skærmen viser enten eksempler eller rigtige AI-matches med samme liste.
  const isDemo = Boolean(demoResults);
  const results = isDemo ? demoResults : cache;

  // Matches er forældede, hvis de profilfelter, AI'en brugte, er ændret siden.
  // Eksempler er ikke lavet ud fra profilen, så de kan ikke blive forældede.
  const isOutdated = !isDemo && cache.profileSignature !== getProfileSignature(profile);

  let refreshLabel = 'Refresh matches';

  if (isMatching) {
    refreshLabel = 'Finding new matches…';
  } else if (isDemo) {
    refreshLabel = 'Try AI matching again';
  } else if (isOutdated) {
    refreshLabel = 'Update matches';
  }

  const openMatch = (match) => {
    navigation.navigate('CareerCase', { careerCase: match.careerCase, match: match, isDemo: isDemo });
  };

  return (
    <FlatList
      style={ui.screen}
      data={results.matches}
      keyExtractor={(item) => item.careerCaseId}
      contentContainerStyle={ui.listContent}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={ui.listHeader}>
          {/* Eksempler markeres tydeligt, så de aldrig ligner rigtige AI-resultater */}
          {isDemo ? (
            <>
              <View style={[ui.messageBox, ui.messageInfo]}>
                <Text style={ui.messageText}>
                  Example matches for demonstration — not AI-generated
                </Text>
              </View>
              <Text style={[ui.caption, ui.textSpacing]}>
                Precomputed examples — not AI and not based on your profile.
              </Text>
            </>
          ) : (
            <>
              <Text style={ui.accentLabel}>AI-powered matching</Text>
              <Text style={[ui.bodyText, ui.textSpacing]}>
                Fictional career stories that may be relevant to your goal: {profile.desiredRoles}.
              </Text>
              <Text style={[ui.caption, ui.textSpacing]}>
                Generated by OpenAI on {new Date(cache.createdAt).toLocaleDateString()}. AI can
                make mistakes, and the results say nothing about your chances of being hired.
              </Text>
            </>
          )}

          {isOutdated ? (
            <View style={[ui.messageBox, ui.messageInfo]}>
              <Text style={ui.messageText}>
                Your profile has changed since these matches were made.
              </Text>
            </View>
          ) : null}

          {errorMessage ? (
            <View style={[ui.messageBox, ui.messageError]}>
              <Text style={ui.messageText}>
                {errorMessage}
                {isDemo ? '' : ' Your previous matches are still shown.'}
              </Text>
            </View>
          ) : null}

          {errorMessage && !isDemo ? demoOffer : null}

          <Pressable
            style={({ pressed }) => [
              isOutdated ? ui.primaryButton : ui.secondaryButton,
              pressed && ui.buttonPressed,
              isMatching && ui.buttonDisabled,
            ]}
            onPress={() => runMatching(profile)}
            disabled={isMatching}
            accessibilityRole="button"
          >
            <Text style={isOutdated ? ui.primaryButtonText : ui.secondaryButtonText}>
              {refreshLabel}
            </Text>
          </Pressable>
        </View>
      }
      ListFooterComponent={
        <NextSteps
          fields={profile.industries}
          city={profile.preferredLocation}
          navigation={navigation}
          origin="matches"
        />
      }
      ListEmptyComponent={
        <View style={ui.section}>
          <Text style={ui.stateTitle}>No similar cases found</Text>
          <Text style={ui.stateText}>
            The AI did not find a career case close to your profile. Try adding more
            detail in My Profile, or browse all career cases.
          </Text>

          <Pressable
            style={({ pressed }) => [ui.primaryButton, pressed && ui.buttonPressed]}
            onPress={() => navigation.navigate('Explore')}
            accessibilityRole="button"
          >
            <Text style={ui.primaryButtonText}>Browse all career cases</Text>
          </Pressable>
        </View>
      }
      renderItem={({ item }) => (
        <CareerCard careerCase={item.careerCase} onPress={() => openMatch(item)}>
          {/* Kort forklaring på kortet. Detaljerne ses på detaljesiden. */}
          <View style={ui.matchBox}>
            <Text style={ui.accentLabel}>{item.relevance}</Text>
            <Text style={ui.matchReason}>{item.summary}</Text>
          </View>
        </CareerCard>
      )}
    />
  );
}
