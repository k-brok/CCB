# CCB (Chunkk City Builder)

## Over het spel

CCB is een gemeentelijke management- en simulatiegame waarin de speler verantwoordelijk is voor het besturen en ontwikkelen van een gemeente.

In tegenstelling tot traditionele city-builders bestuurt de speler niet rechtstreeks ieder gebouw, iedere inwoner of iedere onderneming. De speler bestuurt de gemeente en bepaalt de voorwaarden waaronder een gemeenschap zich ontwikkelt.

Inwoners, huishoudens, bedrijven en grondeigenaren zijn zelfstandige entiteiten met eigen belangen, behoeften, financiële middelen en beslissingen. Ze reageren op het gemeentelijke beleid en de ontwikkelingen in hun omgeving.

De speler beïnvloedt de ontwikkeling van de gemeente door onder andere:

- Bestemmingsplannen vast te stellen en te wijzigen.
- Grond aan te kopen, te verkopen en te ontwikkelen.
- Bouw- en vestigingsvergunningen te beoordelen.
- Wegen en andere infrastructuur aan te leggen.
- Gemeentelijke voorzieningen te realiseren.
- Belastingen, subsidies en andere beleidsmaatregelen vast te stellen.
- De gemeentelijke financiën te beheren.

Het uiteindelijke doel is een goed functionerende, aantrekkelijke en financieel gezonde gemeente te ontwikkelen.

## Kern van de gameplay

De wereld ontwikkelt zich grotendeels zelfstandig.

Huishoudens zoeken geschikte woningen, bedrijven zoeken geschikte locaties, ondernemingen produceren goederen en inwoners zoeken werk en voorzieningen.

Wanneer een huishouden of bedrijf zich ergens wil vestigen, kan het daarvoor een aanvraag indienen. De gemeente beoordeelt deze aanvraag op basis van de geldende regels, bestemmingsplannen, beschikbare infrastructuur en andere voorwaarden.

De speler kan aanvragen goedkeuren, afwijzen of onder voorwaarden toestaan.

Iedere beslissing heeft gevolgen voor de ontwikkeling van de gemeente.

Een nieuwe woonwijk kan bijvoorbeeld zorgen voor meer inwoners en belastinginkomsten, maar ook voor extra druk op scholen, wegen en andere voorzieningen. Een industriegebied kan werkgelegenheid opleveren, maar tegelijkertijd de aantrekkelijkheid van omliggende woningen verminderen.

## Een levende wereld

De spelwereld bestaat uit een uitbreidbaar raster van tiles. Tiles vormen samen percelen, waarop gebouwen en infrastructuur kunnen worden gerealiseerd.

De wereld wordt procedureel gegenereerd. Terrein, bodemsoorten, water, hoogteverschillen en natuurlijke omstandigheden bepalen mede waar ontwikkelingen mogelijk en aantrekkelijk zijn.

De kaart is een centraal onderdeel van het spel. De geografische ligging van gebouwen, woningen, bedrijven en voorzieningen heeft daadwerkelijk invloed op de simulatie.

Gebouwen kunnen bijvoorbeeld invloed uitoefenen op hun omgeving:

- Een school verhoogt de aantrekkelijkheid van locaties voor gezinnen.
- Een supermarkt verbetert de beschikbaarheid van dagelijkse voorzieningen.
- Een park verhoogt de woonkwaliteit.
- Een brandweerkazerne verbetert de bereikbaarheid van hulpdiensten.
- Industrie kan geluidsoverlast en milieubelasting veroorzaken.

Deze invloeden zijn afhankelijk van geografische afstand, bereikbaarheid via infrastructuur en eventueel de beschikbare capaciteit van voorzieningen.

De speler kan verschillende kaartlagen bekijken om bijvoorbeeld bereikbaarheid, leefbaarheid, grondwaarde en voorzieningendekking inzichtelijk te maken.

## Een zelfstandige economie

De economie bestaat uit individuele huishoudens en bedrijven die financiële middelen, voorraden en economische activiteiten beheren.

Bedrijven produceren goederen, kopen grondstoffen in, nemen personeel aan en verkopen hun producten. Huishoudens ontvangen inkomen, kopen goederen en betalen voor hun huisvesting en consumptie.

De lokale economie wordt bepaald door vraag en aanbod.

De gemeente beheert zelf geen algemene voorraad grondstoffen. Wel houdt de gemeente economische statistieken bij, zoals productie, consumptie, import, export, tekorten en overschotten.

Financiële transacties worden daadwerkelijk geregistreerd. Huishoudens, bedrijven, grondeigenaren en de gemeente hebben eigen financiële administraties.

## Spelmodi

CCB ondersteunt verschillende manieren om te spelen:

### Sandbox
Ontwikkel een gemeente zonder verplichte doelstellingen of tijdslimieten.

### Scenarios
Begin met een specifieke uitdaging, zoals woningtekorten, hoge werkloosheid, een slechte financiële positie of onvoldoende voorzieningen.

### Progression
Ontwikkel een kleine nederzetting tot een dorp, stad en uiteindelijk een grote gemeente. Nieuwe mogelijkheden worden geleidelijk beschikbaar.

## Techniek

Het spel wordt ontwikkeld met:

- TypeScript
- Next.js
- MariaDB
- Drizzle ORM
- Zod
- Een eigen TypeScript-simulatie-engine
- Een modulaire monolithische architectuur

De simulatie draait server-side en is onafhankelijk van de frontend. Hierdoor kan de spelwereld zelfstandig blijven ontwikkelen en kan de gebruikersinterface later worden uitgebreid met een uitgebreidere 2D- of 3D-weergave.

De architectuur wordt voorbereid op toekomstige multiplayerfunctionaliteit, maar de eerste versie richt zich volledig op singleplayer.

## Ontwikkeldoel

Het doel is een diepgaande gemeentelijke simulatie te bouwen waarin geografische keuzes, gemeentelijk beleid, economische ontwikkelingen en individuele beslissingen elkaar beïnvloeden.

De speler moet niet simpelweg een stad kunnen volbouwen, maar een gemeente moeten besturen waarin iedere beslissing consequenties heeft.