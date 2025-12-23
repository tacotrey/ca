// ------------------------------ Item bank ------------------------------
// Base items: 3 per competency (Masculine, Feminine, Integration)
const baseItems = [
  // 1. Ethical Practice — Root (Masculine core)
  {id:"1a",comp:1,energy:"M",chak:{root:1},text:"I explicitly state confidentiality and scope, and hold firm boundaries when drift occurs."},
  {id:"1b",comp:1,energy:"F",chak:{root:1},text:"I notice and name my own biases or triggers and realign to the client’s agenda in‑the‑moment."},
  {id:"1c",comp:1,energy:"I",chak:{root:1},text:"When a misstep happens, I repair the relationship promptly and transparently."},

  // 2. Coaching Mindset — Crown (Feminine core)
  {id:"2a",comp:2,energy:"F",chak:{crown:1},text:"I approach sessions with curiosity and a learner’s mind, welcoming not‑knowing."},
  {id:"2b",comp:2,energy:"M",chak:{crown:1},text:"I maintain a deliberate development plan and use feedback/data to improve my coaching."},
  {id:"2c",comp:2,energy:"I",chak:{crown:1},text:"I reflect after sessions and translate insights into concrete experiments for next time."},

  // 3. Agreements — Solar Plexus (Masculine core)
  {id:"3a",comp:3,energy:"M",chak:{solar:1},text:"I co‑create clear outcomes and success measures before we dive in."},
  {id:"3b",comp:3,energy:"F",chak:{solar:1},text:"I invite the client’s language, meaning, and emotions in framing the agenda."},
  {id:"3c",comp:3,energy:"I",chak:{solar:1},text:"I check and realign to the agreement as the conversation unfolds."},

  // 4. Trust & Safety — Heart (Feminine core)
  {id:"4a",comp:4,energy:"F",chak:{heart:1},text:"I validate feelings and honor the client’s pace and autonomy."},
  {id:"4b",comp:4,energy:"M",chak:{heart:1},text:"I maintain a clean container (time, focus, confidentiality) even when tension rises."},
  {id:"4c",comp:4,energy:"I",chak:{heart:1},text:"I can challenge directly while staying warm and non‑judgmental."},

  // 5. Presence — Third Eye (Feminine core)
  {id:"5a",comp:5,energy:"F",chak:{third_eye:1},text:"I’m comfortable with silence and follow emergent threads."},
  {id:"5b",comp:5,energy:"M",chak:{third_eye:1},text:"I interrupt gently to protect focus when the conversation diffuses."},
  {id:"5c",comp:5,energy:"I",chak:{third_eye:1},text:"I reflect patterns I notice (language, energy) without attachment to being right."},

  // 6. Listens Actively — Throat (Balanced)
  {id:"6a",comp:6,energy:"F",chak:{throat:1},text:"I listen for what’s unsaid and reflect emotions/values I sense."},
  {id:"6b",comp:6,energy:"M",chak:{throat:1},text:"I summarize crisply to create shared clarity and momentum."},
  {id:"6c",comp:6,energy:"I",chak:{throat:1},text:"I ensure the client feels fully heard before moving to action."},

  // 7. Evokes Awareness — Third Eye + Solar (Balanced)
  {id:"7a",comp:7,energy:"F",chak:{third_eye:1},text:"I use metaphor, imagery, or somatic noticing to open insight."},
  {id:"7b",comp:7,energy:"M",chak:{solar:1},text:"I ask concise, challenging questions that disrupt stuck patterns."},
  {id:"7c",comp:7,energy:"I",chak:{third_eye:0.5, solar:0.5},text:"I connect insights to choices or commitments the client cares about."},

  // 8. Facilitates Growth — Sacral + Solar (Masculine‑leaning)
  {id:"8a",comp:8,energy:"M",chak:{solar:1},text:"I co‑design actions with clear accountability, timeframe, and support."},
  {id:"8b",comp:8,energy:"F",chak:{sacral:1},text:"I encourage playful experiments and learning over perfection."},
  {id:"8c",comp:8,energy:"I",chak:{sacral:0.5, solar:0.5},text:"We plan rhythms/rituals to sustain change (check‑ins, reflection)."},
];

