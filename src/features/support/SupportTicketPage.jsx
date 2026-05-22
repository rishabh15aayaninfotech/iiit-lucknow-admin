import { FiArrowDown, FiArrowLeft, FiArrowRight, FiChevronDown, FiMinus, FiSlash } from 'react-icons/fi'

const filters = ['All Status', 'Priority : All', 'Requester : All']

const tickets = [
  {
    id: '#TKT-1234',
    subject: 'Payment issue\non order #1235',
    requester: 'Requester Name/Store',
    tag: 'Vendor',
    tagTone: 'vendor',
    status: 'Open',
    statusTone: 'open',
    priority: 'High',
    priorityTone: 'high',
    agent: 'brown',
    updated: '10 min ago',
  },
  {
    id: '#TKT-1234',
    subject: 'Can’t login dashboard',
    requester: 'Requester Name',
    tag: 'User',
    tagTone: 'user',
    status: 'Pending',
    statusTone: 'pending',
    priority: 'Low',
    priorityTone: 'low',
    agent: 'gray',
    updated: '2 min ago',
  },
  {
    id: '#TKT-1234',
    subject: 'Can’t login dashboard',
    requester: 'Requester Name',
    tag: 'User',
    tagTone: 'user',
    status: 'Pending',
    statusTone: 'pending',
    priority: 'Low',
    priorityTone: 'low',
    agent: 'gray',
    updated: '2 min ago',
  },
  {
    id: '#TKT-1234',
    subject: 'Refund request\nfor damaged item',
    requester: 'Requester Name',
    tag: 'Vendor',
    tagTone: 'vendor',
    status: 'Close',
    statusTone: 'close',
    priority: 'Medium',
    priorityTone: 'medium',
    agent: 'sand',
    updated: '8 min ago',
  },
  {
    id: '#TKT-1234',
    subject: 'Refund request\nfor damaged item',
    requester: 'Requester Name',
    tag: 'Vendor',
    tagTone: 'vendor',
    status: 'Close',
    statusTone: 'close',
    priority: 'Medium',
    priorityTone: 'medium',
    agent: 'sand',
    updated: '8 min ago',
  },
  {
    id: '#TKT-1234',
    subject: 'Account Verification\npending',
    requester: 'Requester Name',
    tag: 'User',
    tagTone: 'user',
    status: 'Open',
    statusTone: 'open',
    priority: 'High',
    priorityTone: 'high',
    agent: 'rose',
    updated: '12 min ago',
  },
  {
    id: '#TKT-1234',
    subject: 'Account Verification\npending',
    requester: 'Requester Name',
    tag: 'User',
    tagTone: 'user',
    status: 'Open',
    statusTone: 'open',
    priority: 'High',
    priorityTone: 'high',
    agent: 'rose',
    updated: '12 min ago',
  },
  {
    id: '#TKT-1234',
    subject: 'order is not delivered',
    requester: 'Requester Name',
    tag: 'User',
    tagTone: 'user',
    status: 'Open',
    statusTone: 'open',
    priority: 'Medium',
    priorityTone: 'medium',
    agent: 'dark',
    updated: '5 min ago',
  },
  {
    id: '#TKT-1234',
    subject: 'order is not delivered',
    requester: 'Requester Name',
    tag: 'User',
    tagTone: 'user',
    status: 'Open',
    statusTone: 'open',
    priority: 'Medium',
    priorityTone: 'medium',
    agent: 'dark',
    updated: '5 min ago',
  },
]

function SupportTicketPage() {
  return (
    <div className="support-page">
      <section className="panel support-table-panel">
        <div className="support-toolbar">
          <div className="support-filter-group">
            {filters.map((filter) => (
              <button type="button" key={filter} className="support-filter-chip">
                <span>{filter}</span>
                <FiChevronDown />
              </button>
            ))}
            <button type="button" className="support-clear-button">
              Clear Filter
            </button>
          </div>
          <button type="button" className="dark-action support-updated-button">
            Last updated : just now
          </button>
        </div>

        <div className="support-ticket-table">
          <div className="support-ticket-head">
            <span>Ticket Id</span>
            <span>Subject</span>
            <span>Requester</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Agent</span>
            <span>Last Update</span>
            <span>Actions</span>
          </div>

          {tickets.map((ticket, index) => (
            <div key={`${ticket.id}-${index}`} className="support-ticket-row">
              <span>{ticket.id}</span>
              <strong>{ticket.subject}</strong>
              <div className="support-requester">
                <span>{ticket.requester}</span>
                <small className={ticket.tagTone}>{ticket.tag}</small>
              </div>
              <span className={`support-status-pill ${ticket.statusTone}`}>• {ticket.status}</span>
              <span className={`support-priority ${ticket.priorityTone}`}>
                {ticket.priorityTone === 'high' ? <FiSlash /> : null}
                {ticket.priorityTone === 'low' ? <FiArrowDown /> : null}
                {ticket.priorityTone === 'medium' ? <FiMinus /> : null}
                {ticket.priority}
              </span>
              <div className="support-agent">
                <span className={`support-agent-avatar ${ticket.agent}`} />
                <span>Agent N.</span>
              </div>
              <span className="support-updated">{ticket.updated}</span>
              <a href="#open" className="support-open-link">
                Open
              </a>
            </div>
          ))}
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

export default SupportTicketPage
