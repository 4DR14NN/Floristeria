const PREGUNTAS = {
  basic: [
    { id: 'b1', label: '01 — miedo', texto: '¿Cuál es tu mayor miedo? No el que dices en voz alta. El otro.', tipo: 'textarea' },
    { id: 'b2', label: '02 — música', texto: '¿Qué música escuchas cuando estás solo de verdad?', tipo: 'text' },
    { id: 'b3', label: '03 — color', texto: '¿De qué color es la oscuridad cuando cierras los ojos?', tipo: 'text' },
  ],
  standard: [
    { id: 's1', label: '01 — miedo', texto: '¿Cuál es tu mayor miedo? No el que dices en voz alta. El otro.', tipo: 'textarea' },
    { id: 's2', label: '02 — llanto', texto: 'La última vez que lloraste, ¿qué hora era y estabas solo?', tipo: 'text' },
    { id: 's3', label: '03 — música', texto: '¿Qué música escuchas a las 3 de la mañana?', tipo: 'textarea' },
    { id: 's4', label: '04 — mentira', texto: '¿Cuál es la mentira que más veces te has contado a ti mismo?', tipo: 'textarea' },
    { id: 's5', label: '05 — color', texto: '¿De qué color es la oscuridad cuando cierras los ojos?', tipo: 'text' },
    { id: 's6', label: '06 — infancia', texto: 'Describe en una frase el olor de tu infancia.', tipo: 'text' },
  ],
  premium: [
    { id: 'p1', label: '01 — miedo', texto: '¿Cuál es tu mayor miedo? No el que dices en voz alta. El otro.', tipo: 'textarea' },
    { id: 'p2', label: '02 — llanto', texto: 'La última vez que lloraste, ¿qué hora era y estabas solo?', tipo: 'text' },
    { id: 'p3', label: '03 — música', texto: '¿Qué música escuchas a las 3 de la mañana?', tipo: 'textarea' },
    { id: 'p4', label: '04 — mentira', texto: '¿Cuál es la mentira que más veces te has contado a ti mismo?', tipo: 'textarea' },
    { id: 'p5', label: '05 — color', texto: '¿De qué color es la oscuridad cuando cierras los ojos?', tipo: 'text' },
    { id: 'p6', label: '06 — infancia', texto: 'Describe en una frase el olor de tu infancia.', tipo: 'text' },
    { id: 'p7', label: '07 — traición', texto: '¿Cuándo fue la última vez que traicionaste a alguien, aunque fuera en pensamiento?', tipo: 'textarea' },
    { id: 'p8', label: '08 — silencio', texto: '¿Qué no le has dicho nunca a nadie?', tipo: 'textarea' },
    { id: 'p9', label: '09 — pérdida', texto: '¿Qué cosa has perdido que nunca has admitido que echas de menos?', tipo: 'textarea' },
    { id: 'p10', label: '10 — final', texto: 'Si mañana desaparecieras, ¿qué quedaría sin resolver?', tipo: 'textarea' },
  ]
};

const PROMPTS = {
  basic: (respuestas) => `Eres el algoritmo de una floristería oscura y poética llamada FLŌRA.AI. Analizas respuestas de un formulario psicológico básico y asignas UNA flor. Es un diagnóstico breve.

Respuestas:
${respuestas}

Responde SOLO con este formato exacto:
FLOR: [nombre de la flor en español]
DIAGNÓSTICO: [2 frases poéticas y oscuras explicando por qué esta flor. Habla en segunda persona.]`,

  standard: (respuestas) => `Eres el algoritmo de una floristería oscura y poética llamada FLŌRA.AI. Analizas respuestas de un formulario psicológico intermedio. El diagnóstico debe ser más profundo.

Respuestas:
${respuestas}

Responde SOLO con este formato exacto:
FLOR: [nombre de la flor en español]
ESPECIE: [nombre científico latino inventado pero creíble]
DIAGNÓSTICO: [3-4 frases poéticas y oscuras. Tono clínico pero perturbador. Segunda persona.]
PERFIL: [1 frase que resuma el perfil psicobotánico de esta persona]`,

  premium: (respuestas) => `Eres el algoritmo de una floristería oscura y poética llamada FLŌRA.AI. Este es el análisis más profundo y detallado. El usuario ha respondido 10 preguntas de exposición total.

Respuestas:
${respuestas}

Responde SOLO con este formato exacto:
FLOR: [nombre de la flor en español]
ESPECIE: [nombre científico latino inventado pero creíble]
DIAGNÓSTICO: [4-5 frases poéticas y clínicas. Perturbador. Segunda persona. Muy específico a sus respuestas.]
PERFIL: [2 frases sobre su perfil psicobotánico completo]
CUIDADOS: [1-2 frases sobre cómo debe cuidar esta flor, con doble lectura metafórica sobre cómo debe cuidarse a sí mismo]`
};

