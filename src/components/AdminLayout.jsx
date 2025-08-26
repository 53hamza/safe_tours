import Link from 'next/link';
import { useRouter } from 'next/router';

const AdminLayout = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token cookie
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // Redirect to login page
    router.push('/login');
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: '#222', color: '#fff', minHeight: '100vh', padding: '1rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>Admin Panel</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem' }}>
              <Link href="/admin" style={{ color: '#fff', textDecoration: 'none' }}>
                Dashboard
              </Link>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <Link href="/admin/lead" style={{ color: '#fff', textDecoration: 'none' }}>
                Leads Management
              </Link>
            </li>
          </ul>
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <button
            onClick={handleLogout}
            style={{
              background: '#ff0000',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Logout
          </button>
        </div>
      </aside>
      <main style={{ flexGrow: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  )
}

export default AdminLayout
