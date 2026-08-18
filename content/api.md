---
title: "Forecast API"
layout: "api-docs"
url: "/docs/api"
summary: "JSON-API für Wahlprognosen, Posterior-Draws und Aktuelle Stimmung"
hideMeta: true
---

Öffentliche JSON-API für **Wahlprognosen**, **Posterior-Draws** und die **Aktuelle Stimmung**. Keine Authentifizierung. Nur `GET`. CORS: `Access-Control-Allow-Origin: *`.

Einzelumfragen liegen in der separaten **[Polling API](https://api.zweitstimme.org/docs)**. Diese Seite dokumentiert die Forecast API unter `https://zweitstimme.org`.

**Discovery:** [`/api/index.json`](/api/index.json) · **OpenAPI:** [`/api/openapi.json`](/api/openapi.json)

**Forecast** = Modelloutput für den Wahltag (Punktschätzung, Intervalle, Szenarien, Draws). **Stimmung** = geglättete tägliche Unterstützung, ohne Sitzszenarien. State-Forecasts nur im ~90-Tage-Fenster vor der Wahl.

Lizenz: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.de), Namensnennung **zweitstimme.org**. Umfragedaten u. a. [dawum.de](https://dawum.de) ([ODbL](https://opendatacommons.org/licenses/odbl/)) und [wahlrecht.de](https://www.wahlrecht.de).
