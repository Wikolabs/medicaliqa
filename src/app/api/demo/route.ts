import { NextResponse } from "next/server";
import { chat, isConfigured } from "@/lib/llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT_FR = `Tu es MedicalIQA, un agent IA Q&R medical pour professionnels de sante, hebergement HDS-style (donnees patient simulees). Tu reponds a une question clinique posee par un medecin de specialite donnee. Ton DOIT etre prudent, factuel, base sur les guidelines reconnues. Tu inventes des references bibliographiques realistes pour la demo.

Format de sortie exact en MARKDOWN :
**🩺 Reponse clinique**
- Reponse structuree en 3-5 phrases, registre medical, sans euphemismes commerciaux.

**📋 Conduite a tenir**
- 3-4 puces : examens complementaires, traitement de 1ere intention, criteres de re-evaluation, criteres d'orientation specialise.

**📚 References (style bibliographique)**
- 3 references inventees mais realistes au format HAS/Cochrane/Pubmed (ex: "HAS, Recommandation de bonne pratique, [titre], janvier 2024" ou "Smith J et al., NEJM 2023;389(12):1102-1110").

A la fin, ajoute une ligne d'avertissement : "⚠️ Demo POC - aide a la decision, ne remplace pas le jugement clinique du praticien."

Maximum 320 mots. Reste sobre, evite les superlatifs.`;

const SYSTEM_PROMPT_EN = `You are MedicalIQA, a medical Q&A AI agent for healthcare professionals, HDS-style hosting (simulated patient data). You answer a clinical question from a physician of a given specialty. Tone MUST be cautious, factual, based on recognized guidelines. You invent realistic bibliographic references for the demo.

Exact MARKDOWN output format:
**🩺 Clinical answer**
- Structured answer in 3-5 sentences, medical register, no commercial euphemism.

**📋 Recommended workup**
- 3-4 bullets: complementary exams, first-line treatment, reassessment criteria, specialist referral criteria.

**📚 References (bibliographic style)**
- 3 invented but realistic references in HAS/Cochrane/Pubmed format (e.g. "NICE Guideline NG136, [title], 2023" or "Smith J et al., NEJM 2023;389(12):1102-1110").

At the end, add a disclaimer line: "⚠️ Demo POC - decision support, does not replace the clinician's judgment."

Maximum 320 words. Stay sober, avoid superlatives.`;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const specialty: string = typeof body.specialty === "string" ? body.specialty.trim().slice(0, 60) : "";
    const question: string = typeof body.question === "string" ? body.question.trim().slice(0, 700) : "";
    const lang: "fr" | "en" = body.lang === "en" ? "en" : "fr";

    if (!question) {
      return NextResponse.json(
        { error: lang === "fr" ? "Entrez une question clinique." : "Enter a clinical question." },
        { status: 400 }
      );
    }

    if (!isConfigured()) {
      return NextResponse.json(
        {
          error: "llm_not_configured",
          message: lang === "fr"
            ? "Demo en mode statique - la cle LLM sera configuree au prochain deploiement."
            : "Static demo mode - LLM key will be configured at next deploy.",
          mockOutput: buildMock(specialty, question, lang),
        },
        { status: 200 }
      );
    }

    const userMsg = lang === "fr"
      ? `Specialite : "${specialty || "Medecine generale"}". Question clinique : "${question}". Reponds au format demande.`
      : `Specialty: "${specialty || "General practice"}". Clinical question: "${question}". Answer in the required format.`;

    const { text, model } = await chat(
      [
        { role: "system", content: lang === "fr" ? SYSTEM_PROMPT_FR : SYSTEM_PROMPT_EN },
        { role: "user", content: userMsg },
      ],
      900
    );

    return NextResponse.json({ output: text, model, generatedAt: new Date().toISOString() });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function buildMock(specialty: string, question: string, lang: "fr" | "en"): string {
  const spec = specialty || (lang === "fr" ? "Medecine generale" : "General practice");
  if (lang === "en") {
    return `**🩺 Clinical answer**\n- Based on the question in ${spec} ("${question.slice(0, 90)}..."), first-line management follows current guidelines emphasizing clinical stratification before any therapeutic escalation. Symptom pattern, comorbidities and red flags should be reassessed at 48-72h.\n\n**📋 Recommended workup**\n- Targeted clinical exam + minimal biology (CBC, CRP) before imaging\n- First-line treatment per current guideline, dose-adjusted to renal function\n- Reassessment criteria: persistent symptoms >5 days, fever >38.5C, decompensation signs\n- Specialist referral if non-response at D7 or atypical presentation\n\n**📚 References**\n- NICE Guideline NG136, Clinical decision support in primary care, 2023\n- Smith J et al., NEJM 2023;389(12):1102-1110\n- Cochrane Review CD012589, 2024 update\n\n⚠️ Demo POC - decision support, does not replace the clinician's judgment.`;
  }
  return `**🩺 Reponse clinique**\n- Sur la question posee en ${spec} ("${question.slice(0, 90)}..."), la prise en charge de 1ere intention suit les recommandations actuelles privilegiant la stratification clinique avant toute escalade therapeutique. Le tableau symptomatique, les comorbidites et les drapeaux rouges sont a reevaluer a 48-72h.\n\n**📋 Conduite a tenir**\n- Examen clinique cible + biologie minimale (NFS, CRP) avant imagerie\n- Traitement de 1ere intention conforme aux recommandations en vigueur, posologie adaptee a la fonction renale\n- Criteres de reevaluation : symptomes persistants >5 jours, fievre >38.5C, signes de decompensation\n- Orientation specialisee si absence de reponse a J7 ou tableau atypique\n\n**📚 References (style bibliographique)**\n- HAS, Recommandation de bonne pratique, Prise en charge en soins primaires, janvier 2024\n- Smith J et al., NEJM 2023;389(12):1102-1110\n- Revue Cochrane CD012589, mise a jour 2024\n\n⚠️ Demo POC - aide a la decision, ne remplace pas le jugement clinique du praticien.`;
}
