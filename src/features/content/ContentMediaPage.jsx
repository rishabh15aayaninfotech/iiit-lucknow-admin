import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiFilter,
  FiImage,
  FiMonitor,
  FiMoreHorizontal,
  FiPlay,
} from 'react-icons/fi'

const placements = [
  { title: 'Main Slider', status: 'LIVE', art: 'content-banner-dark' },
  { title: 'Promotional Slider', status: 'SCHEDULE', art: 'content-banner-blue' },
  { title: 'Influencer Picks', status: 'DRAFT', art: 'content-banner-red' },
]

const libraryItems = [
  { type: 'image', art: 'library-bag' },
  { type: 'video', art: 'library-shoe' },
  { type: 'image', art: 'library-headphone' },
  { type: 'image', art: 'library-sneaker' },
  { type: 'image', art: 'library-car' },
  { type: 'video', art: 'library-camera' },
]

const moderationItems = [
  {
    art: 'ugc-shirt',
    handle: '@aditya-kumar',
    orderId: 'ORD-1234-5678',
  },
  {
    art: 'ugc-glasses',
    handle: '@aditya-kumar',
    orderId: 'ORD-1234-5678',
  },
]

function ContentMediaPage() {
  return (
    <div className="content-media-page">
      <section className="content-hero">
        <div>
          <h2>Homepage &amp; Banners</h2>
          <p>Drag and drop components to reorder your store layout.</p>
        </div>
        <div className="content-hero-actions">
          <button type="button" className="icon-square-button">
            <FiCopy />
          </button>
          <button type="button" className="icon-square-button">
            <FiMonitor />
          </button>
        </div>
      </section>

      <section className="content-placement-grid">
        {placements.map((item) => (
          <article key={item.title} className="content-placement-card">
            <div className={`content-placement-art ${item.art}`}>
              <span className={`content-placement-status ${item.status.toLowerCase()}`}>{item.status}</span>
            </div>
            <div className="content-placement-copy">
              <strong>{item.title}</strong>
              <div className="content-placement-dates">
                <span>Start Date</span>
                <span>End Date</span>
              </div>
              <div className="content-placement-dates">
                <small>
                  <FiCalendar />
                  Jan 25, 2026
                </small>
                <small>
                  <FiCalendar />
                  Jan 25, 2026
                </small>
              </div>
            </div>
          </article>
        ))}

        <button type="button" className="content-placement-add">
          <span>+</span>
          <strong>Add New</strong>
          <small>Placement</small>
        </button>
      </section>

      <section className="panel content-library-panel">
        <div className="panel-header marketing-tight-header">
          <div className="marketing-panel-title">
            <FiImage />
            <h3>Media Library</h3>
          </div>
          <div className="content-library-toolbar">
            <button type="button" className="icon-square-button">
              <FiFilter />
            </button>
            <div className="tab-pills content-library-tabs">
              <button type="button" className="active">
                All
              </button>
              <button type="button">Images</button>
              <button type="button">Videos</button>
            </div>
          </div>
        </div>

        <div className="content-library-grid">
          {libraryItems.map((item, index) => (
            <div key={`${item.art}-${index}`} className={`content-library-card ${item.art}`}>
              {item.type === 'video' ? (
                <span className="content-library-type">
                  <FiPlay />
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="panel content-ugc-panel">
        <div className="content-ugc-header">
          <div>
            <h3>UGC Moderation</h3>
            <p>Approve or moderate user reviews and photo submissions.</p>
          </div>
          <div className="content-ugc-summary">
            <span className="pending">
              <FiClock />
              12 Pending
            </span>
            <span className="approved">
              <FiCheckCircle />
              1240 Total Approved
            </span>
          </div>
        </div>

        <div className="content-ugc-list">
          {moderationItems.map((item, index) => (
            <article key={`${item.art}-${index}`} className="content-ugc-card">
              <div className={`content-ugc-art ${item.art}`} />
              <div className="content-ugc-copy">
                <div className="content-ugc-meta">
                  <span className="content-stars">★★★★★</span>
                  <span>{item.handle}</span>
                  <span className="content-order-chip">{item.orderId}</span>
                </div>
                <strong>Absolutely love the fabric!</strong>
                <p>
                  The color is exactly as shown in the hero banner. Fast shipping and the fit is
                  perfect for summer. Highly recommended this collection to everyone!
                </p>
              </div>
              <div className="content-ugc-actions">
                <button type="button" className="content-ugc-approve">
                  <FiCheckCircle />
                  Approved
                </button>
                <button type="button" className="content-ugc-edit">
                  <FiMoreHorizontal />
                  Edit
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ContentMediaPage
