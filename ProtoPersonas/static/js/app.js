// App.js - Central State Manager & Navigation
const App = {
  state: {
    product: null,
    personas: [],
    currentPersonaId: null,
    researchEntries: [],
    activeTab: 'gallery'
  },

  async init() {
    await this.loadProduct();
    await this.loadPersonas();
    await this.loadResearch();
    this.navigate('gallery');
    lucide.createIcons();
  },

  async fetch(url, options = {}) {
    try {
      const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed with status ${res.status}`);
      }
      return await res.json();
    } catch (e) {
      this.toast(e.message, 'error');
      throw e;
    }
  },

  async loadProduct() {
    try {
      const prod = await this.fetch('/api/product');
      this.state.product = prod;
      const navProd = document.getElementById('nav-product-name');
      if (navProd && prod) {
        navProd.textContent = prod.name || 'NovaFlow';
      }
    } catch (e) {
      console.error("Failed to load product", e);
    }
  },

  async loadPersonas() {
    try {
      const list = await this.fetch('/api/personas');
      this.state.personas = list;
      this.renderGallery();
      this.updateStats();
    } catch (e) {
      console.error("Failed to load personas", e);
    }
  },

  async loadResearch() {
    try {
      const entries = await this.fetch('/api/research');
      this.state.researchEntries = entries;
      const badge = document.getElementById('nav-research-badge');
      if (badge) badge.textContent = entries.length;
      this.updateStats();
    } catch (e) {
      console.error("Failed to load research", e);
    }
  },

  updateStats() {
    const personaCount = document.getElementById('stat-persona-count');
    const avgConf = document.getElementById('stat-avg-confidence');
    const quoteCount = document.getElementById('stat-quote-count');
    const suggCount = document.getElementById('stat-suggestion-count');

    if (personaCount) personaCount.textContent = this.state.personas.length;
    
    if (avgConf) {
      if (this.state.personas.length > 0) {
        const sum = this.state.personas.reduce((acc, p) => acc + (p.confidence_score || 0), 0);
        avgConf.textContent = Math.round(sum / this.state.personas.length) + '%';
      } else {
        avgConf.textContent = '0%';
      }
    }

    if (quoteCount) {
      let quotes = 0;
      this.state.researchEntries.forEach(r => {
        quotes += (r.quotes ? r.quotes.length : 0);
      });
      quoteCount.textContent = quotes;
    }

    if (suggCount) {
      // Estimate suggestions count
      suggCount.textContent = '3';
    }
  },

  navigate(tab, personaId = null) {
    this.state.activeTab = tab;
    
    const views = ['gallery', 'detail', 'product', 'research'];
    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) el.classList.add('hidden');
    });

    const activeView = document.getElementById(`view-${tab}`);
    if (activeView) activeView.classList.remove('hidden');

    // Update Nav Tabs highlight
    ['gallery', 'product', 'research'].forEach(t => {
      const btn = document.getElementById(`nav-tab-${t}`);
      if (btn) {
        if (t === tab || (tab === 'detail' && t === 'gallery')) {
          btn.classList.add('bg-slate-100', 'text-slate-900');
          btn.classList.remove('text-slate-600');
        } else {
          btn.classList.remove('bg-slate-100', 'text-slate-900');
          btn.classList.add('text-slate-600');
        }
      }
    });

    if (tab === 'gallery') {
      this.renderGallery();
    } else if (tab === 'detail') {
      if (personaId) {
        this.state.currentPersonaId = personaId;
      }
      if (this.state.currentPersonaId) {
        PersonaCardUI.loadAndRender(this.state.currentPersonaId);
      }
    } else if (tab === 'product') {
      ProductHubUI.render();
    } else if (tab === 'research') {
      ResearchUI.render();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => lucide.createIcons(), 50);
  },

  renderGallery() {
    const grid = document.getElementById('personas-grid');
    if (!grid) return;

    if (this.state.personas.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-slate-300 p-8">
          <div class="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i data-lucide="users" class="w-8 h-8"></i>
          </div>
          <h3 class="text-base font-bold text-slate-800">No Personas Defined Yet</h3>
          <p class="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">Create your first persona manually or ask AI to generate candidates based on your product data.</p>
          <div class="flex justify-center gap-3">
            <button onclick="PersonaFormUI.openCreateWizard('ai')" class="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm">
              Propose with AI
            </button>
            <button onclick="PersonaFormUI.openCreateWizard('manual')" class="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl">
              Create Manually
            </button>
          </div>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    grid.innerHTML = this.state.personas.map(p => {
      const score = p.confidence_score || 0;
      let scoreColor = 'text-rose-600 bg-rose-50 border-rose-200';
      if (score >= 75) scoreColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
      else if (score >= 50) scoreColor = 'text-amber-700 bg-amber-50 border-amber-200';

      const theme = p.theme_color || 'amber';

      return `
        <div onclick="App.navigate('detail', ${p.id})" class="universe-poster-card theme-${theme} cursor-pointer group hover:-translate-y-1 transition duration-200 flex flex-col justify-between">
          
          <!-- Top Accent Band -->
          <div class="h-3 universe-header-strip"></div>

          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <!-- Header Profile Row -->
              <div class="flex items-start justify-between gap-4 mb-4">
                <div class="flex items-center gap-3.5">
                  <div class="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm shrink-0 bg-slate-100">
                    <img src="${p.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}" alt="${p.name}" class="w-full h-full object-cover">
                  </div>
                  <div>
                    <span class="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">${p.archetype || 'Archetype'}</span>
                    <h3 class="font-display text-lg font-extrabold text-slate-900 group-hover:text-amber-600 transition leading-snug">${p.name}</h3>
                    <p class="text-xs text-slate-500 font-medium">${p.occupation || 'Professional'}</p>
                  </div>
                </div>

                <!-- Confidence Badge -->
                <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${scoreColor} shrink-0">
                  <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
                  <span>${score}%</span>
                </div>
              </div>

              <!-- Quote Highlight -->
              <div class="universe-quote-card my-4 text-xs italic text-slate-700 font-medium line-clamp-2">
                "${p.quote || 'No primary quote provided yet.'}"
              </div>

              <!-- Demographics Pills -->
              <div class="grid grid-cols-2 gap-2 my-4 text-xs">
                <div class="demographic-pill">
                  <span class="pill-label">Location</span>
                  <span class="pill-value truncate">${p.location || 'Unspecified'}</span>
                </div>
                <div class="demographic-pill">
                  <span class="pill-label">Age & Status</span>
                  <span class="pill-value truncate">${p.age || '30'} • ${p.family_status || 'Single'}</span>
                </div>
              </div>

              <!-- Top Goals Preview -->
              <div class="space-y-1.5 my-3">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Core Objectives</span>
                ${(p.goals || []).slice(0, 2).map(g => `
                  <div class="universe-item-card goal-card text-xs py-1.5">
                    <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5"></i>
                    <span class="line-clamp-1">${g}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Footer Meta -->
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold mt-4">
              <span class="flex items-center gap-1 text-slate-500">
                <i data-lucide="sliders" class="w-3.5 h-3.5"></i>
                Tech: ${p.tech_savviness || 3}/5
              </span>
              <span class="text-amber-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                View Poster <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
              </span>
            </div>

          </div>

        </div>
      `;
    }).join('');

    lucide.createIcons();
  },

  openSettingsModal() {
    const modal = document.getElementById('modal-settings');
    if (modal) modal.classList.remove('hidden');
  },

  closeSettingsModal() {
    const modal = document.getElementById('modal-settings');
    if (modal) modal.classList.add('hidden');
  },

  async saveSettings() {
    const key = document.getElementById('input-gemini-key').value;
    try {
      await this.fetch('/api/settings', {
        method: 'POST',
        body: JSON.stringify({ gemini_api_key: key })
      });
      this.toast('API settings updated successfully', 'success');
      this.closeSettingsModal();
    } catch (e) {
      console.error(e);
    }
  },

  toast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const el = document.createElement('div');
    const color = type === 'error' ? 'bg-rose-600 text-white' : type === 'success' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white';
    el.className = `${color} text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 transform transition-all duration-300 translate-y-2 opacity-0 pointer-events-auto`;
    el.innerHTML = `<span>${msg}</span>`;

    container.appendChild(el);
    setTimeout(() => {
      el.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
      el.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => el.remove(), 300);
    }, 3500);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
