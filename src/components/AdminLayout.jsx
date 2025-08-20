const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar could go here */}
      <aside style={{ width: '200px', background: '#222', color: '#fff', minHeight: '100vh', padding: '1rem' }}>
        <p>Admin Menu</p>
      </aside>
      <main style={{ flexGrow: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  )
}

export default AdminLayout
