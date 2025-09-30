
import React, { useState } from 'react';
import { Announcement, Department } from '../../types';
import { XIcon } from '../icons/Icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (announcement: Omit<Announcement, 'id'>) => void;
}

const AddEditAnnouncementModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState<'Company-Wide' | Department>('Company-Wide');
  const [priority, setPriority] = useState<'Normal' | 'Urgent'>('Normal');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please fill in the title and content.');
      return;
    }
    onSave({
      title,
      content,
      audience,
      priority,
      author: 'Admin User',
      authorPosition: 'System Administrator',
      authorAvatar: 'https://picsum.photos/100/100',
      date: new Date().toISOString(),
      imageUrl: imageUrl || undefined, 
    });
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-text-primary">Create New Announcement</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <XIcon className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input 
                type="text" 
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="e.g., System Maintenance Alert"
              />
            </div>
             <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
              <textarea
                id="content"
                rows={5}
                value={content}
                onChange={e => setContent(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Write your announcement here..."
              />
            </div>

            {/* NEW INPUT FIELD FOR IMAGE URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
              <input 
                type="url" 
                id="imageUrl"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="e.g., https://example.com/image.jpg"
              />
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
                    <select id="audience" value={audience} onChange={e => setAudience(e.target.value as any)} className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-primary focus:border-primary">
                        <option value="Company-Wide">Company-Wide</option>
                        {(['IT', 'Finance', 'HR', 'Marketing'] as Department[]).map(d => <option key={d} value={d}>{d} Department</option>)}
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <div className="flex items-center gap-4 p-2 border border-gray-300 rounded-md">
                        <label className="flex items-center">
                            <input type="radio" name="priority" value="Normal" checked={priority === 'Normal'} onChange={() => setPriority('Normal')} className="form-radio text-primary focus:ring-primary"/>
                            <span className="ml-2 text-sm">Normal</span>
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="priority" value="Urgent" checked={priority === 'Urgent'} onChange={() => setPriority('Urgent')} className="form-radio text-red-500 focus:ring-red-500"/>
                            <span className="ml-2 text-sm text-red-600 font-semibold">Urgent</span>
                        </label>
                    </div>
                 </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition">Post Announcement</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditAnnouncementModal;