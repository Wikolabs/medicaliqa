"""MedicalIQA demo backend - production-ready POC.

In production: this service would route queries through a HDS-style
hosted RAG over curated guideline corpora (HAS, NICE, NEJM abstracts)
and log queries for audit. For the demo: it only invokes the LLM and
returns a clinical Q&A.
"""
from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .llm import chat, is_configured

app = FastAPI(
    title="MedicalIQA Demo Backend",
    description="POC backend - Groq/Gemini LLM. No third-party connections.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------------------
# Prompts
# -----------------------------------------------------------------------------
SYSTEM_PROMPT_FR = """Tu es MedicalIQA, un agent IA Q&R medical pour professionnels de sante, hebergement HDS-style (donnees patient simulees). Tu reponds a une question clinique posee par un medecin de specialite donnee. Ton DOIT etre prudent, factuel, base sur les guidelines reconnues. Tu inventes des references bibliographiques realistes pour la demo.

Format de sortie exact en MARKDOWN :
**🩺 Reponse clinique**
- Reponse structuree en 3-5 phrases, registre medical, sans euphemismes commerciaux.

**📋 Conduite a tenir**
- 3-4 puces : examens complementaires, traitement de 1ere intention, criteres de re-evaluation, criteres d'orientation specialise.

**📚 References (style bibliographique)**
- 3 references inventees mais realistes au format HAS/Cochrane/Pubmed (ex: "HAS, Recommandation de bonne pratique, [titre], janvier 2024" ou "Smith J et al., NEJM 2023;389(12):1102-1110").

A la fin, ajoute une ligne d'avertissement : "⚠️ Demo POC - aide a la decision, ne remplace pas le jugement clinique du praticien."

Maximum 320 mots. Reste sobre, evite les superlatifs."""

SYSTEM_PROMPT_EN = """You are MedicalIQA, a medical Q&A AI agent for healthcare professionals, HDS-style hosting (simulated patient data). You answer a clinical question from a physician of a given specialty. Tone MUST be cautious, factual, based on recognized guidelines. You invent realistic bibliographic references for the demo.

Exact MARKDOWN output format:
**🩺 Clinical answer**
- Structured answer in 3-5 sentences, medical register, no commercial euphemism.

**📋 Recommended workup**
- 3-4 bullets: complementary exams, first-line treatment, reassessment criteria, specialist referral criteria.

**📚 References (bibliographic style)**
- 3 invented but realistic references in HAS/Cochrane/Pubmed format (e.g. "NICE Guideline NG136, [title], 2023" or "Smith J et al., NEJM 2023;389(12):1102-1110").

At the end, add a disclaimer line: "⚠️ Demo POC - decision support, does not replace the clinician's judgment."

Maximum 320 words. Stay sober, avoid superlatives."""


# -----------------------------------------------------------------------------
# Models
# -----------------------------------------------------------------------------
class GenerateRequest(BaseModel):
    specialty: str = Field("", max_length=60)
    question: str = Field(..., min_length=1, max_length=700)
    lang: Literal["fr", "en"] = "fr"


class GenerateResponse(BaseModel):
    output: str
    model: str
    generated_at: str
    static_mode: bool = False


# -----------------------------------------------------------------------------
# Routes
# -----------------------------------------------------------------------------
@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "medicaliqa-backend",
        "llm_configured": is_configured(),
    }


@app.post("/process", response_model=GenerateResponse)
async def process(req: GenerateRequest) -> GenerateResponse:
    specialty = (req.specialty or "").strip()[:60]
    question = (req.question or "").strip()[:700]
    if not question:
        raise HTTPException(status_code=400, detail="empty_question")

    now_iso = datetime.now(timezone.utc).isoformat()
    user_msg = (
        f'Specialite : "{specialty or "Medecine generale"}". Question clinique : "{question}". Reponds au format demande.'
        if req.lang == "fr"
        else f'Specialty: "{specialty or "General practice"}". Clinical question: "{question}". Answer in the required format.'
    )

    if not is_configured():
        return GenerateResponse(
            output=_build_mock_brief(specialty, question, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    try:
        text, model = await chat(
            [
                {"role": "system", "content": SYSTEM_PROMPT_FR if req.lang == "fr" else SYSTEM_PROMPT_EN},
                {"role": "user", "content": user_msg},
            ],
            max_tokens=900,
        )
    except Exception:
        return GenerateResponse(
            output=_build_mock_brief(specialty, question, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    return GenerateResponse(output=text, model=model, generated_at=now_iso)


# -----------------------------------------------------------------------------
# Mock brief (used when no LLM key configured)
# -----------------------------------------------------------------------------
def _build_mock_brief(specialty: str, question: str, lang: str) -> str:
    spec = specialty or ("Medecine generale" if lang == "fr" else "General practice")
    q_short = question[:90]
    if lang == "en":
        return (
            f"**🩺 Clinical answer**\n"
            f'- Based on the question in {spec} ("{q_short}..."), first-line management follows current guidelines emphasizing clinical stratification before any therapeutic escalation. Symptom pattern, comorbidities and red flags should be reassessed at 48-72h.\n\n'
            f"**📋 Recommended workup**\n"
            f"- Targeted clinical exam + minimal biology (CBC, CRP) before imaging\n"
            f"- First-line treatment per current guideline, dose-adjusted to renal function\n"
            f"- Reassessment criteria: persistent symptoms >5 days, fever >38.5C, decompensation signs\n"
            f"- Specialist referral if non-response at D7 or atypical presentation\n\n"
            f"**📚 References**\n"
            f"- NICE Guideline NG136, Clinical decision support in primary care, 2023\n"
            f"- Smith J et al., NEJM 2023;389(12):1102-1110\n"
            f"- Cochrane Review CD012589, 2024 update\n\n"
            f"⚠️ Demo POC - decision support, does not replace the clinician's judgment."
        )
    return (
        f"**🩺 Reponse clinique**\n"
        f'- Sur la question posee en {spec} ("{q_short}..."), la prise en charge de 1ere intention suit les recommandations actuelles privilegiant la stratification clinique avant toute escalade therapeutique. Le tableau symptomatique, les comorbidites et les drapeaux rouges sont a reevaluer a 48-72h.\n\n'
        f"**📋 Conduite a tenir**\n"
        f"- Examen clinique cible + biologie minimale (NFS, CRP) avant imagerie\n"
        f"- Traitement de 1ere intention conforme aux recommandations en vigueur, posologie adaptee a la fonction renale\n"
        f"- Criteres de reevaluation : symptomes persistants >5 jours, fievre >38.5C, signes de decompensation\n"
        f"- Orientation specialisee si absence de reponse a J7 ou tableau atypique\n\n"
        f"**📚 References (style bibliographique)**\n"
        f"- HAS, Recommandation de bonne pratique, Prise en charge en soins primaires, janvier 2024\n"
        f"- Smith J et al., NEJM 2023;389(12):1102-1110\n"
        f"- Revue Cochrane CD012589, mise a jour 2024\n\n"
        f"⚠️ Demo POC - aide a la decision, ne remplace pas le jugement clinique du praticien."
    )
