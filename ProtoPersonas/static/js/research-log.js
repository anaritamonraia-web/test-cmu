// ResearchUI.js - Empirical User Research Logger & Grounding Evidence Hub
const ResearchUI = {
  
  openEntryModal(preselectedPersonaId = null) {
    const body = document.getElementById('research-modal-body');
    if (!body) return;

    const personas = App.state.personas || [];
    const today = new Date().toISOString().slice(0, 10);

    body.innerHTML = `
      <form id="form-research-entry" onsubmit="ResearchUI.saveEntry(event)" class="space-y-5">
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Participant Name *</label>
            <input type="text" id="r-name" required placeholder="e.g. Sarah Chen" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Participant Job Role / Organization</label>
            <input type="text" id="r-role" placeholder="e.g. Director of Product Operations" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">Session Date</label>
            <input type="date" id="r-date" value="${today}" class="w-full text-xs p-2 rounded-xl border border-slate-300 outline-none">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">Session Methodology</label>
            <select id="r-type" class="w-full text-xs p-2 rounded-xl border border-slate-300 outline-none bg-white">
              <option value="1-on-1 Interview">1-on-1 Interview</option>
              <option value="Usability Test">Usability Test</option>
              <option value="Survey Feedback">Survey Feedback</option>
              <option value="Support Ticket Analysis">Support Ticket Analysis</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">Link to Target Persona</label>
            <select id="r-persona" class="w-full text-xs p-2 rounded-xl border border-slate-300 outline-none bg-white">
              <option value="">-- General Product Signal --</option>
              ${personas.map(p => `
                <option value="${p.id}" ${preselectedPersonaId == p.id ? 'selected' : ''}>
                  ${p.name} (${p.archetype})
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="text-xs font-bold text-slate-700">Verbatim Participant Quotes (One quote per line) *</label>
            <span class="text-[11px] text-amber-600 font-semibold">+1.5 pts per quote</span>
          </div>
          <textarea id="r-quotes" rows="3" required placeholder="Paste direct, unedited quotes here..." class="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none font-serif italic"></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Observed Behaviors & Workarounds (One per line)</label>
            <textarea id="r-behaviors" rows="2" placeholder="e.g. Exported data to Excel manually because dashboard lacks filtering..." class="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"></textarea>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Validated Pain Points (One per line)</label>
            <textarea id="r-pain-points" rows="2" placeholder="e.g. Frustrated by delayed cross-team sync..." class="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"></textarea>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Finding Status</label>
            <select id="r-status" class="w-full text-xs p-2 rounded-xl border border-slate-300 outline-none bg-white">
              <option value="confirmed">Confirmed Existing Persona Assumption</option>
              <option value="discovered">New Discovery (Triggers Persona Evolution Suggestion)</option>
              <option value="refuted">Refuted Assumption (Requires Persona Revision)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Internal Synthesis Notes</label>
            <input type="text" id="r-notes" placeholder="e.g. Participant is key enterprise buyer persona" class="w-full text-xs p-2 rounded-xl border border-slate-300 outline-none">
          </div>
        </div>

        <div class="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button type="button" onclick="ResearchUI.closeModal()" class="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">Cancel</button>
          <button type="submit" class="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5">
            <i data-lucide="check" class="w-4 h-4"></i> Save & Ground Persona
          </button>
        </div>

      </form>
    `;

    const modal = document.getElementById('modal-research-entry');
    if (modal) modal.classList.remove('hidden');
    lucide.createIcons();
  },

  closeModal() {
    const modal = document.getElementById('modal-research-entry');
    if (modal) modal.classList.add('hidden');
  },

  async saveEntry(e) {
    e.preventDefault();

    const quotesRaw = document.getElementById('r-quotes').value;
    const behRaw = document.getElementById('r-behaviors').value;
    const painRaw = document.getElementById('r-pain-points').value;
    const personaVal = document.getElementById('r-persona').value;

    const payload = {
      product_id: App.state.product?.id || 1,
      persona_id: personaVal ? parseInt(personaVal) : null,
      participant_name: document.getElementById('r-name').value.trim(),
      participant_role: document.getElementById('r-role').value.trim(),
      session_date: document.getElementById('r-date').value,
      session_type: document.getElementById('r-type').value,
      quotes: quotesRaw.split('\n').map(s => s.trim()).filter(Boolean),
      observed_behaviors: behRaw.split('\n').map(s => s.trim()).filter(Boolean),
      validated_pain_points: painRaw.split('\n').map(s => s.trim()).filter(Boolean),
      validation_status: document.getElementById('r-status').value,
      notes: document.getElementById('r-notes').value.trim()
    };

    try {
      await App.fetch('/api/research', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      App.toast('User research logged! Persona confidence scores updated.', 'success');
      this.closeModal();
      await App.loadResearch();
      await App.loadPersonas();
      if (App.state.activeTab === 'research') {
        this.render();
      } else if (App.state.activeTab === 'detail' && payload.persona_id) {
        PersonaCardUI.loadAndRender(payload.persona_id);
      }
    } catch (e) {
      console.error(e);
    }
  },

  render() {
    const container = document.getElementById('research-log-container');
    if (!container) return;

    const entries = App.state.researchEntries || [];

    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- Header Strip -->
        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
              <i data-lucide="database" class="w-3.5 h-3.5"></i>
              <span>Empirical Grounding Repository</span>
            </div>
            <h2 class="font-display text-xl font-black text-slate-900">User Research Sessions</h2>
            <p class="text-xs text-slate-500 mt-1">Each research entry contributes direct empirical weight to your target personas' confidence scores.</p>
          </div>

          <button onclick="ResearchUI.openEntryModal()" class="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Log New Research Session</span>
          </button>
        </div>

        <!-- Research Entries Grid -->
        ${entries.length === 0 ? `
          <div class="py-16 text-center bg-white rounded-3xl border border-dashed border-slate-300 p-8">
            <i data-lucide="microscope" class="w-10 h-10 text-slate-300 mx-auto mb-3"></i>
            <h4 class="text-sm font-bold text-slate-700">No Research Sessions Logged Yet</h4>
            <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-4">Log customer interviews or usability tests to ground personas in real user data.</p>
            <button onclick="ResearchUI.openEntryModal()" class="px-4 py-2 bg-amber-500 text-white font-bold text-xs rounded-xl shadow-xs">
              Log First Interview
            </button>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${entries.map(entry => {
              const matchedPersona = App.state.personas.find(p => p.id === entry.persona_id);
              return `
                <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">${entry.session_type} • ${entry.session_date}</span>
                      <h3 class="font-display font-extrabold text-base text-slate-900 mt-0.5">${entry.participant_name}</h3>
                      <p class="text-xs text-slate-500 font-medium">${entry.participant_role || 'Participant'}</p>
                    </div>

                    ${matchedPersona ? `
                      <span class="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full shrink-0">
                        <i data-lucide="user" class="w-3 h-3"></i> ${matchedPersona.name}
                      </span>
                    ` : `
                      <span class="text-[11px] text-slate-400 font-semibold bg-slate-100 px-2 py-0.5 rounded-full">Unassigned</span>
                    `}
                  </div>

                  <!-- Quotes -->
                  <div class="space-y-2">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Verbatim Quotes:</span>
                    ${(entry.quotes || []).map(q => `
                      <div class="text-xs italic bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-700 font-serif">
                        "${q}"
                      </div>
                    `).join('')}
                  </div>

                  <!-- Validated Points -->
                  ${(entry.validated_pain_points || []).length > 0 ? `
                    <div class="space-y-1">
                      <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Validated Findings:</span>
                      ${entry.validated_pain_points.map(vp => `
                        <div class="text-[11px] text-slate-700 flex items-center gap-1.5">
                          <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-500 shrink-0"></i>
                          <span>${vp}</span>
                        </div>
                      `).join('')}
                    </div>
                  ` : ''}

                  <!-- Footer Actions -->
                  <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span class="capitalize font-semibold text-slate-500">Status: <strong>${entry.validation_status}</strong></span>
                    <button onclick="ResearchUI.deleteEntry(${entry.id})" class="text-rose-500 hover:text-rose-700 text-xs font-semibold flex items-center gap-1">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Delete
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}

      </div>
    `;

    lucide.createIcons();
  },

  async deleteEntry(entryId) {
    if (!confirm("Are you sure you want to remove this research entry?")) return;
    try {
      await App.fetch(`/api/research/${entryId}`, { method: 'DELETE' });
      App.toast('Research entry removed', 'info');
      await App.loadResearch();
      await App.loadPersonas();
      this.render();
    } catch (e) {
      console.error(e);
    }
  }
};
