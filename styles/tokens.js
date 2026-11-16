import { StyleSheet } from 'react-native';

// Design tokens: de små byggesten, som alle andre styles bygger på.
// Jeg samler farver, afstande, skriftstørrelser og hjørner ét sted,
// så hele appen ser ens ud, og en ændring kun skal laves her.

// Farvepalette til hele appen.
// Jeg eksporterer den separat, så farverne også kan bruges dér, hvor man ikke
// kan give et style-objekt, fx ikonfarver og navigationens tint-farver.
// Navy er brandfarven. Resten er rolige neutrale farver plus én accentfarve.
export const colors = {
  navy: '#0F1E3D',
  white: '#FFFFFF',

  // Baggrund og flader
  background: '#F7F8FA',
  surface: '#FFFFFF',
  border: '#E4E7EC',
  borderStrong: '#D0D5DD',

  // Tekst
  textPrimary: '#0F1E3D',
  textSecondary: '#475467',
  textMuted: '#667085',

  // Én afdæmpet accentfarve, fx til AI-match og "View case"
  accent: '#2F5BD3',

  // Statusfarver til beskeder og badges
  successBg: '#ECF7F1',
  successBorder: '#C6E7D5',
  successText: '#18794E',
  errorBg: '#FDF1F0',
  errorBorder: '#F5C9C5',
  errorText: '#B42318',
  infoBg: '#EEF3FD',
  infoBorder: '#CFDDF8',
};

// Afstande bygger på 4/8-systemet, så luften mellem elementer er ensartet.
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

// Skriftstørrelser med en matchende linjehøjde til hver størrelse.
// Brødtekst er mindst 14, så den er let at læse på en telefon.
export const typography = {
  size: {
    xxs: 11,
    xs: 12,
    sm: 13,
    base: 14,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
  },
  lineHeight: {
    xxs: 14,
    xs: 16,
    sm: 18,
    base: 20,
    md: 22,
    lg: 24,
    xl: 26,
    xxl: 30,
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// Små, rolige hjørner. "pill" bruges kun til filterknapper.
export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  pill: 999,
};

// Den tyndeste streg skærmen kan vise. Bruges til kanter og skillelinjer.
export const hairline = StyleSheet.hairlineWidth;

// Mindste højde på alt, man kan trykke på (Apples anbefaling er 44 punkter).
export const touchTarget = 44;

// En meget svag skygge, så kortene kun lige løfter sig fra baggrunden.
export const shadow = {
  card: {
    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  },
};
