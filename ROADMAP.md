# CCB– Development Roadmap

**Document:** ROADMAP.md  
**Versie:** 1.0  
**Project:** CCB 
**Status:** Initial planning

# 1. Ontwikkelstrategie

CCBwordt ontwikkeld als een modulaire monolith met een eigen server-side simulatie-engine.

De ontwikkeling verloopt in fases. Iedere fase levert een functioneel onderdeel op dat aansluit op de eerder ontwikkelde systemen.

De roadmap richt zich op een speelbare basisversie voordat complexere simulaties worden toegevoegd.

## 1.1 Technische stack

| Onderdeel | Technologie |
|---|---|
| Programmeertaal | TypeScript |
| Frontend | Next.js |
| Backend | Next.js server-side |
| Database | MariaDB |
| ORM | Drizzle ORM |
| Validatie | Zod |
| Styling | Tailwind CSS |
| Simulatie | Eigen TypeScript Simulation Engine |
| Authenticatie | Auth.js of vergelijkbaar |
| Achtergrondverwerking | Server-side worker |
| Kaart | Eigen grid- en tile-rendering |

## 1.2 Architectuur

Het project gebruikt een Modular Monolith.

De frontend is gescheiden van de domeinlogica en de simulatie.

Voorgestelde structuur:

```text
src/
  app/
    dashboard/
    municipality/
    world/
    map/
    land/
    population/
    businesses/
    economy/
    applications/
    infrastructure/
    policies/
    settings/

  modules/
    world/
    municipality/
    land/
    buildings/
    population/
    businesses/
    resources/
    economy/
    trade/
    finance/
    applications/
    infrastructure/
    policies/
    spatial/

  simulation/
    engine/
    clock/
    scheduler/
    systems/
    events/
    context/

  shared/
    types/
    enums/
    validation/
    utilities/

  infrastructure/
    database/
    repositories/
    workers/
    authentication/
```

Domeinmodules bevatten waar relevant:

```text
module/
  models/
  services/
  repositories/
  validation/
  types/
  definitions/
```

De exacte structuur kan tijdens de implementatie worden verfijnd.

## 1.3 Algemene ontwikkelprincipes

- Eerst functionele systemen, daarna uitgebreide visualisatie.
- Geen onnodige microservices.
- Simulatie-engine blijft onafhankelijk van Next.js.
- Alle relevante entiteiten zijn gekoppeld aan een World.
- Gemeentelijke entiteiten zijn gekoppeld aan een Municipality.
- Financiële transacties zijn volledig traceerbaar.
- Simulatieverwerking moet herstelbaar en idempotent zijn.
- Nieuwe functionaliteit moet bestaande werelden niet onbedoeld wijzigen.
- Configuratie wordt gebruikt voor herbruikbare definities.
- Complex gedrag wordt expliciet geïmplementeerd in TypeScript.
- Iedere fase heeft concrete acceptatiecriteria.

---

# 2. Fase 1 – Project foundation

**Doel:** Een werkende technische basis waarin een speler een wereld en gemeente kan aanmaken.

## 2.1 Project initialisatie

- [ ] Next.js-project initialiseren.
- [ ] TypeScript correct configureren.
- [ ] Tailwind CSS configureren.
- [ ] Drizzle ORM installeren en configureren.
- [ ] MariaDB-verbinding opzetten.
- [ ] Omgevingsvariabelen configureren.
- [ ] Zod installeren.
- [ ] Basis logging implementeren.
- [ ] Foutafhandeling structureren.
- [ ] Basis projectstructuur aanmaken.

## 2.2 Authenticatie en accounts

- [ ] Gebruikersmodel.
- [ ] Authenticatie implementeren.
- [ ] Registratie.
- [ ] Inloggen en uitloggen.
- [ ] Sessiebeheer.
- [ ] Wachtwoordbeveiliging indien wachtwoordauthenticatie wordt gebruikt.
- [ ] Gebruikersinstellingen.
- [ ] Eigenaarschap van werelden vastleggen.

## 2.3 World management

- [ ] World-model.
- [ ] World-instellingen.
- [ ] WorldId als primaire koppeling voor wereldgebonden entiteiten.
- [ ] World aanmaken.
- [ ] World laden.
- [ ] World-instellingen wijzigen.
- [ ] World verwijderen.
- [ ] World seed opslaan.
- [ ] World status en simulatiestatus opslaan.

## 2.4 Municipality

- [ ] Municipality-model.
- [ ] Gemeente aan een World koppelen.
- [ ] Gemeentenaam.
- [ ] Gemeentelijke instellingen.
- [ ] Startkapitaal.
- [ ] Gemeentelijke financiële rekening.
- [ ] Basis gemeentelijk dashboard.

## 2.5 Eerste gebruikersinterface

- [ ] Loginpagina.
- [ ] Dashboard.
- [ ] World-overzicht.
- [ ] Nieuwe World aanmaken.
- [ ] Gemeente aanmaken.
- [ ] Basis navigatie.
- [ ] Algemene componenten.
- [ ] Fout- en laadstatussen.

### Acceptatiecriteria

- Een gebruiker kan inloggen.
- Een gebruiker kan een nieuwe World aanmaken.
- Een World heeft een unieke seed.
- Een Municipality kan aan de World worden gekoppeld.
- De wereld en gemeente blijven na opnieuw inloggen beschikbaar.

---

# 3. Fase 2 – World generation en grid

**Doel:** Een procedureel gegenereerde wereld met uitbreidbare geografische structuur.

## 3.1 Grid en tiles

- [ ] Tile-model definiëren.
- [ ] Tile-coördinaten.
- [ ] Tile-eigenschappen.
- [ ] Hoogtegegevens.
- [ ] Bodemsoort.
- [ ] Vruchtbaarheid.
- [ ] Waterbeschikbaarheid.
- [ ] Helling.
- [ ] Vegetatie.
- [ ] Wateroppervlakken.
- [ ] Tile-status en wijzigingen.

## 3.2 Chunk-systeem

- [ ] World opdelen in chunks.
- [ ] Chunk-model.
- [ ] Chunk-coördinaten.
- [ ] Chunk-generatie.
- [ ] Seed-based generatie.
- [ ] Deterministische generatie.
- [ ] Chunk-grenzen logisch laten aansluiten.
- [ ] Lazy loading.
- [ ] Persistent opslaan van gewijzigde chunks.
- [ ] Ongewijzigde terreingegevens vanuit seed kunnen reconstrueren.

## 3.3 World generation

- [ ] Hoogtegeneratie.
- [ ] Watergeneratie.
- [ ] Bodemgeneratie.
- [ ] Vruchtbaarheid berekenen.
- [ ] Vegetatie genereren.
- [ ] Natuurlijke beperkingen bepalen.
- [ ] Generatieparameters configureerbaar maken.
- [ ] World generation reproducible maken.

