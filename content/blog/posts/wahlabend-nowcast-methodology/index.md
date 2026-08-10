---
title: "Wie funktioniert unser Wahlabend-Nowcast?"
date: 2026-08-10T12:00:00+02:00
draft: false
---

<style>
.meth-fig {
  margin: 1.35rem 0 1.75rem;
  padding: 1rem 1.1rem 1.05rem;
  border: 1px solid var(--border, #e6e6e6);
  border-radius: 12px;
  background: #fff;
}
.meth-fig-title {
  margin: 0 0 0.15rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.01em;
}
.meth-fig-cap {
  margin: 0.85rem 0 0;
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--secondary, #666);
}
.meth-fig-cap strong { color: #444; font-weight: 600; }
.meth-pipeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.65rem;
}
.meth-pipeline-step {
  position: relative;
  padding: 0.85rem 0.75rem 0.8rem;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  background: #fafafa;
  min-width: 0;
}
.meth-pipeline-step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 1.35rem;
  right: -0.55rem;
  width: 0.45rem;
  height: 0.45rem;
  border-right: 2px solid #c5c9ce;
  border-top: 2px solid #c5c9ce;
  transform: rotate(45deg);
  z-index: 1;
}
.meth-pipeline-n {
  width: 1.45rem;
  height: 1.45rem;
  border-radius: 999px;
  background: #3a4654;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.45rem;
}
.meth-pipeline-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.2rem;
}
.meth-pipeline-text {
  font-size: 0.78rem;
  line-height: 1.35;
  color: #666;
}
.meth-formula {
  margin: 1rem 0;
  padding: 0.85rem 1rem;
  border-left: 3px solid #3a4654;
  background: #f7f8f9;
  border-radius: 0 8px 8px 0;
  font-size: 0.92rem;
  line-height: 1.45;
  color: #222;
}
.meth-formula code {
  font-size: 0.88em;
  background: transparent;
  padding: 0;
}
.meth-callout {
  margin: 1.1rem 0;
  padding: 0.85rem 1rem;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  background: #fafafa;
  font-size: 0.92rem;
  line-height: 1.45;
}
@media (max-width: 900px) {
  .meth-pipeline { grid-template-columns: 1fr 1fr; }
  .meth-pipeline-step:nth-child(2)::after,
  .meth-pipeline-step:nth-child(4)::after { display: none; }
}
@media (max-width: 480px) {
  .meth-pipeline { grid-template-columns: 1fr; }
  .meth-pipeline-step::after { display: none !important; }
}
</style>

## Der Nowcast am Wahlabend

Zwischen 18 Uhr und dem endgültigen Ergebnis kommt die Auszählung **stückweise**: zuerst einzelne Wahlbezirke, oft Zweitstimme und Wahlbeteiligung früher als die Erststimme. Der **Wahlabend-Nowcast** schätzt daraus laufend, wo die Wahl landet — Anteile, Beteiligung, Direktmandate, Einzug und Parlamentsgröße — **ohne** auf den letzten Wahlbezirk zu warten.

Die aktuelle Vorschau ist ein **Replay der Abgeordnetenhauswahl 2023**: Wir spielen die Nacht mit echten Endständen und einer Meldechronologie durch. Am echten Abend 2026 ersetzt der Live-Feed der Amtlichen Wahllokale denselben Mechanismus.

### Was der Nowcast beantwortet — und was nicht

| | **Vor der Wahl** | **Wahlabend-Nowcast** |
|---|---|---|
| Frage | Wie fällt die Wahl aus, wenn heute gewählt würde? | Was sagen die **schon gemeldeten** Bezirke über den Rest? |
| Daten | Umfragen + Historie | Gemeldete Wahlbezirke + Ausgangslage |
| Unsicherheit | Modell-Intervall der Prognose | Band, das mit der Auszählung **schrumpft** |
| „Wahr“-Linien | — | Nur in der **Replay-Vorschau** (Endstand bekannt) |

