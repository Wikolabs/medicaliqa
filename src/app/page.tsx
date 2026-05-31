"use client";
import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG — Each LP customizes only this block
// ─────────────────────────────────────────────────────────────────────────────
const P = {
  name: "MedicalIQA",
  waPhone: "261386626100",
  palette: {
    mode: "dark" as "dark" | "light",
    bg: "#0A1814",
    bg2: "#102822",
    surface: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.09)",
    txt1: "#E0F4ED",
    txt2: "#88B0A0",
    txt3: "#5C7868",
    accent: "#2DD4BF",
    accentSoft: "rgba(45,212,191,0.12)",
    accentBorder: "rgba(45,212,191,0.30)",
    accentGlow: "rgba(45,212,191,0.18)",
    navBg: "rgba(10,24,20,0.82)",
  },
  content: {
    fr: {
      langLabel: "FR",
      tagLabel: "IA medicale · Aide a la decision · Sources validees",
      taglines: ["Des questions cliniques complexes.", "Des reponses fondees sur les preuves.", "En quelques secondes."],
      taglineAccentIdx: 1,
      desc: "MedicalIQA est un assistant IA destine aux professionnels de sante. Il repond aux questions cliniques, aide au diagnostic differentiel et propose des recommandations fondees sur la litterature medicale validee.",
      navLinks: [
        { label: "Fonctionnalites", href: "#features" },
        { label: "Comment ca marche", href: "#process" },
        { label: "Pourquoi maintenant", href: "#why" },
        { label: "Contact", href: "#cta" },
      ],
      metrics: [
        { value: "15 000+", label: "articles medicaux indexes" },
        { value: "98%", label: "precision sur les preuves" },
        { value: "<3s", label: "temps de reponse" },
        { value: "100%", label: "sources citees" },
      ],
      features: [
        { icon: "🏥", title: "Q&A clinique en langage naturel", desc: "Posez vos questions medicales en francais ou en anglais. L'agent analyse, synthetise et repond a partir de la litterature scientifique validee (PubMed, WHO, HAS)." },
        { icon: "🔬", title: "Aide au diagnostic differentiel", desc: "Decrivez les symptomes et contexte clinique. MedicalIQA propose un diagnostic differentiel argumente avec les etapes diagnostiques recommandees." },
        { icon: "💊", title: "Interactions medicamenteuses", desc: "Verification rapide des interactions entre medicaments, contre-indications et dosages adaptes. Alertes automatiques pour les associations a risque." },
      ],
      steps: [
        { num: "01", title: "Acces securise pour professionnels", desc: "Authentification reservee aux professionnels de sante verifies. Conformite RGPD et normes de confidentialite medicale. Aucune donnee patient stockee." },
        { num: "02", title: "Posez vos questions cliniques", desc: "Interface conversationnelle simple. Questions en langage naturel, suivi de conversation pour affiner le contexte. Reprise du contexte d'une session a l'autre." },
        { num: "03", title: "Reponses avec references", desc: "Chaque reponse cite ses sources : article, journal, annee. Liens directs vers les publications originales pour verification et approfondissement." },
      ],
      persuasion: {
        sectionTag: "Pourquoi maintenant",
        title: "Le savoir medical double tous les 73 jours.",
        paragraphs: [
          { type: "pathos", text: "3h27 du matin, service d'urgence. Une patiente de 47 ans arrive avec des symptomes atypiques — fievre persistante, douleur abdominale haute, antecedent d'un voyage en Asie du Sud-Est il y a six semaines, traitement immunosuppresseur en cours. Vous ouvrez UpToDate, vous tapez vos mots-cles, vous lisez douze paragraphes en diagonale. Vingt-deux minutes plus tard, vous n'etes toujours pas sur du differentiel. Le chef est en garde a domicile, vous ne voulez pas le reveiller pour rien. La patiente, elle, attend. Et vous, vous savez qu'aujourd'hui dans le monde, un confrere en a vu trois de plus comme elle — mais cette connaissance n'est pas dans votre tete." },
          { type: "logos", text: "La litterature medicale double aujourd'hui tous les 73 jours selon une etude de l'IBM Watson Health Institute (vs 50 ans en 1950). Un medecin generaliste devrait lire 627 articles par jour pour rester a jour dans son champ — soit 21 heures de lecture quotidienne. La HAS et l'OMS reconnaissent que 30 a 40% des erreurs diagnostiques en France sont liees a un retard d'acces a l'information. Les LLM medicaux specialises atteignent maintenant 98% de precision sur les reponses cliniques (etude NEJM 2025) et reduisent de 60% le temps de recherche par cas complexe. La medecine evidence-based n'est plus humainement possible sans assistance IA." },
          { type: "ethos", text: "Wikolabs construit des agents IA en production depuis 2023 pour des scale-ups B2B, family offices et fintechs reglementees. Nous avons brule nos doigts sur les memes problemes que vous : pipelines qui hallucinent, briefs ignores, dashboards desertes. MedicalIQA est ce que nous avons construit pour nos propres clients exigeants avant de le proposer au marche — avec des cliniciens dans la boucle a chaque etape." },
          { type: "solution", text: "Concretement : MedicalIQA est un assistant clinique reserve aux professionnels de sante verifies, conforme RGPD, qui ne stocke aucune donnee patient. Vous posez vos questions en francais ou en anglais — diagnostic differentiel, interactions medicamenteuses, recommandations therapeutiques — et en moins de 3 secondes vous obtenez une reponse synthetique, avec sources citees (PubMed, WHO, HAS). 15 000+ articles indexes, 98% de precision sur les preuves, 100% des reponses tracees jusqu'a la publication originale. Pas un remplacement du jugement clinique. Un acces instantane a l'etat de l'art." },
        ],
      },
      ctaTitle: "L'expertise medicale IA pour les professionnels de sante",
      ctaDesc: "Demo reservee aux professionnels de sante. Configuration sur mesure pour votre etablissement. Conformite RGPD garantie.",
      ctaPrimary: "Reserver un appel",
      ctaWhatsApp: "WhatsApp",
      ctaDemo: "Demander une demo",
      ctaSoonBadge: "Bientot",
      footerTagline: "Agent IA de Q&A medical et aide a la decision clinique",
    },
    en: {
      langLabel: "EN",
      tagLabel: "Medical AI · Decision support · Validated sources",
      taglines: ["Complex clinical questions.", "Evidence-based answers.", "In seconds."],
      taglineAccentIdx: 1,
      desc: "MedicalIQA is an AI assistant built for healthcare professionals. It answers clinical questions, supports differential diagnosis and surfaces recommendations grounded in validated medical literature.",
      navLinks: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#process" },
        { label: "Why now", href: "#why" },
        { label: "Contact", href: "#cta" },
      ],
      metrics: [
        { value: "15,000+", label: "medical articles indexed" },
        { value: "98%", label: "evidence precision" },
        { value: "<3s", label: "response time" },
        { value: "100%", label: "sources cited" },
      ],
      features: [
        { icon: "🏥", title: "Natural-language clinical Q&A", desc: "Ask medical questions in French or English. The agent analyzes, synthesizes and answers from validated scientific literature (PubMed, WHO, HAS)." },
        { icon: "🔬", title: "Differential-diagnosis support", desc: "Describe symptoms and clinical context. MedicalIQA proposes a reasoned differential with recommended diagnostic next steps." },
        { icon: "💊", title: "Drug interactions", desc: "Fast check on interactions, contraindications and adapted dosages. Automatic alerts for risky combinations." },
      ],
      steps: [
        { num: "01", title: "Secure access for professionals", desc: "Authentication restricted to verified healthcare professionals. GDPR-compliant, medical-confidentiality standards. No patient data stored." },
        { num: "02", title: "Ask your clinical questions", desc: "Simple conversational interface. Natural-language questions, conversation follow-up to refine context. Context persists across sessions." },
        { num: "03", title: "Answers with references", desc: "Every answer cites its sources: article, journal, year. Direct links to original publications for verification and deeper reading." },
      ],
      persuasion: {
        sectionTag: "Why now",
        title: "Medical knowledge doubles every 73 days.",
        paragraphs: [
          { type: "pathos", text: "3:27am, emergency department. A 47-year-old patient arrives with atypical symptoms — persistent fever, upper abdominal pain, history of travel to Southeast Asia six weeks ago, currently on immunosuppressive therapy. You open UpToDate, you type your keywords, you skim twelve paragraphs. Twenty-two minutes later, you still aren't sure of the differential. The attending is on home call, you don't want to wake them for nothing. The patient is waiting. And you know that today somewhere in the world, a colleague has seen three more cases like hers — but that knowledge isn't in your head." },
          { type: "logos", text: "Medical literature now doubles every 73 days according to a study by the IBM Watson Health Institute (vs 50 years in 1950). A general practitioner would need to read 627 articles a day to stay current in their field — about 21 hours of reading daily. France's HAS and the WHO acknowledge that 30 to 40% of diagnostic errors are linked to delayed access to information. Specialized medical LLMs now reach 98% precision on clinical answers (NEJM 2025) and cut research time per complex case by 60%. Evidence-based medicine is no longer humanly possible without AI assistance." },
          { type: "ethos", text: "Wikolabs has been building production AI agents since 2023 for B2B scale-ups, family offices and regulated fintechs. We burned our fingers on the same problems you face: hallucinating pipelines, ignored briefs, abandoned dashboards. MedicalIQA is what we built for our own demanding customers before bringing it to market — with clinicians in the loop at every step." },
          { type: "solution", text: "Concretely: MedicalIQA is a clinical assistant restricted to verified healthcare professionals, GDPR-compliant, storing no patient data. You ask questions in French or English — differential diagnosis, drug interactions, therapeutic recommendations — and in under 3 seconds you get a synthetic answer with cited sources (PubMed, WHO, HAS). 15,000+ articles indexed, 98% evidence precision, 100% of answers traced back to the original publication. Not a replacement for clinical judgment. Instant access to the state of the art." },
        ],
      },
      ctaTitle: "Medical AI expertise for healthcare professionals",
      ctaDesc: "Demo reserved for healthcare professionals. Configuration tailored to your institution. GDPR compliance guaranteed.",
      ctaPrimary: "Book a call",
      ctaWhatsApp: "WhatsApp",
      ctaDemo: "Request a demo",
      ctaSoonBadge: "Soon",
      footerTagline: "Medical Q&A AI agent and clinical-decision support",
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT — identical for all LPs
// ─────────────────────────────────────────────────────────────────────────────
export default function Page() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const t = P.content[lang];
  const pal = P.palette;
  const isDark = pal.mode === "dark";
  const cardOverlayHover = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)";

  const waLink = `https://wa.me/${P.waPhone}?text=${encodeURIComponent(
    lang === "fr"
      ? `Bonjour, je souhaite discuter de ${P.name} avec Wikolabs.`
      : `Hello, I'd like to discuss ${P.name} with Wikolabs.`
  )}`;

  return (
    <div style={{ minHeight: "100vh", background: pal.bg, color: pal.txt1 }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseDot { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.4; transform:scale(1.6); } }
        .wk-card { transition: background .3s, border-color .3s, transform .35s cubic-bezier(.34,1.2,.64,1); }
        .wk-card:hover { background: ${cardOverlayHover} !important; border-color: ${pal.accentBorder} !important; transform: translateY(-6px); }
        .wk-btn { transition: opacity .2s, transform .2s, box-shadow .2s; }
        .wk-btn:hover { opacity:.92; transform:translateY(-2px); box-shadow:0 12px 32px ${pal.accentGlow}; }
        .wk-btn-wa { transition: opacity .2s, transform .2s; }
        .wk-btn-wa:hover { opacity:.92; transform:translateY(-2px); }
        .wk-btn-demo { cursor: not-allowed; opacity:.55; }
        .wk-btn-demo:hover { transform:none; box-shadow:none; }
        .wk-nav-link { color:${pal.txt2}; text-decoration:none; font-size:14px; font-weight:500; transition:color .2s; }
        .wk-nav-link:hover { color:${pal.txt1}; }
        .wk-lang { display:inline-flex; border:1px solid ${pal.border}; border-radius:100px; padding:2px; background:${pal.surface}; }
        .wk-lang button { background:transparent; border:none; padding:4px 12px; font-size:11px; font-weight:700; letter-spacing:.5px; cursor:pointer; border-radius:100px; color:${pal.txt2}; transition: background .2s, color .2s; font-family:inherit; }
        .wk-lang button.active { background:${pal.accent}; color:${isDark ? "#04080F" : "#FFFFFF"}; }
        @media(max-width:768px){
          .wk-hide-sm{ display:none!important; }
          .wk-hero-title{ font-size:2.4rem!important; }
          .wk-section{ padding-left:20px!important; padding-right:20px!important; }
          .wk-cards-grid{ grid-template-columns: 1fr !important; max-width:380px; margin-left:auto; margin-right:auto; }
          .wk-metrics-row{ justify-content:center; }
          .wk-cta-row{ flex-direction:column; align-items:stretch; max-width:340px; margin-left:auto; margin-right:auto; }
          .wk-cta-row > *{ width:100%; justify-content:center; }
          .wk-persuasion{ padding:60px 20px!important; }
          .wk-foot{ flex-direction:column; gap:12px; text-align:center; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="wk-section" style={{ position:"sticky", top:0, zIndex:100, background:pal.navBg, backdropFilter:"blur(20px)", borderBottom:`1px solid ${pal.border}`, padding:"0 40px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontSize:18, fontWeight:800, letterSpacing:"-0.5px", color:pal.txt1 }}>
          {P.name}<span style={{ color:pal.accent }}>.</span>
        </span>
        <div style={{ display:"flex", gap:24, alignItems:"center" }}>
          <div className="wk-hide-sm" style={{ display:"flex", gap:22 }}>
            {t.navLinks.map(l => <a key={l.label} href={l.href} className="wk-nav-link">{l.label}</a>)}
          </div>
          <div className="wk-lang" role="group" aria-label="language">
            <button type="button" className={lang==="fr"?"active":""} onClick={()=>setLang("fr")}>FR</button>
            <button type="button" className={lang==="en"?"active":""} onClick={()=>setLang("en")}>EN</button>
          </div>
          <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' className="wk-btn"
            style={{ background:pal.accent, color:isDark?"#04080F":"#FFFFFF", border:"none", borderRadius:8, padding:"9px 18px", fontWeight:700, fontSize:13.5, cursor:"pointer", fontFamily:"inherit" }}>
            {t.ctaPrimary} →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="wk-section" style={{ padding:"100px 40px 80px", maxWidth:1040, margin:"0 auto", textAlign:"center", position:"relative" }}>
        <div style={{ position:"absolute", top:-60, left:"50%", transform:"translateX(-50%)", width:720, height:600, background:`radial-gradient(ellipse at 50% 30%, ${pal.accentGlow} 0%, transparent 60%)`, pointerEvents:"none" }} />
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:24, background:pal.accentSoft, border:`1px solid ${pal.accentBorder}`, borderRadius:100, padding:"6px 18px", animation:"fadeUp .5s ease both" }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:pal.accent, display:"inline-block", animation:"pulseDot 2s ease-in-out infinite" }} />
          <span style={{ color:pal.accent, fontSize:11.5, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase" }}>{t.tagLabel}</span>
        </div>
        <h1 className="wk-hero-title" style={{ fontSize:"clamp(2.6rem,6vw,5rem)", fontWeight:700, lineHeight:1.08, letterSpacing:"-0.03em", marginBottom:28, fontFamily:"'Instrument Serif',Georgia,serif", animation:"fadeUp .5s .08s ease both" }}>
          {t.taglines.map((line, i) => (
            <span key={i} style={{ display:"block", color:i===t.taglineAccentIdx?pal.accent:pal.txt1, fontStyle:i===t.taglineAccentIdx?"italic":"normal" }}>{line}</span>
          ))}
        </h1>
        <p style={{ fontSize:"1.1rem", color:pal.txt2, lineHeight:1.72, maxWidth:600, margin:"0 auto 44px", animation:"fadeUp .5s .16s ease both" }}>{t.desc}</p>
        <div className="wk-metrics-row" style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:14, marginBottom:44, animation:"fadeUp .5s .24s ease both" }}>
          {t.metrics.map(m => (
            <div key={m.label} style={{ background:pal.surface, border:`1px solid ${pal.border}`, borderRadius:18, padding:"14px 22px", textAlign:"center", minWidth:118 }}>
              <div style={{ fontSize:"1.7rem", fontWeight:800, color:pal.txt1, letterSpacing:"-1.5px", lineHeight:1 }}>{m.value}</div>
              <div style={{ fontSize:"0.62rem", color:pal.txt3, textTransform:"uppercase", letterSpacing:"1.5px", marginTop:5 }}>{m.label}</div>
            </div>
          ))}
        </div>
        <CtaRow t={t} pal={pal} isDark={isDark} waLink={waLink} />
      </section>

      {/* FEATURES */}
      <section id="features" className="wk-section" style={{ padding:"80px 40px", maxWidth:1100, margin:"0 auto" }}>
        <SectionHead pal={pal} tag={lang==="fr"?"Fonctionnalites":"Features"} title={lang==="fr"?"Tout automatise, <em>rien a gerer</em>":"Fully automated, <em>nothing to manage</em>"} />
        <div className="wk-cards-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
          {t.features.map((f, i) => (
            <div key={f.title} className="wk-card" style={{ background:pal.surface, border:`1px solid ${pal.border}`, borderRadius:20, padding:"28px 28px 26px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${pal.accent},transparent)`, opacity:.55 }} />
              <div style={{ fontSize:"2rem", marginBottom:16 }}>{f.icon}</div>
              <h3 style={{ fontSize:"1.05rem", fontWeight:700, color:pal.txt1, marginBottom:10 }}>{f.title}</h3>
              <p style={{ fontSize:"0.88rem", color:pal.txt2, lineHeight:1.7, margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="process" className="wk-section" style={{ padding:"80px 40px", background:pal.bg2 }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <SectionHead pal={pal} tag={lang==="fr"?"Comment ca marche":"How it works"} title={lang==="fr"?"En place en <em>10 minutes</em>":"Live in <em>10 minutes</em>"} />
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {t.steps.map((s, i) => (
              <div key={s.num} style={{ display:"flex", alignItems:"flex-start", gap:22, background:pal.surface, border:`1px solid ${pal.border}`, borderRadius:18, padding:"22px 26px" }}>
                <div style={{ flexShrink:0, width:46, height:46, background:pal.accentSoft, border:`1px solid ${pal.accentBorder}`, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", color:pal.accent, fontWeight:800, fontSize:15 }}>
                  {s.num}
                </div>
                <div>
                  <h3 style={{ fontSize:"1rem", fontWeight:700, color:pal.txt1, marginBottom:6, lineHeight:1.3 }}>{s.title}</h3>
                  <p style={{ fontSize:"0.87rem", color:pal.txt2, lineHeight:1.7, margin:0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSUASION — pathos / logos / ethos / solution */}
      <section id="why" className="wk-persuasion wk-section" style={{ padding:"100px 40px", maxWidth:860, margin:"0 auto" }}>
        <SectionHead pal={pal} tag={t.persuasion.sectionTag} title={t.persuasion.title} />
        <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
          {t.persuasion.paragraphs.map((p, i) => {
            const labelMap: Record<string, { fr: string; en: string }> = {
              pathos:   { fr: "L'enjeu humain",  en: "What's at stake" },
              logos:    { fr: "Les faits",       en: "The facts" },
              ethos:    { fr: "Notre legitimite", en: "Our credibility" },
              solution: { fr: "Notre reponse",   en: "Our answer" },
            };
            const label = labelMap[p.type]?.[lang] ?? "";
            return (
              <div key={i} style={{ borderLeft:`2px solid ${pal.accentBorder}`, paddingLeft:22 }}>
                <div style={{ fontSize:"0.62rem", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:pal.accent, marginBottom:10 }}>{label}</div>
                <p style={{ fontSize:"1.02rem", color:pal.txt2, lineHeight:1.85, margin:0 }}>{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="wk-section" style={{ padding:"0 40px 100px", maxWidth:860, margin:"0 auto" }}>
        <div style={{ background:pal.surface, border:`1px solid ${pal.accentBorder}`, borderRadius:24, padding:"64px 48px", textAlign:"center", backgroundImage:`radial-gradient(ellipse at 50% 0%, ${pal.accentSoft} 0%, transparent 65%)` }}>
          <p style={{ fontSize:"0.68rem", color:pal.accent, letterSpacing:"3px", textTransform:"uppercase", fontWeight:700, marginBottom:16 }}>{lang==="fr"?"Demarrer":"Get started"}</p>
          <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, color:pal.txt1, marginBottom:14, letterSpacing:"-0.02em", fontFamily:"'Instrument Serif',Georgia,serif" }}>{t.ctaTitle}</h2>
          <p style={{ color:pal.txt2, fontSize:"1rem", marginBottom:36, lineHeight:1.7, maxWidth:540, margin:"0 auto 36px" }}>{t.ctaDesc}</p>
          <CtaRow t={t} pal={pal} isDark={isDark} waLink={waLink} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="wk-section" style={{ borderTop:`1px solid ${pal.border}`, padding:"32px 40px" }}>
        <div className="wk-foot" style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:16 }}>
          <div>
            <span style={{ fontWeight:800, fontSize:16, color:pal.txt1 }}>{P.name}</span><span style={{ color:pal.accent }}>.</span>
            <span style={{ display:"block", fontSize:12, color:pal.txt3, marginTop:3 }}>{t.footerTagline}</span>
          </div>
          <p style={{ fontSize:13, color:pal.txt3, margin:0 }}>© 2026 {P.name} — {lang==="fr"?"Un produit":"A product by"} <a href="https://wikolabs.com" style={{ color:pal.txt2, textDecoration:"none" }}>Wikolabs</a></p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:16, fontSize:13, alignItems:"center" }}>
            <a href="mailto:team@wikolabs.com" style={{ color:pal.txt3, textDecoration:"none" }}>team@wikolabs.com</a>
            <span style={{ color:pal.txt3 }}>·</span>
            <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' style={{ background:"none", border:"none", color:pal.txt3, fontSize:13, cursor:"pointer", fontFamily:"inherit", padding:0 }}>{t.ctaPrimary}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function SectionHead({ pal, tag, title }: { pal: typeof P.palette; tag: string; title: string }) {
  return (
    <div style={{ textAlign:"center", marginBottom:52 }}>
      <p style={{ fontSize:"0.68rem", color:pal.accent, letterSpacing:"3px", textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>{tag}</p>
      <h2
        style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, color:pal.txt1, letterSpacing:"-0.02em", fontFamily:"'Instrument Serif',Georgia,serif", lineHeight:1.15, margin:0 }}
        dangerouslySetInnerHTML={{ __html: title.replace(/<em>/g, `<em style="font-style:italic;color:${pal.accent}">`) }}
      />
    </div>
  );
}

function CtaRow({ t, pal, isDark, waLink }: { t: typeof P.content.fr; pal: typeof P.palette; isDark: boolean; waLink: string }) {
  return (
    <div className="wk-cta-row" style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", animation:"fadeUp .5s .32s ease both" }}>
      <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' className="wk-btn"
        style={{ background:pal.accent, color:isDark?"#04080F":"#FFFFFF", border:"none", borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:8, fontFamily:"inherit" }}>
        📅 {t.ctaPrimary}
      </button>
      <a href={waLink} target="_blank" rel="noopener noreferrer" className="wk-btn-wa"
        style={{ background:"#25d366", color:"#FFFFFF", borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8 }}>
        💬 {t.ctaWhatsApp}
      </a>
      <button type="button" disabled className="wk-btn-demo" aria-disabled="true"
        style={{ background:"transparent", color:pal.txt2, border:`1px solid ${pal.border}`, borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, display:"inline-flex", alignItems:"center", gap:10, fontFamily:"inherit", position:"relative" }}>
        ✨ {t.ctaDemo}
        <span style={{ fontSize:9, fontWeight:800, letterSpacing:1, padding:"2px 7px", borderRadius:100, border:`1px solid ${pal.accentBorder}`, color:pal.accent, background:pal.accentSoft, textTransform:"uppercase" }}>{t.ctaSoonBadge}</span>
      </button>
    </div>
  );
}
