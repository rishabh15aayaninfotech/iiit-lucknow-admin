import {
  FiAlertTriangle,
  FiAward,
  FiCheck,
  FiEye,
  FiGift,
  FiGlobe,
  FiInfo,
  FiLock,
  FiRefreshCw,
  FiShoppingBag,
  FiUserPlus,
  FiUsers,
} from 'react-icons/fi'

const topStats = [
  { title: 'Points Issued (...', value: '24,500', icon: FiRefreshCw, accent: 'blue' },
  { title: 'Active Particip...', value: '1,248', icon: FiUsers, accent: 'green' },
]

const rewardCards = [
  { title: 'Purchase Rewards', copy: 'Base earning rate for every dollar spent on the marketplace.', label: 'Points per $1.00 USD', value: '10', status: 'Active', tone: 'blue', icon: FiShoppingBag },
  { title: 'Signup Bonus', copy: 'One-time reward granted immediately upon account verification.', label: 'Points Amount', value: '500', status: 'Active', tone: 'violet', icon: FiUserPlus },
  { title: 'Birthday Bonus', copy: 'Automatic gift sent to users on their registered date of birth.', label: 'Points Amount', value: '100', status: 'Inactive', tone: 'pink', icon: FiGift },
]

function LoyaltyReferralPage() {
  return (
    <div className="loyalty-page">
      <div className="page-section-head">
        <div>
          <h2>Product Review</h2>
        </div>
        <div className="header-actions">
          <button type="button" className="dark-action lg-pill">
            Export
          </button>
          <button type="button" className="outline-square-action affiliate-ghost-action">
            + New Campaign
          </button>
        </div>
      </div>

      <section className="loyalty-top-grid">
        <div className="loyalty-mini-stats">
          {topStats.map((item) => {
            const Icon = item.icon

            return (
              <article key={item.title} className="panel loyalty-mini-card">
                <span className={`loyalty-mini-icon ${item.accent}`}>
                  <Icon />
                </span>
                <div>
                  <small>{item.title}</small>
                  <strong>{item.value}</strong>
                </div>
              </article>
            )
          })}
        </div>

        <article className="loyalty-health-banner">
          <strong>System Health: Optimal</strong>
          <p>All loyalty triggers are firing correctly. No anomalies detected in the last 24 hours.</p>
        </article>
      </section>

      <section className="loyalty-reward-grid">
        {rewardCards.map((card) => {
          const Icon = card.icon

          return (
            <article key={card.title} className={`panel loyalty-reward-card ${card.tone}`}>
              <div className="loyalty-reward-top">
                <span className={`loyalty-reward-icon ${card.tone}`}>
                  <Icon />
                </span>
                <div className={`loyalty-toggle-row ${card.status.toLowerCase()}`}>
                  <span>{card.status}</span>
                  <span className="loyalty-toggle">
                    <span />
                  </span>
                </div>
              </div>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <label>
                <span>{card.label}</span>
                <div className="loyalty-input-box">
                  <FiLock />
                  {card.value}
                </div>
              </label>
              <button type="button" className="dark-action loyalty-card-save">
                Save Changes
              </button>
            </article>
          )
        })}
      </section>

      <section className="panel loyalty-advanced-panel">
        <h3>Advance Configuration</h3>
        <div className="loyalty-advanced-grid">
          <label className="loyalty-field">
            <span>Point Expiration</span>
            <div className="loyalty-dual-input">
              <button type="button">Days</button>
              <input type="text" defaultValue="365" />
            </div>
            <small>Set to 0 for no expiration.</small>
          </label>
          <label className="loyalty-field">
            <span>Monthly Earning Cap</span>
            <input type="text" defaultValue="" placeholder="e.g. 50000" />
            <small>Limit points earned per user per month to prevent abuse.</small>
          </label>
        </div>
        <div className="loyalty-advanced-actions">
          <button type="button" className="outline-square-action loyalty-reset">
            Reset Defaults
          </button>
          <button type="button" className="dark-action loyalty-save-advanced">
            Save Advanced Settings
          </button>
        </div>
      </section>

      <section className="panel loyalty-program-panel">
        <div className="loyalty-program-copy">
          <h3>Referral Program</h3>
          <p>
            Configure how your referral program behaves. Set reward amounts, define qualifying rules and
            manage program activation status.
          </p>
        </div>

        <div className="loyalty-program-grid">
          <div className="loyalty-program-left">
            <span className="loyalty-eyebrow">REWARD CONFIGURATION</span>

            <article className="loyalty-config-card">
              <div className="loyalty-config-head">
                <div>
                  <strong>Referrer Reward</strong>
                  <span>What the person sending the invite receives.</span>
                </div>
                <span className="loyalty-config-badge blue">
                  <FiAward />
                </span>
              </div>
              <div className="loyalty-config-form two-col">
                <label>
                  <span>Reward Type</span>
                  <div className="loyalty-input-box">Store Credit</div>
                </label>
                <label>
                  <span>Amount</span>
                  <div className="loyalty-input-box">$ 25.00</div>
                </label>
              </div>
              <div className="loyalty-slider-block">
                <span>Fulfillment Delay</span>
                <div className="loyalty-slider">
                  <span />
                  <b>7 Days</b>
                </div>
                <small>Wait period before reward is issued to prevent fraud.</small>
              </div>
            </article>

            <article className="loyalty-config-card">
              <div className="loyalty-config-head">
                <div>
                  <strong>Referee Reward</strong>
                  <span>What the new customer receives on signup.</span>
                </div>
                <span className="loyalty-config-badge green">
                  <FiCheck />
                </span>
              </div>
              <div className="loyalty-config-form two-col">
                <label>
                  <span>Reward Type</span>
                  <div className="loyalty-input-box">Percentage Discount</div>
                </label>
                <label>
                  <span>Value</span>
                  <div className="loyalty-input-box">15 % OFF</div>
                </label>
              </div>
              <label className="loyalty-checkbox-row">
                <input type="checkbox" defaultChecked />
                <span>Apply automatically at checkout if link is used</span>
              </label>
            </article>

            <article className="loyalty-preview-card">
              <div className="loyalty-preview-head">
                <span className="loyalty-preview-icon">
                  <FiEye />
                </span>
                <div>
                  <strong>Live Preview</strong>
                  <span>This is how the offer will appear to new users.</span>
                </div>
              </div>
              <div className="loyalty-preview-phone">
                <div className="loyalty-preview-user">
                  <span>JD</span>
                  <strong>John Doe invited you!</strong>
                </div>
                <p>Sign up now and get <b>15% OFF</b> your first order.</p>
                <button type="button">Claim 15% Discount</button>
              </div>
            </article>
          </div>

          <div className="loyalty-program-right">
            <span className="loyalty-eyebrow">RULES &amp; STATUS</span>

            <article className="loyalty-side-card muted">
              <h4>Approval Conditions</h4>
              <label className="loyalty-field">
                <span>Minimum Order Value <a href="#help">What is this?</a></span>
                <div className="loyalty-input-box">$ 5.00 USD</div>
                <small>Order total must exceed this amount for reward to trigger.</small>
              </label>
              <div className="loyalty-config-form two-col">
                <label className="loyalty-field">
                  <span>Reward Expiration</span>
                  <div className="loyalty-input-box">90</div>
                </label>
                <label className="loyalty-field">
                  <span>&nbsp;</span>
                  <div className="loyalty-input-box">Days</div>
                </label>
              </div>
              <div className="loyalty-radio-group">
                <span>Customer Eligibility</span>
                <label><input type="radio" name="eligibility" defaultChecked /> All Customers</label>
                <label><input type="radio" name="eligibility" /> Returning Customers Only (1+ Orders)</label>
              </div>
            </article>

            <article className="loyalty-side-card muted">
              <h4>Program Status</h4>
              <div className="loyalty-status-row">
                <div>
                  <strong>Active Program</strong>
                  <span>Referrals are processed.</span>
                </div>
                <span className="loyalty-toggle"><span /></span>
              </div>
              <div className="loyalty-status-row">
                <div>
                  <strong>Auto-Approve Rewards</strong>
                  <span>Skip manual review queue.</span>
                </div>
                <span className="loyalty-toggle"><span /></span>
              </div>
              <div className="loyalty-status-row">
                <div>
                  <strong>Email Notifications</strong>
                  <span>Alert users on success.</span>
                </div>
                <span className="loyalty-toggle"><span /></span>
              </div>
            </article>

            <article className="loyalty-side-card fraud">
              <div className="loyalty-fraud-head">
                <FiAlertTriangle />
                <h4>Fraud Detection</h4>
              </div>
              <p>Self-referrals are automatically blocked. High-risk transactions will be flagged for manual review.</p>
              <a href="#rules">Configure Rules -&gt;</a>
            </article>
          </div>
        </div>
      </section>

      <section className="loyalty-bottom-grid">
        <article className="panel loyalty-map-panel">
          <div className="panel-header">
            <h3>Abuse Origins (IP)</h3>
            <a href="#map" className="marketing-link">
              View Full Map
            </a>
          </div>
          <div className="loyalty-map-art" />
          <div className="loyalty-map-legend">
            <span><i className="red" /> Vietnam <b>421 cases</b></span>
            <span><i className="amber" /> Indonesia <b>189 cases</b></span>
            <span><i className="blue" /> Russia <b>86 cases</b></span>
          </div>
        </article>

        <article className="panel loyalty-investigation-panel">
          <div className="loyalty-investigation-head">
            <div>
              <h3>Active Investigation</h3>
              <span>ID: #REF-2023-8892</span>
            </div>
            <FiInfo />
          </div>
          <div className="loyalty-investigation-card">
            <div className="loyalty-investigation-pattern">
              <span className="loyalty-config-badge green">
                <FiGlobe />
              </span>
              <div>
                <strong>PATTERN</strong>
                <span>Self-Referral Ring</span>
              </div>
            </div>
            <div className="loyalty-investigation-metrics">
              <span>Total Impact: <b>$1,240.00</b></span>
              <span>Linked Accounts: <b>14</b></span>
              <span>First Detection: <b>Oct 24, 09:41 AM</b></span>
            </div>
            <button type="button" className="dark-action loyalty-investigation-button">
              View Full Investigation
            </button>
          </div>
        </article>
      </section>
    </div>
  )
}

export default LoyaltyReferralPage
