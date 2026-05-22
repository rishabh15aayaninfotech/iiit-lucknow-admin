import { useState } from 'react'
import { FiCheckSquare, FiGlobe, FiMonitor, FiPlus, FiSmartphone } from 'react-icons/fi'
import { partnerStatuses, partnerVendors } from '../../data/mockData'

function PartnerShopManagementPage() {
  const [activeStatus, setActiveStatus] = useState(partnerStatuses[0])

  return (
    <div className="partner-page">
      <div className="partner-grid">
        <aside className="panel partner-list-panel">
          <div className="panel-header mb-3">
            <h3>Vendor Partners</h3>
            <button type="button" className="mini-dark-square">
              <FiPlus />
            </button>
          </div>

          <div className="tab-pills partner-status-pills">
            {partnerStatuses.map((status) => (
              <button
                type="button"
                key={status}
                className={activeStatus === status ? 'active' : ''}
                onClick={() => setActiveStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="partner-card-list">
            {partnerVendors.map((vendor) => (
              <article className={`partner-vendor-card ${vendor.selected ? 'selected' : ''}`} key={`${vendor.name}-${vendor.state}`}>
                <div className="partner-vendor-top">
                  <div className="vendor-id-cell">
                    <div className="vendor-badge pale">{vendor.initials}</div>
                    <div>
                      <strong>{vendor.name}</strong>
                      <span>ID : {vendor.id}</span>
                    </div>
                  </div>
                  <span className={`partner-state ${vendor.state.toLowerCase()}`}>{vendor.state}</span>
                </div>

                <div className="partner-controls">
                  <div>
                    <label>PRESENTATION</label>
                    <select className="form-select partner-select" defaultValue={vendor.presentation}>
                      <option>Main</option>
                      <option>External Shop</option>
                      <option>Embeded</option>
                    </select>
                  </div>
                  <div>
                    <label>VISIBILITY</label>
                    <div className="visibility-toggle">
                      <span />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </aside>

        <section className="partner-center-column">
          <article className="panel config-header-panel">
            <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
              <h3>Configuration</h3>
              <div className="header-actions">
                <button type="button" className="outline-square-action">Discard</button>
                <button type="button" className="dark-action lg-pill">
                  <FiCheckSquare />
                  Save Changes
                </button>
              </div>
            </div>
          </article>

          <article className="panel branding-panel">
            <div className="panel-header">
              <h3>Branding Elements</h3>
              <p>Assets are auto-saved</p>
            </div>
            <div className="branding-upload-row">
              <div className="brand-logo-card">
                <div className="logo-illustration">Let's SHOP</div>
              </div>
              <div className="branding-copy">
                <strong>Shop Logo</strong>
                <span>Recommended size : 400*400px. Supports PNG, JPG</span>
                <div className="upload-dropzone">Click to upload or drag file</div>
              </div>
            </div>
            <div className="brand-banner-block">
              <div className="d-flex justify-content-between gap-3 flex-wrap">
                <div>
                  <strong>Shop Banner</strong>
                  <p className="muted-copy">Displayed on the landing page. 1200*300px</p>
                </div>
                <span className="muted-copy">Remove</span>
              </div>
              <div className="banner-preview">Online. SHOPPING</div>
            </div>
          </article>

          <article className="panel domain-panel">
            <div className="panel-header">
              <h3>Domain Mapping</h3>
              <span className="verified-chip">VERIFIED</span>
            </div>
            <label className="domain-label">CUSTOM DOMAIN URL</label>
            <div className="domain-actions">
              <input className="form-control domain-input" placeholder="https://shop.acmecorp.com" />
              <button type="button" className="outline-square-action domain-button">
                Re-verify
              </button>
            </div>
            <p className="muted-copy mt-3">CNAME record must point to partner-platform.com</p>
          </article>
        </section>

        <aside className="partner-preview-column">
          <article className="panel live-preview-panel">
            <div className="panel-header">
              <h3>Live Preview</h3>
              <div className="preview-toggle">
                <button type="button" className="active">
                  <FiMonitor />
                </button>
                <button type="button">
                  <FiSmartphone />
                </button>
              </div>
            </div>

            <div className="preview-card">
              <div className="preview-window-top">
                <span />
                <span />
                <span />
              </div>
              <div className="preview-hero">Online.</div>
              <div className="preview-shop-badge">Let's SHOP</div>
              <div className="preview-copy">
                <strong>Acme Corp Shop</strong>
                <span>Official Partner Store</span>
              </div>
              <div className="preview-skeleton-grid">
                <div />
                <div />
              </div>
              <div className="preview-lines">
                <span />
                <span />
              </div>
            </div>
          </article>

          <a href="#open-preview" className="preview-link">
            Open in New Tap
            <FiGlobe />
          </a>
        </aside>
      </div>
    </div>
  )
}

export default PartnerShopManagementPage