let tierActual = 'basic';

function abrirFormulario(tier) {
  tierActual = tier;
  const overlay = document.getElementById('formulario-overlay');
  const label = document.getElementById('form-tier-label');
  const container = document.getElementById('preguntas-container');
  const resultBox = document.getElementById('result-box');
  const loading = document.getElementById('loading-msg');
  const btn = document.getElementById('submit-btn');

  label.textContent = 'Protocolo ' + tier.charAt(0).toUpperCase() + tier.slice(1);
  resultBox.style.display = 'none';
  loading.style.display = 'none';
  btn.disabled = false;

  container.innerHTML = '';
  PREGUNTAS[tier].forEach(p => {
    const block = document.createElement('div');
    block.className = 'question-block';
    const campo = p.tipo === 'textarea'
      ? `<textarea id="${p.id}" rows="2" placeholder="escribe aquí..."></textarea>`
      : `<input type="text" id="${p.id}" placeholder="" />`;
    block.innerHTML = `
      <label class="q-label">${p.label}</label>
      <span class="q-text">${p.texto}</span>
      ${campo}
    `;
    container.appendChild(block);
  });

  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function cerrarFormulario() {
  document.getElementById('formulario-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function reiniciar() {
  abrirFormulario(tierActual);
}

async function enviar() {
  const key = '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';

  const preguntas = PREGUNTAS[tierActual];
  let hayRespuesta = false;
  let respuestasTexto = '';

  preguntas.forEach(p => {
    const el = document.getElementById(p.id);
    const val = el ? el.value.trim() : '';
    if (val) hayRespuesta = true;
    respuestasTexto += `- ${p.texto}\n  Respuesta: ${val || 'no respondido'}\n`;
  });

  if (!hayRespuesta) {
    alert('Responde al menos una pregunta.');
    return;
  }

  const btn = document.getElementById('submit-btn');
  const loading = document.getElementById('loading-msg');
  const resultBox = document.getElementById('result-box');

  btn.disabled = true;
  loading.style.display = 'block';
  resultBox.style.display = 'none';

  const prompt = PROMPTS[tierActual](respuestasTexto);

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9,
        max_tokens: 600
      })
    });

    const data = await res.json();

    if (data.error) {
      alert('Error de API: ' + data.error.message);
      btn.disabled = false;
      loading.style.display = 'none';
      return;
    }

    const texto = data.choices?.[0]?.message?.content || '';

    const nombreMatch = texto.match(/FLOR:\s*(.+)/);
    const especieMatch = texto.match(/ESPECIE:\s*(.+)/);
    const diagMatch = texto.match(/DIAGNÓSTICO:\s*([\s\S]+?)(?=PERFIL:|CUIDADOS:|$)/);
    const perfilMatch = texto.match(/PERFIL:\s*([\s\S]+?)(?=CUIDADOS:|$)/);
    const cuidadosMatch = texto.match(/CUIDADOS:\s*([\s\S]+)/);

    const nombre = nombreMatch ? nombreMatch[1].trim() : 'Flor desconocida';
    const especie = especieMatch ? especieMatch[1].trim() : null;
    const diag = diagMatch ? diagMatch[1].trim() : texto;
    const perfil = perfilMatch ? perfilMatch[1].trim() : null;
    const cuidados = cuidadosMatch ? cuidadosMatch[1].trim() : null;

    let contenidoFlor = `<div class="flor-nombre">${nombre}</div>`;
    if (especie) {
      contenidoFlor += `<div style="font-size:12px;font-family:'Space Mono',monospace;color:var(--text-label);margin-bottom:1.2rem;letter-spacing:0.06em;">${especie}</div>`;
    }

    let contenidoTexto = diag;
    if (perfil) contenidoTexto += `\n\n— ${perfil}`;
    if (cuidados) contenidoTexto += `\n\nCuidados: ${cuidados}`;

    document.getElementById('flor-nombre').outerHTML = contenidoFlor;
    document.getElementById('flor-texto').textContent = contenidoTexto;
    document.getElementById('result-tier-badge').textContent = tierActual.toUpperCase();

    resultBox.style.display = 'block';
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (e) {
    alert('Error de conexión: ' + e.message);
  }

  btn.disabled = false;
  loading.style.display = 'none';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarFormulario();
});