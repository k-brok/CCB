# CCB – Game Design & Design Principles

**Document:** DESIGN.md  
**Versie:** 1.0  
**Project:** CCB

## 1. Ontwerpfilosofie

CCB is een gemeentelijke simulatiegame waarin de speler niet rechtstreeks de stad bestuurt, maar verantwoordelijk is voor het functioneren en ontwikkelen van de gemeente.

De belangrijkste ontwerpgedachte is dat de spelwereld zelfstandig functioneert.

Inwoners, huishoudens, bedrijven en grondeigenaren hebben eigen belangen en nemen zelfstandig beslissingen. De gemeente beïnvloedt deze beslissingen door beleid, regelgeving, vergunningen, infrastructuur en investeringen.

De speler moet voortdurend afwegingen maken tussen economische ontwikkeling, leefbaarheid, bereikbaarheid, voorzieningen en gemeentelijke financiën.

### 1.1 De gemeente is geen almachtige speler

De speler kan niet zomaar ieder gebouw plaatsen of iedere grondpositie aanpassen.

Grond heeft een eigenaar. Gebouwen hebben een eigenaar. Bestemmingen bepalen wat ergens toegestaan is. Ontwikkelingen moeten voldoen aan de geldende voorwaarden.

De gemeente kan:

- Bestemmingsplannen vaststellen.
- Vergunningen verlenen of weigeren.
- Gemeentelijke grond verkopen of ontwikkelen.
- Grond aankopen.
- Infrastructuur realiseren.
- Voorzieningen bouwen.
- Belastingen en subsidies vaststellen.
- Regels en beleidskaders aanpassen.

De gemeente kan echter niet zonder meer beschikken over particuliere eigendommen.

### 1.2 Zelfstandige entiteiten

Iedere inwoner, ieder huishouden en ieder bedrijf is een zelfstandige entiteit.

De simulatie moet niet bestaan uit abstracte totalen zoals alleen een inwonertal of een aantal bedrijven. Achter deze totalen zitten individuele objecten met eigenschappen en beslissingen.

Statistieken zijn afgeleide informatie uit de individuele simulatie.

### 1.3 Gevolgen in plaats van incidenten

Niet iedere gebeurtenis hoeft expliciet gesimuleerd te worden.

Een woning met slechte bereikbaarheid voor hulpdiensten hoeft bijvoorbeeld niet daadwerkelijk in brand te vliegen. Het effect kan worden verwerkt in de veiligheidsscore en aantrekkelijkheid van de woning.

Het spel richt zich op de structurele gevolgen van gemeentelijke keuzes, niet op het simuleren van ieder individueel incident.

---

## 2. De wereld en geografische structuur

### 2.1 Grid als ruimtelijke basis

De volledige spelwereld is gebaseerd op een raster van tiles.

Iedere tile heeft een unieke positie binnen de wereld en bevat geografische eigenschappen.

Voorbeelden:

- X- en Y-coördinaat.
- Hoogte.
- Bodemsoort.
- Vruchtbaarheid.
- Waterbeschikbaarheid.
- Helling.
- Vegetatie.
- Wateroppervlak.
- Eventuele infrastructuur.
- Koppeling aan een perceel.

De tile is de kleinste ruimtelijke eenheid van de simulatie.

De tile hoeft niet altijd een individueel object in de database te zijn. Ongewijzigde terreingegevens kunnen vanuit de wereldseed worden gegenereerd. Alleen wijzigingen hoeven persistent opgeslagen te worden.

### 2.2 Chunks

De wereld wordt verdeeld in chunks. Een chunk bevat een verzameling tiles.

Voordelen:

- Efficiënte generatie van grote werelden.
- Lazy loading van gebieden.
- Gerichte opslag van wijzigingen.
- Uitbreidbaarheid van de kaart.
- Mogelijkheid om alleen actieve gebieden intensief te simuleren.

De wereld wordt gegenereerd met een seed. Het genereren van nieuwe chunks mag bestaande werelddata niet veranderen.

### 2.3 Procedurele wereldgeneratie