// Dynamic follow‑ups (shown only when a style gap is detected)
const probes = {
  1:{ // Ethics
    m:{id:"1m+",comp:1,energy:"M",chak:{root:1},text:"When scope or ethics blur, I pause and renegotiate expectations immediately."},
    f:{id:"1f+",comp:1,energy:"F",chak:{root:1},text:"I invite the client to name what would restore safety or trust right now."}
  },
  2:{
    m:{id:"2m+",comp:2,energy:"M",chak:{crown:1},text:"I translate reflections into one concrete improvement for my next session."},
    f:{id:"2f+",comp:2,energy:"F",chak:{crown:1},text:"I intentionally adopt a ‘not‑knowing’ stance when I notice a strong opinion."}
  },
  3:{
    m:{id:"3m+",comp:3,energy:"M",chak:{solar:1},text:"If goals are vague, I propose a one‑line outcome to test for fit."},
    f:{id:"3f+",comp:3,energy:"F",chak:{solar:1},text:"I ask how success should feel or look in the client’s world."}
  },
  4:{
    m:{id:"4m+",comp:4,energy:"M",chak:{heart:1},text:"I protect boundaries kindly (time/focus) while staying connected."},
    f:{id:"4f+",comp:4,energy:"F",chak:{heart:1},text:"I mirror emotion first and let the client set the pace."}
  },
  5:{
    m:{id:"5m+",comp:5,energy:"M",chak:{third_eye:1},text:"I redirect gently to the essence when the story expands."},
    f:{id:"5f+",comp:5,energy:"F",chak:{third_eye:1},text:"I leave meaningful silence and follow emergent energy."}
  },
  6:{
    m:{id:"6m+",comp:6,energy:"M",chak:{throat:1},text:"I offer crisp summaries and check for accuracy."},
    f:{id:"6f+",comp:6,energy:"F",chak:{throat:1},text:"I reflect values/feelings before moving toward action."}
  },
  7:{
    m:{id:"7m+",comp:7,energy:"M",chak:{solar:1},text:"I use short, high‑gain questions that prompt decisions."},
    f:{id:"7f+",comp:7,energy:"F",chak:{third_eye:1},text:"I invite imagery or somatic noticing to deepen insight."}
  },
  8:{
    m:{id:"8m+",comp:8,energy:"M",chak:{solar:1},text:"We define action + when + support + evidence of progress."},
    f:{id:"8f+",comp:8,energy:"F",chak:{sacral:1},text:"We co‑design playful experiments that make learning inevitable."}
  }
};