<div class="meth-callout">
<strong>Kurzformel:</strong> Für jeden noch offenen Wahlbezirk bleibt die Ausgangslage stehen, plus dem, was die schon gezählten Bezirke an Überraschung gezeigt haben — aber nur so stark, wie die Stichprobe groß und typisch genug ist.
</div>

<div class="meth-fig">
  <p class="meth-fig-title">Ablauf in fünf Schritten</p>
  <ol class="meth-pipeline">
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">1</div>
      <div class="meth-pipeline-title">Ausgangslage</div>
      <div class="meth-pipeline-text">Historie + Vorwahl-Ziel π₀ je Wahlbezirk</div>
    </li>
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">2</div>
      <div class="meth-pipeline-title">Meldung</div>
      <div class="meth-pipeline-text">AfS-Wahlbezirke (Urne/Brief) mit Zeitstempel</div>
    </li>
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">3</div>
      <div class="meth-pipeline-title">Überraschung</div>
      <div class="meth-pipeline-text">Ist vs. Prior in den gemeldeten Bezirken</div>
    </li>
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">4</div>
      <div class="meth-pipeline-title">Übertragung</div>
      <div class="meth-pipeline-text">Lokal (Bezirk×Art) + strukturähnliche Nachbarn</div>
    </li>
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">5</div>
      <div class="meth-pipeline-title">Aggregate</div>
      <div class="meth-pipeline-text">Land, Listen, WK-Calls, Größe, Beteiligung</div>
    </li>
  </ol>
  <p class="meth-fig-cap">Gemeldete Bezirke werden <strong>festgeschrieben</strong> (kein „Zurückschätzen“). Nur der Rest wird fortgeschrieben.</p>
</div>

---

## 1. Daten

**Quellen (Berlin):** Amt für Statistik Berlin-Brandenburg — Wahlbezirksergebnisse, Strukturdaten, AFSPRAES-`Datenexport_*_W_BE.csv` am Abend.

| Feld | Rolle |
|---|---|
| Zweitstimme je WB | Landes-/Bezirkslisten-Nowcast |
| Erststimme je WB | Direktmandate / Calls |
| Wahlberechtigte, Wählende | Wahlbeteiligung |
| Urne vs. Brief | getrennte Korrektur (Brief oft ohne eigene Wahlberechtigte) |
| Strukturmerkmale | Nachbarschaft ähnlicher Bezirke |
| Meldezeit (`Datum`/`Zeit`) | Reihenfolge der Nacht |

In der Vorschau nutzen wir den **Endstand AGH 2023** und die `_W_`-Zeiten. Wichtig: In eingefrorenen Exporten sind die Zeiten oft **Nachbearbeitung**, nicht der echte Eingang in der Wahlnacht. Deshalb gibt es zusätzlich simulierte Meldeordnungen (zufällig, Urne zuerst, …).

---

## 2. Ausgangslage (Prior)

Vor der ersten Meldung braucht jeder Wahlbezirk eine Erwartung.

1. **Historie (L1):** Ergebnis der vorherigen vergleichbaren Wahl auf denselben Gebieten (im Replay: AGH 2016 → 2023er Bezirke).
2. **Vorwahl-Ziel π₀:** landesweite Erwartung vor der Wahl (Umfragen / [Landesprognose](/blog/posts/state-forecast-methodology/)).
3. **Proportionaler Swing:** Jeder Bezirk wird so verschoben, dass das Aggregat π₀ trifft — ohne die relative Struktur der Bezirke zu zerstören.

Für die **Erststimme** kommt ein zusätzlicher Schritt: Übergang von Zweit- zu Erststimme aus dem [Wahlkreis-Modell](/blog/posts/district-forecast-methodology/) (historische Erst/Zweit-Beziehung), nicht einfach „Zweitstimme = Direktmandat“.

<div class="meth-formula">
Prior<sub>i</sub> = Swing( Historie<sub>i</sub> → π₀ )<br>
Offene Bezirke starten bei Prior<sub>i</sub>; gemeldete werden durch das echte Ergebnis ersetzt.
</div>