De wereld wordt gegenereerd op basis van een seed en generatieparameters.

De generatie bepaalt onder andere:

- Hoogteverschillen.
- Waterlopen en watergebieden.
- Bodemsoorten.
- Vruchtbaarheid.
- Natuurlijke vegetatie.
- Natuurlijke beperkingen voor ontwikkeling.

De wereld moet logisch samenhangend zijn. Nieuwe chunks moeten aansluiten op bestaande chunks.

### 2.4 Percelen

Een perceel bestaat uit één of meerdere tiles.

Percelen kunnen onregelmatige vormen hebben en kunnen worden samengevoegd of gesplitst.

Een perceel bevat onder andere:

- Kadastrale identificatie.
- Oppervlakte.
- Eigenaar.
- Bestemming.
- Marktwaarde.
- Verkoopstatus.
- Gebruiksrechten.
- Gekoppelde gebouwen.

Eigendom en bestemming zijn afzonderlijke eigenschappen.

Een particulier kan eigenaar zijn van grond met een woonbestemming, terwijl een bestemmingswijziging door de gemeente moet worden goedgekeurd.

### 2.5 Gebouwen

Gebouwen zijn gekoppeld aan percelen en beslaan één of meerdere tiles.

Een gebouw kan verschillende functies hebben:

- Woning.
- Winkel.
- Kantoor.
- Fabriek.
- Boerderij.
- School.
- Ziekenhuis.
- Brandweerkazerne.
- Politiebureau.
- Gemeentelijke voorziening.

Gebouwen hebben eigenschappen zoals:

- Type.
- Eigenaar.
- Bouwjaar.
- Bouwkosten.
- Onderhoudskosten.
- Capaciteit.
- Bezetting.
- Staat van onderhoud.
- Ruimtelijke invloeden.
- Eventuele productie- of consumptieprocessen.

De gebouwdefinities moeten configureerbaar zijn.

---

## 3. Kaart en ruimtelijke simulatie

### 3.1 De kaart is onderdeel van de gameplay

De kaart is niet uitsluitend een visuele presentatie van de spelwereld.

De ruimtelijke positie van gebouwen, infrastructuur, woningen, bedrijven en voorzieningen heeft directe invloed op de simulatie.

De kaart bepaalt mede:

- Welke locaties geschikt zijn voor ontwikkeling.
- Hoe aantrekkelijk woningen zijn.
- Hoe goed bedrijven bereikbaar zijn.
- Hoe efficiënt transport verloopt.
- Welke voorzieningen beschikbaar zijn.
- Hoeveel infrastructuur nodig is.
- Welke grondwaarde een locatie heeft.

De speler moet ruimtelijke keuzes kunnen maken en de gevolgen daarvan kunnen zien.

### 3.2 Kaartlagen

De kaart ondersteunt verschillende informatielagen.

| Kaartlaag | Informatie |
|---|---|
| Terrein | Hoogte, bodem, water en vegetatie |
| Percelen | Grenzen, oppervlakte en eigendom |
| Bestemming | Toegestane functies en bestemmingsplannen |
| Gebouwen | Gebouwtypen, functies en bezetting |
| Infrastructuur | Wegen, spoor, water, elektriciteit en riolering |
| Bereikbaarheid | Afstand en netwerkbereikbaarheid |
| Voorzieningen | Dekking en capaciteit |
| Leefbaarheid | Woonkwaliteit en omgevingsfactoren |
| Economie | Werkgelegenheid en economische activiteit |
| Grondwaarde | Marktwaarde en ontwikkelpotentieel |

Kaartlagen kunnen afzonderlijk of gecombineerd worden weergegeven.

### 3.3 Invloedsgebieden

Gebouwen kunnen één of meerdere invloedsgebieden hebben.

Een invloedsgebied beschrijft hoe een gebouw de omgeving beïnvloedt.

Een invloed kan:

- Positief of negatief zijn.
- Geografisch of netwerkgebaseerd zijn.
- Een vaste of afnemende sterkte hebben.
- Eén of meerdere eigenschappen beïnvloeden.
- Afhankelijk zijn van de capaciteit en bezetting van het gebouw.