// Micro‑practice library and chakra support (from prior version)
const micro = {
  1:{lowM:["Open with a boundary script: “I’ll protect our time and focus; may I pause us if we drift?”","Name confidentiality explicitly and ask the client to restate what it means for them."],
     lowF:["Bias check: name one assumption you’re holding and invite correction.","Repair fast: acknowledge any misstep and ask what would restore trust now."],
     integrate:["Co‑design ethical expectations with the client (when to pause, what to avoid, how to repair)."],
     stretch:["Invite client to audit your boundaries live: “How am I honoring our contract right now?”"]},
  2:{lowM:["After each session, log a 3‑min debrief: hypothesis → what happened → what I’ll try next.","Identify one metric and track for 4 weeks."],
     lowF:["Begin with two breaths and say (internally): “I don’t know; I’m here to learn.”","Set a curiosity intention: “What wants to happen for them, not for me?”"],
     integrate:["Translate one reflection into a concrete experiment for your next session."],
     stretch:["Design a 2‑week learning sprint with a peer coach; exchange recordings and feedback."]},
  3:{lowM:["Use the 3‑part contract: Topic → Outcome → Measure.","Capture success criteria in the client’s words before proceeding."],
     lowF:["Invite imagery: “If success were a feeling or picture, what would it be?”","Ask: “What matters about this, and how will we know it honors that?”"],
     integrate:["Mid‑session checkpoint: “Are we still working on the right thing?”"],
     stretch:["Teach clients to co‑own contracting; let them lead mid‑session recalibration."]},
  4:{lowM:["Name time/containment kindly: “We have 10 minutes; what matters most now?”","Set a pact for interruptions to protect focus; get explicit permission."],
     lowF:["Mirror emotion first: “I’m hearing disappointment—what’s underneath that?”","Normalize and affirm strengths before challenge."],
     integrate:["Pair challenge with care: “May I offer a hard question with a lot of care?”"],
     stretch:["Invite a brave conversation: “What truth is just outside the door?”"]},
  5:{lowM:["When drift appears, ask: “What’s essential right now?”","Offer a gentle interrupt to refocus; confirm consent."],
     lowF:["Practice 20 seconds of shared silence when insight edges appear.","Follow energy instead of plan for 2 minutes; see what emerges."],
     integrate:["Name patterns neutrally and hand them back for meaning‑making."],
     stretch:["Track energetic shifts across a session and debrief what moved the needle."]},
  6:{lowM:["Every 3–5 minutes, make a one‑line summary and check accuracy.","Use “What I’m hearing is…” then ask, “What did I miss or distort?”"],
     lowF:["Reflect emotion/values before content; ask where it lands in the body.","Leave a beat of silence after insights to let them deepen."],
     integrate:["Ensure they feel heard before moving to action; ask for their recap first."],
     stretch:["Track language patterns across sessions (metaphors, verbs) and reflect the pattern."]},
  7:{lowM:["Use short, high‑gain questions: “What’s the payoff?” “What else is true?”","Ask for decisions: “What’s the smallest bold move here?”"],
     lowF:["Use somatic scanning: “Where do you feel this?” Invite metaphor or image.","Ask for perspective shifts: “If your wiser self spoke, what would it say?”"],
     integrate:["Link insights to values and choices; ask for one commitment from the new seeing."],
     stretch:["Design a mini‑experiment in-session to test a new belief, then debrief."]},
  8:{lowM:["Commitment formula: Action + When + Support + Evidence of progress.","Design accountability with the client’s words; calendar it now."],
     lowF:["Create playful 72‑hour micro‑experiments; name what you'll learn if it 'fails'.","Celebrate small wins and name capability shifts, not just outcomes."],
     integrate:["Co‑design rhythms/rituals (check‑ins, reflection cadence) to sustain change."],
     stretch:["Build anti‑fragile structures: if‑then plans and habit stacks tied to routines."]}
};
const chakraPractices = {
  root:["30‑second grounding before sessions: feet, breath, contract.","Boundary script: define confidentiality, scope, and permission to pause drift."],
  sacral:["3×3 idea play: generate three playful options in three minutes.","Invite creativity: “What’s the experiment that would be fun to try?”"],
  solar:["Power statement: “What will you do by when, and how will you know?”","Negotiate accountability that the client genuinely owns."],
  heart:["Micro‑acknowledgment: reflect a specific strength or value you just heard.","Ask, “What support would make this feel safer?”"],
  throat:["Ask permission to interrupt; offer crisp summaries for shared clarity.","Use voice checks: “May I reflect what I’m hearing?”"],
  third_eye:["Name patterns you notice and hand them back for meaning.","Use imagery or metaphor to explore what’s emerging."],
  crown:["Open with an intention of curiosity: “What wants to happen here?”","Post‑session reflection: one insight → one experiment for next time."]
};

// ------------------------------ Wizard state ------------------------------
let queue = [...baseItems];        // will grow if probes get inserted
let answers = {};                  // id -> 0/1/2/3/'NA'
let index = 0;
let usedProbes = {};               // comp -> true when a probe has been inserted
const MAX_PROBES = 6;              // cap dynamic questions

function current(){ return queue[index]; }

