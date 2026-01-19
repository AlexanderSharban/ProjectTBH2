import React, { useState, useEffect, useCallback } from 'react';
import api from '../api';

const CrudList = ({ endpoint, fields, title }) => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const fetchItems = useCallback(async () => {
    try {
      const response = await api.get(`/${endpoint}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = items.filter(item =>
    fields.some(field => item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.patch(`/${endpoint}/${editing.id}`, formData);
      } else {
        await api.post(`/${endpoint}`, formData);
      }
      fetchItems();
      setEditing(null);
      setFormData({});
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    setFormData(item);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${endpoint}/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <section>
      <h2>{title}</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
      />
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        {fields.map(field => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={formData[field] || ''}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            required
          />
        ))}
        <button type="submit">{editing ? 'Update' : 'Create'}</button>
        {editing && <button type="button" onClick={() => setEditing(null)}>Cancel</button>}
      </form>
      <div className="crud-list">
        {filteredItems.map(item => (
          <div key={item.id} className="crud-item">
            <h3>{item.title || item.name || item.email || `Item ${item.id}`}</h3>
            {fields.map(field => (
              <p key={field}><strong>{field}:</strong> {item[field]}</p>
            ))}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CrudList;