Voorbeelden:

| Gebouw | Invloed |
|---|---|
| School | Aantrekkelijkheid voor gezinnen |
| Supermarkt | Beschikbaarheid dagelijkse voorzieningen |
| Park | Woonkwaliteit en recreatie |
| Brandweerkazerne | Veiligheid en hulpdienstbereikbaarheid |
| Ziekenhuis | Zorgbereikbaarheid |
| Industrie | Geluid, milieu en luchtkwaliteit |
| Station | Bereikbaarheid en aantrekkelijkheid |
| Sportvoorziening | Recreatie en leefbaarheid |

### 3.4 Geografische invloed

Geografische invloed wordt bepaald door de fysieke afstand tussen locaties.

Bijvoorbeeld: een park verhoogt de woonkwaliteit van omliggende woningen binnen een bepaald bereik.

De invloed kan afnemen naarmate de afstand groter wordt.

Mogelijke modellen:

- Constant: volledige invloed binnen een bepaald bereik.
- Lineair: invloed neemt gelijkmatig af.
- Exponentieel: invloed neemt snel af en wordt daarna geleidelijk kleiner.

De invloed hoeft niet voor iedere tile hetzelfde te zijn.

### 3.5 Netwerkgebaseerde invloed

Netwerkgebaseerde invloed wordt bepaald door de bereikbaarheid via infrastructuur.

De geografische afstand is hierbij niet voldoende.

Een school op korte afstand kan slecht bereikbaar zijn wanneer er geen geschikte verbinding is.

Voorbeelden:

- Reistijd naar een school via wegen.
- Bereikbaarheid van een woning door de brandweer.
- Transportkosten tussen bedrijven.
- Bereikbaarheid van een station.
- Afstand tot voorzieningen via wandelroutes.

De infrastructuur vormt hiervoor een netwerk waarop routeberekeningen uitgevoerd kunnen worden.

### 3.6 Capaciteit

Een voorziening kan een beperkte capaciteit hebben.

Een school kan bijvoorbeeld geografisch dichtbij zijn, maar volledig bezet zijn.

De invloed van een voorziening moet daarom rekening kunnen houden met:

- Maximale capaciteit.
- Huidige bezetting.
- Beschikbare capaciteit.
- Eventuele wachtrijen.
- Kwaliteit van de voorziening.

### 3.7 Locatiekwaliteit

Woningen en bedrijven krijgen een locatiekwaliteit op basis van de omgeving.

Voor woningen kunnen de volgende eigenschappen worden gebruikt:

- Wooncomfort.
- Veiligheid.
- Bereikbaarheid.
- Voorzieningenniveau.
- Milieukwaliteit.
- Recreatiemogelijkheden.
- Algemene leefbaarheid.

Voor bedrijven kunnen andere eigenschappen gelden:

- Bereikbaarheid.
- Beschikbaarheid van personeel.
- Nabijheid van leveranciers.
- Nabijheid van afzetmarkten.
- Beschikbaarheid van grondstoffen.
- Grondkosten.
- Milieu- en bestemmingsbeperkingen.

Deze scores beïnvloeden onder andere de aantrekkelijkheid, marktwaarde en vestigingsbeslissingen.

### 3.8 Berekening en performance

Ruimtelijke invloeden worden niet onnodig bij iedere simulatiestap opnieuw berekend.

Invloedberekeningen worden opnieuw uitgevoerd wanneer relevante omstandigheden veranderen.

Voorbeelden:

- Een gebouw wordt geplaatst of verwijderd.
- Een gebouw verandert van functie.
- Een weg wordt aangelegd of verwijderd.
- Een voorziening krijgt een andere capaciteit.
- Een bestemming wordt gewijzigd.

Berekeningen worden beperkt tot relevante gebieden en objecten.

---

## 4. Inwoners en huishoudens

### 4.1 Individuele inwoners

Iedere inwoner is een individuele entiteit.

Eigenschappen kunnen zijn:

