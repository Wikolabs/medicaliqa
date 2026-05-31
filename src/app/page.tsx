"use client";
const P = {
  name: "MedicalIQA",
  tagLabel: "IA medicale · Aide a la decision · Sources validees",
  taglines: ["Des questions cliniques complexes.", "Des reponses fondees sur les preuves.", "En quelques secondes."],
  taglineAccentIdx: 1,
  desc: "MedicalIQA est un assistant IA destine aux professionnels de sante. Il repond aux questions cliniques, aide au diagnostic differentiel et propose des recommendations fondees sur la litterature medicale validee.",
  accent: "#34D399",
  accentDim: "rgba(52,211,153,0.1)",
  accentBorder: "rgba(52,211,153,0.25)",
  accentGlow: "rgba(52,211,153,0.08)",
  waText: "MedicalIQA",
  navLinks: [{ label: "Fonctionnalites", href: "#features" }, { label: "Comment ca marche", href: "#process" }, { label: "Contact", href: "#cta" }],
  metrics: [{ value: "15 000+", label: "articles medicaux indexes" }, { value: "98%", label: "precision sur les preuves" }, { value: "<3s", label: "temps de reponse" }, { value: "100%", label: "sources citees" }],
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
  testimonials: [
    { quote: "En urgence, j'ai besoin de reponses rapides et fiables. MedicalIQA me donne en 10 secondes ce que je cherchais en 20 minutes dans UpToDate.", author: "Dr. Andria M.", role: "Medecin urgentiste, CHU Antananarivo" },
    { quote: "Les internes l'utilisent pour reviser les diagnostics differentiels. C'est comme avoir un chef de service disponible 24h/24.", author: "Dr. Sophie L.", role: "Chef de service, Clinique Madagascar" },
  ],
  ctaTitle: "L'expertise medicale IA pour les professionnels de sante",
  ctaDesc: "Demo reservee aux professionnels de sante. Configuration sur mesure pour votre etablissement. Conformite RGPD garantie.",
  ctaPrimary: "Reserver une demo",
  footerTagline: "Agent IA de Q&A medical et aide a la decision clinique",
};
export default function Page() {
  const bg = "#04080F"; const bg2 = "#070D1B"; const card = "rgba(255,255,255,0.04)"; const border = "rgba(255,255,255,0.09)";
  const gold = "#D4AF37"; const goldDim = "rgba(212,175,55,0.1)"; const goldBorder = "rgba(212,175,55,0.28)";
  const txt1 = "#F0EDE6"; const txt2 = "#8B9DB5"; const txt3 = "#3C5068";
  const { accent, accentDim, accentBorder, accentGlow } = P;
  return (
    <div style={{ minHeight:"100vh", background:bg, color:txt1 }}>
      <style>{`*, *::before, *::after { box-sizing: border-box; } html { scroll-behavior: smooth; } body { -webkit-font-smoothing: antialiased; overflow-x: hidden; } @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } } @keyframes pulseDot { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.4; transform:scale(1.6); } } .wk-card { transition: background .3s, border-color .3s, transform .35s cubic-bezier(.34,1.2,.64,1); } .wk-card:hover { background: rgba(255,255,255,0.07) !important; border-color: ${accentBorder} !important; transform: translateY(-6px) !important; } .wk-btn { transition: opacity .2s, transform .2s, box-shadow .2s; } .wk-btn:hover { opacity:.9; transform:translateY(-2px); box-shadow:0 12px 32px rgba(212,175,55,.18); } .wk-wa { transition: opacity .2s, transform .2s; } .wk-wa:hover { opacity:.9; transform:translateY(-2px); } .wk-nav-link { color: #8B9DB5; text-decoration:none; font-size:14px; font-weight:500; transition:color .2s; } .wk-nav-link:hover { color: #F0EDE6; } @media(max-width:640px){ .wk-hide-sm{ display:none!important; } .wk-hero-title{ font-size:2.4rem!important; } }`}</style>
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(4,8,15,0.82)", backdropFilter:"blur(20px)", borderBottom:`1px solid ${border}`, padding:"0 40px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontSize:18, fontWeight:800, letterSpacing:"-0.5px", color:txt1 }}>{P.name}<span style={{ color:gold }}>.</span></span>
        <div style={{ display:"flex", gap:28, alignItems:"center" }}>
          <div className="wk-hide-sm" style={{ display:"flex", gap:24 }}>{P.navLinks.map(l => <a key={l.label} href={l.href} className="wk-nav-link">{l.label}</a>)}</div>
          <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' className="wk-btn" style={{ background:gold, color:"#04080F", border:"none", borderRadius:8, padding:"8px 18px", fontWeight:700, fontSize:13.5, cursor:"pointer", fontFamily:"inherit" }}>Reserver →</button>
        </div>
      </nav>
      <section style={{ padding:"100px 40px 80px", maxWidth:1000, margin:"0 auto", textAlign:"center", position:"relative" }}>
        <div style={{ position:"absolute", top:-60, left:"50%", transform:"translateX(-50%)", width:700, height:600, background:`radial-gradient(ellipse at 50% 30%, ${accentGlow} 0%, transparent 60%)`, pointerEvents:"none" }} />
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:24, background:accentDim, border:`1px solid ${accentBorder}`, borderRadius:100, padding:"6px 18px", animation:"fadeUp .5s ease both" }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:accent, display:"inline-block", animation:"pulseDot 2s ease-in-out infinite" }} />
          <span style={{ color:accent, fontSize:11.5, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase" }}>{P.tagLabel}</span>
        </div>
        <h1 className="wk-hero-title" style={{ fontSize:"clamp(2.6rem,6vw,5rem)", fontWeight:700, lineHeight:1.08, letterSpacing:"-0.03em", marginBottom:28, fontFamily:"'Instrument Serif',Georgia,serif", animation:"fadeUp .5s .08s ease both" }}>
          {P.taglines.map((line, i) => (<span key={i} style={{ display:"block", color:i===P.taglineAccentIdx?accent:txt1, fontStyle:i===P.taglineAccentIdx?"italic":"normal" }}>{line}</span>))}
        </h1>
        <p style={{ fontSize:"1.1rem", color:txt2, lineHeight:1.72, maxWidth:580, margin:"0 auto 48px", animation:"fadeUp .5s .16s ease both" }}>{P.desc}</p>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:14, marginBottom:44, animation:"fadeUp .5s .24s ease both" }}>
          {P.metrics.map(m => (<div key={m.label} style={{ background:card, border:`1px solid ${border}`, borderRadius:18, padding:"14px 22px", textAlign:"center", minWidth:118 }}><div style={{ fontSize:"1.7rem", fontWeight:800, color:txt1, letterSpacing:"-1.5px", lineHeight:1 }}>{m.value}</div><div style={{ fontSize:"0.62rem", color:txt3, textTransform:"uppercase", letterSpacing:"1.5px", marginTop:5 }}>{m.label}</div></div>))}
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", animation:"fadeUp .5s .32s ease both" }}>
          <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' className="wk-btn" style={{ background:gold, color:"#04080F", border:"none", borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit" }}>📅 {P.ctaPrimary}</button>
          <a href={`https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20${encodeURIComponent(P.waText)}%20avec%20Wikolabs.`} target="_blank" rel="noopener noreferrer" className="wk-wa" style={{ background:"#25d366", color:"#fff", borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, textDecoration:"none", display:"flex", alignItems:"center", gap:8 }}>💬 WhatsApp</a>
        </div>
      </section>
      <section id="features" style={{ padding:"80px 40px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}><p style={{ fontSize:"0.68rem", color:gold, letterSpacing:"3px", textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>Fonctionnalites</p><h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, color:txt1, letterSpacing:"-0.02em", fontFamily:"'Instrument Serif',Georgia,serif", lineHeight:1.15 }}>La connaissance medicale, <em style={{ fontStyle:"italic", color:gold }}>instantanee</em></h2></div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
          {P.features.map((f, i) => (<div key={f.title} className="wk-card" style={{ background:card, border:`1px solid ${border}`, borderRadius:20, padding:"28px 28px 24px", position:"relative", overflow:"hidden" }}><div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${i===0?gold:accent},transparent)`, opacity:.6 }} /><div style={{ fontSize:"2rem", marginBottom:16 }}>{f.icon}</div><h3 style={{ fontSize:"1.05rem", fontWeight:700, color:txt1, marginBottom:10 }}>{f.title}</h3><p style={{ fontSize:"0.88rem", color:txt2, lineHeight:1.7, margin:0 }}>{f.desc}</p></div>))}
        </div>
      </section>
      <section id="process" style={{ padding:"80px 40px", background:bg2 }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}><p style={{ fontSize:"0.68rem", color:gold, letterSpacing:"3px", textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>Comment ca marche</p><h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, color:txt1, letterSpacing:"-0.02em", fontFamily:"'Instrument Serif',Georgia,serif" }}>Acces en <em style={{ fontStyle:"italic", color:accent }}>quelques minutes</em></h2></div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {P.steps.map((s, i) => (<div key={s.num} style={{ display:"flex", alignItems:"flex-start", gap:22, background:card, border:`1px solid ${border}`, borderRadius:18, padding:"22px 26px" }}><div style={{ flexShrink:0, width:46, height:46, background:i===0?goldDim:accentDim, border:`1px solid ${i===0?goldBorder:accentBorder}`, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", color:i===0?gold:accent, fontWeight:800, fontSize:15 }}>{s.num}</div><div><h3 style={{ fontSize:"1rem", fontWeight:700, color:txt1, marginBottom:6, lineHeight:1.3 }}>{s.title}</h3><p style={{ fontSize:"0.87rem", color:txt2, lineHeight:1.7, margin:0 }}>{s.desc}</p></div></div>))}
          </div>
        </div>
      </section>
      <section style={{ padding:"80px 40px", maxWidth:900, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:44 }}><p style={{ fontSize:"0.68rem", color:gold, letterSpacing:"3px", textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>Temoignages</p><h2 style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)", fontWeight:700, color:txt1, fontFamily:"'Instrument Serif',Georgia,serif" }}>Ce qu'en disent les professionnels</h2></div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:20 }}>
          {P.testimonials.map((t, i) => (<div key={i} style={{ background:card, border:`1px solid ${border}`, borderLeft:`3px solid ${i===0?gold:accent}`, borderRadius:20, padding:"26px 26px 22px" }}><p style={{ fontSize:"0.92rem", color:txt2, lineHeight:1.75, fontStyle:"italic", marginBottom:20 }}>&ldquo;{t.quote}&rdquo;</p><div style={{ display:"flex", alignItems:"center", gap:12 }}><div style={{ width:38, height:38, borderRadius:"50%", background:i===0?goldDim:accentDim, border:`1px solid ${i===0?goldBorder:accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>👤</div><div><div style={{ fontSize:"0.9rem", fontWeight:700, color:txt1 }}>{t.author}</div><div style={{ fontSize:"0.72rem", color:txt3 }}>{t.role}</div></div></div></div>))}
        </div>
      </section>
      <section id="cta" style={{ padding:"0 40px 100px", maxWidth:860, margin:"0 auto" }}>
        <div style={{ background:card, border:`1px solid ${goldBorder}`, borderRadius:24, padding:"64px 48px", textAlign:"center", backgroundImage:`radial-gradient(ellipse at 50% 0%, ${goldDim} 0%, transparent 65%)` }}>
          <p style={{ fontSize:"0.68rem", color:gold, letterSpacing:"3px", textTransform:"uppercase", fontWeight:700, marginBottom:16 }}>Demarrer</p>
          <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, color:txt1, marginBottom:14, letterSpacing:"-0.02em", fontFamily:"'Instrument Serif',Georgia,serif" }}>{P.ctaTitle}</h2>
          <p style={{ color:txt2, fontSize:"1rem", marginBottom:36, lineHeight:1.7 }}>{P.ctaDesc}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
            <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' className="wk-btn" style={{ background:gold, color:"#04080F", border:"none", borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit" }}>📅 {P.ctaPrimary}</button>
            <a href={`https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20${encodeURIComponent(P.waText)}%20avec%20Wikolabs.`} target="_blank" rel="noopener noreferrer" className="wk-wa" style={{ background:"#25d366", color:"#fff", borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, textDecoration:"none", display:"flex", alignItems:"center", gap:8 }}>💬 WhatsApp</a>
          </div>
        </div>
      </section>
      <footer style={{ borderTop:`1px solid ${border}`, padding:"32px 40px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:16 }}>
          <div><span style={{ fontWeight:800, fontSize:16, color:txt1 }}>{P.name}</span><span style={{ color:gold }}>.</span><span style={{ display:"block", fontSize:12, color:txt3, marginTop:3 }}>{P.footerTagline}</span></div>
          <p style={{ fontSize:13, color:txt3 }}>© 2026 {P.name} — Un produit <a href="https://wikolabs.com" style={{ color:txt2, textDecoration:"none" }}>Wikolabs</a></p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:16, fontSize:13, alignItems:"center" }}><a href="mailto:team@wikolabs.com" style={{ color:txt3, textDecoration:"none" }}>team@wikolabs.com</a><span style={{ color:txt3 }}>·</span><button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' style={{ background:"none", border:"none", color:txt3, fontSize:13, cursor:"pointer", fontFamily:"inherit", padding:0 }}>Prendre RDV</button></div>
        </div>
      </footer>
    </div>
  );
}
