"use client";
import { useState } from "react";

const PRODUCT = "MedicalIQA";

const PAL = {
  bg: "#0A1814",
  bg2: "#102822",
  surface: "rgba(255,255,255,0.04)",
  surfaceHover: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.09)",
  txt1: "#E0F4ED",
  txt2: "#88B0A0",
  txt3: "#5C7868",
  accent: "#2DD4BF",
  accentSoft: "rgba(45,212,191,0.12)",
  accentBorder: "rgba(45,212,191,0.30)",
  accentGlow: "rgba(45,212,191,0.18)",
  navBg: "rgba(10,24,20,0.82)",
};

const SPECIALTIES_FR = ["Medecine generale", "Cardiologie", "Endocrinologie", "Infectiologie", "Pediatrie", "Psychiatrie", "Pneumologie", "Gastro-enterologie"];
const SPECIALTIES_EN = ["General practice", "Cardiology", "Endocrinology", "Infectious diseases", "Pediatrics", "Psychiatry", "Pulmonology", "Gastroenterology"];

export default function DemoPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [specialty, setSpecialty] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [model, setModel] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [staticMode, setStaticMode] = useState(false);

  const specList = lang === "fr" ? SPECIALTIES_FR : SPECIALTIES_EN;

  const t = lang === "fr" ? {
    back: "Retour", title: "Demo", sub: PRODUCT + " - Q&R medical pour praticiens",
    desc: "Selectionnez une specialite et posez une question clinique. L'agent IA repond avec une conduite a tenir + references bibliographiques. Aucune base patient reelle - POC qui montre la logique HDS-compliant en production.",
    inputLabel: "Question clinique",
    placeholderSpec: "Specialite",
    placeholderQ: "Question clinique (ex: Patient de 67 ans, diabete type 2, HbA1c 9.2%, insuffisance renale stade 3, quelle conduite ?)",
    generate: "Generer la reponse clinique", generating: "Analyse en cours...",
    outputTitle: "Reponse clinique", emptyHint: "La reponse s'affiche ici une fois generee.",
    sendDoctolib: "Pousser dans Doctolib", saveDMP: "Sauvegarder dans le DMP", askColleague: "Discussion confrere",
    sentDocto: "Envoye dans le dossier Doctolib (mode demo, pas de connexion API reelle)",
    savedDMP: "Enregistre dans le DMP (mode demo, pas d'integration ASIP Sante reelle)",
    discussMock: "Discussion ouverte avec un confrere (mode demo, pas de messagerie reelle)",
    fallback: "Mode statique : la cle LLM sera ajoutee au prochain deploiement.",
    poweredBy: "Modele :",
    note: "DEMO POC - aucune donnee patient reelle, aucune connexion DMP/Doctolib. L'IA produit une reponse + references factices a but de demonstration. Ne remplace pas le jugement clinique.",
  } : {
    back: "Back", title: "Demo", sub: PRODUCT + " - medical Q&A for clinicians",
    desc: "Select a specialty and ask a clinical question. The AI agent answers with workup + bibliographic references. No real patient data - POC showing the HDS-compliant production logic.",
    inputLabel: "Clinical question",
    placeholderSpec: "Specialty",
    placeholderQ: "Clinical question (e.g. 67-year-old patient, T2D, HbA1c 9.2%, stage 3 CKD, what's the approach?)",
    generate: "Generate clinical answer", generating: "Analyzing...",
    outputTitle: "Clinical answer", emptyHint: "The answer will appear here once generated.",
    sendDoctolib: "Push to Doctolib", saveDMP: "Save to EHR", askColleague: "Discuss with colleague",
    sentDocto: "Sent to Doctolib record (demo mode, no real API connection)",
    savedDMP: "Saved to EHR (demo mode, no real ASIP/HL7 integration)",
    discussMock: "Discussion opened with colleague (demo mode, no real messaging)",
    fallback: "Static mode: LLM key will be added at next deploy.",
    poweredBy: "Model:",
    note: "DEMO POC - no real patient data, no EHR/Doctolib connection. The AI produces a fictitious answer + references for demonstration. Does not replace clinical judgment.",
  };

  async function generate() {
    setError(""); setOutput(""); setModel(""); setStaticMode(false);
    if (!question.trim()) {
      setError(lang === "fr" ? "Entrez une question clinique." : "Enter a clinical question.");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ specialty, question, lang }),
      });
      const j = await r.json();
      if (j.error === "llm_not_configured") {
        setOutput(j.mockOutput || ""); setStaticMode(true);
      } else if (j.error) {
        setError(j.message || j.error);
      } else {
        setOutput(j.output || ""); setModel(j.model || "");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "unknown_error");
    } finally {
      setLoading(false);
    }
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3200);
  }

  return (
    <div style={{ minHeight: "100vh", background: PAL.bg, color: PAL.txt1, display: "flex", flexDirection: "column" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        .wk-input { width: 100%; padding: 12px 14px; border-radius: 10px; background: ${PAL.surface}; border: 1px solid ${PAL.border}; color: ${PAL.txt1}; font-family: inherit; font-size: 14px; transition: border-color .2s, background .2s; }
        .wk-input:focus { outline: none; border-color: ${PAL.accent}; background: ${PAL.surfaceHover}; }
        .wk-btn-primary { background: ${PAL.accent}; color: #04181A; border: none; border-radius: 10px; padding: 13px 22px; font-weight: 700; font-size: 14px; cursor: pointer; font-family: inherit; transition: opacity .2s, transform .2s; display: inline-flex; align-items: center; gap: 8px; }
        .wk-btn-primary:hover { opacity: .9; transform: translateY(-1px); }
        .wk-btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }
        .wk-btn-ghost { background: ${PAL.surface}; color: ${PAL.txt1}; border: 1px solid ${PAL.border}; border-radius: 10px; padding: 9px 14px; font-weight: 600; font-size: 13px; cursor: pointer; font-family: inherit; transition: background .2s, border-color .2s; display: inline-flex; align-items: center; gap: 6px; }
        .wk-btn-ghost:hover { background: ${PAL.surfaceHover}; border-color: ${PAL.accentBorder}; }
        .wk-md p, .wk-md ul { margin: 0 0 10px; }
        .wk-md ul { padding-left: 18px; }
        .wk-md li { margin-bottom: 4px; line-height: 1.65; }
        .wk-md strong { color: ${PAL.accent}; font-weight: 700; display: block; margin-top: 10px; margin-bottom: 4px; font-size: 0.78rem; letter-spacing: 1.5px; text-transform: uppercase; }
        @media (max-width: 768px) {
          .demo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <nav style={{ padding: "16px 32px", borderBottom: `1px solid ${PAL.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: PAL.navBg, backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 10 }}>
        <a href="/" style={{ color: PAL.accent, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
          {"<- "}{t.back} {PRODUCT}<span style={{ color: PAL.accent }}>.</span>
        </a>
        <div style={{ display: "inline-flex", border: `1px solid ${PAL.border}`, borderRadius: 100, padding: 2, background: PAL.surface }}>
          <button onClick={() => setLang("fr")} style={{ background: lang === "fr" ? PAL.accent : "transparent", color: lang === "fr" ? "#04181A" : PAL.txt2, border: "none", padding: "4px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", borderRadius: 100, fontFamily: "inherit" }}>FR</button>
          <button onClick={() => setLang("en")} style={{ background: lang === "en" ? PAL.accent : "transparent", color: lang === "en" ? "#04181A" : PAL.txt2, border: "none", padding: "4px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", borderRadius: 100, fontFamily: "inherit" }}>EN</button>
        </div>
      </nav>

      <main style={{ flex: 1, padding: "32px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <h1 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, margin: "0 0 6px" }}>
          {t.title} - <em style={{ fontStyle: "italic", color: PAL.accent }}>{PRODUCT}</em>
        </h1>
        <p style={{ color: PAL.txt2, fontSize: "0.95rem", lineHeight: 1.65, maxWidth: 720, margin: "0 0 6px" }}>{t.sub}</p>
        <p style={{ color: PAL.txt3, fontSize: "0.78rem", lineHeight: 1.55, maxWidth: 720, margin: "0 0 28px" }}>{t.desc}</p>

        <div className="demo-grid" style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 24 }}>
          <section style={{ background: PAL.surface, border: `1px solid ${PAL.border}`, borderRadius: 16, padding: 22 }}>
            <h2 style={{ fontSize: "0.72rem", color: PAL.txt3, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: "0 0 14px" }}>{t.inputLabel}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
              <select className="wk-input" value={specialty} onChange={(e) => setSpecialty(e.target.value)} style={{ appearance: "none", cursor: "pointer" }}>
                <option value="" style={{ background: PAL.bg }}>{t.placeholderSpec}</option>
                {specList.map((s) => <option key={s} value={s} style={{ background: PAL.bg }}>{s}</option>)}
              </select>
              <textarea className="wk-input" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={t.placeholderQ} rows={6} style={{ resize: "vertical", fontFamily: "inherit" }} />
            </div>
            <button className="wk-btn-primary" disabled={loading} onClick={generate} style={{ width: "100%", justifyContent: "center" }}>
              {loading ? "* " + t.generating : "+ " + t.generate}
            </button>
            {error && <div style={{ marginTop: 12, color: "#F87171", fontSize: 13, padding: "8px 12px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 8 }}>{error}</div>}
            <p style={{ color: PAL.txt3, fontSize: 11, lineHeight: 1.5, marginTop: 18, marginBottom: 0, paddingTop: 14, borderTop: `1px solid ${PAL.border}` }}>{t.note}</p>
          </section>

          <section style={{ background: PAL.bg2, border: `1px solid ${PAL.border}`, borderRadius: 16, padding: 22, minHeight: 420, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: "0.72rem", color: PAL.txt3, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: output ? "#22C55E" : PAL.txt3 }} />
                {t.outputTitle}
              </h2>
              {model && <span style={{ fontSize: 10, color: PAL.txt3, fontFamily: "monospace" }}>{t.poweredBy} {model}</span>}
            </div>

            {!output ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: PAL.txt3, fontSize: 14, textAlign: "center", padding: 30 }}>
                {t.emptyHint}
              </div>
            ) : (
              <div className="wk-md" style={{ color: PAL.txt1, fontSize: 14, lineHeight: 1.7, flex: 1 }} dangerouslySetInnerHTML={{ __html: renderMarkdown(output) }} />
            )}

            {output && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18, paddingTop: 18, borderTop: `1px solid ${PAL.border}` }}>
                <button className="wk-btn-ghost" onClick={() => showToast(t.sentDocto)}>{t.sendDoctolib}</button>
                <button className="wk-btn-ghost" onClick={() => showToast(t.savedDMP)}>{t.saveDMP}</button>
                <button className="wk-btn-ghost" onClick={() => showToast(t.discussMock)}>{t.askColleague}</button>
              </div>
            )}
            {staticMode && <div style={{ marginTop: 14, color: PAL.txt3, fontSize: 12, fontStyle: "italic" }}>{t.fallback}</div>}
          </section>
        </div>
      </main>

      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: PAL.surface, border: `1px solid ${PAL.accentBorder}`, borderRadius: 12, padding: "12px 20px", color: PAL.txt1, fontSize: 13, fontWeight: 600, zIndex: 50, backdropFilter: "blur(20px)", boxShadow: "0 8px 28px rgba(0,0,0,0.4)" }}>
          {"v "}{toast}
        </div>
      )}
    </div>
  );
}

function renderMarkdown(md: string): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const blocks: string[] = [];
  let listBuf: string[] = [];
  const flushList = () => {
    if (listBuf.length) {
      blocks.push("<ul>" + listBuf.map((l) => `<li>${l}</li>`).join("") + "</ul>");
      listBuf = [];
    }
  };
  for (const raw of md.split("\n")) {
    const line = raw.trim();
    if (!line) { flushList(); continue; }
    if (line.startsWith("- ")) {
      listBuf.push(esc(line.slice(2)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"));
    } else if (line.startsWith("**") && line.endsWith("**")) {
      flushList();
      blocks.push(`<strong>${esc(line.slice(2, -2))}</strong>`);
    } else {
      flushList();
      blocks.push(`<p>${esc(line).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>`);
    }
  }
  flushList();
  return blocks.join("");
}
