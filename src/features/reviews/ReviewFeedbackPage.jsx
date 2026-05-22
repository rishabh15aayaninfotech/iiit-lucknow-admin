import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiEdit3,
  FiDownload,
  FiFilter,
  FiFlag,
  FiMoreVertical,
  FiSearch,
  FiStar,
  FiTrash2,
  FiVolume2,
} from 'react-icons/fi'

const reviewStats = [
  {
    title: 'Pending Review',
    value: '12',
    note: 'Need to attention',
    tone: 'warning',
    icon: FiSearch,
  },
  {
    title: 'Flagged Items',
    value: '3',
    note: 'Critical',
    tone: 'danger',
    icon: FiFlag,
  },
  {
    title: 'Peblished This Week',
    value: '1240',
    note: '+12% form last week',
    tone: 'success',
    icon: FiCheckCircle,
  },
]

const reviewTabs = ['All Review (240)', 'Pending', 'Published', 'Flagged']

const reviews = [
  {
    product: 'Wireless Bluetooth\nHeadphones',
    icon: FiVolume2,
    reviewer: 'Mike Thompson',
    content: 'Comfortable chair\noverall, but the...',
    status: 'Pending',
    tone: 'pending',
  },
  {
    product: "Men's T-Shirt",
    icon: FiStar,
    reviewer: 'Mike Thompson',
    content: 'DO NOT BUY!!!\nSCAM!!! This broke...',
    status: 'Flagged',
    tone: 'flagged',
  },
  {
    product: "Men's Leather\nWallet",
    icon: FiStar,
    reviewer: 'Mike Thompson',
    content: 'Amazing sound quality\nfor the price. The...',
    status: 'Published',
    tone: 'published',
  },
  {
    product: 'Memory Foam\nPillow',
    icon: FiStar,
    reviewer: 'Mike Thompson',
    content: 'Amazing sound quality\nfor the price. The...',
    status: 'Published',
    tone: 'published',
  },
  {
    product: 'Adjustable\nDumbbells',
    icon: FiStar,
    reviewer: 'Mike Thompson',
    content: 'Amazing sound quality\nfor the price. The...',
    status: 'Published',
    tone: 'published',
  },
  {
    product: 'Coffee Maker',
    icon: FiStar,
    reviewer: 'Mike Thompson',
    content: 'Amazing sound quality\nfor the price. The...',
    status: 'Pending',
    tone: 'pending',
  },
  {
    product: 'Casual Baseball\nCap',
    icon: FiStar,
    reviewer: 'Mike Thompson',
    content: '49.99',
    status: 'Flagged',
    tone: 'flagged',
  },
]

function ReviewFeedbackPage() {
  return (
    <div className="review-page">
      <div className="page-section-head">
        <div>
          <h2>Product Review</h2>
        </div>
        <button type="button" className="dark-action lg-pill review-export-button">
          <FiDownload />
          Export
        </button>
      </div>

      <section className="stats-grid review-stats-grid">
        {reviewStats.map((card) => {
          const Icon = card.icon

          return (
            <article key={card.title} className="panel review-stat-card">
              <div className="review-stat-copy">
                <strong>{card.title}</strong>
                <span>{card.value}</span>
                <small className={card.tone}>{card.note}</small>
              </div>
              <span className={`review-stat-icon ${card.tone}`}>
                <Icon />
              </span>
            </article>
          )
        })}
      </section>

      <section className="panel review-table-panel">
        <div className="orders-toolbar review-toolbar">
          <div className="tab-pills review-tab-pills">
            {reviewTabs.map((tab, index) => (
              <button type="button" key={tab} className={index === 0 ? 'active' : ''}>
                {tab}
              </button>
            ))}
          </div>
          <div className="orders-toolbar-right">
            <button type="button" className="icon-square-button">
              <FiFilter />
            </button>
            <button type="button" className="icon-square-button">
              <FiMoreVertical />
            </button>
          </div>
        </div>

        <div className="review-table">
          <div className="review-table-head">
            <span className="checkbox-cell">
              <input type="checkbox" className="form-check-input shadow-none m-0" />
            </span>
            <span>Product</span>
            <span>Reviewer</span>
            <span>Content</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {reviews.map((item, index) => {
            const Icon = item.icon

            return (
              <div key={`${item.product}-${index}`} className="review-table-row">
                <span className="checkbox-cell">
                  <input type="checkbox" className="form-check-input shadow-none m-0" />
                </span>
                <div className="review-product-cell">
                  <span className="review-product-thumb">
                    <Icon />
                  </span>
                  <strong>{item.product}</strong>
                </div>
                <div className="reviewer-cell">
                  <strong>{item.reviewer}</strong>
                  <span>Jan 15, 2026</span>
                  <small>★★★★☆</small>
                </div>
                <span className="review-content-copy">{item.content}</span>
                <span className={`review-status-pill ${item.tone}`}>{item.status}</span>
                <div className="review-actions">
                  <button type="button" className="approve">
                    <FiCheckCircle />
                  </button>
                  <button type="button" className="edit">
                    <FiEdit3 />
                  </button>
                  <button type="button" className="delete">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="pagination-wrap mt-4">
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

export default ReviewFeedbackPage
