
import Link from "next/link";
import styles from "./dashboard.module.css";

const stats = [
  { title: "Total Services", value: "06", icon: "🔧", change: "Manage your services" },
  { title: "Appointments", value: "24", icon: "📅", change: "Customer bookings" },
  { title: "Customers", value: "18", icon: "👥", change: "Registered customers" },
  { title: "Enquiries", value: "12", icon: "✉️", change: "Customer messages" },
];

export default function Dashboard() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>🚘</span>
          <div>
            <h2>ProMotors</h2>
            <small>ADMIN PANEL</small>
          </div>
        </div>

        <p className={styles.menuLabel}>MAIN MENU</p>

        <nav className={styles.nav}>
          <Link href="/admin/dashboard" className={styles.active}>▦ Dashboard</Link>
          <Link href="/admin/services">🔧 Services</Link>
          <Link href="/admin/appointments">📅 Appointments</Link>
          <Link href="/admin/customers">👥 Customers</Link>
          <Link href="/admin/enquiries">✉️ Enquiries</Link>
          <Link href="/admin/articles">📰 Articles</Link>
          <Link href="/admin/newsletter">📩 Newsletter</Link>
        </nav>

        <div className={styles.sidebarBottom}>
          <Link href="/">↗ View Website</Link>
          <form action="/api/admin/logout" method="POST">
            <button type="submit">⇥ Logout</button>
          </form>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's what's happening with ProMotors.</p>
          </div>
          <div className={styles.profile}>
            <span className={styles.avatar}>A</span>
            <div><strong>Administrator</strong><small>Super Admin</small></div>
          </div>
        </header>

        <section className={styles.welcome}>
          <div>
            <span>ADMIN OVERVIEW</span>
            <h2>Welcome to ProMotors!</h2>
            <p>Manage your automotive services and customer activities from one place.</p>
            <Link href="/admin/services">Manage Services →</Link>
          </div>
          <div className={styles.carIcon}>🚗</div>
        </section>

        <section className={styles.stats}>
          {stats.map((item) => (
            <div className={styles.statCard} key={item.title}>
              <div className={styles.statTop}>
                <span>{item.title}</span>
                <span className={styles.statIcon}>{item.icon}</span>
              </div>
              <h2>{item.value}</h2>
              <p>{item.change}</p>
            </div>
          ))}
        </section>

        <section className={styles.contentGrid}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div><h3>Quick Actions</h3><p>Manage your website content</p></div>
            </div>
            <div className={styles.actions}>
              <Link href="/admin/services/create">＋ <span><strong>Add New Service</strong><small>Create a service</small></span></Link>
              <Link href="/admin/appointments">▤ <span><strong>View Appointments</strong><small>Manage bookings</small></span></Link>
              <Link href="/admin/customers">♙ <span><strong>Manage Customers</strong><small>View customer details</small></span></Link>
              <Link href="/admin/articles">＋ <span><strong>Add New Article</strong><small>Publish an article</small></span></Link>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div><h3>Website Management</h3><p>ProMotors administration</p></div>
            </div>
            <div className={styles.management}>
              <div><span>🔧</span><p><strong>Services</strong><small>Manage service details</small></p></div>
              <div><span>📅</span><p><strong>Appointments</strong><small>Track customer bookings</small></p></div>
              <div><span>✉️</span><p><strong>Enquiries</strong><small>Respond to messages</small></p></div>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>© 2026 ProMotors Admin Panel. All rights reserved.</footer>
      </main>
    </div>
  );
}
