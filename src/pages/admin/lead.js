import AdminLayout from '@/components/AdminLayout';
import { useEffect, useState } from 'react';

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Status options for leads
  const statusOptions = [
    { value: 0, label: 'New' },
    { value: 1, label: 'Contacted' },
    { value: 2, label: 'Converted' },
    { value: 3, label: 'Closed' }
  ];

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/admin/leads');
        const data = await res.json();
        
        if (data.success) {
          setLeads(data.data);
        } else {
          console.error('Failed to fetch leads:', data.message);
        }
      } catch (error) {
        console.error('Failed to fetch leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLead(null);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Update the local state
        setLeads(leads.map(lead => 
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        ));
        
        // If there's a selected lead in the modal, update it too
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      } else {
        console.error('Failed to update status:', data.message);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const res = await fetch('/api/admin/leads', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: leadId }),
        });
        
        const data = await res.json();
        
        if (data.success) {
          // Update the local state
          setLeads(leads.filter(lead => lead.id !== leadId));
          
          // Close modal if the deleted lead was being viewed
          if (selectedLead && selectedLead.id === leadId) {
            handleCloseModal();
          }
        } else {
          console.error('Failed to delete lead:', data.message);
        }
      } catch (error) {
        console.error('Failed to delete lead:', error);
      }
    }
  };

  const getStatusLabel = (status) => {
    const statusObj = statusOptions.find(option => option.value === status);
    return statusObj ? statusObj.label : 'Unknown';
  };

  return (
    <div>
      <h1>Lead Management</h1>
      
      {loading ? (
        <p>Loading leads...</p>
      ) : (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <p>Total Leads: {leads.length}</p>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Name</th>
                <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Contact</th>
                <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Journey</th>
                <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Date</th>
                <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Type</th>
                <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Status</th>
                <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id}>
                  <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>{lead.fullName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                    <div>{lead.mobile}</div>
                    <div>{lead.email}</div>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                    {lead.from} → {lead.to}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                    {lead.departureDate} at {lead.departureTime}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>{lead.bookingType}</td>
                  <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, parseInt(e.target.value))}
                      style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                    <button
                      onClick={() => handleViewDetails(lead)}
                      style={{
                        background: '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.25rem 0.5rem',
                        cursor: 'pointer',
                        marginRight: '0.5rem'
                      }}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      style={{
                        background: '#ff0000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.25rem 0.5rem',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      
      {/* Lead Details Modal */}
      {showModal && selectedLead && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2>Lead Details</h2>
              <button
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                &times;
              </button>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <h3>{selectedLead.fullName}</h3>
              <p><strong>Email:</strong> {selectedLead.email}</p>
              <p><strong>Mobile:</strong> {selectedLead.mobile}</p>
              <p><strong>From:</strong> {selectedLead.from}</p>
              <p><strong>To:</strong> {selectedLead.to}</p>
              <p><strong>Departure Date:</strong> {selectedLead.departureDate}</p>
              <p><strong>Departure Time:</strong> {selectedLead.departureTime}</p>
              <p><strong>Car Type:</strong> {selectedLead.carType}</p>
              <p><strong>Booking Type:</strong> {selectedLead.bookingType}</p>
              <p><strong>Status:</strong> {getStatusLabel(selectedLead.status)}</p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <label htmlFor="status-select" style={{ marginRight: '0.5rem' }}>Update Status:</label>
                <select
                  id="status-select"
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, parseInt(e.target.value))}
                  style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #ccc', marginRight: '1rem' }}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  onClick={() => handleDeleteLead(selectedLead.id)}
                  style={{
                    background: '#ff0000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    marginRight: '0.5rem'
                  }}
                >
                  Delete Lead
                </button>
                <button
                  onClick={handleCloseModal}
                  style={{
                    background: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

LeadManagement.Layout = AdminLayout;

export default LeadManagement;