export default function Home() {
  const color = "#3b82f6";
  const colorLight = "#eff6ff";
  const colorDark = "#1d4ed8";

  return (
    <main style={{ fontFamily: "var(--font-body)" }}>
      {/* NAVBAR */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #bfdbfe", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color }}>MedicalIQA</span>
          <div style={{ display: "flex", gap: 12 }}>
            <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' type="button" target="_blank" rel="noopener noreferrer"
              style={{ background: color, color: "#fff", padding: "8px 20px", borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              Réserver une démo
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${colorLight} 0%, #fff 60%)`, padding: "80px 24px 64px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <span style={{ display: "inline-block", background: "#bfdbfe", color: colorDark, padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            QA médicale IA · Conforme HDS
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 800, color: "#1e3a8a", lineHeight: 1.15, marginBottom: 24 }}>
            L&apos;assistant médical IA<br />
            <span style={{ color }}>qui cite toujours ses sources.</span>
          </h1>
          <p style={{ fontSize: 18, color: "#4b5563", marginBottom: 40, lineHeight: 1.7 }}>
            QA médicale sur protocoles, guidelines et dossiers — réponses sourcées avec citation, 0 hallucination, hébergement HDS.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
            <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' type="button" target="_blank" rel="noopener noreferrer"
              style={{ background: color, color: "#fff", padding: "14px 28px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
              Réserver une démo
            </button>
            <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20MedicalIQA%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer"
              style={{ background: "#25d366", color: "#fff", padding: "14px 28px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
              WhatsApp
            </a>
          </div>
          {/* Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
            {[
              { value: "0", label: "hallucination" },
              { value: "Sources", label: "citées" },
              { value: "HDS", label: "conforme" },
              { value: "99.8%", label: "pertinence" },
            ].map((m) => (
              <div key={m.label} style={{ background: "#fff", borderRadius: 12, padding: "20px 16px", boxShadow: "0 1px 4px rgba(59,130,246,0.1)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color }}>{m.value}</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, color: "#1e3a8a", textAlign: "center", marginBottom: 48 }}>
            L&apos;IA médicale qui ne vous mettra pas en danger
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              {
                icon: "📚",
                title: "RAG sur corpus médical",
                desc: "Vos protocoles, HAS guidelines, fiches RCP, dossiers patients anonymisés — indexés et interrogeables en langage naturel.",
              },
              {
                icon: "🔍",
                title: "Vérification multi-source",
                desc: "Chaque réponse est recoupée sur plusieurs documents sources. En cas de contradiction, les deux versions sont présentées avec leurs références.",
              },
              {
                icon: "🔒",
                title: "Traçabilité & conformité",
                desc: "Audit log complet de chaque requête, hébergement HDS, chiffrement end-to-end, conformité RGPD et ANSSI. Sécurité niveau santé.",
              },
            ].map((f) => (
              <div key={f.title} style={{ background: colorLight, borderRadius: 16, padding: 32, border: "1px solid #bfdbfe" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#1e3a8a", marginBottom: 12 }}>{f.title}</h3>
                <p style={{ color: "#4b5563", lineHeight: 1.7, fontSize: 15 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: colorLight, padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, color: "#1e3a8a", textAlign: "center", marginBottom: 48 }}>
            Comment ça marche ?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              {
                step: "01",
                title: "Importez vos protocoles",
                desc: "PDF, Word, HL7 FHIR, base SQL — tous les formats médicaux sont acceptés. L'anonymisation des données patients est automatique.",
              },
              {
                step: "02",
                title: "Indexation et validation",
                desc: "Les documents sont découpés, indexés et validés par votre équipe médicale via interface de review. Aucune réponse non validée en production.",
              },
              {
                step: "03",
                title: "Interrogez avec confiance",
                desc: "Votre équipe médicale pose ses questions en langage naturel. Chaque réponse indique le document source, le numéro de page et le niveau de confiance.",
              },
            ].map((s) => (
              <div key={s.step} style={{ display: "flex", gap: 24, alignItems: "flex-start", background: "#fff", borderRadius: 16, padding: 28 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 900, color: "#bfdbfe", minWidth: 56 }}>{s.step}</div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: "#4b5563", lineHeight: 1.7, fontSize: 15 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: color, padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 16 }}>
            L&apos;IA médicale qui ne vous mettra pas en danger
          </h2>
          <p style={{ color: "#bfdbfe", fontSize: 18, marginBottom: 36 }}>Démo sur vos protocoles. Hébergement HDS inclus.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' type="button" target="_blank" rel="noopener noreferrer"
              style={{ background: "#fff", color, padding: "14px 28px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
              Réserver une démo
            </button>
            <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20MedicalIQA%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer"
              style={{ background: "#25d366", color: "#fff", padding: "14px 28px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1e3a8a", color: "#93c5fd", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>MedicalIQA</div>
          <p style={{ fontSize: 14, marginBottom: 4 }}>
            <a href="mailto:team@wikolabs.com" style={{ color: "#93c5fd", textDecoration: "none" }}>team@wikolabs.com</a>
            {" · "}
            <a href="https://wikolabs.com" target="_blank" rel="noopener noreferrer" style={{ color: "#93c5fd", textDecoration: "none" }}>wikolabs.com</a>
          </p>
          <p style={{ color: "#93c5fd", marginTop: 8, fontSize: 13, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:team@wikolabs.com" style={{ color: "#93c5fd", textDecoration: "none" }}>team@wikolabs.com</a>
            <span>·</span>
            <a href="tel:+261386626100" style={{ color: "#93c5fd", textDecoration: "none" }}>+261 38 66 261 00</a>
            <span>·</span>
            <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' type="button" target="_blank" rel="noopener noreferrer" style={{ color: "#93c5fd", textDecoration: "none" }}>Prendre RDV</button>
          </p>
          <p style={{ fontSize: 13, color: "#3b82f6" }}>© 2026 Wikolabs. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  );
}
