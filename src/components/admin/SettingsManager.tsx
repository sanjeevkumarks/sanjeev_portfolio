import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Download, Upload, AlertTriangle } from 'lucide-react';

export function SettingsManager() {
  const { exportData, importData } = usePortfolio();
  const [importJson, setImportJson] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleExport = () => {
    const dataString = exportData();
    const blob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    setError(null);
    try {
      const parsedData = JSON.parse(importJson);
      importData(parsedData);
      alert('Data imported successfully!');
      setImportJson('');
    } catch (e: any) {
      setError(`Failed to import data: ${e.message}`);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Data Backup & Restore</h2>
        <p className="text-gray-400 mt-1">Export your portfolio data to a JSON file to prevent data loss, or import an existing backup.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#1e1e20] p-6 rounded-2xl border border-[#2e2e32]">
          <h3 className="text-lg font-semibold mb-4">Export Data</h3>
          <p className="text-sm text-gray-400 mb-6">
            Download a complete JSON backup of your portfolio. This includes all your projects, experience, skills, and settings. Keep this file safe.
          </p>
          <button 
            onClick={handleExport}
            className="flex items-center justify-center gap-2 w-full bg-[#2e2e32] text-white px-4 py-3 rounded-lg hover:bg-[#3a3a3e] transition-colors font-medium"
          >
            <Download size={18} /> Download JSON Backup
          </button>
        </div>

        <div className="bg-[#1e1e20] p-6 rounded-2xl border border-[#2e2e32]">
          <h3 className="text-lg font-semibold mb-4">Import Data</h3>
          <p className="text-sm text-gray-400 mb-4">
            Paste your previously exported JSON data here to restore your portfolio.
          </p>
          
          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg mb-4 text-sm">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          <div className="mb-4">
            <textarea 
              value={importJson} 
              onChange={e => setImportJson(e.target.value)}
              rows={6}
              placeholder='{"hero": {...}, "projects": [...]}'
              className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-3 text-white focus:border-[#ff6600] outline-none font-mono text-xs resize-y"
            />
          </div>
          
          <button 
            onClick={handleImport}
            disabled={!importJson.trim()}
            className="flex items-center justify-center gap-2 w-full bg-[#ff6600] text-white px-4 py-3 rounded-lg hover:bg-[#e05a00] disabled:bg-[#ff6600]/50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <Upload size={18} /> Restore from JSON
          </button>
          
          <p className="text-xs text-gray-500 mt-4 flex items-start gap-1.5">
            <AlertTriangle size={14} className="shrink-0 mt-0.5 text-[#ff6600]" />
            Warning: Importing will overwrite all current portfolio data in localStorage.
          </p>
        </div>
      </div>
    </div>
  );
}