- Identiteit.
- Leeftijd.
- Opleiding.
- Beroep.
- Werkgever.
- Inkomen.
- Gezondheid.
- Huishouden.
- Woonlocatie.

Niet iedere eigenschap hoeft vanaf de eerste versie daadwerkelijk invloed te hebben op de simulatie.

### 4.2 Huishoudens

Een huishouden groepeert inwoners die samenwonen en gezamenlijke financiële beslissingen nemen.

Een huishouden heeft onder andere:

- Gezamenlijke financiële rekening.
- Woning.
- Woonlasten.
- Consumptiepatroon.
- Behoeften.
- Verhuisvoorkeuren.

Een huishouden kan bestaan uit één of meerdere inwoners.

### 4.3 Behoeften

Huishoudens hebben verschillende behoeften:

- Huisvesting.
- Voedsel.
- Water.
- Energie.
- Werk.
- Onderwijs.
- Zorg.
- Recreatie.
- Sociale voorzieningen.

De mate waarin aan deze behoeften wordt voldaan beïnvloedt de tevredenheid en woonkeuzes.

### 4.4 Verhuisgedrag

Huishoudens kunnen zelfstandig beslissen om:

- Een woning te kopen.
- Een woning te huren.
- Een woning te bouwen.
- Een woning te verkopen.
- Te verhuizen.
- Een gemeente te verlaten.

De beslissing wordt beïnvloed door financiële middelen, woningaanbod, locatiekwaliteit en persoonlijke behoeften.

---

## 5. Bedrijven

### 5.1 Individuele bedrijven

Iedere onderneming is een zelfstandige entiteit met een eigen financiële administratie, locatie, activiteiten en beslissingen.

Bedrijven kunnen:

- Grond kopen of huren.
- Een vestiging openen.
- Gebouwen realiseren.
- Werknemers aannemen.
- Producten inkopen.
- Produceren.
- Producten verkopen.
- Uitbreiden.
- Investeren.
- Verhuizen.
- Failliet gaan of sluiten.

### 5.2 Bedrijfsprofielen

Bedrijfstypen worden configureerbaar gedefinieerd.

Een bedrijfsprofiel bevat bijvoorbeeld:

- Benodigde oppervlakte.
- Geschikte bestemmingen.
- Locatievoorkeuren.
- Benodigd personeel.
- Productieprocessen.
- Benodigde grondstoffen.
- Productiecapaciteit.
- Producten.
- Financiële uitgangspunten.

De configuratie beschrijft het type bedrijf. Het daadwerkelijke gedrag wordt door TypeScript-simulatiesystemen uitgevoerd.

### 5.3 Meerdere activiteiten

Een bedrijf kan meerdere activiteiten uitvoeren.

Een agrarisch bedrijf kan bijvoorbeeld:

- Akkerbouw uitvoeren.
- Vee houden.
- Melk produceren.
- Veevoer inkopen.
- Grondstoffen verkopen.

Een bedrijf hoeft dus niet altijd één enkel product of één enkele activiteit te hebben.

---

## 6. Economie

### 6.1 Lokale economie

De economie is in eerste instantie lokaal.

Bedrijven produceren goederen en diensten. Huishoudens en andere bedrijven kopen deze producten.

Vraag en aanbod bepalen mede de economische ontwikkeling.

Regionale handel en externe markten kunnen later worden toegevoegd.

### 6.2 Resources

Resources zijn goederen, grondstoffen en andere verhandelbare of verbruikbare middelen.

Voorbeelden:

- Voedsel.
- Water.
- Energie.
- Hout.
- Graan.
- Melk.
- Vlees.
- Meel.
- Bouwmaterialen.

Resources hebben een definitie met onder andere:

- Naam.
- Categorie.
- Eenheid.
- Houdbaarheid.
- Verwerkbaarheid.
- Verhandelbaarheid.

### 6.3 Voorraad

Bedrijven en huishoudens kunnen eigen voorraden hebben.

Voorbeelden:

- Een supermarkt heeft winkelvoorraad.
- Een fabriek heeft grondstoffen.
- Een boerderij heeft geproduceerde goederen.
- Een huishouden heeft voedsel en andere consumptiegoederen.

