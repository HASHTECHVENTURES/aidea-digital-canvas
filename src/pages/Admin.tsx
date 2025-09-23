import { useEffect, useState } from 'react';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  LogIn, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  User,
  Mail,
  Phone,
  Building,
  Clock,
  MapPin,
  Download,
  Star,
  Shield,
  Search
} from 'lucide-react';
import { supabase } from '../integrations/supabase/client';

interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
}

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  company_name?: string;
  created_at: string;
  last_login?: string;
  is_active: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  event_type: string;
  event_date: string;
  event_time: string;
  location: string;
  max_attendees?: number;
  current_attendees: number;
  is_featured: boolean;
  is_active: boolean;
  registration_url?: string;
  created_at: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  resource_type: string;
  file_url?: string;
  download_count: number;
  is_premium: boolean;
  is_active: boolean;
  tags?: string[];
  created_at: string;
}

const Admin = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Active tab
  const [activeTab, setActiveTab] = useState<'users' | 'events' | 'resources' | 'messages'>('users');
  
  // Data state
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  
  // Form state for adding new items
  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState<'event' | 'resource'>('event');
  
  // Edit state
  const [editingItem, setEditingItem] = useState<{type: 'event' | 'resource' | 'user', id: string} | null>(null);
  
  // User form fields
  const [userForm, setUserForm] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    company_name: '',
    is_active: true
  });
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  
  // Bulk operations state
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('');
  
  // Pagination logic
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // Filtered data based on search (client-side for now, will optimize later)
  const filteredUsers = users.filter(user => 
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone_number.includes(searchQuery) ||
    (user.company_name && user.company_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Paginated users
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  
  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  
  // Bulk operations functions
  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(user => user.id));
    }
  };
  
  const handleBulkAction = async () => {
    if (!bulkAction || selectedUsers.length === 0) return;
    
    try {
      if (bulkAction === 'activate') {
        const { error } = await supabase
          .from('user_profiles')
          .update({ is_active: true })
          .in('id', selectedUsers);
        if (error) throw error;
        alert(`${selectedUsers.length} users activated successfully!`);
      } else if (bulkAction === 'deactivate') {
        const { error } = await supabase
          .from('user_profiles')
          .update({ is_active: false })
          .in('id', selectedUsers);
        if (error) throw error;
        alert(`${selectedUsers.length} users deactivated successfully!`);
      } else if (bulkAction === 'delete') {
        if (!confirm(`Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`)) {
          return;
        }
        const { error } = await supabase
          .from('user_profiles')
          .delete()
          .in('id', selectedUsers);
        if (error) throw error;
        alert(`${selectedUsers.length} users deleted successfully!`);
      }
      
      setSelectedUsers([]);
      setBulkAction('');
      await fetchAllData();
    } catch (error: any) {
      console.error('Bulk action error:', error);
      alert(`Error performing bulk action: ${error.message}`);
    }
  };
  
  // Export users to CSV
  const exportUsersToCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Company', 'Status', 'Joined Date'],
      ...users.map(user => [
        user.full_name,
        user.email,
        user.phone_number,
        user.company_name || '',
        user.is_active ? 'Active' : 'Inactive',
        new Date(user.created_at).toLocaleDateString()
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `aidea-users-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    event.event_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (resource.description && resource.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    resource.resource_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );
  
  // Event form fields
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    event_type: 'workshop',
    event_date: '',
    event_time: '',
    location: '',
    max_attendees: '',
    is_featured: false,
    registration_url: ''
  });
  
  // Resource form fields
  const [resourceForm, setResourceForm] = useState({
    title: '',
    description: '',
    resource_type: 'template',
    file_url: '',
    is_premium: false,
    tags: ''
  });
  
  // File upload state
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Check if admin is already logged in
  useEffect(() => {
    const checkAdminAuth = () => {
      const adminData = localStorage.getItem('admin_auth');
      if (adminData) {
        const parsed = JSON.parse(adminData);
        setAdmin(parsed);
        setIsAuthenticated(true);
        fetchAllData();
      }
    };
    
    checkAdminAuth();
  }, []);

  // Debug: Log when users state changes
  useEffect(() => {
    console.log('Users state updated:', users);
    console.log('Users count:', users.length);
  }, [users]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      console.log('Admin login attempt for:', email);
      
      // Query the admins table for authentication
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        console.error('Admin not found or inactive:', error);
        throw new Error('Invalid admin credentials');
      }

      console.log('Admin found:', data.email, data.name);

      // Check if we have the secure password verification function
      const { data: verifyResult, error: verifyError } = await supabase
        .rpc('verify_password', { 
          password: password, 
          hash: data.password_hash 
        });

      let passwordValid = false;

      if (verifyError) {
        console.log('Secure verification not available, using simple comparison');
        // Fallback to simple comparison if secure function not available
        passwordValid = (data.password_hash === password);
      } else {
        console.log('Using secure password verification');
        passwordValid = verifyResult;
      }

      if (!passwordValid) {
        console.error('Invalid password for admin:', email);
        throw new Error('Invalid admin credentials');
      }

      console.log('Admin login successful:', data.email);

      // Store admin data
      const adminData = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        is_active: data.is_active
      };

      localStorage.setItem('admin_auth', JSON.stringify(adminData));
      setAdmin(adminData);
      setIsAuthenticated(true);
      
      // Update last login
      await supabase
        .from('admins')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.id);

      console.log('Admin session established, fetching data...');
      fetchAllData();
    } catch (error: any) {
      console.error('Admin login error:', error);
      alert(error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_auth');
    setAdmin(null);
    setIsAuthenticated(false);
    setUsers([]);
    setEvents([]);
    setResources([]);
  };

  const fetchAllData = async () => {
    setDataLoading(true);
    try {
      console.log('Fetching all data...');
      
      // Fetch users with optimized query
      const { data: usersData, error: usersError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000); // Limit to prevent memory issues

      if (usersError) {
        console.error('Error fetching users:', usersError);
        throw usersError;
      }

      // Fetch events
      const { data: eventsData, error: eventsError } = await supabase
        .from('community_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (eventsError) {
        console.error('Error fetching events:', eventsError);
        throw eventsError;
      }

      // Fetch resources
      const { data: resourcesData, error: resourcesError } = await supabase
        .from('community_resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (resourcesError) {
        console.error('Error fetching resources:', resourcesError);
        throw resourcesError;
      }

      // Fetch contact messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (messagesError) {
        console.error('Error fetching contact messages:', messagesError);
        // Don't throw error for messages, just log it
      }

      console.log('Data fetched successfully:', {
        users: usersData?.length || 0,
        events: eventsData?.length || 0,
        resources: resourcesData?.length || 0,
        messages: messagesData?.length || 0
      });

      setUsers(usersData || []);
      setEvents(eventsData || []);
      setResources(resourcesData || []);
      setContactMessages(messagesData || []);
      setTotalItems(usersData?.length || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert(`Error fetching data: ${error}`);
    } finally {
      setDataLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('community_events')
        .insert([{
          title: eventForm.title,
          description: eventForm.description,
          event_type: eventForm.event_type,
          event_date: eventForm.event_date,
          event_time: eventForm.event_time,
          location: eventForm.location,
          max_attendees: eventForm.max_attendees ? parseInt(eventForm.max_attendees) : null,
          is_featured: eventForm.is_featured,
          registration_url: eventForm.registration_url || null
        }]);

      if (error) throw error;

      alert('Event added successfully!');
      setShowAddForm(false);
      setEventForm({
        title: '',
        description: '',
        event_type: 'workshop',
        event_date: '',
        event_time: '',
        location: '',
        max_attendees: '',
        is_featured: false,
        registration_url: ''
      });
      fetchAllData();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadingFile(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `resources/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('community-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('community-files')
        .getPublicUrl(filePath);

      setResourceForm(prev => ({ ...prev, file_url: data.publicUrl }));
      setUploadedFile(file);
      alert('File uploaded successfully!');
    } catch (error: any) {
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploadingFile(false);
    }
  };

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tagsArray = resourceForm.tags ? resourceForm.tags.split(',').map(tag => tag.trim()) : [];
      
      const { error } = await supabase
        .from('community_resources')
        .insert([{
          title: resourceForm.title,
          description: resourceForm.description,
          resource_type: resourceForm.resource_type,
          file_url: resourceForm.file_url || null,
          is_premium: resourceForm.is_premium,
          tags: tagsArray
        }]);

      if (error) throw error;

      alert('Resource added successfully!');
      setShowAddForm(false);
      setResourceForm({
        title: '',
        description: '',
        resource_type: 'template',
        file_url: '',
        is_premium: false,
        tags: ''
      });
      setUploadedFile(null);
      fetchAllData();
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Edit functions
  const handleEditEvent = (event: Event) => {
    setEditingItem({ type: 'event', id: event.id });
    setEventForm({
      title: event.title,
      description: event.description || '',
      event_type: event.event_type,
      event_date: event.event_date,
      event_time: event.event_time,
      location: event.location || '',
      max_attendees: event.max_attendees?.toString() || '',
      is_featured: event.is_featured,
      registration_url: event.registration_url || ''
    });
    setShowAddForm(true);
    setFormType('event');
  };

  const handleEditResource = (resource: Resource) => {
    setEditingItem({ type: 'resource', id: resource.id });
    setResourceForm({
      title: resource.title,
      description: resource.description || '',
      resource_type: resource.resource_type,
      file_url: resource.file_url || '',
      is_premium: resource.is_premium,
      tags: resource.tags ? resource.tags.join(', ') : ''
    });
    setShowAddForm(true);
    setFormType('resource');
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    try {
      const { error } = await supabase
        .from('community_events')
        .update({
          title: eventForm.title,
          description: eventForm.description,
          event_type: eventForm.event_type,
          event_date: eventForm.event_date,
          event_time: eventForm.event_time,
          location: eventForm.location,
          max_attendees: eventForm.max_attendees ? parseInt(eventForm.max_attendees) : null,
          is_featured: eventForm.is_featured,
          registration_url: eventForm.registration_url || null
        })
        .eq('id', editingItem.id);

      if (error) throw error;

      alert('Event updated successfully!');
      setShowAddForm(false);
      setEditingItem(null);
      setEventForm({
        title: '',
        description: '',
        event_type: 'workshop',
        event_date: '',
        event_time: '',
        location: '',
        max_attendees: '',
        is_featured: false,
        registration_url: ''
      });
      fetchAllData();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleUpdateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    try {
      const tagsArray = resourceForm.tags ? resourceForm.tags.split(',').map(tag => tag.trim()) : [];
      
      const { error } = await supabase
        .from('community_resources')
        .update({
          title: resourceForm.title,
          description: resourceForm.description,
          resource_type: resourceForm.resource_type,
          file_url: resourceForm.file_url || null,
          is_premium: resourceForm.is_premium,
          tags: tagsArray
        })
        .eq('id', editingItem.id);

      if (error) throw error;

      alert('Resource updated successfully!');
      setShowAddForm(false);
      setEditingItem(null);
      setResourceForm({
        title: '',
        description: '',
        resource_type: 'template',
        file_url: '',
        is_premium: false,
        tags: ''
      });
      setUploadedFile(null);
      fetchAllData();
    } catch (error: any) {
      alert(error.message);
    }
  };

  // User management functions
  const handleEditUser = (user: UserProfile) => {
    setEditingItem({ type: 'user', id: user.id });
    setUserForm({
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      company_name: user.company_name || '',
      is_active: user.is_active
    });
    setShowAddForm(true);
    setFormType('event'); // We'll handle this differently
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || editingItem.type !== 'user') return;
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: userForm.full_name,
          phone_number: userForm.phone_number,
          company_name: userForm.company_name,
          is_active: userForm.is_active
        })
        .eq('id', editingItem.id);

      if (error) throw error;

      alert('User updated successfully!');
      setShowAddForm(false);
      setEditingItem(null);
      setUserForm({
      full_name: '',
      email: '',
      phone_number: '',
      company_name: '',
        is_active: true
      });
      fetchAllData();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      alert(`User "${userName}" deleted successfully!`);
      fetchAllData();
    } catch (error: any) {
      alert(`Error deleting user: ${error.message}`);
    }
  };

  const updateMessageStatus = async (messageId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', messageId);
      
      if (error) throw error;
      
      // Update local state
      setContactMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, status } : msg
        )
      );
    } catch (error: any) {
      console.error('Error updating message status:', error);
      alert(`Error updating message status: ${error.message}`);
    }
  };

  const toggleEventStatus = async (eventId: string, currentStatus: boolean) => {
    try {
      console.log('Toggling event status:', eventId, currentStatus);
      
      // Immediately update the UI
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === eventId 
            ? { ...event, is_active: !currentStatus }
            : event
        )
      );
      
      const { error } = await supabase
        .from('community_events')
        .update({ is_active: !currentStatus })
        .eq('id', eventId);

      if (error) {
        console.error('Error updating event:', error);
        // Revert the UI change if the update failed
        setEvents(prevEvents => 
          prevEvents.map(event => 
            event.id === eventId 
              ? { ...event, is_active: currentStatus }
              : event
          )
        );
        throw error;
      }
      
      console.log('Event status updated successfully');
    } catch (error: any) {
      console.error('Error in toggleEventStatus:', error);
      alert(`Error updating event: ${error.message}`);
    }
  };

  const toggleResourceStatus = async (resourceId: string, currentStatus: boolean) => {
    try {
      console.log('Toggling resource status:', resourceId, currentStatus);
      
      // Immediately update the UI
      setResources(prevResources => 
        prevResources.map(resource => 
          resource.id === resourceId 
            ? { ...resource, is_active: !currentStatus }
            : resource
        )
      );
      
      const { error } = await supabase
        .from('community_resources')
        .update({ is_active: !currentStatus })
        .eq('id', resourceId);

      if (error) {
        console.error('Error updating resource:', error);
        // Revert the UI change if the update failed
        setResources(prevResources => 
          prevResources.map(resource => 
            resource.id === resourceId 
              ? { ...resource, is_active: currentStatus }
              : resource
          )
        );
        throw error;
      }
      
      console.log('Resource status updated successfully');
    } catch (error: any) {
      console.error('Error in toggleResourceStatus:', error);
      alert(`Error updating resource: ${error.message}`);
    }
  };

  const deleteEvent = async (eventId: string) => {
    console.log('Delete event clicked for ID:', eventId);
    
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      console.log('Delete cancelled by user');
      return;
    }
    
    try {
      console.log('Starting delete operation for event:', eventId);
      
      // First, let's try to get the event details for logging
      const { data: eventData } = await supabase
        .from('community_events')
        .select('title')
        .eq('id', eventId)
        .single();
      
      console.log('Deleting event:', eventData?.title || 'Unknown');
      
      const { data, error } = await supabase
        .from('community_events')
        .delete()
        .eq('id', eventId)
        .select();

      console.log('Delete response:', { data, error });

      if (error) {
        console.error('Supabase delete error:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      if (data && data.length > 0) {
        console.log('Event deleted successfully:', data[0]);
        alert(`Event "${eventData?.title || 'Unknown'}" deleted successfully!`);
        
        // Immediately update the local state
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        
        // Also refresh all data to ensure consistency
        await fetchAllData();
      } else {
        console.log('No data returned from delete operation');
        alert('Event deleted, but no confirmation received. Refreshing data...');
        await fetchAllData();
      }
    } catch (error: any) {
      console.error('Error in deleteEvent:', error);
      alert(`Error deleting event: ${error.message || error}`);
    }
  };

  const deleteResource = async (resourceId: string) => {
    console.log('Delete resource clicked for ID:', resourceId);
    
    if (!confirm('Are you sure you want to delete this resource? This action cannot be undone.')) {
      console.log('Delete cancelled by user');
      return;
    }
    
    try {
      console.log('Starting delete operation for resource:', resourceId);
      
      // First, let's try to get the resource details for logging
      const { data: resourceData } = await supabase
        .from('community_resources')
        .select('title')
        .eq('id', resourceId)
        .single();
      
      console.log('Deleting resource:', resourceData?.title || 'Unknown');
      
      const { data, error } = await supabase
        .from('community_resources')
        .delete()
        .eq('id', resourceId)
        .select();

      console.log('Delete response:', { data, error });

      if (error) {
        console.error('Supabase delete error:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      if (data && data.length > 0) {
        console.log('Resource deleted successfully:', data[0]);
        alert(`Resource "${resourceData?.title || 'Unknown'}" deleted successfully!`);
        
        // Immediately update the local state
        setResources(prevResources => prevResources.filter(resource => resource.id !== resourceId));
        
        // Also refresh all data to ensure consistency
        await fetchAllData();
      } else {
        console.log('No data returned from delete operation');
        alert('Resource deleted, but no confirmation received. Refreshing data...');
        await fetchAllData();
      }
    } catch (error: any) {
      console.error('Error in deleteResource:', error);
      alert(`Error deleting resource: ${error.message || error}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Access the Aidea Digital admin panel</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter admin email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </div>
              )}
            </button>
          </form>

        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3" />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Aidea Digital Admin</h1>
                <p className="text-xs sm:text-sm text-gray-600">Welcome, {admin?.name}</p>
              </div>
            </div>
            <button
              onClick={handleAdminLogout}
              className="flex items-center px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base touch-manipulation"
            >
              <LogOut className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <nav className="flex space-x-2 sm:space-x-4 lg:space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Users</span>
              <span className="sm:hidden">({users.length})</span>
              <span className="hidden sm:inline">({users.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === 'events'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Events</span>
              <span className="sm:hidden">({events.length})</span>
              <span className="hidden sm:inline">({events.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === 'resources'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Resources</span>
              <span className="sm:hidden">({resources.length})</span>
              <span className="hidden sm:inline">({resources.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === 'messages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Mail className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Messages</span>
              <span className="sm:hidden">({contactMessages.length})</span>
              <span className="hidden sm:inline">({contactMessages.length})</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Add New Button */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 capitalize">
            {activeTab === 'users' ? 'Community Members' : activeTab === 'events' ? 'Community Events' : activeTab === 'resources' ? 'Community Resources' : 'Contact Messages'}
          </h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search Bar and Export */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 text-sm sm:text-base"
                />
              </div>
              {activeTab === 'users' && (
                <button
                  onClick={() => exportUsersToCSV()}
                  className="flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base touch-manipulation"
                >
                  <Download className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Export Users</span>
                  <span className="sm:hidden">Export</span>
                </button>
              )}
            </div>
            {activeTab !== 'users' && (
              <button
                onClick={() => {
                  setFormType(activeTab === 'events' ? 'event' : 'resource');
                  setShowAddForm(true);
                }}
                className="flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base touch-manipulation"
              >
                <Plus className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Add New {activeTab === 'events' ? 'Event' : 'Resource'}</span>
                <span className="sm:hidden">Add {activeTab === 'events' ? 'Event' : 'Resource'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Data Loading */}
        {dataLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading data...</p>
          </div>
        ) : (
          <>
            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {filteredUsers.length === 0 && searchQuery ? (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No users found matching "{searchQuery}"</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                <div>
                  {/* Bulk Operations */}
                  {selectedUsers.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-blue-900">
                            {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
                          </span>
                          <select
                            value={bulkAction}
                            onChange={(e) => setBulkAction(e.target.value)}
                            className="text-sm border border-blue-300 rounded px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Choose action...</option>
                            <option value="activate">Activate Users</option>
                            <option value="deactivate">Deactivate Users</option>
                            <option value="delete">Delete Users</option>
                          </select>
                          <button
                            onClick={handleBulkAction}
                            disabled={!bulkAction}
                            className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Apply
                          </button>
                        </div>
                        <button
                          onClick={() => setSelectedUsers([])}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Clear Selection
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                            onChange={handleSelectAll}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => handleSelectUser(user.id)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.full_name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {user.id.slice(0, 8)}...
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {user.phone_number}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {user.company_name || 'Not specified'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.is_active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditUser(user)}
                                className="px-3 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                                title="Edit User"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id, user.full_name)}
                                className="px-3 py-1 text-xs font-medium rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                                title="Delete User"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
                )}
                
                {/* Pagination Controls for Users */}
                {activeTab === 'users' && totalPages > 1 && (
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                          <span className="font-medium">{Math.min(endIndex, totalItems)}</span> of{' '}
                          <span className="font-medium">{totalItems}</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                  currentPage === pageNum
                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="grid gap-6">
                {filteredEvents.length === 0 && searchQuery ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No events found matching "{searchQuery}"</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                      <>
                      {filteredEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 mr-3">
                            {event.title}
                          </h3>
                          {event.is_featured && (
                            <Star className="h-4 w-4 text-yellow-500" />
                          )}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            event.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {event.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(event.event_date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {event.event_time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleEditEvent(event);
                          }}
                          className="px-3 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                          title="Edit Event"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleEventStatus(event.id, event.is_active);
                          }}
                          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                            event.is_active
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {event.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Delete button clicked for event:', event.id, event.title);
                            deleteEvent(event.id);
                          }}
                          className="px-3 py-1 text-xs font-medium rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                      </>
                )}
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="grid gap-6">
                {filteredResources.length === 0 && searchQuery ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No resources found matching "{searchQuery}"</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                      <>
                      {filteredResources.map((resource) => (
                  <div key={resource.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 mr-3">
                            {resource.title}
                          </h3>
                          {resource.is_premium && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                              Premium
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            resource.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {resource.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{resource.description}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {resource.resource_type}
                          </div>
                          <div className="flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            {resource.download_count} downloads
                          </div>
                          {resource.tags && resource.tags.length > 0 && (
                            <div className="flex items-center">
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {resource.tags.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleEditResource(resource);
                          }}
                          className="px-3 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                          title="Edit Resource"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleResourceStatus(resource.id, resource.is_active);
                          }}
                          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                            resource.is_active
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {resource.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Delete button clicked for resource:', resource.id, resource.title);
                            deleteResource(resource.id);
                          }}
                          className="px-3 py-1 text-xs font-medium rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                          title="Delete Resource"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                      </>
                )}
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="grid gap-6">
                {contactMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No contact messages yet</p>
                    <p className="text-sm text-gray-400 mt-2">Messages from your contact form will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contactMessages.map((message) => (
                      <div key={message.id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 mr-3">
                                {message.subject}
                              </h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                message.status === 'new' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : message.status === 'read'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : message.status === 'replied'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {message.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-600">
                                  <strong>From:</strong> {message.name} ({message.email})
                                </p>
                                {message.company && (
                                  <p className="text-sm text-gray-600">
                                    <strong>Company:</strong> {message.company}
                                  </p>
                                )}
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">
                                  <strong>Date:</strong> {new Date(message.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-gray-800 whitespace-pre-wrap">{message.message}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => {
                                // Mark as read
                                updateMessageStatus(message.id, 'read');
                              }}
                              className="px-3 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                            >
                              Mark Read
                            </button>
                            <button
                              onClick={() => {
                                // Mark as replied
                                updateMessageStatus(message.id, 'replied');
                              }}
                              className="px-3 py-1 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                            >
                              Mark Replied
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingItem ? 'Edit' : 'Add New'} {editingItem?.type === 'user' ? 'User' : formType === 'event' ? 'Event' : 'Resource'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingItem(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {editingItem?.type === 'user' ? (
                <form onSubmit={handleUpdateUser} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={userForm.full_name}
                      onChange={(e) => setUserForm({...userForm, full_name: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={userForm.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={userForm.phone_number}
                      onChange={(e) => setUserForm({...userForm, phone_number: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={userForm.company_name}
                      onChange={(e) => setUserForm({...userForm, company_name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={userForm.is_active}
                        onChange={(e) => setUserForm({...userForm, is_active: e.target.checked})}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">Active User</span>
                    </label>
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Update User
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingItem(null);
                      }}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : formType === 'event' ? (
                <form onSubmit={editingItem?.type === 'event' ? handleUpdateEvent : handleAddEvent} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={eventForm.description}
                      onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Type *
                    </label>
                    <select
                      value={eventForm.event_type}
                      onChange={(e) => setEventForm({...eventForm, event_type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="workshop">Workshop</option>
                      <option value="showcase">Showcase</option>
                      <option value="q&a">Q&A</option>
                      <option value="networking">Networking</option>
                      <option value="training">Training</option>
                      <option value="webinar">Webinar</option>
                      <option value="conference">Conference</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Date *
                    </label>
                    <input
                      type="datetime-local"
                      value={eventForm.event_date}
                      onChange={(e) => setEventForm({...eventForm, event_date: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Time *
                    </label>
                    <input
                      type="text"
                      value={eventForm.event_time}
                      onChange={(e) => setEventForm({...eventForm, event_time: e.target.value})}
                      required
                      placeholder="e.g., 2:00 PM - 5:00 PM EST"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={eventForm.location}
                      onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Attendees
                    </label>
                    <input
                      type="number"
                      value={eventForm.max_attendees}
                      onChange={(e) => setEventForm({...eventForm, max_attendees: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Registration URL
                    </label>
                    <input
                      type="url"
                      value={eventForm.registration_url}
                      onChange={(e) => setEventForm({...eventForm, registration_url: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_featured"
                      checked={eventForm.is_featured}
                      onChange={(e) => setEventForm({...eventForm, is_featured: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">
                      Featured Event
                    </label>
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {editingItem?.type === 'event' ? 'Update Event' : 'Add Event'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingItem(null);
                      }}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={editingItem?.type === 'resource' ? handleUpdateResource : handleAddResource} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resource Title *
                    </label>
                    <input
                      type="text"
                      value={resourceForm.title}
                      onChange={(e) => setResourceForm({...resourceForm, title: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={resourceForm.description}
                      onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resource Type *
                    </label>
                    <select
                      value={resourceForm.resource_type}
                      onChange={(e) => setResourceForm({...resourceForm, resource_type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="template">Template</option>
                      <option value="tool">Tool</option>
                      <option value="guide">Guide</option>
                      <option value="library">Library</option>
                      <option value="training">Training</option>
                      <option value="documentation">Documentation</option>
                      <option value="checklist">Checklist</option>
                      <option value="framework">Framework</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload PDF File
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file);
                          }
                        }}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        {uploadingFile ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
                            <span className="text-gray-600">Uploading...</span>
                          </div>
                        ) : uploadedFile ? (
                          <div className="text-green-600">
                            <svg className="h-8 w-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm font-medium">{uploadedFile.name}</p>
                            <p className="text-xs text-gray-500">Click to change file</p>
                          </div>
                        ) : (
                          <div className="text-gray-400">
                            <svg className="h-8 w-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-sm font-medium">Click to upload PDF</p>
                            <p className="text-xs">or drag and drop</p>
                          </div>
                        )}
                      </label>
                    </div>
                    {resourceForm.file_url && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                        File URL: {resourceForm.file_url}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={resourceForm.tags}
                      onChange={(e) => setResourceForm({...resourceForm, tags: e.target.value})}
                      placeholder="e.g., strategy, planning, framework"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_premium"
                      checked={resourceForm.is_premium}
                      onChange={(e) => setResourceForm({...resourceForm, is_premium: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_premium" className="ml-2 block text-sm text-gray-700">
                      Premium Resource
                    </label>
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {editingItem?.type === 'resource' ? 'Update Resource' : 'Add Resource'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingItem(null);
                      }}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
