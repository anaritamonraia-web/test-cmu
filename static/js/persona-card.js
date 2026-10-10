// PersonaCardUI.js - Renders the Arthur Chayka Universe User Persona Poster Layout
const PersonaCardUI = {
  currentPersona: null,

  async loadAndRender(personaId) {
    const container = document.getElementById('persona-detail-container');
    if (!container) return;

    container.innerHTML = `
      <div class="py-20 text-center text-slate-400">
        <i data-lucide="loader-2" class="w-8 h-8 animate-spin mx-auto text-amber-500 mb-2"></i>
        <p class="text-xs font-semibold">Loading Universe Persona...</p>
      </div>
    `;
    lucide.createIcons();

    try {
      const persona = await App.fetch(`/api/personas/${personaId}`);
      this.currentPersona = persona;
      this.render(persona, container);
    } catch (e) {
      container.innerHTML = `<div class="p-8 text-center text-rose-500 text-sm font-semibold">Failed to load persona: ${e.message}</div>`;
    }
  },

  render(p, container) {
    const theme = p.theme_color || 'amber';
    const conf = p.confidence || { total_score: 50, tier: 'Moderate Confidence', tier_color: 'amber' };
    const traits = p.personality_traits || { introvert_extrovert: 50, analytical_creative: 50, spontaneous_structured: 50, cautious_innovator: 50 };
    const motivations = p.motivations || { growth: 70, efficiency: 80, social: 50, autonomy: 75 };
    const suggestions = p.suggestions || [];

    let confBadgeClass = conf.tier_color === 'emerald' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                         conf.tier_color === 'amber' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                         'bg-rose-50 text-rose-800 border-rose-300';

    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- PENDING AI SUGGESTIONS BANNER (If any) -->
        ${suggestions.length > 0 ? `
          <div class="no-print bg-indigo-50 border border-indigo-200 rounded-2xl p-4 shadow-sm space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <i data-lucide="sparkles" class="w-4 h-4"></i>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-indigo-950 uppercase tracking-wider">AI Persona Evolution Assistant</h4>
                  <p class="text-xs text-indigo-700">${suggestions.length} suggestion(s) detected based on product & research updates</p>
                </div>
              </div>
              <span class="text-[11px] font-bold text-indigo-600 bg-white px-2.5 py-1 rounded-full border border-indigo-200">Active Review</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              ${suggestions.map(s => `
                <div class="bg-white p-3.5 rounded-xl border border-indigo-100 flex flex-col justify-between space-y-2 shadow-xs">
                  <div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-500">${s.category.replace('_', ' ')}</span>
                    <h5 class="text-xs font-bold text-slate-900 mt-0.5">${s.title}</h5>
                    <p class="text-[11px] text-slate-600 mt-1 leading-relaxed">${s.reason}</p>
                  </div>
                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button onclick="PersonaCardUI.dismissSuggestion(${s.id})" class="text-[11px] font-bold text-slate-500 hover:text-slate-800 px-2 py-1">
                      Dismiss
                    </button>
                    <button onclick="PersonaCardUI.applySuggestion(${s.id})" class="text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                      <i data-lucide="check" class="w-3 h-3"></i> Apply to Persona
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- THE UNIVERSE POSTER CARD -->
        <div class="universe-poster-card theme-${theme} bg-white shadow-xl">
          
          <!-- Colored Header Strip -->
          <div class="h-4 universe-header-strip"></div>

          <div class="p-6 sm:p-10 space-y-8">
            
            <!-- ROW 1: Hero Identity & Demographics & Quote -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <!-- Left Profile (Avatar + Name + Archetype) -->
              <div class="lg:col-span-4 space-y-4">
                <div class="flex items-center gap-4">
                  <div class="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white shadow-lg shrink-0 bg-slate-100 ring-2 ring-slate-200">
                    <img src="${p.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}" alt="${p.name}" class="w-full h-full object-cover">
                  </div>
                  <div>
                    <span class="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-0.5">${p.archetype}</span>
                    <h1 class="font-display text-2xl font-black text-slate-900 tracking-tight leading-tight">${p.name}</h1>
                    <p class="text-xs font-semibold text-slate-500 mt-1">${p.occupation}</p>
                  </div>
                </div>

                <!-- Demographics Pills Grid -->
                <div class="grid grid-cols-2 gap-2 pt-2">
                  <div class="demographic-pill">
                    <span class="pill-label">Age</span>
                    <span class="pill-value">${p.age || '30'} years</span>
                  </div>
                  <div class="demographic-pill">
                    <span class="pill-label">Location</span>
                    <span class="pill-value truncate">${p.location || 'San Francisco, CA'}</span>
                  </div>
                  <div class="demographic-pill">
                    <span class="pill-label">Education</span>
                    <span class="pill-value truncate">${p.education || 'B.S. Degree'}</span>
                  </div>
                  <div class="demographic-pill">
                    <span class="pill-label">Status</span>
                    <span class="pill-value truncate">${p.family_status || 'Single'}</span>
                  </div>
                </div>

                <!-- Tech Savviness Indicator -->
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div class="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
                    <span>Digital & Tech Literacy</span>
                    <span class="text-amber-600 font-mono">${p.tech_savviness || 4}/5</span>
                  </div>
                  <div class="grid grid-cols-5 gap-1">
                    ${[1, 2, 3, 4, 5].map(step => `
                      <div class="h-2 rounded-full ${step <= (p.tech_savviness || 4) ? 'bg-amber-500' : 'bg-slate-200'}"></div>
                    `).join('')}
                  </div>
                </div>
              </div>

              <!-- Right Area: Quote Banner + Confidence + Bio -->
              <div class="lg:col-span-8 space-y-5">
                
                <!-- Quote & Confidence Header Bar -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div class="inline-flex items-center gap-2">
                    <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Empirical Validation:</span>
                    <div onclick="ConfidenceUI.openAuditModal(${p.id})" class="confidence-badge-pill ${confBadgeClass} border shadow-xs" title="Click to view detailed evidence audit">
                      <i data-lucide="shield-check" class="w-4 h-4 text-current"></i>
                      <span>${conf.total_score}% ${conf.tier}</span>
                      <i data-lucide="chevron-right" class="w-3.5 h-3.5 opacity-60"></i>
                    </div>
                  </div>

                  <span class="text-[11px] font-semibold text-slate-400">Universe Design Framework</span>
                </div>

                <!-- High-Impact Quote Banner -->
                <div class="universe-quote-card">
                  <p class="font-display font-bold text-sm sm:text-base text-slate-800 leading-snug italic">
                    "${p.quote || 'No core quote defined.'}"
                  </p>
                </div>

                <!-- Bio & Day in the Life -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                      <i data-lucide="user" class="w-3.5 h-3.5 text-amber-500"></i> Narrative Bio
                    </h4>
                    <p class="text-xs text-slate-700 leading-relaxed">${p.bio || 'No biography entered yet.'}</p>
                  </div>
                  <div class="bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                      <i data-lucide="clock" class="w-3.5 h-3.5 text-indigo-500"></i> Day In The Life
                    </h4>
                    <p class="text-xs text-slate-700 leading-relaxed">${p.day_in_life || 'No workflow narrative entered yet.'}</p>
                  </div>
                </div>

              </div>

            </div>

            <!-- ROW 2: Personality Bipolar Sliders & Motivations -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-slate-100">
              
              <!-- Personality Sliders (Arthur Chayka style) -->
              <div class="lg:col-span-6 space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="font-display text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <i data-lucide="sliders" class="w-4 h-4 text-amber-500"></i>
                    Personality Spectrum
                  </h3>
                  <span class="text-[11px] font-semibold text-slate-400">Bipolar Dimensions</span>
                </div>

                <!-- Slider 1: Introvert / Extrovert -->
                <div class="trait-slider-container">
                  <div class="trait-slider-labels">
                    <span>Introvert</span>
                    <span class="font-bold text-slate-800">${traits.introvert_extrovert || 50}%</span>
                    <span>Extrovert</span>
                  </div>
                  <div class="trait-slider-track">
                    <div class="trait-slider-fill" style="width: ${traits.introvert_extrovert || 50}%"></div>
                    <div class="trait-slider-handle" style="left: ${traits.introvert_extrovert || 50}%"></div>
                  </div>
                </div>

                <!-- Slider 2: Analytical / Creative -->
                <div class="trait-slider-container">
                  <div class="trait-slider-labels">
                    <span>Analytical</span>
                    <span class="font-bold text-slate-800">${traits.analytical_creative || 50}%</span>
                    <span>Creative</span>
                  </div>
                  <div class="trait-slider-track">
                    <div class="trait-slider-fill" style="width: ${traits.analytical_creative || 50}%"></div>
                    <div class="trait-slider-handle" style="left: ${traits.analytical_creative || 50}%"></div>
                  </div>
                </div>

                <!-- Slider 3: Spontaneous / Structured -->
                <div class="trait-slider-container">
                  <div class="trait-slider-labels">
                    <span>Spontaneous</span>
                    <span class="font-bold text-slate-800">${traits.spontaneous_structured || 50}%</span>
                    <span>Structured</span>
                  </div>
                  <div class="trait-slider-track">
                    <div class="trait-slider-fill" style="width: ${traits.spontaneous_structured || 50}%"></div>
                    <div class="trait-slider-handle" style="left: ${traits.spontaneous_structured || 50}%"></div>
                  </div>
                </div>

                <!-- Slider 4: Cautious / Innovator -->
                <div class="trait-slider-container">
                  <div class="trait-slider-labels">
                    <span>Cautious</span>
                    <span class="font-bold text-slate-800">${traits.cautious_innovator || 50}%</span>
                    <span>Early Adopter</span>
                  </div>
                  <div class="trait-slider-track">
                    <div class="trait-slider-fill" style="width: ${traits.cautious_innovator || 50}%"></div>
                    <div class="trait-slider-handle" style="left: ${traits.cautious_innovator || 50}%"></div>
                  </div>
                </div>
              </div>

              <!-- Motivations Bar Chart -->
              <div class="lg:col-span-6 space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="font-display text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <i data-lucide="zap" class="w-4 h-4 text-orange-500"></i>
                    Core Motivations
                  </h3>
                  <span class="text-[11px] font-semibold text-slate-400">Driver Intensity</span>
                </div>

                <div class="space-y-3">
                  <!-- Growth -->
                  <div class="space-y-1">
                    <div class="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Career & Skill Growth</span>
                      <span class="font-mono text-amber-600">${motivations.growth || 75}%</span>
                    </div>
                    <div class="motivation-bar-track">
                      <div class="motivation-bar-fill" style="width: ${motivations.growth || 75}%"></div>
                    </div>
                  </div>

                  <!-- Efficiency -->
                  <div class="space-y-1">
                    <div class="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Operational Efficiency</span>
                      <span class="font-mono text-amber-600">${motivations.efficiency || 85}%</span>
                    </div>
                    <div class="motivation-bar-track">
                      <div class="motivation-bar-fill" style="width: ${motivations.efficiency || 85}%"></div>
                    </div>
                  </div>

                  <!-- Social Recognition -->
                  <div class="space-y-1">
                    <div class="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Social & Team Recognition</span>
                      <span class="font-mono text-amber-600">${motivations.social || 50}%</span>
                    </div>
                    <div class="motivation-bar-track">
                      <div class="motivation-bar-fill" style="width: ${motivations.social || 50}%"></div>
                    </div>
                  </div>

                  <!-- Autonomy -->
                  <div class="space-y-1">
                    <div class="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Autonomy & Freedom</span>
                      <span class="font-mono text-amber-600">${motivations.autonomy || 80}%</span>
                    </div>
                    <div class="motivation-bar-track">
                      <div class="motivation-bar-fill" style="width: ${motivations.autonomy || 80}%"></div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            <!-- ROW 3: Goals vs Frustrations Matrix -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
              
              <!-- Goals & Needs -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h3 class="font-display text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <i data-lucide="target" class="w-4 h-4 text-emerald-500"></i>
                    Goals & Objectives
                  </h3>
                  <span class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ${(p.goals || []).length} items
                  </span>
                </div>

                <div class="space-y-2">
                  ${(p.goals || []).map((goal, idx) => `
                    <div class="universe-item-card goal-card">
                      <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        ${idx + 1}
                      </div>
                      <span class="font-medium text-slate-800">${goal}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Frustrations & Pain Points -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h3 class="font-display text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <i data-lucide="alert-triangle" class="w-4 h-4 text-rose-500"></i>
                    Frustrations & Pain Points
                  </h3>
                  <span class="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    ${(p.frustrations || []).length} items
                  </span>
                </div>

                <div class="space-y-2">
                  ${(p.frustrations || []).map((frus, idx) => `
                    <div class="universe-item-card frustration-card">
                      <div class="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        ${idx + 1}
                      </div>
                      <span class="font-medium text-rose-950">${frus}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

            </div>

            <!-- ROW 4: Preferred Tools & Brands -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
              
              <!-- Tools & Applications -->
              <div class="space-y-2">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <i data-lucide="laptop" class="w-3.5 h-3.5 text-slate-500"></i> Preferred Apps & Tools
                </h4>
                <div class="flex flex-wrap gap-2">
                  ${(p.preferred_tools || []).map(t => `
                    <span class="tool-tag">
                      <i data-lucide="terminal" class="w-3 h-3 text-slate-400"></i> ${t}
                    </span>
                  `).join('')}
                </div>
              </div>

              <!-- Brands & Influences -->
              <div class="space-y-2">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <i data-lucide="award" class="w-3.5 h-3.5 text-slate-500"></i> Preferred Brands & Taste
                </h4>
                <div class="flex flex-wrap gap-2">
                  ${(p.preferred_brands || []).map(b => `
                    <span class="tool-tag">
                      <i data-lucide="bookmark" class="w-3 h-3 text-slate-400"></i> ${b}
                    </span>
                  `).join('')}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    `;

    lucide.createIcons();
  },

  async triggerAiAnalysis() {
    if (!this.currentPersona) return;
    App.toast('Scanning product context & research logs for inconsistencies...', 'info');
    try {
      const suggs = await App.fetch(`/api/ai/analyze/${this.currentPersona.id}`, { method: 'POST' });
      App.toast(`Scan complete. Found ${suggs.length} actionable suggestions.`, 'success');
      await this.loadAndRender(this.currentPersona.id);
    } catch (e) {
      console.error(e);
    }
  },

  async applySuggestion(suggestionId) {
    try {
      await App.fetch(`/api/suggestions/${suggestionId}/apply`, { method: 'POST' });
      App.toast('Suggestion applied to persona profile!', 'success');
      await this.loadAndRender(this.currentPersona.id);
      await App.loadPersonas();
    } catch (e) {
      console.error(e);
    }
  },

  async dismissSuggestion(suggestionId) {
    try {
      await App.fetch(`/api/suggestions/${suggestionId}/dismiss`, { method: 'POST' });
      App.toast('Suggestion dismissed', 'info');
      await this.loadAndRender(this.currentPersona.id);
    } catch (e) {
      console.error(e);
    }
  },

  async deleteCurrentPersona() {
    if (!this.currentPersona) return;
    if (!confirm(`Are you sure you want to delete "${this.currentPersona.name}"?`)) return;

    try {
      await App.fetch(`/api/personas/${this.currentPersona.id}`, { method: 'DELETE' });
      App.toast('Persona deleted', 'info');
      await App.loadPersonas();
      App.navigate('gallery');
    } catch (e) {
      console.error(e);
    }
  }
};
