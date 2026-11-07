// PersonaFormUI.js - Manual Builder & AI Proposer Wizard
const PersonaFormUI = {
  activeMode: 'ai', // 'ai' or 'manual'
  editingPersonaId: null,
  proposals: [],

  openCreateWizard(defaultMode = 'ai') {
    this.editingPersonaId = null;
    this.activeMode = defaultMode;
    const title = document.getElementById('persona-modal-title');
    if (title) title.textContent = 'Create New Persona';

    const tabs = document.getElementById('persona-wizard-tabs');
    if (tabs) tabs.classList.remove('hidden');

    this.switchWizardTab(defaultMode);
    const modal = document.getElementById('modal-persona-form');
    if (modal) modal.classList.remove('hidden');
    lucide.createIcons();
  },

  editCurrentPersona() {
    if (!PersonaCardUI.currentPersona) return;
    this.editingPersonaId = PersonaCardUI.currentPersona.id;
    this.activeMode = 'manual';

    const title = document.getElementById('persona-modal-title');
    if (title) title.textContent = `Edit "${PersonaCardUI.currentPersona.name}"`;

    // Hide AI proposal tab during edit
    const tabs = document.getElementById('persona-wizard-tabs');
    if (tabs) tabs.classList.add('hidden');

    this.renderManualForm(PersonaCardUI.currentPersona);
    const modal = document.getElementById('modal-persona-form');
    if (modal) modal.classList.remove('hidden');
    lucide.createIcons();
  },

  closeModal() {
    const modal = document.getElementById('modal-persona-form');
    if (modal) modal.classList.add('hidden');
  },

  switchWizardTab(mode) {
    this.activeMode = mode;
    const tabAi = document.getElementById('tab-mode-ai');
    const tabManual = document.getElementById('tab-mode-manual');

    if (mode === 'ai') {
      if (tabAi) tabAi.className = 'py-3 px-4 font-bold text-xs sm:text-sm border-b-2 border-amber-500 text-amber-600 flex items-center gap-2';
      if (tabManual) tabManual.className = 'py-3 px-4 font-bold text-xs sm:text-sm border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-2';
      this.renderAiProposer();
    } else {
      if (tabManual) tabManual.className = 'py-3 px-4 font-bold text-xs sm:text-sm border-b-2 border-amber-500 text-amber-600 flex items-center gap-2';
      if (tabAi) tabAi.className = 'py-3 px-4 font-bold text-xs sm:text-sm border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-2';
      this.renderManualForm();
    }
    lucide.createIcons();
  },

  async renderAiProposer() {
    const body = document.getElementById('persona-modal-body');
    if (!body) return;

    body.innerHTML = `
      <div class="space-y-6">
        <div class="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
          <i data-lucide="sparkles" class="w-5 h-5 text-amber-600 shrink-0 mt-0.5"></i>
          <div class="text-xs text-amber-900 leading-relaxed">
            <strong>Informed by Product Context:</strong> The intelligence engine reads your current product value proposition, key features, and uploaded PRD specifications to synthesize realistic target archetypes.
          </div>
        </div>

        <div class="text-center py-6">
          <button onclick="PersonaFormUI.generateAiProposals()" class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/20 inline-flex items-center gap-2 transition">
            <i data-lucide="wand-2" class="w-4 h-4"></i>
            <span>Generate Persona Proposals Now</span>
          </button>
        </div>

        <div id="ai-proposals-container" class="space-y-4">
          <!-- Populated after generation -->
        </div>
      </div>
    `;
    lucide.createIcons();
  },

  async generateAiProposals() {
    const container = document.getElementById('ai-proposals-container');
    if (!container) return;

    container.innerHTML = `
      <div class="py-12 text-center text-slate-400">
        <i data-lucide="loader-2" class="w-8 h-8 animate-spin mx-auto text-amber-500 mb-2"></i>
        <p class="text-xs font-semibold">Synthesizing personas from product specs & market signals...</p>
      </div>
    `;
    lucide.createIcons();

    try {
      const proposals = await App.fetch('/api/ai/propose', {
        method: 'POST',
        body: JSON.stringify({ product_id: App.state.product?.id || 1 })
      });
      this.proposals = proposals;
      this.renderProposalCards(proposals, container);
    } catch (e) {
      container.innerHTML = `<div class="p-4 text-center text-rose-500 text-xs font-bold">Failed to generate: ${e.message}</div>`;
    }
  },

  renderProposalCards(proposals, container) {
    if (!proposals || proposals.length === 0) {
      container.innerHTML = `<div class="p-4 text-center text-slate-400 text-xs">No proposals generated.</div>`;
      return;
    }

    container.innerHTML = `
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Select a Proposed Persona Profile to Adopt</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${proposals.map((p, idx) => `
          <div class="border border-slate-200 rounded-2xl p-5 hover:border-amber-400 hover:shadow-md transition bg-white flex flex-col justify-between space-y-4">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img src="${p.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}" class="w-full h-full object-cover">
                </div>
                <div>
                  <span class="text-[10px] font-bold text-amber-600 uppercase tracking-wider">${p.archetype}</span>
                  <h4 class="font-display font-extrabold text-sm text-slate-900">${p.name}</h4>
                  <p class="text-xs text-slate-500">${p.occupation}</p>
                </div>
              </div>

              <div class="p-2.5 bg-slate-50 rounded-xl text-xs italic text-slate-700 font-serif mb-3">
                "${p.quote}"
              </div>

              <p class="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-3">${p.bio}</p>

              <div class="space-y-1">
                <span class="text-[10px] font-bold uppercase text-slate-400">Goals:</span>
                ${(p.goals || []).slice(0, 2).map(g => `
                  <div class="text-[11px] text-slate-700 flex items-center gap-1.5 truncate">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span> ${g}
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span class="text-[11px] font-bold text-slate-400">Universe Poster Ready</span>
              <button onclick="PersonaFormUI.adoptProposal(${idx})" class="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i> Adopt Profile
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    lucide.createIcons();
  },

  async adoptProposal(index) {
    const proposal = this.proposals[index];
    if (!proposal) return;

    try {
      const saved = await App.fetch('/api/personas', {
        method: 'POST',
        body: JSON.stringify(proposal)
      });
      App.toast(`Persona "${saved.name}" successfully created!`, 'success');
      this.closeModal();
      await App.loadPersonas();
      App.navigate('detail', saved.id);
    } catch (e) {
      console.error(e);
    }
  },

  renderManualForm(p = null) {
    const body = document.getElementById('persona-modal-body');
    if (!body) return;

    const data = p || {
      name: '',
      archetype: '',
      quote: '',
      theme_color: 'amber',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      age: 32,
      occupation: '',
      location: '',
      education: '',
      family_status: '',
      tech_savviness: 4,
      bio: '',
      day_in_life: '',
      goals: ['Streamline team planning', 'Reduce rework sprints'],
      frustrations: ['Scattered research docs', 'Static unmaintained persona files'],
      motivations: { growth: 80, efficiency: 90, social: 50, autonomy: 75 },
      personality_traits: { introvert_extrovert: 45, analytical_creative: 80, spontaneous_structured: 90, cautious_innovator: 50 },
      preferred_tools: ['Notion', 'Figma', 'Slack'],
      preferred_brands: ['Apple', 'Patagonia']
    };

    const traits = data.personality_traits || {};
    const motivations = data.motivations || {};

    body.innerHTML = `
      <form id="form-persona-custom" onsubmit="PersonaFormUI.saveManual(event)" class="space-y-6">
        
        <!-- SECTION 1: Identity & Visual Theme -->
        <div class="space-y-4">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">1. Identity & Theme</h4>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Full Persona Name *</label>
              <input type="text" id="p-name" required value="${data.name}" placeholder="e.g. Kayla the Planner" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Archetype Tagline *</label>
              <input type="text" id="p-archetype" required value="${data.archetype}" placeholder="e.g. Kayla the Planner" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Core Quotation (Arthur Chayka Quote Card) *</label>
            <input type="text" id="p-quote" required value="${data.quote}" placeholder="e.g. If our sprint backlog isn't anchored in real user signals, we are just guessing." class="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Universe Accent Color Theme</label>
              <select id="p-theme" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                <option value="amber" ${data.theme_color === 'amber' ? 'selected' : ''}>Warm Amber / Coral (Kayla)</option>
                <option value="indigo" ${data.theme_color === 'indigo' ? 'selected' : ''}>Royal Indigo / Violet (Drew)</option>
                <option value="teal" ${data.theme_color === 'teal' ? 'selected' : ''}>Emerald Teal (Rony)</option>
                <option value="rose" ${data.theme_color === 'rose' ? 'selected' : ''}>Rose / Magenta</option>
                <option value="emerald" ${data.theme_color === 'emerald' ? 'selected' : ''}>Forest Emerald</option>
                <option value="violet" ${data.theme_color === 'violet' ? 'selected' : ''}>Electric Violet</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Avatar Image URL</label>
              <input type="url" id="p-avatar" value="${data.avatar_url}" placeholder="https://..." class="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>
          </div>
        </div>

        <!-- SECTION 2: Demographics -->
        <div class="space-y-4 pt-2 border-t border-slate-100">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">2. Demographics & Tech Literacy</h4>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-slate-700 mb-1">Age</label>
              <input type="number" id="p-age" value="${data.age || 30}" class="w-full text-xs p-2 rounded-xl border border-slate-300 outline-none">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-700 mb-1">Occupation</label>
              <input type="text" id="p-occ" value="${data.occupation}" placeholder="e.g. Lead Designer" class="w-full text-xs p-2 rounded-xl border border-slate-300 outline-none">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-700 mb-1">Location</label>
              <input type="text" id="p-loc" value="${data.location}" placeholder="e.g. New York, NY" class="w-full text-xs p-2 rounded-xl border border-slate-300 outline-none">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-700 mb-1">Education</label>
              <input type="text" id="p-edu" value="${data.education}" placeholder="e.g. B.S. in UX" class="w-full text-xs p-2 rounded-xl border border-slate-300 outline-none">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-700 mb-1">Family Status</label>
              <input type="text" id="p-fam" value="${data.family_status}" placeholder="e.g. Married, 1 child" class="w-full text-xs p-2 rounded-xl border border-slate-300 outline-none">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-700 mb-1">Tech Savviness (1-5)</label>
              <input type="number" id="p-tech" min="1" max="5" value="${data.tech_savviness || 4}" class="w-full text-xs p-2 rounded-xl border border-slate-300 outline-none">
            </div>
          </div>
        </div>

        <!-- SECTION 3: Bio & Day In Life -->
        <div class="space-y-4 pt-2 border-t border-slate-100">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">3. Narrative Stories</h4>
          
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Narrative Biography</label>
            <textarea id="p-bio" rows="2" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none" placeholder="Contextualize their job, background, and responsibilities...">${data.bio}</textarea>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Day In The Life (Workflow narrative)</label>
            <textarea id="p-day" rows="2" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none" placeholder="Describe morning, afternoon, and key moments of friction...">${data.day_in_life}</textarea>
          </div>
        </div>

        <!-- SECTION 4: Personality Sliders -->
        <div class="space-y-4 pt-2 border-t border-slate-100">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">4. Personality Trait Sliders (0 - 100)</h4>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div class="flex justify-between font-semibold text-slate-600 mb-1">
                <span>Introvert</span> <span>Extrovert</span>
              </div>
              <input type="range" id="p-tr-ie" min="0" max="100" value="${traits.introvert_extrovert || 40}" class="w-full accent-amber-500">
            </div>
            <div>
              <div class="flex justify-between font-semibold text-slate-600 mb-1">
                <span>Analytical</span> <span>Creative</span>
              </div>
              <input type="range" id="p-tr-ac" min="0" max="100" value="${traits.analytical_creative || 80}" class="w-full accent-amber-500">
            </div>
            <div>
              <div class="flex justify-between font-semibold text-slate-600 mb-1">
                <span>Spontaneous</span> <span>Structured</span>
              </div>
              <input type="range" id="p-tr-ss" min="0" max="100" value="${traits.spontaneous_structured || 90}" class="w-full accent-amber-500">
            </div>
            <div>
              <div class="flex justify-between font-semibold text-slate-600 mb-1">
                <span>Cautious</span> <span>Early Adopter</span>
              </div>
              <input type="range" id="p-tr-ci" min="0" max="100" value="${traits.cautious_innovator || 50}" class="w-full accent-amber-500">
            </div>
          </div>
        </div>

        <!-- SECTION 5: Goals & Frustrations -->
        <div class="space-y-4 pt-2 border-t border-slate-100">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">5. Goals & Frustrations (One per line)</h4>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Goals & Objectives</label>
              <textarea id="p-goals" rows="3" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none font-sans" placeholder="One goal per line...">${(data.goals || []).join('\n')}</textarea>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Frustrations & Pain Points</label>
              <textarea id="p-frustrations" rows="3" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none font-sans" placeholder="One frustration per line...">${(data.frustrations || []).join('\n')}</textarea>
            </div>
          </div>
        </div>

        <!-- SECTION 6: Tools & Brands -->
        <div class="space-y-4 pt-2 border-t border-slate-100">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">6. Preferred Apps & Brands (Comma separated)</h4>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Preferred Apps & Tools</label>
              <input type="text" id="p-tools" value="${(data.preferred_tools || []).join(', ')}" placeholder="Notion, Figma, Slack..." class="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Preferred Brands</label>
              <input type="text" id="p-brands" value="${(data.preferred_brands || []).join(', ')}" placeholder="Apple, Arc, Patagonia..." class="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none">
            </div>
          </div>
        </div>

        <!-- Modal Submit Actions -->
        <div class="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button type="button" onclick="PersonaFormUI.closeModal()" class="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">Cancel</button>
          <button type="submit" class="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition">
            ${this.editingPersonaId ? 'Save Changes' : 'Create Universe Persona'}
          </button>
        </div>

      </form>
    `;
  },

  async saveManual(e) {
    e.preventDefault();
    
    const goalsRaw = document.getElementById('p-goals').value;
    const frusRaw = document.getElementById('p-frustrations').value;
    const toolsRaw = document.getElementById('p-tools').value;
    const brandsRaw = document.getElementById('p-brands').value;

    const payload = {
      id: this.editingPersonaId,
      product_id: App.state.product?.id || 1,
      name: document.getElementById('p-name').value.trim(),
      archetype: document.getElementById('p-archetype').value.trim(),
      quote: document.getElementById('p-quote').value.trim(),
      theme_color: document.getElementById('p-theme').value,
      avatar_url: document.getElementById('p-avatar').value.trim(),
      age: parseInt(document.getElementById('p-age').value) || 30,
      occupation: document.getElementById('p-occ').value.trim(),
      location: document.getElementById('p-loc').value.trim(),
      education: document.getElementById('p-edu').value.trim(),
      family_status: document.getElementById('p-fam').value.trim(),
      tech_savviness: parseInt(document.getElementById('p-tech').value) || 4,
      bio: document.getElementById('p-bio').value.trim(),
      day_in_life: document.getElementById('p-day').value.trim(),
      goals: goalsRaw.split('\n').map(s => s.trim()).filter(Boolean),
      frustrations: frusRaw.split('\n').map(s => s.trim()).filter(Boolean),
      preferred_tools: toolsRaw.split(',').map(s => s.trim()).filter(Boolean),
      preferred_brands: brandsRaw.split(',').map(s => s.trim()).filter(Boolean),
      personality_traits: {
        introvert_extrovert: parseInt(document.getElementById('p-tr-ie').value),
        analytical_creative: parseInt(document.getElementById('p-tr-ac').value),
        spontaneous_structured: parseInt(document.getElementById('p-tr-ss').value),
        cautious_innovator: parseInt(document.getElementById('p-tr-ci').value)
      },
      motivations: { growth: 80, efficiency: 90, social: 55, autonomy: 80 }
    };

    try {
      const saved = await App.fetch('/api/personas', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      App.toast(`Persona "${saved.name}" saved successfully!`, 'success');
      this.closeModal();
      await App.loadPersonas();
      App.navigate('detail', saved.id);
    } catch (e) {
      console.error(e);
    }
  }
};
