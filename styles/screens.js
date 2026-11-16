import { StyleSheet } from 'react-native';

import { colors, spacing, typography, radius, hairline, shadow } from './tokens';

// Styles, som kun én skærm bruger. Alt det fælles ligger i components.js.
export const screenStyles = StyleSheet.create({
  // EXPLORE: filterrækken øverst
  // Jeg giver hele filterområdet en fast højde,
  // så filterknapperne ikke pludselig kan vokse vertikalt.
  filterList: {
    flexGrow: 0,
    height: 60,
    backgroundColor: colors.surface,
    borderBottomWidth: hairline,
    borderBottomColor: colors.border,
  },
  // alignItems sørger for at alle filterknapper ligger centreret vertikalt.
  filterListContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  // Noten over listen står som en stille billedtekst.
  exploreNote: {
    marginBottom: spacing.lg,
  },

  // CAREER CASE (detaljesiden)
  detailHeader: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  detailTitle: {
    fontSize: typography.size.xxl,
    lineHeight: typography.lineHeight.xxl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  detailSubtitle: {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    color: colors.textSecondary,
  },
  detailFictional: {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  // AI-forklaringen skiller sig roligt ud med en blå kant i venstre side.
  matchSection: {
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  // Label til venstre og værdi til højre.
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  detailLabel: {
    width: 130,
    fontSize: typography.size.base,
    lineHeight: typography.lineHeight.base,
    color: colors.textMuted,
  },
  detailValue: {
    flex: 1,
    fontSize: typography.size.base,
    lineHeight: typography.lineHeight.base,
    fontWeight: typography.weight.medium,
    color: colors.textPrimary,
  },
  bulletItem: {
    fontSize: typography.size.base,
    lineHeight: typography.lineHeight.base,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  // Rådet vises som et citat med en navy streg i venstre side.
  adviceBlock: {
    borderLeftWidth: 2,
    borderLeftColor: colors.navy,
    paddingLeft: spacing.md,
  },
  adviceQuote: {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md + 2,
    fontStyle: 'italic',
    color: colors.textPrimary,
  },

  // MY PROFILE
  profileNote: {
    marginBottom: spacing.lg,
  },
  requiredNote: {
    marginTop: spacing.xl,
  },
  // Overskriften står tættere på første svar, fordi svaret selv har luft over sig.
  profileSectionTitle: {
    marginBottom: 0,
  },
  // Visning af den gemte profil
  // Hvert svar vises med label over værdi og en tynd linje imellem.
  profileItem: {
    paddingVertical: spacing.md,
  },
  profileItemDivider: {
    borderTopWidth: hairline,
    borderTopColor: colors.border,
  },
  profileLabel: {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    color: colors.textMuted,
    marginBottom: 2,
  },
  profileValue: {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.medium,
    color: colors.textPrimary,
  },
  profileValueEmpty: {
    fontWeight: typography.weight.regular,
    color: colors.textMuted,
  },

  // ABOUT
  aboutTitle: {
    fontSize: typography.size.xxl,
    lineHeight: typography.lineHeight.xxl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  aboutIntro: {
    marginBottom: spacing.xl,
  },
  // De fire trin står i én hvid blok som en nummereret liste.
  aboutSteps: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: hairline,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    ...shadow.card,
  },
  aboutStep: {
    paddingVertical: spacing.lg,
  },
  aboutStepDivider: {
    borderTopWidth: hairline,
    borderTopColor: colors.border,
  },
  aboutStepTitle: {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  aboutStepDescription: {
    fontSize: typography.size.base,
    lineHeight: typography.lineHeight.base,
    color: colors.textSecondary,
  },
});
