import { useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { X, Calendar, BookOpen } from 'lucide-react';

interface AdminFormProps {
  type: 'event' | 'resource';
  onClose: () => void;
  onSuccess: () => void;
}

const AdminForm = ({ type, onClose, onSuccess }: AdminFormProps) => {
  const [loading, setLoading] = useState(false);
  
  // Event form state
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    event_type: 'workshop',
    event_date: '',
    event_time: '',
    location: 'Virtual Event',
    max_attendees: '',
    is_featured: false,
  });

  // Resource form state
  const [resourceData, setResourceData] = useState({
    title: '',
    description: '',
    resource_type: 'template',
    file_url: '',
    is_premium: false,
  });

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('community_events')
        .insert([{
          title: eventData.title,
          description: eventData.description,
          event_type: eventData.event_type,
          event_date: eventData.event_date,
          event_time: eventData.event_time,
          location: eventData.location,
          max_attendees: eventData.max_attendees ? parseInt(eventData.max_attendees) : null,
          is_featured: eventData.is_featured,
          is_active: true,
        }]);

      if (error) throw error;
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('community_resources')
        .insert([{
          title: resourceData.title,
          description: resourceData.description,
          resource_type: resourceData.resource_type,
          file_url: resourceData.file_url,
          is_premium: resourceData.is_premium,
          is_active: true,
        }]);

      if (error) throw error;
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating resource:', error);
      alert('Error creating resource. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Add New {type === 'event' ? 'Event' : 'Resource'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            title="Close form"
            aria-label="Close form"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {type === 'event' ? (
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={eventData.title}
                  onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={eventData.description}
                  onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type *
                  </label>
                  <select
                    required
                    value={eventData.event_type}
                    onChange={(e) => setEventData({ ...eventData, event_type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Event type"
                  >
                    <option value="workshop">Workshop</option>
                    <option value="showcase">Showcase</option>
                    <option value="q&a">Q&A</option>
                    <option value="networking">Networking</option>
                    <option value="training">Training</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Attendees
                  </label>
                  <input
                    type="number"
                    value={eventData.max_attendees}
                    onChange={(e) => setEventData({ ...eventData, max_attendees: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Leave empty for unlimited"
                    aria-label="Maximum attendees"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventData.event_date}
                    onChange={(e) => setEventData({ ...eventData, event_date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Event date"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventData.event_time}
                    onChange={(e) => setEventData({ ...eventData, event_time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 2:00 PM - 4:00 PM EST"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={eventData.location}
                  onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Virtual Event"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={eventData.is_featured}
                  onChange={(e) => setEventData({ ...eventData, is_featured: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
                  Featured Event
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Event'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleResourceSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resource Title *
                </label>
                <input
                  type="text"
                  required
                  value={resourceData.title}
                  onChange={(e) => setResourceData({ ...resourceData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter resource title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={resourceData.description}
                  onChange={(e) => setResourceData({ ...resourceData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter resource description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resource Type *
                  </label>
                  <select
                    required
                    value={resourceData.resource_type}
                    onChange={(e) => setResourceData({ ...resourceData, resource_type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Resource type"
                  >
                    <option value="template">Template</option>
                    <option value="tool">Tool</option>
                    <option value="guide">Guide</option>
                    <option value="library">Library</option>
                    <option value="training">Training</option>
                    <option value="documentation">Documentation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File URL
                  </label>
                  <input
                    type="url"
                    value={resourceData.file_url}
                    onChange={(e) => setResourceData({ ...resourceData, file_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/file.pdf"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_premium"
                  checked={resourceData.is_premium}
                  onChange={(e) => setResourceData({ ...resourceData, is_premium: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_premium" className="ml-2 block text-sm text-gray-900">
                  Premium Resource
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Resource'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
