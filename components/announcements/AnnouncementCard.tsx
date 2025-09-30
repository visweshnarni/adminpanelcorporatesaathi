
import React from 'react';
import { Announcement, Department } from '../../types';
import { MegaphoneIcon } from '../icons/Icons';

interface Props {
  announcement: Announcement;
}

const audienceColors: Record<'Company-Wide' | Department, string> = {
    'Company-Wide': 'bg-blue-100 text-blue-800',
    'IT': 'bg-indigo-100 text-indigo-800',
    'Finance': 'bg-green-100 text-green-800',
    'HR': 'bg-pink-100 text-pink-800',
    'Marketing': 'bg-yellow-100 text-yellow-800',
};

const AnnouncementCard: React.FC<Props> = ({ announcement }) => {
    const isUrgent = announcement.priority === 'Urgent';
    const borderColor = isUrgent ? 'border-red-500' : 'border-primary';
    const audienceColor = audienceColors[announcement.audience];
    
    return (
        <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 ${borderColor}`}>
             {/* NEW: Conditional Image Display */}
            {announcement.imageUrl && (
                <img 
                    src={announcement.imageUrl} 
                    alt={announcement.title} 
                    // Use Tailwind classes to style the image
                    className="w-full h-48 object-cover rounded-t-xl" 
                />
            )}
            <div className="p-5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <h3 className="text-lg font-bold text-text-primary">{announcement.title}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${audienceColor}`}>
                           {announcement.audience}
                        </span>
                        {isUrgent && (
                             <span className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                               URGENT
                             </span>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <img src={announcement.authorAvatar} alt={announcement.author} className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="text-sm font-semibold text-text-primary">{announcement.author}</p>
                        <p className="text-xs text-text-secondary">
                            {announcement.authorPosition} • {new Date(announcement.date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                        </p>
                    </div>
                </div>
                
                <div className="mt-4 prose prose-sm max-w-none text-text-secondary">
                   <p>{announcement.content}</p>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementCard;
