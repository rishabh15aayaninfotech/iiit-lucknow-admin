import { useState } from 'react'
import {
  FiArrowLeft,
  FiArrowRight,
  FiFilter,
  FiMoreHorizontal,
  FiPlusCircle,
  FiSearch,
  FiSliders,
} from 'react-icons/fi'
import { orderRows, orderStats, orderTabs } from '../../data/mockData'

function OrderManagementPage() {
  const [activeTab, setActiveTab] = useState(orderTabs[0])

  return (
    <div className="orders-page">
      <div className="page-section-head">
        <div>
          <h2>Order List</h2>
        </div>
        <div className="header-actions">
          <button type="button" className="dark-action lg-pill">
            <FiPlusCircle />
            Add Order
          </button>
          <button type="button" className="outline-square-action">
            More Action
            <FiMoreHorizontal />
          </button>
        </div>
      </div>

      <section className="stats-grid order-stats-grid">
        {orderStats.map((card) => (
          <article className="panel stat-card compact" key={card.title}>
            <div className="panel-header">
              <div>
                <h3>{card.title}</h3>
              </div>
              <button type="button" className="icon-ghost">
                <FiMoreHorizontal />
              </button>
            </div>
            <div className="stat-value-wrap mt-2">
              <strong>{card.value}</strong>
              <em className={card.negative ? 'text-danger' : ''}>{card.change}</em>
            </div>
            <p className="card-footnote">Last 7 days</p>
          </article>
        ))}
      </section>

      <section className="panel orders-table-panel">
        <div className="orders-toolbar">
          <div className="tab-pills">
            {orderTabs.map((tab) => (
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
            <div className="search-shell slim">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search order report" />
            </div>
            <button type="button" className="icon-square-button">
              <FiFilter />
            </button>
            <button type="button" className="icon-square-button">
              <FiSliders />
            </button>
            <button type="button" className="icon-square-button">
              <FiMoreHorizontal />
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table order-table align-middle mb-0">
            <thead>
              <tr>
                <th>No.</th>
                <th>Order Id</th>
                <th>Product</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderRows.map((item) => {
                const Icon = item.icon

                return (
                  <tr key={item.orderId}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <input type="checkbox" className="form-check-input shadow-none m-0" />
                        <span>{item.no}</span>
                      </div>
                    </td>
                    <td>{item.orderId}</td>
                    <td>
                      <div className="order-product-cell">
                        <div className="product-thumb square">
                          <Icon />
                        </div>
                        <span>{item.product}</span>
                      </div>
                    </td>
                    <td>{item.date}</td>
                    <td>{item.price}</td>
                    <td>
                      <span className={`payment-status ${item.payment === 'Paid' ? 'paid' : 'unpaid'}`}>
                        {item.payment}
                      </span>
                    </td>
                    <td>
                      <span className={`shipment-status ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="pagination-wrap">
          <button type="button" className="pager-button">
            <FiArrowLeft />
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
            <FiArrowRight />
          </button>
        </div>
      </section>
    </div>
  )
}

export default OrderManagementPage