## 3.4 Uitbreidbare wereld

- [ ] World expansion model.
- [ ] Nieuwe gebieden ontgrendelen.
- [ ] Nieuwe chunks genereren.
- [ ] Bestaande werelddata behouden.
- [ ] Uitbreidingskosten voorbereiden.
- [ ] Grenzen van actieve wereldgebieden beheren.

## 3.5 Eerste kaartweergave

- [ ] Grid renderer.
- [ ] Tile rendering.
- [ ] Camera en zoom.
- [ ] Pan-functionaliteit.
- [ ] Tile selecteren.
- [ ] Coördinaten tonen.
- [ ] Terreinvisualisatie.
- [ ] Verschillende zoomniveaus.
- [ ] Chunk loading zichtbaar maken.

### Acceptatiecriteria

- Een nieuwe World wordt gegenereerd vanuit een seed.
- Dezelfde seed produceert dezelfde oorspronkelijke wereld.
- Chunks sluiten logisch op elkaar aan.
- De kaart kan worden bekeken en ingezoomd.
- Nieuwe gebieden kunnen worden gegenereerd zonder bestaande gebieden te veranderen.

---

# 4. Fase 3 – Land, percelen en eigendom

**Doel:** Een werkend grondeigendomssysteem waarin percelen, bestemmingen en grondtransacties worden beheerd.

## 4.1 Percelen

- [ ] Parcel-model.
- [ ] Kadastrale identificatie.
- [ ] Parcel-Tile-relatie.
- [ ] Oppervlakte berekenen.
- [ ] Onregelmatige perceelvormen ondersteunen.
- [ ] Percelen samenvoegen.
- [ ] Percelen splitsen.
- [ ] Perceelgrenzen visualiseren.

## 4.2 Eigendom

- [ ] Ownership-model.
- [ ] Gemeentelijk eigendom.
- [ ] Particulier eigendom.
- [ ] Bedrijfseigendom.
- [ ] Eigendomsgeschiedenis.
- [ ] Eigendomsoverdracht.
- [ ] Grondtransacties registreren.
- [ ] Grondeigenaren koppelen aan financiële rekeningen.

## 4.3 Bestemmingsplannen

- [ ] Zoning-category model.
- [ ] Wonen.
- [ ] Landbouw.
- [ ] Industrie.
- [ ] Commercieel.
- [ ] Maatschappelijk.
- [ ] Recreatie.
- [ ] Gemengd gebruik.
- [ ] Bestemming aan percelen koppelen.
- [ ] Bestemmingswijzigingen registreren.
- [ ] Bestemmingsgeschiedenis voorbereiden.

## 4.4 Grondwaarde

- [ ] Basis grondwaarde.
- [ ] Waarde op basis van oppervlakte.
- [ ] Waarde op basis van bestemming.
- [ ] Waarde op basis van terreineigenschappen.
- [ ] Waarde op basis van bereikbaarheid voorbereiden.
- [ ] Marktwaarde en vraagprijs scheiden.

## 4.5 Kaartinteractie

- [ ] Perceel selecteren.
- [ ] Perceelinformatie tonen.
- [ ] Eigenaar tonen.
- [ ] Bestemming tonen.
- [ ] Grondwaarde tonen.
- [ ] Gemeentelijke grond markeren.
- [ ] Eigendom als kaartlaag.
- [ ] Bestemming als kaartlaag.

### Acceptatiecriteria

- De World bestaat uit tiles en percelen.
- Percelen kunnen meerdere tiles bevatten.
- Een perceel heeft één geldige eigendomspositie.
- Eigendom en bestemming zijn onafhankelijk.
- De speler kan grondbezit en bestemmingen bekijken.
- Grondtransacties kunnen worden geregistreerd.

---

# 5. Fase 4 – Gebouwen en ruimtelijke objecten

**Doel:** Gebouwen en andere ruimtelijke objecten kunnen plaatsen, beheren en koppelen aan percelen.

## 5.1 Gebouwdefinities

- [ ] BuildingType-model.
- [ ] Gebouwcategorieën.
- [ ] Benodigde oppervlakte.
- [ ] Voetafdruk op tiles.
- [ ] Bouwkosten.
- [ ] Onderhoudskosten.
- [ ] Capaciteit.
- [ ] Toegestane bestemmingen.
- [ ] Configuratie van gebouwtypen.

## 5.2 Gebouwen plaatsen

- [ ] Building-model.
- [ ] Gebouw koppelen aan perceel.
- [ ] Gebouw kan meerdere percelen beslaan.
- [ ] Gebouw kan meerdere tiles beslaan.
- [ ] Bouwstatus.
- [ ] Bouwjaar.
- [ ] Eigenaar.
- [ ] Bezetting.
- [ ] Staat van onderhoud.
- [ ] Gebouw verwijderen.
- [ ] Gebouwinformatie in de kaart tonen.

## 5.3 Eerste gebouwtypen

- [ ] Woning.
- [ ] Winkel.
- [ ] Boerderij.
- [ ] Bedrijfsgebouw.
- [ ] School.
- [ ] Brandweerkazerne.
- [ ] Park.

## 5.4 Gebouwfunctionaliteit

- [ ] Gebouwcapaciteit.
- [ ] Gebouwbezetting.
- [ ] Onderhoudskosten.
- [ ] Bouwkosten.
- [ ] Gebruik van gebouwen.
- [ ] Meerdere functies per gebouw voorbereiden.

### Acceptatiecriteria

- Gebouwen kunnen aan percelen worden gekoppeld.
- Gebouwen kunnen meerdere tiles beslaan.
- Gebouwen hebben een type en eigenschappen.
- Gebouwen worden correct op de kaart weergegeven.
- Gebouwfuncties kunnen worden uitgebreid zonder de basisstructuur te wijzigen.

---

# 6. Fase 5 – Infrastructuur en bereikbaarheid

**Doel:** Een infrastructuurnetwerk ontwikkelen dat de bereikbaarheid van locaties bepaalt.

Deze fase legt de basis voor netwerkgebaseerde ruimtelijke invloeden.

## 6.1 Wegen

- [ ] Road-model.
- [ ] Wegsegmenten.
- [ ] Wegtypen.
- [ ] Wegverbindingen.
- [ ] Kruispunten.
- [ ] Aansluiting op gebouwen.
- [ ] Aansluiting op percelen.
- [ ] Wegennet visualiseren.
- [ ] Wegen aanleggen.
- [ ] Wegen verwijderen.
- [ ] Onderhoudskosten.

## 6.2 Netwerkstructuur