---

## 3. Update in der Nacht

Sobald Wahlbezirke melden, vergleichen wir Ist und Prior **nur in dieser gemeldeten Menge**.

### Überraschung (Surprise)

<div class="meth-formula">
Residual<sub>j</sub> = Ergebnis<sub>j</sub> − Prior<sub>j</sub><br>
Surprise = stimmengewichteter Mittelwert der Residuen über alle gemeldeten j
</div>

Liegt die CDU in den ersten Urnen systematisch über dem Prior, ist die Surprise positiv — und fließt in die offenen Bezirke.

### Lerngewicht

Früh in der Nacht (wenig Stimmen, untypische Kieze) darf die Surprise die Stadt **nicht** voll umwerfen. Das Lerngewicht wächst mit:

- **Anteil der schon gezählten Stimmen**, und
- **Repräsentativität** der Stichprobe (Parteiprofil, Urne/Brief-Mix, Strukturähnlichkeit zur Gesamtstadt).

<div class="meth-formula">
w<sub>learn</sub> = f( Stimmenanteil · Repräsentativität<sup>p</sup> ) ∈ [0, 1]
</div>

Kleine, schiefe Stichprobe → w nah bei 0 → Nowcast bleibt nah am Prior. Breite, typische Auszählung → w nah bei 1.

### Von global zu lokal (Produktmodell)

Offene Bezirke bekommen nicht nur den Stadt-Swing:

1. **Global:** Surprise × Lerngewicht  
2. **Lokal:** zusätzlicher Anteil aus demselben **Bezirk × Urne/Brief**  
3. **Nachbarn:** Residuen strukturähnlicher Bezirke derselben Art (k nächste Nachbarn; gleicher Bezirk wird leicht bevorzugt)

Gemeldete Bezirke bleiben unverändert. Aggregate (Land, Bezirk, Wahlkreis) sind stimmengewichtete Summen aus festgeschriebenen und fortgeschriebenen Bezirken.

---

## 4. Unsicherheitsband

Das ±-Band ist ein **indikatives Intervall** (Ziel roughly ~80 % Coverage im Replay), keine Garantie.

Es schrumpft mit dem noch offenen Stimmenanteil und wird durch Residuenstreuung und Auswahlrisiko etwas angepasst. Über die Nacht wird das Band **monoton**: Es darf mit fortschreitender Auszählung nicht wieder breiter werden.

Solange ein Wahlkreis lokal kaum gemeldet hat, bleibt ein **Prior-Floor** — sonst würde das Band zu früh kollabieren, während der Punktwert noch fast nur der Ausgangslage folgt.

---

## 5. Direktmandate und Calls

**Zweitstimme** und **Erststimme** laufen parallel (eigener Prior, eigener Nowcast). Das Direktmandat eines Wahlkreises kommt aus dem **Erststimmen-Nowcast**, nicht als Proxy aus der Zweitstimme.

### Zwei Stufen

| Stufe | Schwelle | Bedingung |
|---|---|---|
| **Wahrscheinlich** | P(Führung hält) ≥ **90 %** | auch **ohne** lokale Meldung im WK (Prior/Landestrend) |
| **Call** | P(Führung hält) ≥ **99,9 %** | lokale Meldung **und** Restanteil kann die Marge nicht mehr kippen |

P(Führung hält) kommt aus der aktuellen Marge und dem Unsicherheitsband (enger Vorsprung + breites Band → niedrige Wahrscheinlichkeit).

Der **Rest-Veto** verhindert Fehl-Calls bei fast vollständiger, aber noch nicht sicherer Auszählung: Wenn der offene Stimmenanteil die Marge noch umkehren könnte (konservativer Rest-Swing), gibt es keinen harten Call — auch bei sehr hoher Modell-P. Nur auf 100 % Auszählung zu warten wäre kein Call, sondern Abwarten; deshalb die 99,9 %-Schwelle plus Sicherheitsnetz.

