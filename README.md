# Coreliance

Coreliance er en prototype af en mobilapp, der hjælper internationale studerende og nyuddannede med at finde job i Danmark. Appen viser historier fra personer, der allerede har fået job, og bruger AI til at finde de historier, der ligner brugerens egen situation mest.

Projektet er lavet i React Native med Expo som en del af kurset INNT på CBS. Alle career cases og fællesskaber i appen er fiktive og lavet til demonstration.

## Demovideo

Se en kort demo af appen her: https://youtube.com/shorts/jQIQOdGlwYA?feature=share

## Hvad kan appen?

Appen har fire faner:

- **Explore**: Gennemse 14 fiktive career cases og filtrér efter felt, fx Finance eller Data & Analytics. Hver case viser jobsøgningen i tal, personens råd, deres forløb og baggrund.
- **People Like Me**: AI'en sammenligner din profil med alle cases og forklarer, hvad du har til fælles med de mest relevante, hvad der er anderledes, og hvad du kan lære af dem.
- **My Profile**: En kort profil med 12 spørgsmål om din baggrund, dine mål og din største udfordring. Profilen gemmes kun på telefonen.
- **Contribute**: En demoformular, hvor en person med job kan dele sin historie.

Efter en case eller dine matches viser appen et **næste skridt**: et relevant fællesskab og dets næste event. Fællesskaberne er simulerede og tydeligt markeret som demo.

Første gang appen åbnes, viser Explore et kort velkomstkort med en genvej til at oprette en profil.

## Krav

- **Node.js 22.9 eller nyere** (tjek med `node -v`)
- **Expo Go** på telefonen (App Store / Google Play), hvis appen skal køre på en telefon. Appen bruger Expo SDK 58.
- **En OpenAI API-nøgle**, hvis AI-matchingen skal virke. Resten af appen virker uden.

## Kom i gang

**1. Hent projektet og installér pakkerne**

```bash
git clone https://github.com/Hamza151214/coreliance-innt.git
cd coreliance-innt
npm install
```

**2. Indsæt din OpenAI-nøgle** (kan springes over, hvis du ikke skal bruge AI-matching)

```bash
cp server/.env.example server/.env
```

Åbn `server/.env` og indsæt din nøgle efter `OPENAI_API_KEY=`, uden mellemrum og anførselstegn. En nøgle kan oprettes på [platform.openai.com](https://platform.openai.com/api-keys), og kontoen skal have kredit.

**3. Start appen**

```bash
npm run dev
```

Kommandoen starter både den lokale AI-server og Expo. Når QR-koden vises i terminalen, kan appen åbnes:

- **På telefonen:** Scan QR-koden med kameraet (iPhone) eller i Expo Go (Android). Telefonen og computeren skal være på samme Wi-Fi.
- **I browseren:** Tryk `w` i terminalen.

Stop appen og serveren med `Ctrl+C`.

## Sådan virker AI-matching

1. Brugeren udfylder sin profil og trykker selv på knappen for at finde matches.
2. Appen sender profilsvarene til den lokale server i `server/`. Kun de 12 profilfelter sendes videre.
3. Serveren lægger de fiktive career cases ved og kalder OpenAI (standardmodel: `gpt-5-mini`) med nøglen fra `server/.env`.
4. Serveren tjekker svaret, fjerner ugyldige eller dobbelte matches og sender resultatet tilbage.
5. Appen gemmer resultatet på telefonen. Der laves ikke et nyt OpenAI-kald, før brugeren selv beder om det, fx efter at have ændret sin profil.

API-nøglen ligger kun på serveren og kommer aldrig med i selve appen.

**Hvis AI'en ikke svarer**, fx under en præsentation uden internet, kan brugeren vælge at se tre forudskrevne eksempler. De er tydeligt markeret som "not AI-generated" og bliver aldrig gemt som rigtige resultater.

## Test

```bash
npm test
```

Testene kører serveren mod en falsk OpenAI, så de hverken kræver en nøgle eller koster penge.

## Andre kommandoer

| Kommando | Hvad den gør |
| --- | --- |
| `npm run dev` | Starter AI-server og Expo sammen (anbefalet) |
| `npm start` | Starter kun Expo, uden AI-server |
| `npm run server` | Starter kun AI-serveren på port 3001 |
| `npm run web` | Starter kun Expo direkte i browseren |
| `npm test` | Kører serverens tests |

## Projektstruktur

```
App.js            Appens indgang
navigation/       Faner og skærmskift
screens/          Én fil pr. skærm
components/       Genbrugelige dele, fx CareerCard og NextSteps
services/         Data, lokal lagring og kald til AI-serveren
data/             Fiktive cases, profilspørgsmål, eksempel-matches og fællesskaber
styles/           Designsystem: tokens (farver, afstande), components og screens
server/           Lokal Node-server, der kalder OpenAI
scripts/dev.js    Starter server og Expo med én kommando
```

Se `INTEGRATION_HANDOFF.md` for flere tekniske detaljer.

## Fejlfinding

**Jeg ser en gammel version af appen.** Ryst telefonen og tryk *Reload* i Expo Go, eller luk Expo Go helt og scan QR-koden igen. I browseren: `Cmd+Shift+R`.

**AI-matching virker ikke.**
- Tjek at `server/.env` findes og indeholder din nøgle.
- Genstart med `Ctrl+C` og `npm run dev`, hvis du har ændret nøglen. Serveren læser kun filen ved opstart.
- Tjek at der er kredit på din OpenAI-konto.
- På telefonen: telefon og computer skal være på samme Wi-Fi.
- Åbn http://localhost:3001/health på computeren. `"hasApiKey": true` betyder, at serveren har fundet nøglen.

**"Project is incompatible with this version of Expo Go".** Opdatér Expo Go fra App Store / Google Play.

**Port 8081 eller 3001 er optaget.** Der kører allerede en version af appen. Stop den, eller luk den gamle terminal.

## Data og privatliv

- Alle career cases, fællesskaber og events er fiktive.
- Profilen og matches gemmes kun lokalt på telefonen.
- AI-serveren gemmer intet og sender ikke nationalitet eller lignende personoplysninger til OpenAI.
- `server/.env` er i `.gitignore` og må aldrig deles eller committes.
