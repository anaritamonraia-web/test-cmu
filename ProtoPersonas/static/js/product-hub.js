// ProductHubUI.js - Product Knowledge Base & Specification Documents Manager
const ProductHubUI = {

  render() {
    const container = document.getElementById('product-hub-container');
    if (!container) return;

    const p = App.state.product || {
      name: 'NovaFlow',
      tagline: 'Continuous Product Discovery & Persona Intelligence',
      description: '',
      target_market: '',
      value_proposition: '',
      key_features: [],
      business_goals: [],
      docs: []
    };

    container.innerHTML = `
      <div class="space-y-8">
        
        <!-- Header -->
        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-2">
              <i data-lucide="layers" class="w-3.5 h-3.5"></i>
              <span>Grounded Knowledge Base</span>
            </div>
            <h2 class="font-display text-xl font-black text-slate-900">Product Specifications & Context</h2>
            <p class="text-xs text-slate-500 mt-1">Personas are continuously compared against these features to detect misalignment and suggest evolutions.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- LEFT: Core Product Information Form -->
          <div class="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 class="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <i data-lucide="edit-3" class="w-4 h-4 text-amber-500"></i>
              Product Profile
            </h3>

            <form onsubmit="ProductHubUI.saveProductProfile(event)" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Product Name *</label>
                  <input type="text" id="prod-name" required value="${p.name || ''}" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                  <input type="text" id="prod-tagline" value="${p.tagline || ''}" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none">
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Product Description</label>
                <textarea id="prod-desc" rows="3" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none">${p.description || ''}</textarea>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Target Market & Primary Customer Segment</label>
                <input type="text" id="prod-market" value="${p.target_market || ''}" placeholder="e.g. B2B SaaS Product Managers & UX Teams" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Value Proposition</label>
                <input type="text" id="prod-value" value="${p.value_proposition || ''}" placeholder="e.g. Bridges the gap between customer discovery and sprint execution" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Key Features & Capabilities (One per line)</label>
                <textarea id="prod-features" rows="4" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none font-sans" placeholder="Living Persona Canvas&#10;Multi-factor confidence scoring&#10;Continuous research quote linker">${(p.key_features || []).join('\n')}</textarea>
                <p class="text-[11px] text-slate-400 mt-1">Persona goals are evaluated for semantic match against these capabilities.</p>
              </div>

              <div class="pt-3 border-t border-slate-100 flex justify-end">
                <button type="submit" class="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5">
                  <i data-lucide="check" class="w-4 h-4"></i> Save Product Context
                </button>
              </div>
            </form>
          </div>

          <!-- RIGHT: PRD Documents & Spec Uploads -->
          <div class="lg:col-span-5 space-y-6">
            
            <!-- Upload / Add New Document Card -->
            <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 class="font-display text-base font-bold text-slate-900 flex items-center gap-2">
                <i data-lucide="file-plus" class="w-4 h-4 text-indigo-500"></i>
                Add Product Spec / PRD
              </h3>

              <form onsubmit="ProductHubUI.addDocument(event)" class="space-y-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Document Title</label>
                  <input type="text" id="doc-title" required placeholder="e.g. Q4 Roadmapping & Discovery Strategy" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Document Type</label>
                  <select id="doc-type" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none bg-white">
                    <option value="PRD">PRD (Product Requirements Document)</option>
                    <option value="Feature Spec">Feature Specification</option>
                    <option value="Research Summary">User Research Summary</option>
                    <option value="Competitive Analysis">Competitive Analysis</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Content (Markdown or Plain Text)</label>
                  <textarea id="doc-content" rows="4" required placeholder="Paste PRD content, requirements, or user stories here..." class="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none font-mono text-[11px]"></textarea>
                </div>
                <div class="flex justify-end">
                  <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5">
                    <i data-lucide="plus" class="w-3.5 h-3.5"></i> Attach Document
                  </button>
                </div>
              </form>
            </div>

            <!-- Existing Attached Documents -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">Attached Knowledge Documents (${(p.docs || []).length})</h4>
              ${(p.docs || []).map(doc => `
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start justify-between gap-3">
                  <div class="space-y-1">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">${doc.doc_type}</span>
                    <h5 class="text-xs font-bold text-slate-900 mt-1">${doc.title}</h5>
                    <p class="text-[11px] text-slate-500 line-clamp-2">${doc.content}</p>
                  </div>
                  <button onclick="ProductHubUI.deleteDocument(${doc.id})" class="text-slate-400 hover:text-rose-500 p-1 rounded-lg">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              `).join('')}
            </div>

          </div>

        </div>

      </div>
    `;

    lucide.createIcons();
  },

  async saveProductProfile(e) {
    e.preventDefault();

    const featuresRaw = document.getElementById('prod-features').value;

    const payload = {
      id: App.state.product?.id || 1,
      name: document.getElementById('prod-name').value.trim(),
      tagline: document.getElementById('prod-tagline').value.trim(),
      description: document.getElementById('prod-desc').value.trim(),
      target_market: document.getElementById('prod-market').value.trim(),
      value_proposition: document.getElementById('prod-value').value.trim(),
      key_features: featuresRaw.split('\n').map(s => s.trim()).filter(Boolean)
    };

    try {
      const updated = await App.fetch('/api/product', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      App.toast('Product profile updated! Recalculating persona alignment...', 'success');
      await App.loadProduct();
      await App.loadPersonas();
      this.render();
    } catch (e) {
      console.error(e);
    }
  },

  async addDocument(e) {
    e.preventDefault();

    const payload = {
      product_id: App.state.product?.id || 1,
      title: document.getElementById('doc-title').value.trim(),
      doc_type: document.getElementById('doc-type').value,
      content: document.getElementById('doc-content').value.trim()
    };

    try {
      await App.fetch('/api/product/docs', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      App.toast('Document attached to product knowledge base!', 'success');
      await App.loadProduct();
      this.render();
    } catch (e) {
      console.error(e);
    }
  },

  async deleteDocument(docId) {
    if (!confirm('Are you sure you want to remove this document?')) return;
    try {
      await App.fetch(`/api/product/docs/${docId}`, { method: 'DELETE' });
      App.toast('Document removed', 'info');
      await App.loadProduct();
      this.render();
    } catch (e) {
      console.error(e);
    }
  }
};
