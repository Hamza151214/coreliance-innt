import { View, Text } from 'react-native';

import { getFieldColor } from '../styles/tokens';
import { ui } from '../styles/components';

// FieldTag viser en career cases felt som en farvet prik og feltets navn.
// Hvert felt har sin egen farve (se fieldColors i tokens.js),
// så man hurtigt kan se forskel på cases i listen.
export default function FieldTag({ field }) {
  if (!field) {
    return null;
  }

  const color = getFieldColor(field);

  return (
    <View style={ui.fieldRow}>
      <View style={[ui.fieldDot, { backgroundColor: color }]} />
      <Text style={[ui.fieldText, { color }]}>{field}</Text>
    </View>
  );
}
