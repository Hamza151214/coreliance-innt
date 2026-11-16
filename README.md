## Installation

Kræver Node.js 22.9 eller nyere.

```bash
npm install
```

## Start appen

```bash
npm run dev
```


## OpenAI-nøgle

AI-matchingen kræver en OpenAI API-nøgle. Kopiér skabelonen og indsæt nøglen i `server/.env`:

```bash
cp server/.env.example server/.env
```

Nøglen må kun ligge i `server/.env` (filen er i `.gitignore`) og må aldrig deles i chat eller committes til git. Appen virker uden nøgle; kun AI-matchingen viser så en tydelig fejlbesked og et markeret demo-resultat.

## Test

```bash
npm test
```

## Sådan virker AI-matching

Matching sker kun, når brugeren selv trykker på knappen og har givet samtykke. Appen sender de udfyldte profilsvar til den lokale server (`server/index.js`), som tilføjer de fiktive career cases og kalder OpenAI med nøglen fra `server/.env`. Serveren validerer svaret og sender matches tilbage, og appen gemmer dem lokalt, så der ikke laves et nyt OpenAI-kald, før brugeren beder om det.

## Demovideo

Link til demovideo:

https://youtu.be/cKrlRP3s2n4?is=fnEAmXZtpL3X5zCG