- [ ] Infrastructure graph.
- [ ] Nodes.
- [ ] Edges.
- [ ] Verbindingen tussen wegsegmenten.
- [ ] Routeberekeningen.
- [ ] Afstandsberekening.
- [ ] Reistijdberekening voorbereiden.
- [ ] Bereikbaarheid per locatie.

## 6.3 Bereikbaarheid

- [ ] Bereikbaarheid van woningen.
- [ ] Bereikbaarheid van bedrijven.
- [ ] Bereikbaarheid van voorzieningen.
- [ ] Bereikbaarheid van percelen.
- [ ] Bereikbaarheid op basis van wegverbindingen.
- [ ] Geografische afstand onderscheiden van netwerkafstand.

## 6.4 Toekomstige infrastructuur

Architectuur voorbereiden voor:

- Spoorwegen.
- Waterwegen.
- Elektriciteit.
- Waterleidingen.
- Riolering.
- Internet.
- Wandelroutes.
- Openbaar vervoer.

Deze infrastructuur hoeft nog niet functioneel te zijn.

### Acceptatiecriteria

- Wegen kunnen worden aangelegd en verwijderd.
- Wegen vormen een netwerk.
- Gebouwen en percelen kunnen op het wegennet worden aangesloten.
- Routes tussen locaties kunnen worden berekend.
- Bereikbaarheid kan als kaartlaag worden getoond.

---

# 7. Fase 6 – Spatial Simulation

**Doel:** De ruimtelijke ligging van objecten daadwerkelijk laten doorwerken in de simulatie.

Dit is een belangrijke fase omdat de kaart hiermee een actief onderdeel van de gameplay wordt.

## 7.1 Invloeddefinities

- [ ] InfluenceDefinition-model.
- [ ] Invloedstype.
- [ ] Positieve invloed.
- [ ] Negatieve invloed.
- [ ] Basisbereik.
- [ ] Invloedsterkte.
- [ ] Geografische invloed.
- [ ] Netwerkgebaseerde invloed.
- [ ] Invloed op specifieke eigenschappen.
- [ ] Configureerbare afnamefunctie.

## 7.2 Invloedberekeningen

- [ ] Geografische afstand berekenen.
- [ ] Bereik bepalen.
- [ ] Invloedsterkte bepalen.
- [ ] Invloeden combineren.
- [ ] Positieve en negatieve invloeden verwerken.
- [ ] Resultaten per tile opslaan of efficiënt reconstrueren.
- [ ] Berekeningen beperken tot relevante gebieden.
- [ ] Cache invalidatie.
- [ ] Herberekenen na relevante wijzigingen.

## 7.3 Netwerkgebaseerde invloeden

- [ ] Bereik via wegennet.
- [ ] Routeafstand.
- [ ] Reistijd.
- [ ] Bereikbaarheid van voorzieningen.
- [ ] Invloed van infrastructuuronderbrekingen.
- [ ] Verschillende vervoersvormen voorbereiden.

## 7.4 Voorzieningen en capaciteit

- [ ] Voorzieningstype.
- [ ] Verzorgingsgebied.
- [ ] Maximale capaciteit.
- [ ] Huidige bezetting.
- [ ] Beschikbare capaciteit.
- [ ] Bereikbaarheid combineren met capaciteit.
- [ ] Overbelasting herkennen.

## 7.5 Locatiekwaliteit

- [ ] LocationQuality-model.
- [ ] Wooncomfort.
- [ ] Veiligheid.
- [ ] Bereikbaarheid.
- [ ] Voorzieningenniveau.
- [ ] Milieukwaliteit.
- [ ] Recreatiemogelijkheden.
- [ ] Algemene leefbaarheid.
- [ ] Bedrijfsmatige locatiegeschiktheid.
- [ ] Locatiekwaliteit als samengestelde score.

## 7.6 Eerste invloedsprofielen

- [ ] School.
- [ ] Supermarkt.
- [ ] Park.
- [ ] Brandweerkazerne.
- [ ] Industrie.
- [ ] Ziekenhuis.

## 7.7 Kaartvisualisatie

- [ ] Invloedsgebieden weergeven.
- [ ] Heatmap voor locatiekwaliteit.
- [ ] Heatmap voor bereikbaarheid.
- [ ] Voorzieningendekking tonen.
- [ ] Onvoldoende bereikbare gebieden markeren.
- [ ] Capaciteitsproblemen tonen.

### Acceptatiecriteria

- Gebouwen kunnen meerdere invloedsgebieden hebben.
- Invloeden kunnen geografisch of netwerkgebaseerd zijn.
- Een voorziening beïnvloedt relevante locaties.
- Capaciteit beïnvloedt de effectiviteit van een voorziening.
- De locatiekwaliteit van een woning kan worden berekend.
- De speler kan de ruimtelijke gevolgen van plaatsing en verwijdering bekijken.

---

# 8. Fase 7 – Tijd en Simulation Engine

**Doel:** Een betrouwbare simulatie-engine ontwikkelen die de wereld zelfstandig laat functioneren.

## 8.1 Simulation Engine

- [ ] SimulationEngine.
- [ ] SimulationContext.
- [ ] World-scoped simulatie.
- [ ] SimulationState.
- [ ] Tick-verwerking.
- [ ] Systeemregistratie.
- [ ] Uitvoeringsvolgorde.
- [ ] Systeemafhankelijkheden.
- [ ] Logging.
- [ ] Foutafhandeling.
- [ ] Herstelmechanismen.

## 8.2 Tijd

- [ ] Game clock.
- [ ] Vaste tick-eenheid.
- [ ] Pauzeren.
- [ ] Normale snelheid.
- [ ] Versnelde snelheid.
- [ ] Zeer hoge snelheid.
- [ ] Handmatig periode uitvoeren.
- [ ] Simulatietijd persistent opslaan.

## 8.3 Scheduler

- [ ] Uurlijkse taken voorbereiden.
- [ ] Dagelijkse taken.
- [ ] Wekelijkse taken.
- [ ] Maandelijkse taken.
- [ ] Jaarlijkse taken.
- [ ] Scheduled tasks.
- [ ] Taakstatussen.
- [ ] Herhaalbare taken.
- [ ] Foutieve taken kunnen herstellen.

## 8.4 Achtergrondverwerking

- [ ] Server-side worker.
- [ ] World locking.
- [ ] Voorkomen van gelijktijdige ticks.
- [ ] Offline tijd bepalen.
- [ ] Inhaalberekeningen.
- [ ] Maximale offline simulatieduur.
- [ ] Simulatieherstel na serverherstart.

## 8.5 Events

- [ ] Simulation events.
- [ ] Eventregistratie.
- [ ] Eventverwerking.
- [ ] Idempotentie.
- [ ] Transactionele outbox.
- [ ] Event logging.
- [ ] Foutieve events opnieuw verwerken.

