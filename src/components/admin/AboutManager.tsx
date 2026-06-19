import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import type { AboutCardData } from '../../contexts/PortfolioContext';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { IconMap } from '../About'; // To show available icons

export function AboutManager() {
  const { data, updateData } = usePortfolio();
  const aboutCards = data.aboutCards;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<AboutCardData>>({});

  const handleEdit = (card: AboutCardData) => {
    setEditingId(card.id);
    setFormData(card);
  };

  const handleAddNew = () => {
    setEditingId('new');
    setFormData({ title: '', desc: '', icon: 'Sparkles' });
  };

  const handleSave = () => {
    if (!formData.title || !formData.desc) return alert('Title and description required');
    
    if (editingId === 'new') {
      const newCard = { ...formData, id: Date.now().toString() } as AboutCardData;
      updateData('aboutCards', [...aboutCards, newCard]);
    } else if (editingId) {
      updateData('aboutCards', aboutCards.map(c => c.id === editingId ? { ...c, ...formData } : c));
    }
    setEditingId(null);
  };

  const deleteCard = (id: string) => {
    updateData('aboutCards', aboutCards.filter(c => c.id !== id));
  };

  const availableIcons = Object.keys(IconMap);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">About Cards</h2>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-[#ff6600] text-white px-4 py-2 rounded-lg hover:bg-[#e05a00] transition-colors"
        >
          <Plus size={18} /> Add New Card
        </button>
      </div>

      {editingId && (
        <div className="bg-[#1e1e20] p-6 rounded-2xl border border-[#ff6600]/30 mb-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">{editingId === 'new' ? 'New Card' : 'Edit Card'}</h3>
            <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Title</label>
              <input 
                type="text" 
                value={formData.title || ''} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Icon Name</label>
              <select
                value={formData.icon || 'Sparkles'}
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
            <label className="text-sm text-gray-400 mb-1 block">Description</label>
            <textarea 
              value={formData.desc || ''} 
              onChange={e => setFormData({...formData, desc: e.target.value})}
              rows={3}
              className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none resize-none"
            />
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#ff6600] text-white px-6 py-2.5 rounded-lg hover:bg-[#e05a00] transition-colors"
          >
            <Save size={18} /> Save Card
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {aboutCards.map(card => {
          const IconComponent = IconMap[card.icon] || IconMap['Sparkles'];
          return (
            <div key={card.id} className="bg-[#1e1e20] p-5 rounded-xl border border-[#2e2e32] flex gap-4 items-start">
              <div className="p-3 bg-[#242426] rounded-lg text-[#ff6600]">
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-100 truncate">{card.title}</h4>
                <p className="text-sm text-gray-400 line-clamp-2 mt-1">{card.desc}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={() => handleEdit(card)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-[#2e2e32] rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => deleteCard(card.id)}
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