De gemeente beheert geen algemene voorraad resources.

De gemeente registreert wel geaggregeerde economische informatie.

### 6.4 Productie en consumptie

Productieprocessen definiëren welke resources nodig zijn en welke producten worden gemaakt.

Voorbeelden:

**Bakkerij**
- Input: meel, water en energie.
- Output: brood.

**Boerderij**
- Input: grond, water en eventueel voer.
- Output: graan, melk of vlees.

**Huishouden**
- Input: voedsel, water en energie.
- Output: consumptie en eventueel afval.

### 6.5 Lokale markt

De lokale markt koppelt vraag en aanbod.

De markt houdt rekening met:

- Beschikbare productie.
- Voorraad.
- Consumptiebehoefte.
- Prijs.
- Transportkosten.
- Concurrentie.

Dynamische prijzen worden geleidelijk geïntroduceerd.

---

## 7. Financiële simulatie

### 7.1 Echt geldsysteem

Het spel gebruikt een echt financieel systeem in plaats van uitsluitend abstracte periodetotalen.

Huishoudens, bedrijven, grondeigenaren en de gemeente hebben financiële rekeningen.

Iedere financiële mutatie wordt geregistreerd.

### 7.2 Financiële administratie

Het financiële systeem ondersteunt:

- Banktegoeden.
- Inkomsten.
- Uitgaven.
- Belastingen.
- Schulden.
- Leningen.
- Rente.
- Investeringen.
- Grondtransacties.
- Salarissen.
- Onderhoudskosten.

Financiële transacties worden betrouwbaar vastgelegd met een dubbelboekhoudkundige administratie.

### 7.3 Gemeentelijke financiën

De gemeente ontvangt onder andere inkomsten uit:

- Belastingen.
- Vergunningen.
- Grondverkoop.
- Subsidies.
- Gemeentelijke voorzieningen.

De gemeente heeft uitgaven voor:

- Personeel.
- Onderhoud.
- Infrastructuur.
- Voorzieningen.
- Subsidies.
- Investeringen.
- Leningen.

De gemeentelijke begroting moet inzicht geven in de financiële gezondheid en toekomstige verplichtingen.

---

## 8. Gemeentelijk bestuur

### 8.1 Bestemmingsplannen

De gemeente bepaalt welke functies op bepaalde locaties zijn toegestaan.

Voorbeelden:

- Wonen.
- Landbouw.
- Industrie.
- Commercieel.
- Maatschappelijk.
- Recreatie.
- Gemengd gebruik.

Bestemming en eigendom blijven gescheiden.

### 8.2 Vergunningen en aanvragen

Ontwikkelingen kunnen een aanvraag vereisen.

Voorbeelden:

- Vestigingsaanvraag.
- Bouwvergunning.
- Bestemmingswijziging.
- Grondaankoop.
- Grondverkoop.
- Uitbreiding.
- Handelsvergunning.
- Omgevingsvergunning.

Een aanvraag doorloopt een generieke workflow:

1. Indienen.
2. Voorwaarden controleren.
3. Beoordelen.
4. Besluit nemen.
5. Uitvoering verwerken.

Mogelijke uitkomsten:

- Goedkeuren.
- Afwijzen.
- Goedkeuren onder voorwaarden.
- Aanvullende informatie opvragen.
- Nader onderzoek vereisen.

### 8.3 Beleid

De speler kan beleid aanpassen.

Voorbeelden:

- Bedrijfsbelasting.
- Grondbelasting.
- Landbouwsubsidies.
- Milieuregels.
- Bouwregels.
- Onderwijsbeleid.
- Woningbouwbeleid.

Beleid heeft financiële, economische en maatschappelijke gevolgen.

---

## 9. Infrastructuur en voorzieningen

Infrastructuur vormt de verbinding tussen locaties en bepaalt mede de bereikbaarheid en economische efficiëntie.

Mogelijke infrastructuurtypen:

