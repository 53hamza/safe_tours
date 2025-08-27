import AdminLayout from "@/components/AdminLayout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Status options for leads
  const statusOptions = [
    { value: 0, label: "New" },
    { value: 1, label: "Contacted" },
    { value: 2, label: "Converted" },
    { value: 3, label: "Closed" },
  ];

  const getStatusLabel = (status) => {
    const statusObj = statusOptions.find((option) => option.value === status);
    return statusObj ? statusObj.label : "Unknown";
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/admin/leads");
        const data = await res.json();

        if (data.success) {
          setLeads(data.data);
        } else {
          console.error("Failed to fetch leads:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch leads:", error);
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
      const res = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
          toast.success("Status updated successfully");

        setLeads(
          leads.map((lead) =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead
          )
        );

        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }

      } else {
        console.error("Failed to update status:", data.message);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        const res = await fetch("/api/admin/leads", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: leadId }),
        });

        const data = await res.json();

        if (data.success) {
          setLeads(leads.filter((lead) => lead.id !== leadId));

          if (selectedLead && selectedLead.id === leadId) {
            handleCloseModal();
          }
          toast.success("Lead deleted successfully");
        } else {
          toast.error("Failed to delete lead");

          // console.error("Failed to delete lead:", data.message);
        }
      } catch (error) {
        console.error("Failed to delete lead:", error);
      }
    }
  };

  return (
    <div>
      <h1>Lead Management</h1>

      {loading ? (
        <p>Loading leads...</p>
      ) : (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <p>Total Leads: {leads.length}</p>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  Name
                </th>
                <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  Contact
                </th>
                <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  Journey
                </th>
                <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  Departure
                </th>
                <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  Return
                </th>
                <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  Pickup Time
                </th>
                <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  Type
                </th>
                <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  Status
                </th>
                <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    {lead.fullName}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    <div>{lead.mobile}</div>
                    <div>{lead.email}</div>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    {lead.from || "-"} → {lead.to || "-"}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    {lead.departureDate || "-"}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    {lead.returnDate || "-"}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    {lead.pickupTime || "-"}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    {lead.bookingType}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(lead.id, parseInt(e.target.value))
                      }
                      style={{
                        padding: "0.25rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td
                    className="d-flex"
                    style={{ border: "1px solid #ddd", padding: "0.5rem" }}
                  >
                    <button
                      className="mb-2"
                      onClick={() => handleViewDetails(lead)}
                      style={{
                        // background: "#0070f3",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        padding: "0.25rem 0.5rem",
                        cursor: "pointer",
                        marginRight: "0.5rem",
                      }}
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      style={{
                        // background: "#ff0000",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        padding: "0.25rem 0.5rem",
                        cursor: "pointer",
                      }}
                    >
                      🗑️
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
        <div className="modal-div">
          <div className="modal-div-2">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h2>Lead Details</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                &times;
              </button>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              {/* {selectedLead.fullName && <h3>{selectedLead.fullName}</h3>} */}

              {[
                { label: "Name", value: selectedLead.fullName },
                { label: "Email", value: selectedLead.email },
                { label: "Mobile", value: selectedLead.mobile },
                { label: "From", value: selectedLead.from },
                { label: "To", value: selectedLead.to },
                { label: "Departure Date", value: selectedLead.departureDate },
                { label: "Return Date", value: selectedLead.returnDate },
                { label: "Pickup Time", value: selectedLead.pickupTime },
                {
                  label: "Estimate Distance",
                  value: selectedLead.estimateDistance,
                },
                { label: "Car Type", value: selectedLead.carType },
                { label: "Booking Type", value: selectedLead.bookingType },
                { label: "Message", value: selectedLead.enquiry },
                {
                  label: "Status",
                  value:
                    selectedLead.status !== undefined
                      ? getStatusLabel(selectedLead.status)
                      : null,
                },
              ].map(
                (field, idx) =>
                  field.value && (
                    <p key={idx}>
                      <strong>{field.label}:</strong> {field.value}
                    </p>
                  )
              )}
            </div>

            <div>
              <label htmlFor="status-select" style={{ marginRight: "0.5rem" }}>
                Update Status:
              </label>
              <select
                id="status-select"
                value={selectedLead.status}
                onChange={(e) =>
                  handleStatusChange(selectedLead.id, parseInt(e.target.value))
                }
                style={{
                  padding: "0.25rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  marginRight: "1rem",
                }}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex gap-2 mt-3">
              <button
                className="delete-btn"
                onClick={() => handleDeleteLead(selectedLead.id)}
              >
                Delete Lead
              </button>
              <button
                onClick={handleCloseModal}
                style={{
                  background: "#0070f3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

LeadManagement.Layout = AdminLayout;

export default LeadManagement;