In der Replay-Eval zählen wir Fehl-Calls hart: Call-Partei ≠ Erststimmen-Sieger 2023.

---

## 6. Wahlbeteiligung

Berlin meldet oft **Wahlbeteiligung und Zweitstimme** früh. Der Beteiligungs-Nowcast ist deshalb Teil der **Szenarien**-Ansicht.

- **Wahrheit / Ziel:** Summe Wählende ÷ Summe Wahlberechtigte (stadtweit).  
- **Besonderheit Briefwahl:** Viele Briefwahlbezirke haben in den Tabellen `Wahlberechtigte = 0` (Berechtigte sitzen auf der Urne). Wir zählen sie über erwartete Wählende aus der Historie mit, sonst unterschätzt man die Beteiligung dramatisch.  
- **Update:** Faktor „gemeldete Wählende / erwartete Wählende“ (geschrumpft), angewandt auf die noch offenen Bezirke.

---

## 7. Szenarien, Listen, Parlamentsgröße

Aus dem laufenden Zweitstimmen-Nowcast und dem Unsicherheitsband ziehen wir Monte-Carlo-Züge:

- **Politische Szenarien** (stärkste Kraft, Mehrheiten, 5 %-Hürde, …) mit Wahrscheinlichkeit; P ≥ 50 % heißt nur „tritt eher ein“, kein Call.  
- **Einzug:** 5 % oder mindestens ein Direktmandat; CDU/SPD/Linke über **Bezirkslisten**, übrige große Parteien über **Landesliste**.  
- **Parlamentsgröße:** Berliner Formel (Grundmandate + Ausgleich) auf den Nowcast-Zügen → Median und p10–p90 über die Nacht.

Details zur Vorwahl-Logik von Direktmandaten und Größe: [Wahlkreis-Vorhersage](/blog/posts/district-forecast-methodology/), [Landesprognose](/blog/posts/state-forecast-methodology/).

---

## 8. Was die Vorschau zeigt

Die Oberfläche unter `/preview/wahlabend/` hat vier Ebenen:

1. **Zweitstimme** — Anteile ± Band über die Nacht  
2. **Szenarien** — Beteiligung, politische Szenarien, Parlamentsgröße  
3. **Listen** — wer kommt rein (Landes- vs. Bezirksliste)  
4. **Wahlkreise** — Erststimmen-Rennen, Wahrscheinlich/Call  

Gestrichelte **„Wahr“**-Linien und Treffer-Tabellen sind **Replay-Eval**. Am echten Wahlabend fehlen sie — dann zählt nur der Nowcast gegen den noch unbekannten Endstand.

---

## 9. Grenzen und nächste Schritte

- **In-Sample-Replay:** Kalibrierung und Demo laufen bisher auf AGH 2023. Echter Out-of-sample-Test: Backtest mit BTW 2025-`_W_`.  
- **Meldezeiten:** Eingefrorene `_W_`-Zeiten ≠ zuverlässige Live-Chronologie.  
- **Kein amtliches Hochrechnungsprodukt:** Wir ersetzen nicht die AfS; wir ordnen Teilstände ein.  
- **Kandidierenden-Effekte** am Abend sind begrenzt (Namen/Listen zur Orientierung; Call basiert auf Stimmen-Nowcast).  
- **π₀ live:** Soll die aktuelle [Landesprognose](/blog/posts/state-forecast-methodology/) (Stand = letzte Umfrage) sein, nicht ein Einfrieren auf den Wahltag-Kalender.

---

## Weiterlesen

- [Vorschau Wahlabend-Nowcast](/preview/wahlabend/)  
- [Wie funktioniert die Landtagswahl-Vorhersage?](/blog/posts/state-forecast-methodology/)  
- [Wie funktioniert die Wahlkreis-Vorhersage?](/blog/posts/district-forecast-methodology/)  
- [FAQ](/faq)