- Wegen.
- Spoorwegen.
- Waterwegen.
- Elektriciteit.
- Waterleidingen.
- Riolering.
- Internet.

De eerste versie richt zich op wegen en bereikbaarheid.

Voorzieningen kunnen gemeentelijk, commercieel of particulier eigendom zijn.

Voorbeelden:

- Scholen.
- Ziekenhuizen.
- Brandweer.
- Politie.
- Winkels.
- Sportvoorzieningen.
- Afvalverwerking.

Voorzieningen kunnen een verzorgingsgebied, capaciteit, kostenstructuur en invloedsgebied hebben.

---

## 10. Tijd en simulatie

### 10.1 Hybride tijdsysteem

De tijd loopt automatisch, maar de speler kan:

- Pauzeren.
- Normaal spelen.
- Versnellen.
- Extra versnellen.
- Handmatig een periode uitvoeren.

De simulatie gebruikt vaste tijdstappen.

### 10.2 Server-side simulatie

De server is de bron van waarheid voor de spelwereld en de tijd.

De browser bepaalt niet zelfstandig de simulatiestatus.

De simulatie moet betrouwbaar kunnen doorgaan wanneer de speler offline is. Hiervoor worden achtergrondverwerking en gecontroleerde inhaalberekeningen gebruikt.

### 10.3 Simulatiesystemen

De simulatie bestaat uit afzonderlijke systemen, zoals:

- PopulationSystem.
- HouseholdSystem.
- BusinessSystem.
- DemandSystem.
- ProductionSystem.
- ConsumptionSystem.
- MarketSystem.
- TradeSystem.
- FinanceSystem.
- ApplicationSystem.
- LandSystem.
- InfrastructureSystem.
- SpatialInfluenceSystem.

Systemen hebben een vastgelegde uitvoeringsvolgorde en expliciete afhankelijkheden.

---

## 11. Spelmodi en voortgang

### Sandbox
Vrije ontwikkeling zonder verplichte doelstellingen.

### Scenarios
Specifieke uitdagingen met beginvoorwaarden en doelstellingen.

### Progression
Geleidelijke uitbreiding van mogelijkheden naarmate de gemeente groeit en zich ontwikkelt.

Voortgang wordt niet uitsluitend bepaald door inwonertal.

Belangrijke factoren zijn:

- Leefbaarheid.
- Financiële gezondheid.
- Werkgelegenheid.
- Voorzieningen.
- Duurzaamheid.
- Economische ontwikkeling.

---

## 12. Technische ontwerpprincipes

### 12.1 Modular Monolith

Het project wordt opgezet als een modulaire monolith.

Domeinmodules hebben eigen modellen, services, validatie en repositories.

Microservices zijn niet nodig voor de eerste versie.

### 12.2 Scheiding van verantwoordelijkheden

De frontend, domeinlogica en simulatie-engine zijn onafhankelijk van elkaar opgebouwd.

De simulatie-engine mag niet afhankelijk zijn van Next.js of browserfunctionaliteit.

### 12.3 Configuratie en gedrag

Definities van gebouwen, resources, bedrijfstypen, productieprocessen en aanvraagtypen zijn waar mogelijk configureerbaar.

Complex gedrag blijft expliciet in TypeScript geïmplementeerd.

### 12.4 Betrouwbaarheid

Financiële transacties, eigendomsoverdrachten en simulatie-events moeten betrouwbaar worden verwerkt.

Gebruik waar nodig:

- Database-transacties.
- Idempotente verwerking.
- Eventregistratie.
- Transactionele outbox.
- Herstelbare achtergrondtaken.

### 12.5 Voorbereid op multiplayer

De eerste versie is singleplayer.

De architectuur maakt onderscheid tussen:

- Player.
- World.
- Municipality.

Een wereld heeft een eigen simulatieklok en kan later meerdere gemeenten bevatten.

Relevante entiteiten krijgen een WorldId. Gemeentelijke entiteiten krijgen daarnaast een MunicipalityId waar dat van toepassing is.

Multiplayerfunctionaliteit wordt niet in de eerste versie geïmplementeerd.