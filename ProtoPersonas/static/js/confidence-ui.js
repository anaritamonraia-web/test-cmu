// ConfidenceUI.js - Interactive Confidence Scoring & Evidence Audit Popover
const ConfidenceUI = {
  currentData: null,

  async openAuditModal(personaId) {
    try {
      const data = await App.fetch(`/api/personas/${personaId}/confidence`);
      this.currentData = data;
      this.renderModal(data);
      const modal = document.getElementById('modal-confidence-audit');
      if (modal) modal.classList.remove('hidden');
      lucide.createIcons();
    } catch (e) {
      console.error("Failed to load confidence audit", e);
    }
  },

  closeModal() {
    const modal = document.getElementById('modal-confidence-audit');
    if (modal) modal.classList.add('hidden');
  },

  renderModal(data) {
    const container = document.getElementById('confidence-modal-body');
    if (!container) return;

    const b = data.breakdown || {};
    const res = b.research || { score: 0, max: 40 };
    const prod = b.product_alignment || { score: 0, max: 30 };
    const comp = b.completeness || { score: 0, max: 30 };

    const tierBg = data.tier_color === 'emerald' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                   data.tier_color === 'amber' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                   'bg-rose-50 text-rose-800 border-rose-200';

    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- Score Hero Card -->
        <div class="bg-slate-900 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div class="flex items-center gap-5">
            <!-- Progress Circle -->
            <div class="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path class="text-slate-700" stroke-width="3.5" stroke="currentColor" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path class="${data.tier_color === 'emerald' ? 'text-emerald-400' : data.tier_color === 'amber' ? 'text-amber-400' : 'text-rose-400'}"
                  stroke-dasharray="${data.total_score}, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-2xl font-black font-display text-white leading-none">${data.total_score}%</span>
                <span class="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">Score</span>
              </div>
            </div>

            <div>
              <div class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${tierBg} mb-1">
                ${data.tier}
              </div>
              <h4 class="font-display text-lg font-extrabold text-white">${data.persona_name}</h4>
              <p class="text-xs text-slate-300">Empirical validation grounded in product specs & research logs.</p>
            </div>
          </div>

          <button onclick="ResearchUI.openEntryModal(${data.persona_id})" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow transition shrink-0 flex items-center gap-1.5">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Log Research to Boost</span>
          </button>
        </div>

        <!-- Component Pillars Breakdown -->
        <div class="space-y-4">
          <h5 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Multi-Factor Scoring Components</h5>

          <!-- 1. Research Grounding -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-slate-800 flex items-center gap-1.5">
                <i data-lucide="microscope" class="w-4 h-4 text-indigo-500"></i>
                1. Empirical Research Grounding (${res.weight})
              </span>
              <span class="font-bold text-indigo-600 font-mono">${res.score} / ${res.max} pts</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div class="bg-indigo-500 h-2 rounded-full" style="width: ${(res.score / res.max) * 100}%"></div>
            </div>
            <div class="text-[11px] text-slate-500 flex flex-wrap gap-x-4 gap-y-1 pt-1">
              <span>• <strong>${res.sessions_count || 0}</strong> User Sessions</span>
              <span>• <strong>${res.quotes_count || 0}</strong> Verbatim Quotes</span>
              <span>• <strong>${res.validated_evidence_count || 0}</strong> Confirmed Observations</span>
            </div>
          </div>

          <!-- 2. Product Alignment -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-slate-800 flex items-center gap-1.5">
                <i data-lucide="layers" class="w-4 h-4 text-amber-500"></i>
                2. Product Feature Fit (${prod.weight})
              </span>
              <span class="font-bold text-amber-600 font-mono">${prod.score} / ${prod.max} pts</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div class="bg-amber-500 h-2 rounded-full" style="width: ${(prod.score / prod.max) * 100}%"></div>
            </div>
            <div class="text-[11px] text-slate-500 flex flex-wrap gap-x-4 gap-y-1 pt-1">
              <span>• <strong>${prod.matched_goals || 0}</strong> Persona Goals Aligned with Features</span>
              <span>• <strong>${prod.matched_frustrations || 0}</strong> Persona Frustrations Addressed</span>
              <span>• <strong>${prod.product_features_count || 0}</strong> Specs Checked</span>
            </div>
          </div>

          <!-- 3. Profile Completeness -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-slate-800 flex items-center gap-1.5">
                <i data-lucide="check-square" class="w-4 h-4 text-emerald-500"></i>
                3. Profile Completeness & Detail (${comp.weight})
              </span>
              <span class="font-bold text-emerald-600 font-mono">${comp.score} / ${comp.max} pts</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div class="bg-emerald-500 h-2 rounded-full" style="width: ${(comp.score / comp.max) * 100}%"></div>
            </div>
            <div class="text-[11px] text-slate-500 flex flex-wrap gap-x-4 gap-y-1 pt-1">
              <span>• <strong>${comp.completed_items || 0}</strong> of ${comp.total_items || 12} Universe Fields Defined</span>
              <span>• Psychographic sliders, bio narrative, brand matrix</span>
            </div>
          </div>
        </div>

        <!-- Evidence Summary Trail -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <h5 class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <i data-lucide="quote" class="w-3.5 h-3.5 text-slate-500"></i>
            Grounding Evidence Sample
          </h5>

          ${(data.evidence_summary?.sample_quotes || []).length > 0 ? `
            <div class="space-y-2">
              ${data.evidence_summary.sample_quotes.map(q => `
                <div class="text-xs italic bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700 font-serif">
                  "${q}"
                </div>
              `).join('')}
            </div>
          ` : `
            <p class="text-xs text-slate-400 italic">No direct research quotes attached yet. Log interviews to corroborate claims.</p>
          `}
        </div>

        <!-- Actionable Recommendations to Boost Score -->
        <div class="space-y-2">
          <h5 class="text-xs font-bold text-slate-500 uppercase tracking-wider">How to Increase Confidence</h5>
          <div class="space-y-1.5">
            ${(data.recommendations || []).map(r => `
              <div class="flex items-start gap-2 text-xs p-2.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                <i data-lucide="arrow-up-right" class="w-4 h-4 text-amber-600 shrink-0 mt-0.5"></i>
                <span class="font-medium">${r}</span>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }
};