## 8.6 Eerste systemen

- [ ] LandSystem.
- [ ] InfrastructureSystem.
- [ ] SpatialInfluenceSystem.
- [ ] FinanceSystem voorbereiden.

### Acceptatiecriteria

- De wereld heeft een eigen simulatieklok.
- De simulatie kan zelfstandig draaien.
- De speler kan de simulatie pauzeren en versnellen.
- Een serverherstart veroorzaakt geen oncontroleerbare dubbele verwerking.
- Simulatie-events kunnen betrouwbaar worden verwerkt.

---

# 9. Fase 8 – Huishoudens en inwoners

**Doel:** Een populatiesimulatie waarin individuele inwoners en huishoudens zelfstandig functioneren.

## 9.1 Citizens

- [ ] Citizen-model.
- [ ] Identiteit.
- [ ] Leeftijd.
- [ ] Opleiding.
- [ ] Beroep.
- [ ] Werkgever.
- [ ] Inkomen.
- [ ] Woonstatus.
- [ ] Huishoudkoppeling.
- [ ] Demografische eigenschappen.

## 9.2 Households

- [ ] Household-model.
- [ ] Household-members.
- [ ] Gezamenlijke financiële rekening.
- [ ] Woonlocatie.
- [ ] Huishoudgrootte.
- [ ] Consumptiebehoeften.
- [ ] Woonvoorkeuren.
- [ ] Financiële draagkracht.

## 9.3 Woningmarkt

- [ ] Woningaanbod.
- [ ] Beschikbare woningen.
- [ ] Koopwoningen.
- [ ] Huurwoningen.
- [ ] Woningprijzen.
- [ ] Huurprijzen.
- [ ] Woningcapaciteit.
- [ ] Woningbezetting.

## 9.4 Behoeften

- [ ] Huisvesting.
- [ ] Voedsel.
- [ ] Water.
- [ ] Energie.
- [ ] Werk.
- [ ] Onderwijs.
- [ ] Zorg.
- [ ] Recreatie.
- [ ] Sociale voorzieningen.

## 9.5 Vestigingsgedrag

- [ ] Huishoudens zoeken woningen.
- [ ] Geschiktheid van woningen berekenen.
- [ ] Locatiekwaliteit meenemen.
- [ ] Financiële draagkracht meenemen.
- [ ] Verhuisbeslissingen.
- [ ] Vertrek uit de gemeente.
- [ ] Nieuwe huishoudens genereren.

## 9.6 Woonkwaliteit en tevredenheid

- [ ] Locatiekwaliteit koppelen aan woningen.
- [ ] Wooncomfort.
- [ ] Veiligheid.
- [ ] Voorzieningenniveau.
- [ ] Bereikbaarheid.
- [ ] Milieukwaliteit.
- [ ] Tevredenheid berekenen.
- [ ] Aantrekkelijkheid van woningen berekenen.

## 9.7 Gebeurtenissen

- [ ] HouseholdCreated.
- [ ] CitizenCreated.
- [ ] CitizenRelocated.
- [ ] HouseholdRelocated.
- [ ] HouseholdDissolved.
- [ ] HouseholdLeftMunicipality.

### Acceptatiecriteria

- Individuele inwoners kunnen worden aangemaakt.
- Inwoners kunnen in huishoudens worden gegroepeerd.
- Huishoudens hebben eigen financiën en behoeften.
- Huishoudens kunnen zelfstandig woningen zoeken.
- Locatiekwaliteit beïnvloedt woonkeuzes.
- De populatie kan groeien, krimpen en verhuizen.

---

# 10. Fase 9 – Bedrijven en werkgelegenheid

**Doel:** Bedrijven zelfstandig laten functioneren en bijdragen aan de lokale economie.

## 10.1 Bedrijfsmodellen

- [ ] Business-model.
- [ ] BusinessType.
- [ ] BusinessDefinition.
- [ ] Eigenaar.
- [ ] Vestigingslocatie.
- [ ] Financiële rekening.
- [ ] Werknemers.
- [ ] Bedrijfsactiviteiten.
- [ ] Voorraad.
- [ ] Productiecapaciteit.
- [ ] Bedrijfsstatus.

## 10.2 Bedrijfsprofielen

- [ ] Benodigde oppervlakte.
- [ ] Bestemmingsvereisten.
- [ ] Locatievoorkeuren.
- [ ] Personeelsbehoefte.
- [ ] Productieprocessen.
- [ ] Inputresources.
- [ ] Outputresources.
- [ ] Financiële parameters.
- [ ] Uitbreidingsmogelijkheden.

## 10.3 Eerste bedrijfstypen

- [ ] Boerderij.
- [ ] Winkel.
- [ ] Bakkerij.
- [ ] Algemene onderneming.

## 10.4 Bedrijfsbeslissingen

- [ ] Geschikte locaties zoeken.
- [ ] Grond kopen of huren.
- [ ] Vestigingsaanvraag indienen.
- [ ] Gebouwen realiseren.
- [ ] Werknemers aannemen.
- [ ] Productie starten.
- [ ] Voorraad inkopen.
- [ ] Producten verkopen.
- [ ] Uitbreiden.
- [ ] Investeren.
- [ ] Verhuizen.
- [ ] Sluiten.
- [ ] Faillissement.

## 10.5 Arbeidsmarkt

- [ ] Vacatures.
- [ ] Werkzoekenden.
- [ ] Opleidingsvereisten.
- [ ] Werknemers koppelen aan bedrijven.
- [ ] Salarissen.
- [ ] Werkloosheid.
- [ ] Bereikbaarheid van werk.

### Acceptatiecriteria

- Bedrijven bestaan als individuele entiteiten.
- Bedrijven kunnen zelfstandig locaties zoeken.
- Bedrijven kunnen personeel aannemen.
- Bedrijven kunnen financiële beslissingen nemen.
- Werkgelegenheid wordt zichtbaar in gemeentelijke statistieken.

---

# 11. Fase 10 – Resources en productie

**Doel:** Een functionerende lokale economie waarin productie, voorraad en consumptie met elkaar verbonden zijn.

## 11.1 Resource-definities

- [ ] Resource-model.
- [ ] Resource-categorieën.
- [ ] Eenheden.
- [ ] Houdbaarheid.
- [ ] Verwerkbaarheid.
- [ ] Verhandelbaarheid.
- [ ] Resource-definities configureerbaar maken.

## 11.2 Inventories

- [ ] Inventory-model.
- [ ] Voorraad per bedrijf.
- [ ] Voorraad per huishouden.
- [ ] Voorraadmutaties.
- [ ] Voorraadlimieten.
- [ ] Bederf en verlies voorbereiden.