function renderQuestion(){
  document.getElementById('intro').style.display='none';
  document.getElementById('wizard').style.display='block';
  const q = current();
  document.getElementById('qIndex').textContent = `Question ${index+1}`;
  document.getElementById('qTotal').textContent = `/ ${queue.length}`;
  document.getElementById('qText').textContent = q.text;

  const pct = Math.round(((index)/queue.length)*100);
  document.getElementById('qProgress').style.width = pct + '%';

  // Render scale
  const scale = document.getElementById('scale');
  scale.innerHTML = '';
  const opts = [
    {v:3, label:'Always (3)'},
    {v:2, label:'Often (2)'},
    {v:1, label:'Sometimes (1)'},
    {v:0, label:'Rarely/Never (0)'},
    {v:'NA', label:'N/A'}
  ];
  opts.forEach(o=>{
    const id = `opt-${q.id}-${o.v}`;
    const lab = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `ans-${q.id}`;
    input.value = o.v;
    input.style.marginRight='8px';
    if(answers[q.id]===String(o.v) || answers[q.id]===o.v) input.checked = true;
    lab.appendChild(input);
    lab.appendChild(document.createTextNode(o.label));
    scale.appendChild(lab);
  });

  // Buttons
  document.getElementById('prevBtn').disabled = index===0;
  document.getElementById('finishBtn').style.display = index >= queue.length-1 ? 'inline-block':'none';
  document.getElementById('nextBtn').style.display = index >= queue.length-1 ? 'none':'inline-block';
  document.getElementById('progressNote').textContent = "You can move back and forth using the previous and next buttons.";
}

function getSelectedValue(){
  const q = current();
  const nodes = document.querySelectorAll(`input[name="ans-${q.id}"]`);
  for(const n of nodes){ if(n.checked) return n.value; }
  return null;
}

function saveAnswer(){
  const v = getSelectedValue();
  if(v!==null) answers[current().id] = v;
}

function maybeInsertProbeFor(comp){
  if(Object.keys(usedProbes).length >= MAX_PROBES) return;
  if(usedProbes[comp]) return;

  // Calculate simple M vs F delta using answered items so far within this comp
  let m=0,f=0,countM=0,countF=0;
  for(const it of queue){
    if(it.comp!==comp) continue;
    const a = answers[it.id];
    if(a===undefined || a==='NA') continue;
    const v = parseInt(a,10);
    if(isNaN(v)) continue;
    if(it.energy==='M'){ m+=v; countM+=3; } 
    else if(it.energy==='F'){ f+=v; countF+=3; }
    else { m+=v/2; f+=v/2; countM+=1.5; countF+=1.5; } // integrated splits half
  }
  if(countM===0 && countF===0) return;

  const mPct = countM? m/countM : 0;
  const fPct = countF? f/countF : 0;
  const gap = mPct - fPct;

  // If strong lean (> 0.2), insert a probe for the under‑represented side
  if(Math.abs(gap) > 0.2){
    const under = gap>0 ? 'f' : 'm';
    const probe = probes[comp][under];
    // Only insert if not already in queue
    if(!queue.find(x=>x.id===probe.id)){
      // Insert right after current index to show it soon
      queue.splice(index+1, 0, probe);
      usedProbes[comp] = true;
    }
  }
}

// Navigation
document.getElementById('startBtn').addEventListener('click', ()=>{ index=0; renderQuestion(); });
document.getElementById('prevBtn').addEventListener('click', ()=>{ saveAnswer(); if(index>0) index--; renderQuestion(); });
document.getElementById('nextBtn').addEventListener('click', ()=>{
  saveAnswer();
  // If we just answered the 3rd base item of a competency, consider inserting a probe
  const q = current();
  // Count base answered for this comp among base items only
  const baseAnsweredForComp = baseItems.filter(it=>it.comp===q.comp && answers[it.id]!==undefined).length;
  if(baseAnsweredForComp===3){ maybeInsertProbeFor(q.comp); }
  if(index < queue.length-1){ index++; renderQuestion(); }
});
document.getElementById('skipBtn').addEventListener('click', ()=>{ answers[current().id] = 'NA'; const q=current(); const baseAnsweredForComp = baseItems.filter(it=>it.comp===q.comp && answers[it.id]!==undefined).length; if(baseAnsweredForComp===3){ maybeInsertProbeFor(q.comp); } if(index < queue.length-1){ index++; renderQuestion(); }});
document.getElementById('finishBtn').addEventListener('click', ()=>{ saveAnswer(); showResults(); });

