import {
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiDollarSign,
  FiDownload,
  FiMoreVertical,
  FiSearch,
  FiTrendingDown,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'

const summaryCards = [
  { title: 'Total Affiliates', value: '1,240', delta: '14.4%', tone: 'green', progress: 30, icon: FiUsers },
  { title: 'Total Commissions', value: '$45,000', delta: '20%', tone: 'violet', progress: 59, icon: FiDollarSign },
  { title: 'Conversion Rate', value: '3.8%', delta: '85%', tone: 'amber', progress: 10, icon: FiTrendingUp },
  { title: 'Marketing ROI', value: '410%', delta: '5%', tone: 'red', progress: 65, icon: FiTrendingDown },
]

const affiliateRows = [
  { initials: 'TS', accent: 'gold', name: 'TechHaven Solution', meta: 'Member since 2022', status: 'Active', clicks: '12,505', sales: '450', earned: '$1,200' },
  { initials: 'LF', accent: 'rose', name: 'Luxe Fabrics Co.', meta: 'Gold Tier Partner', status: 'Active', clicks: '12,505', sales: '30', earned: '$1,20' },
  { initials: 'LF', accent: 'rose', name: 'Luxe Fabrics Co.', meta: 'Gold Tier Partner', status: 'Review', clicks: '12,505', sales: '30', earned: '$1,20' },
  { initials: 'GO', accent: 'green', name: 'GreenEarth Organics', meta: 'Elite Tier Partner', status: 'Active', clicks: '12,505', sales: '326', earned: '$900' },
]

const pendingApplications = [
  { name: 'Mark Wilson', time: '2h ago', copy: '"I run a tech blog with 50k monthly visitors focusing on software reviews..."', avatar: 'brown' },
  { name: 'Jessica Lee', time: '5h ago', copy: '"Social media influencer looking to partner for the holiday season campaign."', avatar: 'rose' },
  { name: 'Global Deals', time: '1d ago', copy: '"Coupon site aggregator. We generate high volume traffic..."', avatar: 'blue' },
]

const payouts = [
  { title: 'Monthly Settlement - Oct', meta: 'Nov 01, 2023 • To 154 Affiliates', amount: '$12,450.00' },
  { title: 'Performance Bonus Q3', meta: 'Oct 15, 2023 • To 24 Affiliates', amount: '$4,200.00' },
]

function AffiliateProgramPage() {
  return (
    <div className="affiliate-page">
      <div className="page-section-head">
        <div>
          <h2>Overview</h2>
        </div>
        <div className="header-actions">
          <button type="button" className="dark-action lg-pill">
            <FiDownload />
            Export
          </button>
          <button type="button" className="outline-square-action affiliate-ghost-action">
            Generate ROI Report
            <FiMoreVertical />
          </button>
        </div>
      </div>

      <section className="affiliate-summary-grid">
        {summaryCards.map((card) => {
          const Icon = card.icon

          return (
            <article key={card.title} className="panel affiliate-stat-card">
              <div className="affiliate-stat-head">
                <strong>{card.title}</strong>
                <span className={`affiliate-delta ${card.tone}`}>
                  {card.tone === 'red' ? <FiTrendingDown /> : <FiTrendingUp />}
                  {card.delta}
                </span>
              </div>
              <div className="affiliate-stat-body">
                <span className="affiliate-stat-icon">
                  <Icon />
                </span>
                <h3>{card.value}</h3>
              </div>
              <div className="affiliate-progress">
                <span className={card.tone} style={{ width: `${card.progress}%` }} />
              </div>
            </article>
          )
        })}
      </section>

      <section className="affiliate-main-grid">
        <div className="affiliate-left-column">
          <section className="panel affiliate-performance-panel">
            <div className="panel-header affiliate-search-header">
              <h3>Active Affiliates Performance</h3>
              <div className="search-shell slim affiliate-inline-search">
                <FiSearch className="search-icon" />
                <input type="text" placeholder="Search affiliate" />
              </div>
            </div>

            <div className="affiliate-table">
              <div className="affiliate-table-head">
                <span>Affiliate</span>
                <span>Status</span>
                <span>Clicks</span>
                <span>Sales</span>
                <span>Earned</span>
              </div>
              {affiliateRows.map((row) => (
                <div key={`${row.name}-${row.status}`} className="affiliate-table-row">
                  <div className="vendor-id-cell">
                    <div className={`vendor-badge ${row.accent}`}>{row.initials}</div>
                    <div>
                      <strong>{row.name}</strong>
                      <span>{row.meta}</span>
                    </div>
                  </div>
                  <span className={`affiliate-status-pill ${row.status.toLowerCase()}`}>{row.status}</span>
                  <span>{row.clicks}</span>
                  <span>{row.sales}</span>
                  <span>{row.earned}</span>
                </div>
              ))}
            </div>

            <div className="affiliate-table-footer">
              <span>Showing 1-5 of 1,240 results</span>
              <div className="affiliate-table-pager">
                <button type="button">
                  <FiChevronLeft />
                </button>
                <button type="button">
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </section>

          <section className="panel affiliate-payout-panel">
            <div className="panel-header">
              <h3>Recent Payouts</h3>
              <a href="#history" className="marketing-link">
                View All History
              </a>
            </div>
            <div className="affiliate-payout-list">
              {payouts.map((item) => (
                <div key={item.title} className="affiliate-payout-row">
                  <div className="affiliate-payout-left">
                    <span className="affiliate-payout-icon">
                      <FiDollarSign />
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.meta}</span>
                    </div>
                  </div>
                  <div className="affiliate-payout-right">
                    <strong>{item.amount}</strong>
                    <span>Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="affiliate-right-column">
          <section className="panel affiliate-applications-panel">
            <div className="affiliate-side-head">
              <h3>Pending Applications</h3>
              <span className="affiliate-count-chip">3</span>
            </div>
            <div className="affiliate-application-list">
              {pendingApplications.map((item) => (
                <article key={item.name} className="affiliate-application-card">
                  <div className="affiliate-application-top">
                    <div className="affiliate-application-user">
                      <span className={`affiliate-avatar ${item.avatar}`} />
                      <div>
                        <strong>{item.name}</strong>
                        <a href="#profile">View Profile</a>
                      </div>
                    </div>
                    <small>{item.time}</small>
                  </div>
                  <p>{item.copy}</p>
                  <div className="affiliate-application-actions">
                    <button type="button" className="dark-action affiliate-approve">
                      <FiCheck />
                      Approve
                    </button>
                    <button type="button" className="affiliate-reject">
                      Reject
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel affiliate-rules-panel">
            <div className="affiliate-side-head">
              <h3>Global Rules</h3>
            </div>
            <label className="affiliate-field">
              <span>Minimum Payout Threshold ($)</span>
              <div className="affiliate-input-shell">
                <span>$</span>
                <input type="text" defaultValue="50.00" />
              </div>
              <small>Affiliates must earn this amount before withdrawal.</small>
            </label>
            <label className="affiliate-field">
              <span>Cookie Duration (Days)</span>
              <div className="affiliate-input-shell with-suffix">
                <input type="text" defaultValue="30" />
                <span>Days</span>
              </div>
              <small>Tracking window for commission attribution.</small>
            </label>
            <button type="button" className="dark-action affiliate-save">
              Save Changes
            </button>
          </section>

          <section className="affiliate-network-panel">
            <h3>Grow your network</h3>
            <p>Invite top influencers to join your affiliate program directly.</p>
            <button type="button">Send Invite</button>
          </section>
        </div>
      </section>
    </div>
  )
}

export default AffiliateProgramPage
