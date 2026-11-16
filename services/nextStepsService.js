import NEXT_STEPS from '../data/nextSteps.json';

// "Next step" peger brugeren videre fra en historie til et fællesskab og et event.
// Alt indhold i data/nextSteps.json er fiktivt og lavet til demoen:
// grupperne, medlemstallene, emnerne og eventene findes ikke i virkeligheden.
//
// Funktionerne er async, ligesom de andre services, så skærmene bruger dem på
// samme måde, og så data senere kunne komme fra en server uden at ændre skærmene.

// Aalborg og Odense har ikke deres egen gruppe i demoen, så jeg sender dem
// til Aarhus-gruppen. Copenhagen går til gruppen for nyankomne.
const CITY_REGIONS = {
  Copenhagen: 'Copenhagen',
  Aarhus: 'Aarhus',
  Aalborg: 'Aarhus',
  Odense: 'Aarhus',
};

// Fallback, når hverken felt eller by passer: sprog er relevant for næsten alle.
const FALLBACK_GROUP_ID = 'grp-danish';

// Eventets dato regnes ud fra "om hvor mange dage", så demoen aldrig viser
// et event, der allerede har fundet sted. Fx "Sat 21 Nov · 17:00".
function formatEventDate(daysFromNow, time) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);

  const day = date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

  return time ? `${day} · ${time}` : day;
}

// Finder gruppen og dens kommende event. Returnerer null, hvis id'et ikke findes.
export async function getGroupWithEvent(groupId) {
  const group = NEXT_STEPS.groups.find((item) => item.id === groupId);

  if (!group) {
    return null;
  }

  const event = NEXT_STEPS.events.find((item) => item.groupId === groupId);

  return {
    group,
    event: event ? { ...event, dateText: formatEventDate(event.daysFromNow, event.time) } : null,
  };
}

// Vælger ét næste skridt ud fra felter og by. Matchingen er bevidst simpel:
// 1. Den første gruppe, hvis felter overlapper med de givne felter.
// 2. Ellers en gruppe for byen (eller regionen).
// 3. Ellers den generelle gruppe "Danish for Work".
export async function getNextStep({ fields = [], city = '' } = {}) {
  const fieldList = Array.isArray(fields) ? fields : [];

  const fieldGroup = NEXT_STEPS.groups.find((group) =>
    group.fields.some((field) => fieldList.includes(field))
  );

  const region = CITY_REGIONS[city];
  const cityGroup = region ? NEXT_STEPS.groups.find((group) => group.city === region) : null;

  const chosenGroup = fieldGroup || cityGroup;

  return getGroupWithEvent(chosenGroup ? chosenGroup.id : FALLBACK_GROUP_ID);
}