// ------------------------------ Scoring ------------------------------
function showResults(){
  document.getElementById('wizard').style.display='none';
  const res = document.getElementById('results');
  res.style.display='block';

  // Aggregate
  const comps = {}; // comp -> {name, total, max, m, f, i}
  const names = {1:"Ethical Practice",2:"Coaching Mindset",3:"Agreements",4:"Trust & Safety",5:"Presence",6:"Listens Actively",7:"Evokes Awareness",8:"Facilitates Growth"};
  const energy = {M:0,F:0}, energyMax={M:0,F:0};
  const chakra = {root:0,sacral:0,solar:0,heart:0,throat:0,third_eye:0,crown:0};
  const chakraMax = {root:0,sacral:0,solar:0,heart:0,throat:0,third_eye:0,crown:0};

  const allItems = queue; // include probes
  for(const it of allItems){
    comps[it.comp] ||= {name:names[it.comp],total:0,max:0,m:0,f:0,i:0};
    const ans = answers[it.id];
    // Update maxima
    comps[it.comp].max += 3;
    if(it.energy==='M'){ energyMax.M += 3; } else if(it.energy==='F'){ energyMax.F += 3; } else { energyMax.M += 1.5; energyMax.F += 1.5; }
    for(const c in it.chak){ chakraMax[c] += 3*it.chak[c]; }

    if(ans!==undefined && ans!=='NA'){
      const v = parseInt(ans,10);
      comps[it.comp].total += v;
      if(it.energy==='M'){ comps[it.comp].m+=v; energy.M+=v; }
      else if(it.energy==='F'){ comps[it.comp].f+=v; energy.F+=v; }
      else { comps[it.comp].i+=v; energy.M+=v/2; energy.F+=v/2; }
      for(const c in it.chak){ chakra[c]+= v*it.chak[c]; }
    }
  }

  function pct(v,max){ return max>0? v/max : 0; }
  function toPct(v){ return Math.round(v*100); }
  function bar(p){ return `<div class="bar"><span style="width:${Math.max(0,Math.min(100,p))}%;"></span></div>`; }

  const mPct = pct(energy.M, energyMax.M);
  const fPct = pct(energy.F, energyMax.F);
  const pbi = (mPct - fPct); // positive -> masculine leaning

  // Build results UI
  let html = '';
  html += `<div class="card"><h2 style="margin:0 0 6px">Your Results</h2>
    <div class="hint">How to read the numbers: <b>Score</b> is the % of available points you earned for that competency, using the scale Always=3, Often=2, Sometimes=1, Rarely/Never=0. <b>N/A</b> doesn’t count toward the maximum. <b>Masculine/Feminine</b> show your style emphasis inside that competency (integration items count half toward each).</div></div>`;

  // Summary: Energy + Highlights
  // Determine per-competency records
  const rows = Object.entries(comps).map(([cid,c])=>{
    const p = pct(c.total, c.max);
    const mShare = pct(c.m + c.i/2, c.max);
    const fShare = pct(c.f + c.i/2, c.max);
    const lean = (mShare - fShare);
    const rating = p>=0.75?'Strength':(p>=0.5?'Mixed':'Edge');
    return {cid:+cid,name:c.name,p, mShare, fShare, lean, rating, raw:c};
  }).sort((a,b)=>a.cid-b.cid);

  const edges = [...rows].sort((a,b)=>a.p-b.p).slice(0,2);
  const strengths = [...rows].sort((a,b)=>b.p-a.p).slice(0,2);

  html += `<div class="grid">`;
  // Energy Balance card
  html += `<div class="card"><h3 style="margin:0 0 6px">Energy Balance</h3>
    <div>Masculine: ${toPct(mPct)}%</div>${bar(toPct(mPct))}
    <div style="margin-top:8px">Feminine: ${toPct(fPct)}%</div>${bar(toPct(fPct))}
    <div class="hr"></div>
    <div class="hint">Bias index (M−F): <b>${(pbi*100).toFixed(0)} pts</b> · ${pbi>0.1?'Masculine‑leaning':(pbi<-0.1?'Feminine‑leaning':'Balanced')}</div>
  </div>`;

  // Chakra support heatmap
  const chakraNames = {root:"Root",sacral:"Sacral",solar:"Solar Plexus",heart:"Heart",throat:"Throat",third_eye:"Third Eye",crown:"Crown"};
  const chakRows = Object.keys(chakra).map(k=>({key:k, name:chakraNames[k], p:pct(chakra[k],chakraMax[k])})).sort((a,b)=>a.p-b.p);
  html += `<div class="card"><h3 style="margin:0 0 6px">Chakra Support</h3>
    <table class="tbl"><thead><tr><th>Center</th><th>Support need</th><th>Bar</th></tr></thead><tbody>`;
  chakRows.forEach(r=>{ html += `<tr><td>${r.name}</td><td>${100-toPct(r.p)}% need</td><td>${bar(100-toPct(r.p))}</td></tr>`; });
  html += `</tbody></table>
    <div class="hint">Lower scores indicate centers where targeted somatic practices could unlock performance.</div>
  </div>`;
  html += `</div>`; // grid

  // Competency details table
  html += `<div class="card"><h3 style="margin:0 0 6px">ICF Competencies (detail)</h3>
    <table class="tbl"><thead><tr><th>#</th><th>Competency</th><th>Score</th><th>Rating</th><th>Lean</th></tr></thead><tbody>`;
  rows.forEach(r=>{
    const leanLabel = r.lean>0.15?'Masculine‑leaning':(r.lean<-0.15?'Feminine‑leaning':'Balanced');
    html += `<tr>
      <td>${r.cid}</td><td>${r.name}</td>
      <td>${toPct(r.p)}%</td>
      <td><span class="result-chip">${r.rating}</span></td>
      <td>${leanLabel}</td>
    </tr>`;
  });
  html += `</tbody></table>
  <div class="hint">“Lean” compares your masculine vs feminine expression within that competency; integration items count toward both.</div>
  </div>`;

  // Recommendations for the two lowest competencies
  function recBlock(r){
    const cid = r.cid;
    const m = r.mShare, f = r.fShare;
    let bucket = 'integrate';
    if(r.p < 0.5){
      if(m - f > 0.15) bucket = 'lowF';
      else if(f - m > 0.15) bucket = 'lowM';
      else bucket = 'integrate';
    } else {
      bucket = 'stretch';
    }
    const list = (micro[cid] && micro[cid][bucket]) ? micro[cid][bucket] : [];
    const title = r.p < 0.5 ? `Development Edge • ${r.name} (${cid})` : `Strength Stretch • ${r.name} (${cid})`;
    const explain = r.p < 0.5
      ? (bucket==='lowF'?'This looks like a <b>feminine‑expression gap</b> in this competency.':
         bucket==='lowM'?'This looks like a <b>masculine‑expression gap</b> in this competency.':
         'This edge benefits from <b>integrating</b> structure and receptivity.')
      : 'High capability detected—try these advanced stretches.';
    return `<div class="card"><h3 style="margin:0 0 6px">${title}</h3>
      <div class="hint">${explain}</div>
      <ul class="boxlist">${list.map(x=>`<li>${x}</li>`).join('')}</ul>
    </div>`;
  }
  html += `<div class="grid">`;
  html += recBlock(edges[0] || rows[0]);
  html += recBlock(edges[1] || rows[1]);

  // Chakra practices for the two lowest centers
  html += `<div class="card"><h3 style="margin:0 0 6px">Targeted Chakra Practices</h3>`;
  const lowCh = chakRows.slice(0,2);
  lowCh.forEach(ch=>{
    const acts = chakraPractices[ch.key] || [];
    html += `<div style="margin:6px 0"><b>${ch.name}</b> · support need ${100-toPct(ch.p)}%
      <ul class="boxlist">${acts.map(a=>`<li>${a}</li>`).join('')}</ul></div>`;
  });
  html += `</div>`;
  html += `</div>`; // grid

  // Highlights
  html += `<div class="card"><h3 style="margin:0 0 6px">Highlights</h3>
    <div><b>Top strengths:</b> ${strengths.map(s=>`${s.name} (${s.cid})`).join(', ') || '—'}</div>
    <div><b>Top development edges:</b> ${edges.map(e=>`${e.name} (${e.cid})`).join(', ') || '—'}</div>
    <div class="hr"></div>
    <button class="btn ghost" onclick="location.reload()">Start over</button>
  </div>`;

  res.innerHTML = html;
}

// Kick off


