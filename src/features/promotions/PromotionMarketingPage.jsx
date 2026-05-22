import {
  FiArrowUpRight,
  FiBell,
  FiCheckCircle,
  FiChevronDown,
  FiEdit3,
  FiEye,
  FiSend,
  FiTag,
  FiTrash2,
  FiUpload,
  FiZap,
} from 'react-icons/fi'

const summaryCards = [
  {
    title: 'CONVERSION RATE',
    value: '48%',
    badge: '+12%',
    badgeTone: 'success',
    footer: 60,
    accent: 'green',
  },
  {
    title: 'TOTAL PROMO SPEND',
    value: '$12,450',
    badge: 'Budget 50k',
    badgeTone: 'violet',
    footer: 27,
    accent: 'violet',
  },
  {
    title: 'REVENUE LIFT',
    value: '$84,120',
    caption: 'Real Time',
    footer: 60,
    accent: 'dark',
  },
]

const campaignRequests = [
  {
    initials: 'TS',
    accent: 'gold',
    vendor: 'TechHaven Solution',
    meta: 'Member since 2022',
    campaign: 'Seasonal Tech',
    discount: '25% OFF',
    duration: 'Jan 15 - feb 15',
  },
  {
    initials: 'LF',
    accent: 'rose',
    vendor: 'Luxe Fabrics Co.',
    meta: 'Gold Tier Partner',
    campaign: 'Fall Collection',
    discount: '15% OFF',
    duration: 'Jan 15 - feb 15',
  },
  {
    initials: 'GO',
    accent: 'green',
    vendor: 'GreenEarth Organics',
    meta: 'Elite Tier Partner.',
    campaign: 'Flash Sale',
    discount: '35% OFF',
    duration: 'Jan 15 - feb 15',
  },
]

const bannerTabs = ['Home Screen', 'Categories', 'Festive Offers']

const banners = [
  {
    title: 'Summer Sale 2026',
    meta: 'Duration - Jan 15 - 25',
    badge: 'HERO 1',
    badgeTone: 'indigo',
    state: 'LIVE',
    bg: 'promo-banner-a',
  },
  {
    title: 'Summer Sale 2026',
    meta: 'Duration - Jan 15 - 25',
    badge: 'SUB-GRID 2',
    badgeTone: 'slate',
    state: 'SCHEDULE',
    bg: 'promo-banner-b',
  },
]

const activities = [
  {
    title: 'Weekend Promo Push Sent',
    meta: '2 hour ago | Reach : 45.5k',
    tone: 'success',
    icon: FiCheckCircle,
  },
  {
    title: 'Schedule : Black Friday Email',
    meta: 'Drafted by Name | Jan 25',
    tone: 'muted',
    icon: FiBell,
  },
]