## 11.3 Productieprocessen

- [ ] ProductionDefinition.
- [ ] Inputresources.
- [ ] Outputresources.
- [ ] Productiecapaciteit.
- [ ] Productieduur.
- [ ] Productiekosten.
- [ ] Productievoorwaarden.
- [ ] Meerdere activiteiten per bedrijf.

## 11.4 Eerste productieprocessen

**Boerderij**
- [ ] Graanproductie.
- [ ] Waterverbruik.
- [ ] Grondgebruik.
- [ ] Eventueel vee en voer.

**Bakkerij**
- [ ] Meel inkopen.
- [ ] Water en energie gebruiken.
- [ ] Brood produceren.

**Winkel**
- [ ] Producten inkopen.
- [ ] Voorraad beheren.
- [ ] Producten verkopen.

## 11.5 Consumptie

- [ ] Consumptiebehoefte huishoudens.
- [ ] Consumptie van voedsel.
- [ ] Waterverbruik.
- [ ] Energieverbruik.
- [ ] Voorraad aanvullen.
- [ ] Onvervulde behoeften registreren.

### Acceptatiecriteria

- Bedrijven kunnen resources produceren.
- Bedrijven kunnen resources opslaan.
- Bedrijven kunnen resources inkopen.
- Huishoudens kunnen resources consumeren.
- Tekorten en overschotten worden geregistreerd.

---

# 12. Fase 11 – Lokale markt en economie

**Doel:** Productie en consumptie koppelen aan een werkende lokale markt.

## 12.1 Marktstructuur

- [ ] LocalMarket-model.
- [ ] Vraag registreren.
- [ ] Aanbod registreren.
- [ ] Beschikbare voorraad bepalen.
- [ ] Vraag en aanbod koppelen.
- [ ] Markttransacties.
- [ ] Lokale marktstatistieken.

## 12.2 Prijsvorming

- [ ] Basisprijzen.
- [ ] Prijsaanpassing op basis van vraag.
- [ ] Prijsaanpassing op basis van aanbod.
- [ ] Concurrentie.
- [ ] Transportkosten.
- [ ] Prijshistorie.

## 12.3 Handelsprocessen

- [ ] Verkoop tussen bedrijven.
- [ ] Verkoop aan huishoudens.
- [ ] Inkoopcontracten.
- [ ] Handelsvoorwaarden.
- [ ] Levering.
- [ ] Afhandeling van transacties.

## 12.4 Economische statistieken

- [ ] Totale productie.
- [ ] Totale consumptie.
- [ ] Beschikbare voorraad.
- [ ] Tekorten.
- [ ] Overschotten.
- [ ] Import.
- [ ] Export.
- [ ] Economische ontwikkeling.

### Acceptatiecriteria

- Lokale vraag en aanbod worden gekoppeld.
- Producten kunnen daadwerkelijk worden verhandeld.
- Prijzen kunnen reageren op marktomstandigheden.
- Gemeentelijke economische statistieken worden gegenereerd.

---

# 13. Fase 12 – Financieel systeem

**Doel:** Een betrouwbaar financieel systeem voor alle economische entiteiten.

## 13.1 Financiële rekeningen

- [ ] FinancialAccount-model.
- [ ] Huishoudrekeningen.
- [ ] Bedrijfsrekeningen.
- [ ] Grondeigenaarrekeningen.
- [ ] Gemeentelijke rekeningen.
- [ ] Banktegoeden.
- [ ] Rekeningstatus.

## 13.2 Transacties

- [ ] FinancialTransaction-model.
- [ ] Transaction entries.
- [ ] Dubbelboekhouden.
- [ ] Inkomsten.
- [ ] Uitgaven.
- [ ] Betalingen.
- [ ] Overboekingen.
- [ ] Transactiehistorie.
- [ ] Financiële controles.

## 13.3 Belastingen en heffingen

- [ ] Grondbelasting.
- [ ] Bedrijfsbelasting.
- [ ] Vergunningskosten.
- [ ] Gemeentelijke heffingen.
- [ ] Belastinginning.
- [ ] Wanbetaling.
- [ ] Achterstanden.

## 13.4 Leningen

- [ ] Loan-model.
- [ ] Lening verstrekken.
- [ ] Rente.
- [ ] Aflossingen.
- [ ] Betalingsachterstanden.
- [ ] Gemeentelijke leningen.

## 13.5 Gemeentelijke begroting

- [ ] Begrotingsmodel.
- [ ] Inkomstenraming.
- [ ] Uitgavenraming.
- [ ] Investeringen.
- [ ] Onderhoudsbudget.
- [ ] Personeelskosten.
- [ ] Begrotingsresultaat.
- [ ] Financiële rapportage.

### Acceptatiecriteria

- Iedere financiële entiteit heeft een eigen rekening.
- Iedere transactie wordt geregistreerd.
- Financiële mutaties zijn controleerbaar.
- Debet en credit zijn in balans.
- Gemeentelijke financiën zijn gescheiden van bedrijfs- en huishoudfinanciën.

---

# 14. Fase 13 – Aanvragen en vergunningen

**Doel:** Een generiek systeem voor aanvragen, vergunningen en gemeentelijke besluitvorming.

## 14.1 Application Engine

- [ ] Application-model.
- [ ] ApplicationType.
- [ ] ApplicationStatus.
- [ ] Applicant.
- [ ] Betrokken percelen.
- [ ] Betrokken gebouwen.
- [ ] Ingediend op.
- [ ] Behandelstatus.
- [ ] Besluit.
- [ ] Besluitgeschiedenis.

## 14.2 Workflow

- [ ] Aanvraag indienen.
- [ ] Voorwaarden controleren.
- [ ] Automatische validatie.
- [ ] Gemeentelijke beoordeling.
- [ ] Aanvullende informatie opvragen.
- [ ] Goedkeuren.
- [ ] Afwijzen.
- [ ] Goedkeuren onder voorwaarden.
- [ ] Uitvoering verwerken.

## 14.3 Eerste aanvraagtypen

- [ ] Vestigingsaanvraag.
- [ ] Grondaankoop.
- [ ] Grondverkoop.
- [ ] Bouwvergunning.
- [ ] Bestemmingswijziging.
- [ ] Uitbreidingsaanvraag.
- [ ] Omgevingsvergunning.

## 14.4 Beoordelingsvoorwaarden

- [ ] Bestemming.
- [ ] Oppervlakte.
- [ ] Eigendom.
- [ ] Bereikbaarheid.
- [ ] Infrastructuur.
- [ ] Milieu.
- [ ] Water en energie.
- [ ] Financiële draagkracht.
- [ ] Ruimtelijke geschiktheid.

