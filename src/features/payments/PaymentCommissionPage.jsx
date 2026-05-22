import { useState } from 'react'
import {
  FiEdit3,
  FiFilter,
  FiMoreVertical,
  FiZap,
} from 'react-icons/fi'
import {
  commissionSlabs,
  disbursements,
  paymentRows,
  paymentStats,
  paymentTabs,
} from '../../data/mockData'

function PaymentCommissionPage() {
  const [activeTab, setActiveTab] = useState(paymentTabs[0])

  return (
    <div className="payments-page">
      <section className="stats-grid">
        {paymentStats.map((card) => (
          <article className="panel stat-card compact" key={card.title}>
            <div className="panel-header">
              <div>
                <h3>{card.title}</h3>
                <p>{card.subtitle}</p>
              </div>
              <button type="button" className="icon-ghost">
                <FiMoreVertical />
              </button>
            </div>
            <div className="stat-value-wrap mt-2">
              <strong className="large-money">{card.value}</strong>
            </div>
            <small className="stat-previous">{card.previous}</small>
          </article>
        ))}
      </section>

      <section className="panel payment-table-panel">
        <div className="orders-toolbar">
          <div className="tab-pills">
            {paymentTabs.map((tab) => (
              <button
                type="button"
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="orders-toolbar-right">
            <button type="button" className="icon-square-button">
              <FiFilter />
            </button>
            <button type="button" className="icon-square-button">
              <FiEdit3 />
            </button>
            <button type="button" className="dark-action lg-pill">
              <FiZap />
              Trigger Bulk Payout
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table order-table align-middle mb-0">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Vendor / Store</th>
                <th>Gateway</th>
                <th>Amount</th>
                <th>Commission</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentRows.map((row) => (
                <tr key={row.orderId}>
                  <td>{row.orderId}</td>
                  <td>{row.vendor}</td>
                  <td>{row.gateway}</td>
                  <td>{row.amount}</td>
                  <td>{row.commission}</td>
                  <td>
                    <span className={`shipment-status ${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <a href="#details" className="table-text-link">
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-wrap mt-4">
          <button type="button" className="pager-button">
            Previous
          </button>
          <div className="page-numbers">
            {['1', '2', '3', '4', '5', '.....', '24'].map((item, index) => (
              <button type="button" key={`${item}-${index}`} className={index === 0 ? 'active' : ''}>
                {item}
              </button>
            ))}
          </div>
          <button type="button" className="pager-button">
            Next
          </button>
        </div>
      </section>

      <section className="payment-bottom-grid">
        <article className="panel">
          <div className="panel-header">
            <h3>Vendor Disbursements</h3>
            <button type="button" className="dark-action">
              <FiZap />
              Trigger All Payouts
            </button>
          </div>

          <div className="disbursement-list">
            {disbursements.map((item) => (
              <div className="disbursement-card" key={item.name}>
                <div className="vendor-id-cell">
                  <div className="vendor-badge gray">{item.initials}</div>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.pending}</span>
                  </div>
                </div>
                <div className="text-end">
                  <strong>{item.amount}</strong>
                  <a href="#breakdown" className="table-text-link d-block mt-1">
                    View Breakdown
                  </a>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h3>Commission Slab Setting</h3>
            <button type="button" className="icon-ghost">
              <FiEdit3 />
            </button>
          </div>

          <div className="commission-list">
            {commissionSlabs.map((item) => (
              <div className="commission-card" key={item.tier}>
                <div className="vendor-id-cell">
                  <div className={`vendor-badge ${item.accent}`}>{item.initials}</div>
                  <div>
                    <strong>{item.tier}</strong>
                    <span>{item.volume}</span>
                  </div>
                </div>
                <div className="text-end">
                  <strong>{item.rate}</strong>
                  <span className="table-text-link d-block mt-1">{item.badge}</span>
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="rule-button">
            Add New Category Rule
          </button>
        </article>
      </section>
    </div>
  )
}

export default PaymentCommissionPage
