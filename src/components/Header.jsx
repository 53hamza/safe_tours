import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navLinks = [
  { label: 'Home', path: '#home' },
  { label: 'About', path: '#about-us' },
  { label: 'Services', path: '#services' },
  { label: 'Our Fleets', path: '#our-cars' },
  { label: 'Reviews', path: '#reviews' },
  // { label: 'Contact', path: '/contact-us' },
]

const Header = () => {
  const router = useRouter()

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Left: Brand */}
        <Link className="navbar-brand m-0 p-0" href="/">
        <img src="/images/safe-logo-l.png" className='safe-logo'/>
        {/* <img src="/images/safe-tp-logo.jpg" wid/> */}
        {/* <Image src="/images/safe-logo.png" width={260} height={60} alt='logo'/> */}
        {/* Safe Tours */}
        </Link>

        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {navLinks.map((link, index) => (
              <li key={index} className="nav-item mx-2">
                <Link
                  className={`nav-link ${router.pathname === link.path ? 'active' : ''}`}
                  href={link.path}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: Book Now (visible only on large screens) */}
          <div className="book-now">
            <button type="submit" className="primary-button book-now-btn">Book Now</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