## 14.5 Gemeentelijk aanvraagoverzicht

- [ ] Openstaande aanvragen.
- [ ] Aanvraagdetails.
- [ ] Beoordelingscriteria.
- [ ] Besluit nemen.
- [ ] Besluitmotivering.
- [ ] Historie.
- [ ] Gevolgen van besluiten tonen.

### Acceptatiecriteria

- Huishoudens en bedrijven kunnen aanvragen indienen.
- De gemeente kan aanvragen beoordelen.
- Besluiten worden geregistreerd.
- Goedgekeurde aanvragen kunnen daadwerkelijk worden uitgevoerd.
- Afwijzingen en voorwaarden hebben gevolgen voor de aanvrager.

---

# 15. Fase 14 – Gemeentelijk beleid en bestuur

**Doel:** De speler krijgt de belangrijkste instrumenten om de gemeente actief te besturen.

## 15.1 Beleidsmodel

- [ ] Policy-model.
- [ ] Beleidsdefinities.
- [ ] Beleidsstatus.
- [ ] Beleidswijzigingen.
- [ ] Ingangsdatum.
- [ ] Financiële gevolgen.
- [ ] Economische gevolgen.

## 15.2 Belastingen

- [ ] Grondbelasting instellen.
- [ ] Bedrijfsbelasting instellen.
- [ ] Vergunningskosten instellen.
- [ ] Belastinginkomsten tonen.
- [ ] Effecten op huishoudens en bedrijven.

## 15.3 Subsidies

- [ ] Landbouwsubsidie.
- [ ] Woningbouwsubsidie.
- [ ] Bedrijfsvestigingssubsidie.
- [ ] Voorzieningensubsidie.
- [ ] Subsidievoorwaarden.
- [ ] Subsidie-uitgaven.

## 15.4 Bestemmingsbeleid

- [ ] Bestemmingsplannen aanpassen.
- [ ] Ontwikkelingsgebieden aanwijzen.
- [ ] Bouwvoorwaarden.
- [ ] Milieuvoorwaarden.
- [ ] Gemengde bestemmingen.

## 15.5 Gemeentelijke investeringen

- [ ] Grond aankopen.
- [ ] Gemeentelijke gebouwen realiseren.
- [ ] Wegen aanleggen.
- [ ] Voorzieningen realiseren.
- [ ] Investeringen begroten.
- [ ] Exploitatiekosten berekenen.

### Acceptatiecriteria

- De speler kan gemeentelijk beleid aanpassen.
- Beleidswijzigingen beïnvloeden de simulatie.
- De financiële gevolgen zijn zichtbaar.
- Gemeentelijke investeringen worden daadwerkelijk uitgevoerd.

---

# 16. Fase 15 – Voorzieningen en leefbaarheid

**Doel:** De kwaliteit van de gemeente laten afhangen van voorzieningen, bereikbaarheid en omgevingsfactoren.

## 16.1 Voorzieningen

- [ ] Scholen.
- [ ] Zorgvoorzieningen.
- [ ] Ziekenhuizen.
- [ ] Brandweer.
- [ ] Politie.
- [ ] Sportvoorzieningen.
- [ ] Recreatie.
- [ ] Afvalverwerking.
- [ ] Winkels.

## 16.2 Voorzieningensimulatie

- [ ] Verzorgingsgebieden.
- [ ] Capaciteit.
- [ ] Bezetting.
- [ ] Bereikbaarheid.
- [ ] Kwaliteit.
- [ ] Onderhoudskosten.
- [ ] Personeelsbehoefte.

## 16.3 Leefbaarheid

- [ ] Woonkwaliteit.
- [ ] Veiligheid.
- [ ] Voorzieningenniveau.
- [ ] Milieukwaliteit.
- [ ] Recreatiemogelijkheden.
- [ ] Bereikbaarheid.
- [ ] Algemene tevredenheid.

## 16.4 Milieu

- [ ] Geluidsoverlast.
- [ ] Luchtkwaliteit.
- [ ] Waterkwaliteit voorbereiden.
- [ ] Milieubelasting van industrie.
- [ ] Groengebieden.
- [ ] Milieubeleid.

## 16.5 Gemeentelijke statistieken

- [ ] Leefbaarheidsscore.
- [ ] Veiligheidsscore.
- [ ] Voorzieningendekking.
- [ ] Woningkwaliteit.
- [ ] Tevredenheid.
- [ ] Capaciteitsproblemen.

### Acceptatiecriteria

- Voorzieningen beïnvloeden hun omgeving.
- Capaciteit en bereikbaarheid worden meegenomen.
- De leefbaarheid van wijken kan worden berekend.
- De speler kan zien waar voorzieningen ontbreken of overbelast zijn.

---

# 17. Fase 16 – Geavanceerde simulatie

**Doel:** De wereld verder verdiepen met demografie, complexe economie en aanvullende systemen.

## 17.1 Demografie

- [ ] Geboortes.
- [ ] Sterfte.
- [ ] Leeftijdsontwikkeling.
- [ ] Huishoudens vormen.
- [ ] Huishoudens splitsen.
- [ ] Vergrijzing.
- [ ] Migratie.

## 17.2 Onderwijs en arbeidsmarkt

- [ ] Opleidingsniveaus.
- [ ] Onderwijsbehoefte.
- [ ] Opleidingscapaciteit.
- [ ] Arbeidsmarktontwikkeling.
- [ ] Werkloosheid.
- [ ] Personeelstekorten.
- [ ] Loonontwikkeling.

## 17.3 Geavanceerde economie

- [ ] Meerdere productieketens.
- [ ] Industrie.
- [ ] Landbouw.
- [ ] Veeteelt.
- [ ] Handel.
- [ ] Import.
- [ ] Export.
- [ ] Regionale markt.
- [ ] Transportkosten.
- [ ] Marktconcurrentie.

## 17.4 Geavanceerde infrastructuur

- [ ] Elektriciteitsnet.
- [ ] Waterleidingnet.
- [ ] Riolering.
- [ ] Afvalverwerking.
- [ ] Spoor.
- [ ] Openbaar vervoer.
- [ ] Internet.
- [ ] Capaciteit en netwerkbelasting.

## 17.5 Milieu en duurzaamheid

- [ ] Energieverbruik.
- [ ] Energieproductie.
- [ ] Emissies.
- [ ] Waterverbruik.
- [ ] Afvalproductie.
- [ ] Duurzaamheidsbeleid.
- [ ] Milieukwaliteit op lange termijn.

### Acceptatiecriteria

- De wereld ontwikkelt zich demografisch.
- Productieketens kunnen meerdere stappen bevatten.
- Regionale handel kan worden toegevoegd.
- Infrastructuurcapaciteit beïnvloedt economische activiteiten.
- Duurzaamheid en milieu hebben structurele gevolgen.

