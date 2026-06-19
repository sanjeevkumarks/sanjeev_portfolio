import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import type { SkillCategory } from '../../contexts/PortfolioContext';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { IconMap } from '../About';

export function SkillsManager() {
  const { data, updateData } = usePortfolio();
  const skills = data.skills;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SkillCategory>>({});
  const [skillsText, setSkillsText] = useState('');

  const handleEdit = (category: SkillCategory) => {
    setEditingId(category.id);
    setFormData(category);
    setSkillsText(category.skills.join(', '));
  };

  const handleAddNew = () => {
    setEditingId('new');
    setFormData({ title: '', icon: 'Code2', skills: [] });
    setSkillsText('');
  };

  const handleSave = () => {
    if (!formData.title) return alert('Title is required');
    
    // Parse comma separated skills
    const parsedSkills = skillsText.split(',').map(s => s.trim()).filter(s => s !== '');
    
    if (editingId === 'new') {
      const newCategory = { ...formData, skills: parsedSkills, id: Date.now().toString() } as SkillCategory;
      updateData('skills', [...skills, newCategory]);
    } else if (editingId) {
      updateData('skills', skills.map(c => c.id === editingId ? { ...c, ...formData, skills: parsedSkills } : c));
    }
    setEditingId(null);
  };

  const deleteCategory = (id: string) => {
    updateData('skills', skills.filter(c => c.id !== id));
  };

  const availableIcons = Object.keys(IconMap);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Skills Arsenal</h2>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-[#ff6600] text-white px-4 py-2 rounded-lg hover:bg-[#e05a00] transition-colors"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {editingId && (
        <div className="bg-[#1e1e20] p-6 rounded-2xl border border-[#ff6600]/30 mb-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">{editingId === 'new' ? 'New Category' : 'Edit Category'}</h3>
            <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Category Title</label>
              <input 
                type="text" 
                value={formData.title || ''} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
                placeholder="e.g. Frontend Development"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Icon</label>
              <select
                value={formData.icon || 'Code2'}
                onChange={e => setFormData({...formData, icon: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none appearance-none"
              >
                {availableIcons.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-1 block">Skills (Comma separated)</label>
            <textarea 
              value={skillsText} 
              onChange={e => setSkillsText(e.target.value)}
              rows={3}
              placeholder="React, TypeScript, Tailwind CSS..."
              className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none resize-none"
            />
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#ff6600] text-white px-6 py-2.5 rounded-lg hover:bg-[#e05a00] transition-colors"
          >
            <Save size={18} /> Save Category
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {skills.map(category => {
          const IconComponent = IconMap[category.icon] || IconMap['Sparkles'];
          return (
            <div key={category.id} className="bg-[#1e1e20] p-5 rounded-xl border border-[#2e2e32] flex gap-4 items-start">
              <div className="p-3 bg-[#242426] rounded-lg text-[#ff6600]">
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-100 mb-2">{category.title}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((s, i) => (
                    <span key={i} className="text-xs bg-[#161618] border border-[#2e2e32] px-2 py-1 rounded text-gray-400">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={() => handleEdit(category)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-[#2e2e32] rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => deleteCategory(category.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
