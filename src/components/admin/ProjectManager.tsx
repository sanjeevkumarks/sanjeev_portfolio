import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import type { Project } from '../../contexts/PortfolioContext';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

export function ProjectManager() {
  const { data, updateData } = usePortfolio();
  const projects = data.projects;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});

  const handleEdit = (p: Project) => {
    setEditingId(p.id);
    setFormData(p);
  };

  const handleAddNew = () => {
    setEditingId('new');
    setFormData({ title: '', desc: '', tech: '', image: '', github: '', demo: '' });
  };

  const handleSave = () => {
    if (!formData.title || !formData.desc) return alert('Title and description required');
    
    if (editingId === 'new') {
      const newProject = { ...formData, id: Date.now().toString() } as Project;
      updateData('projects', [...projects, newProject]);
    } else if (editingId) {
      updateData('projects', projects.map(p => p.id === editingId ? { ...p, ...formData } : p));
    }
    setEditingId(null);
  };

  const deleteProject = (id: string) => {
    updateData('projects', projects.filter(p => p.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Manage Projects</h2>
          <p className="text-gray-400">Add, edit, or remove projects from your portfolio.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-[#ff6600] text-white px-4 py-2.5 rounded-lg hover:bg-[#e05a00] transition-colors font-medium text-sm"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {editingId && (
        <div className="bg-[#1e1e20] border border-[#2e2e32] rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">{editingId === 'new' ? 'New Project' : 'Edit Project'}</h3>
            <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">Title</label>
              <input 
                value={formData.title || ''} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white outline-none focus:border-[#ff6600]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">Tech Stack (comma separated)</label>
              <input 
                value={formData.tech || ''} 
                onChange={e => setFormData({...formData, tech: e.target.value})}
                className="bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white outline-none focus:border-[#ff6600]"
                placeholder="React • Node • TS"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">Description</label>
              <textarea 
                value={formData.desc || ''} 
                onChange={e => setFormData({...formData, desc: e.target.value})}
                rows={3}
                className="bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white outline-none focus:border-[#ff6600] resize-y"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">Image URL</label>
              <input 
                value={formData.image || ''} 
                onChange={e => setFormData({...formData, image: e.target.value})}
                className="bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white outline-none focus:border-[#ff6600]"
                placeholder="https://..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">GitHub URL</label>
              <input 
                value={formData.github || ''} 
                onChange={e => setFormData({...formData, github: e.target.value})}
                className="bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white outline-none focus:border-[#ff6600]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">Live Demo URL</label>
              <input 
                value={formData.demo || ''} 
                onChange={e => setFormData({...formData, demo: e.target.value})}
                className="bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white outline-none focus:border-[#ff6600]"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button onClick={() => setEditingId(null)} className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors text-sm font-medium">
              Cancel
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              <Save size={16} /> Save Project
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-[#1e1e20] border border-[#2e2e32] rounded-xl p-5 flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="w-full md:w-48 h-28 bg-[#161618] rounded-lg border border-[#2e2e32] overflow-hidden shrink-0">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-white mb-1">{p.title}</h4>
              <p className="text-[#ff6600] text-xs font-semibold uppercase tracking-wider mb-2">{p.tech}</p>
              <p className="text-sm text-gray-400 line-clamp-2">{p.desc}</p>
            </div>
            <div className="flex gap-2 shrink-0 w-full md:w-auto justify-end mt-4 md:mt-0">
              <button 
                onClick={() => handleEdit(p)}
                className="p-2 bg-[#2a2a2c] text-gray-300 rounded hover:bg-[#3a3a3e] hover:text-white transition-colors"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => {
                  if(confirm('Are you sure you want to delete this project?')) deleteProject(p.id);
                }}
                className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-[#1e1e20] rounded-xl border border-dashed border-[#2e2e32]">
            No projects found. Add your first project!
          </div>
        )}
      </div>
    </div>
  );
}