---

# 18. Fase 17 – Spelmodi en progressie

**Doel:** De simulatie uitbreiden met verschillende spelervaringen.

## 18.1 Sandbox

- [ ] Vrije wereldontwikkeling.
- [ ] Instelbare startvoorwaarden.
- [ ] Geen verplichte doelstellingen.
- [ ] Vrije beleidskeuzes.

## 18.2 Scenarios

- [ ] Scenario-definities.
- [ ] Startcondities.
- [ ] Financiële uitgangssituatie.
- [ ] Populatie-uitgangssituatie.
- [ ] Scenario-doelen.
- [ ] Succescriteria.
- [ ] Faalvoorwaarden.

Voorbeelden:

- Woningtekort oplossen.
- Werkloosheid terugdringen.
- Gemeentelijke financiën herstellen.
- Een tekort aan voorzieningen oplossen.
- Een vervuilende industrie verduurzamen.

## 18.3 Progression

- [ ] Gemeentelijke ontwikkelingsniveaus.
- [ ] Gehucht.
- [ ] Dorp.
- [ ] Stad.
- [ ] Grote stad.
- [ ] Nieuwe gebouwen ontgrendelen.
- [ ] Nieuwe beleidsmogelijkheden.
- [ ] Nieuwe infrastructuur.
- [ ] Nieuwe uitdagingen.

## 18.4 Gemeentelijke beoordeling

Voortgang wordt niet alleen bepaald door inwonertal.

Mogelijke beoordelingsfactoren:

- Financiële gezondheid.
- Leefbaarheid.
- Werkgelegenheid.
- Voorzieningenniveau.
- Economische ontwikkeling.
- Duurzaamheid.
- Woningmarkt.

### Acceptatiecriteria

- Dezelfde simulation engine ondersteunt verschillende spelmodi.
- Scenario's kunnen verschillende startvoorwaarden hebben.
- Progressie kan nieuwe mogelijkheden vrijgeven.
- Een gemeente kan op meerdere aspecten worden beoordeeld.

---

# 19. Fase 18 – Uitgebreide kaart en visualisatie

**Doel:** De kaart ontwikkelen tot een uitgebreide interactieve gemeentelijke omgeving.

De kaart bestaat al vanaf de eerste fases. In deze fase wordt de presentatie verder uitgebreid.

## 19.1 Kaartfunctionaliteit

- [ ] Interactieve kaart.
- [ ] Meerdere zoomniveaus.
- [ ] Gebouwen selecteren.
- [ ] Percelen selecteren.
- [ ] Infrastructuur selecteren.
- [ ] Objectdetails.
- [ ] Kaartfilters.
- [ ] Informatielagen.
- [ ] Heatmaps.

## 19.2 Geavanceerde weergaven

- [ ] Woningkwaliteit.
- [ ] Grondwaarde.
- [ ] Voorzieningendekking.
- [ ] Bereikbaarheid.
- [ ] Werkgelegenheid.
- [ ] Economische activiteit.
- [ ] Milieukwaliteit.
- [ ] Bestemmingsplannen.
- [ ] Infrastructuurbelasting.

## 19.3 Visuele ontwikkeling

- [ ] Uitgebreidere 2D-weergave.
- [ ] Gebouwvisualisaties.
- [ ] Verschillende gebouwtypen.
- [ ] Terreinvisualisatie.
- [ ] Visuele wijkindeling.
- [ ] Eventueel isometrische weergave.
- [ ] 3D-visualisatie voorbereiden.

De visualisatie mag de simulatie-engine niet afhankelijk maken van een specifieke renderingtechniek.

### Acceptatiecriteria

- De kaart geeft relevante simulatiegegevens inzichtelijk weer.
- De speler kan ruimtelijke problemen herkennen.
- De kaart kan als primair besturingsinstrument worden gebruikt.
- De presentatie kan worden uitgebreid zonder de simulatie te wijzigen.

---

# 20. Fase 19 – Multiplayer voorbereiden en implementeren

**Doel:** De architectuur uitbreiden naar meerdere spelers en gemeenten binnen dezelfde wereld.

Multiplayer is geen onderdeel van de eerste versie.

## 20.1 Architectuurvoorbereiding

- [ ] Player-model.
- [ ] World-model.
- [ ] Municipality-model.
- [ ] WorldId op relevante entiteiten.
- [ ] MunicipalityId waar relevant.
- [ ] Toegangsrechten per World.
- [ ] Toegangsrechten per Municipality.
- [ ] World-scoped simulatie.
- [ ] Gemeentelijke financiën gescheiden houden.

## 20.2 Multiplayerfunctionaliteit

- [ ] Meerdere spelers per World.
- [ ] Meerdere gemeenten per World.
- [ ] Gemeenten beheren.
- [ ] Rechten en rollen.
- [ ] Intergemeentelijke handel.
- [ ] Regionale markt.
- [ ] Regionale infrastructuur.
- [ ] Concurrentie.
- [ ] Samenwerking.
- [ ] Verhuizingen tussen gemeenten.

## 20.3 Synchronisatie

- [ ] World-synchronisatie.
- [ ] Gemeentelijke wijzigingen.
- [ ] Financiële transacties.
- [ ] Simulatiecoördinatie.
- [ ] Conflictafhandeling.
- [ ] Toegangscontrole.

### Acceptatiecriteria

- Meerdere gemeenten kunnen binnen één World bestaan.
- Verschillende spelers kunnen gemeenten beheren.
- De wereld heeft één consistente simulatiestatus.
- Gemeentelijke beslissingen beïnvloeden de gedeelde wereld.

---

# 21. MVP – Eerste speelbare versie

De eerste speelbare versie moet de kern van CCBaantonen.

Niet alle onderdelen uit de roadmap zijn nodig om het concept te bewijzen.

## 21.1 MVP-functionaliteit

### World
- Eén World.
- Eén Municipality.
- Procedureel gegenereerd terrein.
- Grid en chunks.
- Uitbreidbare wereldstructuur.

### Land
- Tiles.
- Percelen.
- Eigendom.
- Bestemmingen.
- Grondwaarde.

### Buildings
- Woningen.
- Boerderijen.
- Winkels.
- Basisvoorzieningen.

### Spatial Simulation
- Geografische invloeden.
- Basis wegennet.
- Netwerkbereikbaarheid.
- Locatiekwaliteit.
- Voorzieningendekking.

### Population
- Individuele inwoners.
- Huishoudens.
- Woningbehoefte.
- Verhuisgedrag.
- Basisbehoeften.

### Businesses
- Individuele bedrijven.
- Eén of twee bedrijfstypen.
- Vestiging.
- Werknemers.
- Basisproductie.