function PromotionMarketingPage() {
  return (
    <div className="marketing-page">
      <section className="stats-grid marketing-stats-grid">
        {summaryCards.map((card) => (
          <article key={card.title} className="panel marketing-stat-card">
            <div className="marketing-stat-top">
              <span className="marketing-stat-label">{card.title}</span>
              {card.badge ? (
                <span className={`marketing-inline-badge ${card.badgeTone}`}>
                  {card.badgeTone === 'success' ? <FiArrowUpRight /> : null}
                  {card.badge}
                </span>
              ) : (
                <span className="marketing-stat-caption">{card.caption}</span>
              )}
            </div>
            <strong className="marketing-stat-value">{card.value}</strong>
            <div className="marketing-meter">
              <span className={card.accent} style={{ width: `${card.footer}%` }} />
            </div>
          </article>
        ))}
      </section>

      <section className="marketing-main-grid">
        <div className="marketing-left-column">
          <div className="marketing-cta-row">
            <button type="button" className="dark-action marketing-cta primary">
              <FiTag />
              Create Coupon
            </button>
            <button type="button" className="outline-square-action marketing-cta">
              <FiZap />
              Schedule Flash Sale
            </button>
            <button type="button" className="outline-square-action marketing-cta">
              <FiBell />
              New App-Only Deal
            </button>
          </div>

          <section className="panel marketing-request-panel">
            <div className="panel-header marketing-tight-header">
              <div className="marketing-panel-title">
                <FiTag />
                <h3>Vendor Campaign Requests</h3>
              </div>
              <a href="#requests" className="marketing-link">
                View All Request
              </a>
            </div>

            <div className="marketing-request-table">
              <div className="marketing-request-head">
                <span>Vendor</span>
                <span>Campaign Time</span>
                <span>Discount</span>
                <span>Duration</span>
                <span>Action</span>
              </div>
              {campaignRequests.map((item) => (
                <div key={item.vendor} className="marketing-request-row">
                  <div className="vendor-id-cell">
                    <div className={`vendor-badge ${item.accent}`}>{item.initials}</div>
                    <div>
                      <strong>{item.vendor}</strong>
                      <span>{item.meta}</span>
                    </div>
                  </div>
                  <span>{item.campaign}</span>
                  <span className="marketing-discount-chip">{item.discount}</span>
                  <span>{item.duration}</span>
                  <div className="marketing-row-actions">
                    <button type="button" className="marketing-icon-button success">
                      <FiCheckCircle />
                    </button>
                    <button type="button" className="marketing-icon-button danger">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel marketing-banner-panel">
            <div className="panel-header marketing-tight-header">
              <h3>Manage Banners</h3>
              <button type="button" className="marketing-upload-link">
                <FiUpload />
                Upload Now
              </button>
            </div>

            <div className="tab-pills marketing-tab-pills">
              {bannerTabs.map((tab, index) => (
                <button type="button" key={tab} className={index === 0 ? 'active' : ''}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="marketing-banner-grid">
              {banners.map((item) => (
                <article key={item.bg} className="marketing-banner-card">
                  <div className={`marketing-banner-art ${item.bg}`}>
                    <span className={`marketing-banner-chip ${item.badgeTone}`}>{item.badge}</span>
                    <span className="marketing-banner-state">{item.state}</span>
                  </div>
                  <div className="marketing-banner-copy">
                    <strong>{item.title}</strong>
                    <span>{item.meta}</span>
                  </div>
                  <div className="marketing-banner-footer">
                    <div className="marketing-face-stack">
                      <span />
                      <span />
                      <span>+2k</span>
                    </div>
                    <div className="marketing-banner-actions">
                      <FiEdit3 />
                      <FiEye />
                      <FiTrash2 />
                    </div>
                  </div>
                </article>
              ))}

              <button type="button" className="marketing-add-placement">
                <span>+</span>
                <strong>Add New</strong>
                <small>Placement</small>
              </button>
            </div>
          </section>
        </div>

        <aside className="panel marketing-suite-panel">
          <h3>Communication Suite</h3>

          <div className="marketing-channel-tabs">
            <button type="button" className="active">
              Push
            </button>
            <button type="button">SMS</button>
            <button type="button">EMAIL</button>
          </div>

          <label className="marketing-field">
            <span>NOTIFICATION TITLE</span>
            <input type="text" defaultValue="" placeholder="e.g. 24-Hour Flash Sale is Live!" />
          </label>

          <label className="marketing-field">
            <span>
              MESSAGE BODY
              <small>82/160</small>
            </span>
            <textarea defaultValue="Get up to 50% off on electronic. Shop now before It’s gone!" />
          </label>

          <label className="marketing-field">
            <span>TARGET AUDIENCE</span>
            <button type="button" className="marketing-select">
              <span>All Active Users</span>
              <FiChevronDown />
            </button>
          </label>

          <button type="button" className="marketing-preview-button">
            <FiEye />
            Preview Notification
          </button>
          <button type="button" className="dark-action marketing-schedule-button">
            <FiSend />
            Schedule Campaign
          </button>

          <div className="marketing-activity">
            <h4>RECENT ACTIVITY</h4>
            {activities.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.title} className="marketing-activity-item">
                  <span className={`marketing-activity-icon ${item.tone}`}>
                    <Icon />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.meta}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </aside>
      </section>
    </div>
  )
}

export default PromotionMarketingPage
