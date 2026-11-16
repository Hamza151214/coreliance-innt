import { StyleSheet } from 'react-native';

import { colors, spacing, typography, radius, hairline, touchTarget, shadow } from './tokens';

// Fælles visuelle byggeklodser, som flere skærme og komponenter bruger:
// knapper, kort, sektioner, formularfelter, beskeder og tomme tilstande.
// Jeg kalder objektet "ui", så man i koden kan se, at det er en delt style.
export const ui = StyleSheet.create({
  // FÆLLES CONTAINERE
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // KeyboardAvoidingView skal fylde hele skærmen.
  // Ellers kan ScrollView'en ikke beregne den ledige plads korrekt.
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Indhold i en ScrollView med samme luft i siderne som listerne.
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  // NAVIGATION (AppNavigator)
  // Header og tab-bar styles ligger her, så navigationen ikke har sin egen styling.
  header: {
    backgroundColor: colors.navy,
  },
  headerTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
  },
  // Info-knappen får en trykflade på mindst 44 x 44 punkter.
  headerIconButton: {
    minWidth: touchTarget,
    minHeight: touchTarget,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Jeg sætter ikke en fast højde, så tab-baren selv tager højde for
  // hjem-indikatoren nederst på nyere iPhones.
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: hairline,
    borderTopColor: colors.border,
    elevation: 0,
  },
  tabBarLabel: {
    fontSize: typography.size.xxs,
    fontWeight: typography.weight.medium,
  },

  // LISTER (Explore og People Like Me)
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  listHeader: {
    marginBottom: spacing.lg,
  },

  // TEKST
  // Almindelig brødtekst, fx introduktioner og fortællinger.
  bodyText: {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    color: colors.textSecondary,
  },
  // Små grå noter, fx at data er demo og at profilen kun er gemt lokalt.
  caption: {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    color: colors.textMuted,
  },
  // Lille overskrift i accentfarven, fx "AI-powered matching".
  accentLabel: {
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontWeight: typography.weight.semibold,
    color: colors.accent,
    letterSpacing: 0.3,
    marginBottom: spacing.xs,
  },
  // Afstand under en tekst, når der følger mere indhold.
  textSpacing: {
    marginBottom: spacing.md,
  },

  // SEKTIONER
  // En hvid blok med tynd kant. Bruges på detaljesiden, i My Profile
  // og til tomme tilstande, så alle "kasser" i appen ligner hinanden.
  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: hairline,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  // Lille overskrift med store bogstaver øverst i en sektion.
  sectionTitle: {
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontWeight: typography.weight.semibold,
    color: colors.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  subsectionTitle: {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  // CAREER CARD
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: hairline,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  // Kortet bliver en anelse mørkere, mens man trykker på det.
  cardPressed: {
    backgroundColor: colors.background,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  cardTitle: {
    flex: 1,
    marginRight: spacing.sm,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.lg,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: typography.size.base,
    lineHeight: typography.lineHeight.base,
    color: colors.textSecondary,
  },
  cardMeta: {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  // Nøgletal står i én stille række under en tynd skillelinje.
  cardFacts: {
    flexDirection: 'row',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: hairline,
    borderTopColor: colors.border,
  },
  cardFact: {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    color: colors.textMuted,
    marginRight: spacing.lg,
  },
  cardFactValue: {
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  // Nederst: "fiktiv"-noten til venstre og "View case" til højre.
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  fictionalTag: {
    flex: 1,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    color: colors.textMuted,
  },
  viewCase: {
    marginLeft: 'auto',
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.weight.semibold,
    color: colors.accent,
  },

  // Forklaringen på et match, som vises inde i CareerCard (People Like Me)
  matchBox: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: hairline,
    borderTopColor: colors.border,
  },
  matchReason: {
    fontSize: typography.size.base,
    lineHeight: typography.lineHeight.base,
    color: colors.textSecondary,
  },

  // BADGE
  // Et lille, roligt mærke til fx "HIRED".
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    backgroundColor: colors.successBg,
  },
  badgeText: {
    fontSize: typography.size.xxs,
    lineHeight: typography.lineHeight.xs,
    fontWeight: typography.weight.semibold,
    color: colors.successText,
    letterSpacing: 0.4,
  },

  // KNAPPER
  // Én fælles primær og én sekundær knap bruges i hele appen,
  // i stedet for flere næsten ens styles.
  primaryButton: {
    minHeight: 48,
    backgroundColor: colors.navy,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
  secondaryButton: {
    minHeight: touchTarget,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  secondaryButtonText: {
    color: colors.navy,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
  // Knapper bliver lidt gennemsigtige, mens man trykker,
  // og når de er slået fra (fx mens AI'en arbejder).
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    opacity: 0.6,
  },

  // FILTER- OG VALGKNAPPER (pills)
  // Bruges både til filtrene på Explore og valgknapperne i formularerne.
  // Knappen har en fast højde, så den ikke kan vokse, når den bliver aktiv.
  pill: {
    height: 36,
    paddingHorizontal: 14,
    marginRight: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Når en pill er aktiv, ændrer jeg KUN farverne, ikke størrelsen.
  pillActive: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  pillText: {
    fontSize: typography.size.base,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.weight.medium,
    color: colors.textSecondary,
  },
  pillTextActive: {
    color: colors.white,
  },

  // FORMULARER (My Profile og Contribute)
  // Lidt ekstra plads nederst, så det sidste felt kan scrolles op over tastaturet.
  formContainer: {
    padding: spacing.lg,
    paddingBottom: 120,
  },
  // Indsend-knappen nederst i en formular får lidt mere luft over sig.
  formSubmit: {
    marginTop: spacing.xl,
  },
  formSectionTitle: {
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontWeight: typography.weight.semibold,
    color: colors.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: spacing.xl,
    paddingBottom: spacing.sm,
    borderBottomWidth: hairline,
    borderBottomColor: colors.border,
  },
  inputLabel: {
    fontSize: typography.size.base,
    lineHeight: typography.lineHeight.base,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
    marginTop: spacing.lg + spacing.xs,
    marginBottom: spacing.xs,
  },
  inputHint: {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  textInput: {
    minHeight: touchTarget + 4,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: typography.size.md,
    color: colors.textPrimary,
  },
  textInputMultiline: {
    minHeight: 104,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.errorText,
  },
  errorText: {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    color: colors.errorText,
    marginTop: spacing.xs,
  },
  // Valgknapper må gerne bryde over flere linjer.
  choiceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  choiceButton: {
    marginBottom: spacing.sm,
  },

  // BESKEDER (fx "Profile saved", valideringsfejl eller forældede matches)
  // Alle beskeder har samme form: en lys farvet baggrund med en tynd kant.
  messageBox: {
    borderRadius: radius.md,
    borderWidth: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  messageSuccess: {
    backgroundColor: colors.successBg,
    borderColor: colors.successBorder,
  },
  messageError: {
    backgroundColor: colors.errorBg,
    borderColor: colors.errorBorder,
  },
  messageInfo: {
    backgroundColor: colors.infoBg,
    borderColor: colors.infoBorder,
  },
  messageText: {
    fontSize: typography.size.base,
    lineHeight: typography.lineHeight.base,
    color: colors.textPrimary,
  },

  // TILSTANDE (indlæsning, ingen profil, samtykke, fejl)
  // Indholdet står centreret midt på skærmen: titel, forklaring og én handling.
  centeredState: {
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  stateTitle: {
    fontSize: typography.size.xl,
    lineHeight: typography.lineHeight.xl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  stateText: {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  // En fejlbesked under knapperne i en tilstand får lidt luft over sig.
  stateMessage: {
    marginTop: spacing.lg,
    marginBottom: 0,
  },
  stateCaption: {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