### Economy
- Resources.
- Voorraad.
- Productie.
- Consumptie.
- Lokale markt.

### Finance
- Individuele financiële rekeningen.
- Inkomsten.
- Uitgaven.
- Transacties.
- Gemeentelijke financiën.

### Municipality
- Bestemmingsplannen.
- Grondtransacties.
- Aanvragen.
- Vergunningen.
- Gemeentelijke besluiten.

### Simulation
- Hybride tijdsysteem.
- Server-side simulatie.
- Achtergrondverwerking.
- Basis eventregistratie.

### Interface
- Dashboard.
- Interactieve kaart.
- Perceelinformatie.
- Gebouwinformatie.
- Aanvraagoverzicht.
- Financieel overzicht.
- Kaartlagen.

## 21.2 MVP-acceptatiecriteria

De MVP is geslaagd wanneer:

1. Een speler een gemeente kan aanmaken.
2. De wereld procedureel wordt gegenereerd.
3. De speler de kaart kan bekijken en uitbreiden.
4. Percelen en eigendommen zichtbaar zijn.
5. Bestemmingen kunnen worden gewijzigd.
6. Huishoudens en individuele inwoners ontstaan.
7. Huishoudens zelfstandig woningen zoeken.
8. Huishoudens aanvragen kunnen indienen.
9. De gemeente aanvragen kan beoordelen.
10. Bedrijven zich kunnen vestigen.
11. Bedrijven grondstoffen kunnen produceren.
12. Inwoners producten kunnen consumeren.
13. De lokale economie functioneert.
14. Financiële transacties correct worden geregistreerd.
15. De simulatie zelfstandig kan draaien.
16. Ruimtelijke invloeden de aantrekkelijkheid van locaties beïnvloeden.
17. Beslissingen van de speler zichtbare gevolgen hebben.

---

# 22. Ontwikkelvolgorde en prioriteiten

De fases zijn logisch afhankelijk van elkaar, maar hoeven niet volledig lineair te worden ontwikkeld.

De belangrijkste afhankelijkheden:

| Onderdeel | Afhankelijk van |
|---|---|
| World generation | Project foundation |
| Percelen | World generation |
| Gebouwen | Percelen |
| Infrastructuur | Grid en gebouwen |
| Spatial Simulation | Gebouwen en infrastructuur |
| Huishoudens | Gebouwen en financiën |
| Bedrijven | Gebouwen en financiën |
| Productie | Bedrijven en resources |
| Lokale markt | Productie en consumptie |
| Vergunningen | Percelen, gebouwen en gemeentelijk beleid |
| Leefbaarheid | Spatial Simulation en voorzieningen |
| Progression | Gemeentelijke statistieken en economie |
| Multiplayer | World- en Municipality-architectuur |

## Prioriteit

**Fundering**
1. Project foundation.
2. World generation.
3. Land en eigendom.
4. Gebouwen.
5. Infrastructuur.
6. Spatial Simulation.
7. Simulation Engine.

**Speelbare simulatie**
8. Huishoudens en inwoners.
9. Bedrijven.
10. Resources en productie.
11. Lokale markt.
12. Financieel systeem.
13. Aanvragen en vergunningen.
14. Gemeentelijk beleid.

**Verdieping**
15. Voorzieningen en leefbaarheid.
16. Geavanceerde simulatie.
17. Spelmodi en progressie.
18. Uitgebreide kaartvisualisatie.
19. Multiplayer.

---

# 23. Technische aandachtspunten

## 23.1 Performance

De simulatie bevat potentieel duizenden individuele entiteiten.

Daarom:

- Simuleer niet ieder object onnodig bij iedere tick.
- Gebruik verschillende uitvoeringsfrequenties.
- Bereken alleen relevante ruimtelijke invloeden opnieuw.
- Gebruik chunks voor geografische gegevens.
- Gebruik efficiënte netwerkberekeningen.
- Aggregeer statistieken waar mogelijk.
- Houd de databasebelasting beheersbaar.

## 23.2 Determinisme

Wereldgeneratie en waar mogelijk simulatieberekeningen moeten reproduceerbaar zijn.

Gebruik vaste seeds en controleerbare invoerwaarden.

Dit helpt bij debugging, testen en herstel.

## 23.3 Financiële betrouwbaarheid

Financiële transacties mogen nooit gedeeltelijk worden verwerkt.

Gebruik database-transacties en dubbelboekhouden.

Financiële mutaties moeten altijd herleidbaar zijn naar hun oorzaak.

## 23.4 Simulatiebetrouwbaarheid

Een simulatie-tick mag niet meerdere keren gelijktijdig worden uitgevoerd voor dezelfde World.

Gebruik locking, taakregistratie en idempotente verwerking.

## 23.5 Uitbreidbaarheid

Nieuwe gebouwtypen, resources, productieprocessen, voorzieningen en beleidsvormen moeten zoveel mogelijk kunnen worden toegevoegd zonder bestaande systemen fundamenteel aan te passen.

## 23.6 Multiplayer

Ook al wordt multiplayer pas later ontwikkeld, relevante gegevens moeten vanaf het begin World-scoped zijn.

Voorkom dat de architectuur uitgaat van één globale wereld of één globale gemeente.

---

# 24. Definition of Done

Een onderdeel is pas afgerond wanneer:

- De domeinlogica geïmplementeerd is.
- Validatie aanwezig is.
- Databasewijzigingen zijn verwerkt.
- Foutafhandeling aanwezig is.
- De frontend de functionaliteit kan gebruiken waar relevant.
- De simulatie-integratie werkt waar relevant.
- Basis- en randgevallen getest zijn.
- De functionaliteit geen bestaande gegevens beschadigt.
- De documentatie is bijgewerkt.

Een fase is afgerond wanneer de bijbehorende acceptatiecriteria aantoonbaar werken.

---

# 25. Einddoel

Het einddoel is een diepgaande gemeentelijke simulatie waarin de speler een levende wereld bestuurt.

De kaart, economie, infrastructuur, inwoners, bedrijven en gemeentelijke besluitvorming vormen samen één samenhangend systeem.

De speler moet voortdurend keuzes maken tussen korte- en langetermijnbelangen.

Een gemeente kan economisch groeien maar minder leefbaar worden. Een investering kan op korte termijn geld kosten, maar op lange termijn de aantrekkelijkheid van de gemeente verhogen. Een nieuwe wijk kan woningtekorten oplossen, maar tegelijkertijd nieuwe problemen veroorzaken wanneer voorzieningen en infrastructuur achterblijven.

De kern van CCBis daarom niet het bouwen van zoveel mogelijk gebouwen, maar het ontwikkelen en besturen van een goed functionerende gemeente.