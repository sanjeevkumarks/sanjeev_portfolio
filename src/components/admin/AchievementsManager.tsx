import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import type { AchievementData } from '../../contexts/PortfolioContext';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

export function AchievementsManager() {
  const { data, updateData } = usePortfolio();
  const achievements = data.achievements;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<AchievementData>>({});
  const [imagesText, setImagesText] = useState('');

  const handleEdit = (item: AchievementData) => {
    setEditingId(item.id);
    setFormData(item);
    setImagesText(item.images.join(', '));
  };

  const handleAddNew = () => {
    setEditingId('new');
    setFormData({ number: '01', title: '', subtitle: '', desc: '', year: '' });
    setImagesText('');
  };

  const handleSave = () => {
    if (!formData.title || !formData.desc) return alert('Title and description required');
    
    // Parse comma separated images
    const parsedImages = imagesText.split(',').map(s => s.trim()).filter(s => s !== '');
    
    if (editingId === 'new') {
      const newItem = { ...formData, images: parsedImages, id: Date.now().toString() } as AchievementData;
      updateData('achievements', [...achievements, newItem]);
    } else if (editingId) {
      updateData('achievements', achievements.map(e => e.id === editingId ? { ...e, ...formData, images: parsedImages } : e));
    }
    setEditingId(null);
  };

  const deleteItem = (id: string) => {
    updateData('achievements', achievements.filter(e => e.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Achievements</h2>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-[#ff6600] text-white px-4 py-2 rounded-lg hover:bg-[#e05a00] transition-colors"
        >
          <Plus size={18} /> Add New Achievement
        </button>
      </div>

      {editingId && (
        <div className="bg-[#1e1e20] p-6 rounded-2xl border border-[#ff6600]/30 mb-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">{editingId === 'new' ? 'New Achievement' : 'Edit Achievement'}</h3>
            <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Number (e.g. 01)</label>
              <input 
                type="text" 
                value={formData.number || ''} 
                onChange={e => setFormData({...formData, number: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
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
              <label className="text-sm text-gray-400 mb-1 block">Subtitle</label>
              <input 
                type="text" 
                value={formData.subtitle || ''} 
                onChange={e => setFormData({...formData, subtitle: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Year</label>
              <input 
                type="text" 
                value={formData.year || ''} 
                onChange={e => setFormData({...formData, year: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-1 block">Description</label>
            <textarea 
              value={formData.desc || ''} 
              onChange={e => setFormData({...formData, desc: e.target.value})}
              rows={3}
              className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none resize-none"
            />
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-1 block">Image URLs (Comma separated)</label>
            <textarea 
              value={imagesText} 
              onChange={e => setImagesText(e.target.value)}
              rows={3}
              placeholder="https://image1.jpg, https://image2.jpg..."
              className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none resize-none"
            />
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#ff6600] text-white px-6 py-2.5 rounded-lg hover:bg-[#e05a00] transition-colors"
          >
            <Save size={18} /> Save Achievement
          </button>
        </div>
      )}

      <div className="space-y-4">
        {achievements.map(item => (
          <div key={item.id} className="bg-[#1e1e20] p-5 rounded-xl border border-[#2e2e32] flex gap-4 items-start">
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 items-center mb-1">
                <span className="text-xl font-bold text-[#3a3a3a]">{item.number}</span>
                <h4 className="font-semibold text-gray-100">{item.title}</h4>
                <span className="text-xs border border-[#2e2e32] px-2 py-0.5 rounded-full text-gray-400">{item.year}</span>
              </div>
              <p className="text-sm text-[#ff6600] mb-2">{item.subtitle}</p>
              <p className="text-sm text-gray-400 line-clamp-2">{item.desc}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => handleEdit(item)}
                className="p-2 text-gray-400 hover:text-white hover:bg-[#2e2e32] rounded-lg transition-colors"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => deleteItem(item.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
