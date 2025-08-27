import AdminLayout from '@/components/AdminLayout'
import { useEffect, useState } from 'react';


const AdminHome = () => {
  const [stats, setStats] = useState({ 
    totalBookings: 0, 
    recentBookings: [],
    bookingsByType: [],
    bookingsByStatus: []
  });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Add filter parameter to the API call
        const filterParam = filter && filter !== 'all' ? `?type=${filter}` : '';
        const res = await fetch(`/api/admin/stats${filterParam}`);
        const data = await res.json();
        
        if (data.success) {
          setStats(data.data);
        } else {
          console.error('Failed to fetch stats:', data.message);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [filter]); // Add filter as dependency so it refetches when filter changes

  const getStatusLabel = (status) => {
    switch (status) {
      case 0: return 'New';
      case 1: return 'Contacted';
      case 2: return 'Converted';
      case 3: return 'Closed';
      default: return 'Unknown';
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {loading ? (
        <p>Loading dashboard data...</p>
      ) : (
        <>
          {/* Stats Overview */}
          <div style={{ display: "flex", gap: "2rem", margin: "2rem 0" }}>
            <div
              style={{
                padding: "1rem",
                background: "#f0f0f0",
                borderRadius: "8px",
                flex: 1,
              }}
            >
              <h3>Total Leads</h3>
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {stats.totalBookings}
              </p>
            </div>
          </div>

          {/* Filter Controls */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="filter" style={{ marginRight: "1rem" }}>
              Filter by Type:
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="all">All Types</option>
              <option value="enquiry">enquiry</option>
              <option value="oneway">oneway</option>
              <option value="local">local</option>
              <option value="outstation">outstation</option>
            </select>
          </div>

          {/* Recent Leads Table */}
          <div>
            <h2>Recent Leads</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f5f5f5" }}>
                  <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    Name
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    Email
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    Type
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.recentBookings.map((lead) => (
                  <tr key={lead.id}>
                    <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                      {lead.fullName}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                      {lead.email}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                      {lead.bookingType}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                      {getStatusLabel(lead.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

AdminHome.Layout = AdminLayout;

export default AdminHome;
