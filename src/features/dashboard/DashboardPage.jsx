import { useState } from 'react'
import {
  FiAlertTriangle,
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiCoffee,
  FiDollarSign,
  FiTrendingDown,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'
import {
  announcements,
  consumptionData,
  dashboardStats,
  mealRequests,
  recentTransactions,
  revenueReports,
  staffList,
  wastageData,
  weeklySchedule,
} from '../../data/messMockData'

import { FaRupeeSign } from 'react-icons/fa'

function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('daily')

  const chartPath = consumptionData
    .map((point, index) => {
      const x = (index / (consumptionData.length - 1)) * 100
      const y = 100 - (point.booked / 1400) * 100
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  const chartPath2 = consumptionData
    .map((point, index) => {
      const x = (index / (consumptionData.length - 1)) * 100
      const y = 100 - (point.consumed / 1400) * 100
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  const getStatIcon = (iconName) => {
    switch (iconName) {
      case 'users':
        return <FiUsers size={24} />
      case 'coffee':
        return <FiCoffee size={24} />
      case 'trending-down':
        return <FiTrendingDown size={24} />
      case 'dollar-sign':
        return <FaRupeeSign size={24} />
      default:
        return <FiBarChart2 size={24} />
    }
  }

  return (
    <div className="dashboard-page dashboard-perfect">
      <section className="stats-grid dashboard-stats-grid">
        {dashboardStats.map((card) => (
          <article className="panel stat-card dashboard-stat-card" key={card.title}>
            <div className="panel-header dashboard-panel-header">
              <div>
                <h3>{card.title}</h3>
                <p>{card.subtitle}</p>
              </div>
              <div className="stat-icon">{getStatIcon(card.icon)}</div>
            </div>

            {card.split ? (
              <div className="split-metrics dashboard-split-columns">
                {card.split.map((item) => (
                  <div key={item.label} className="split-metric">
                    <span>{item.label}</span>
                    <div className="d-flex align-items-end gap-2 flex-wrap">
                      <strong>{item.value}</strong>
                      <small className={item.meta.startsWith('-') ? 'text-danger' : ''}>
                        {item.meta}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="stat-value-wrap dashboard-stat-value">
                  <strong>{card.value}</strong>
                  <span>{card.label}</span>
                  <em>{card.change}</em>
                </div>
                <small className="stat-previous">{card.previous}</small>
              </>
            )}
          </article>
        ))}
      </section>

      <section className="content-grid dashboard-main-grid">
        <article className="panel revenue-panel dashboard-revenue-panel">
          <div className="panel-header dashboard-panel-header">
            <h3>Meal Consumption vs Bookings</h3>
            <div className="d-flex align-items-center gap-2">
              <div className="toggle-pill dashboard-toggle-pill">
                <button
                  type="button"
                  className={selectedPeriod === 'weekly' ? 'active' : ''}
                  onClick={() => setSelectedPeriod('weekly')}
                >
                  This Week
                </button>
                <button
                  type="button"
                  className={selectedPeriod === 'monthly' ? 'active' : ''}
                  onClick={() => setSelectedPeriod('monthly')}
                >
                  This Month
                </button>
              </div>
            </div>
          </div>

          <div className="chart-shell dashboard-chart-shell">
            <div className="chart-axis">
              {['1400', '1050', '700', '350', '0'].map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <div className="chart-stage dashboard-chart-stage">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="revenue-chart">
                <defs>
                  <linearGradient id="booked-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(29, 29, 29, 0.26)" />
                    <stop offset="100%" stopColor="rgba(29, 29, 29, 0.02)" />
                  </linearGradient>
                  <linearGradient id="consumed-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(34, 197, 94, 0.26)" />
                    <stop offset="100%" stopColor="rgba(34, 197, 94, 0.02)" />
                  </linearGradient>
                </defs>
                <path d={`${chartPath} L 100 100 L 0 100 Z`} fill="url(#booked-fill)" />
                <path d={chartPath} fill="none" stroke="#696969" strokeWidth="0.5" strokeDasharray="4" />
                <path d={`${chartPath2} L 100 100 L 0 100 Z`} fill="url(#consumed-fill)" />
                <path d={chartPath2} fill="none" stroke="#22c55e" strokeWidth="0.5" />
              </svg>
              <div className="chart-labels dashboard-chart-labels">
                {consumptionData.map((day) => (
                  <span key={day.day}>{day.day}</span>
                ))}
              </div>
            </div>
            <div className="chart-legend">
              <span>
                <span className="legend-dot booked" />
                Booked
              </span>
              <span>
                <span className="legend-dot consumed" />
                Consumed
              </span>
            </div>
          </div>
        </article>

        <article className="panel insight-panel dashboard-insight-panel">
          <div className="panel-header dashboard-panel-header align-items-start">
            <div>
              <p className="accent-copy">Food Wastage Alert</p>
              <h3 className="insight-number">{wastageData.percentage}%</h3>
              <small>Wastage Rate Today</small>
            </div>
            <FiAlertTriangle className="text-danger" size={24} />
          </div>

          <div className="wastage-stats">
            <div className="wastage-item">
              <div>
                <span>Food Wasted Today</span>
                <strong>{wastageData.daily} kg</strong>
              </div>
              <small>Cost: {wastageData.costPerDay}</small>
            </div>
            <div className="wastage-item">
              <span>Weekly Wastage</span>
              <strong>{wastageData.weekly} kg</strong>
            </div>
            <div className="wastage-recommendations">
              <p className="muted-copy">Recommendations</p>
              <ul>
                {wastageData.recommendations.map((rec) => (
                  <li key={rec}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

          <button type="button" className="outline-action w-100 mt-3">
            View Detailed Analysis
          </button>
        </article>
      </section>

      <section className="bottom-grid dashboard-bottom-grid">
        <article className="panel table-panel dashboard-table-panel">
          <div className="panel-header dashboard-panel-header">
            <h3>Revenue Reports</h3>
            <div className="toggle-pill">
              <button
                type="button"
                className={selectedPeriod === 'daily' ? 'active' : ''}
                onClick={() => setSelectedPeriod('daily')}
              >
                Daily
              </button>
              <button
                type="button"
                className={selectedPeriod === 'weekly' ? 'active' : ''}
                onClick={() => setSelectedPeriod('weekly')}
              >
                Weekly
              </button>
              <button
                type="button"
                className={selectedPeriod === 'monthly' ? 'active' : ''}
                onClick={() => setSelectedPeriod('monthly')}
              >
                Monthly
              </button>
            </div>
          </div>

          {selectedPeriod === 'daily' ? (
            <div className="revenue-details">
              <div className="revenue-summary">
                <div className="revenue-card">
                  <FaRupeeSign />
                  <div>
                    <strong>Rs. {revenueReports.daily.total.toLocaleString()}</strong>
                    <span>Total Today</span>
                  </div>
                </div>
                <div className="revenue-breakdown">
                  <div>Breakfast: Rs. {revenueReports.daily.breakfast.toLocaleString()}</div>
                  <div>Lunch: Rs. {revenueReports.daily.lunch.toLocaleString()}</div>
                  <div>Dinner: Rs. {revenueReports.daily.dinner.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ) : null}

          {selectedPeriod === 'weekly' ? (
            <div className="revenue-details">
              <div className="revenue-summary">
                <div className="revenue-card">
                  <FiTrendingUp />
                  <div>
                    <strong>Rs. {revenueReports.weekly.total.toLocaleString()}</strong>
                    <span>This Week</span>
                    <small>{revenueReports.weekly.comparedToLastWeek}</small>
                  </div>
                </div>
                <div className="revenue-breakdown">
                  <div>Daily Average: Rs. {revenueReports.weekly.average.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ) : null}

          {selectedPeriod === 'monthly' ? (
            <div className="revenue-details">
              <div className="revenue-summary">
                <div className="revenue-card">
                  <FiBarChart2 />
                  <div>
                    <strong>Rs. {revenueReports.monthly.total.toLocaleString()}</strong>
                    <span>{revenueReports.monthly.month}</span>
                    <small>Projected: Rs. {revenueReports.monthly.projected.toLocaleString()}</small>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="table-responsive mt-3">
            <table className="table admin-table dashboard-admin-table align-middle mb-0">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>User</th>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.user}</td>
                    <td>{item.plan}</td>
                    <td>Rs. {item.amount}</td>
                    <td>
                      <span className={`status-dot ${item.status === 'completed' ? 'success' : 'warning'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button type="button" className="outline-action">
              View All Transactions
            </button>
          </div>
        </article>

        <article className="panel alerts-panel dashboard-alerts-panel">
          <div className="panel-header dashboard-panel-header align-items-start">
            <div>
              <h3>Announcements & Alerts</h3>
            </div>
            <button type="button" className="outline-action">
              + Add New
            </button>
          </div>

          <div className="alerts-list">
            {announcements.map((announcement) => (
              <div key={announcement.id} className={`alert-card ${announcement.type}`}>
                <div className="alert-icon">
                  <FiBell />
                </div>
                <div>
                  <strong>{announcement.title}</strong>
                  <p>{announcement.message}</p>
                  <small>{announcement.date} | {announcement.audience}</small>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="bottom-grid lower-grid dashboard-lower-grid">
        <article className="panel table-panel dashboard-table-panel">
          <div className="panel-header dashboard-panel-header">
            <h3>Today&apos;s Menu Schedule</h3>
            <FiCalendar />
          </div>

          <div className="schedule-grid">
            <div className="schedule-card">
              <h4>Breakfast</h4>
              <p className="time">{weeklySchedule.breakfast.time}</p>
              <div className="menu-items">
                {weeklySchedule.breakfast.items.map((item) => (
                  <span key={item} className="menu-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="schedule-card">
              <h4>Lunch</h4>
              <p className="time">{weeklySchedule.lunch.time}</p>
              <div className="menu-items">
                {weeklySchedule.lunch.items.map((item) => (
                  <span key={item} className="menu-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="schedule-card">
              <h4>Dinner</h4>
              <p className="time">{weeklySchedule.dinner.time}</p>
              <div className="menu-items">
                {weeklySchedule.dinner.items.map((item) => (
                  <span key={item} className="menu-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button type="button" className="outline-action">
              Edit Weekly Menu
            </button>
          </div>
        </article>

        <aside className="panel performers-panel dashboard-performers-panel">
          <h3>Special Requests Pending</h3>
          <p className="muted-copy mb-3">Student & Staff Requests</p>

          <div className="requests-list">
            {mealRequests
              .filter((request) => request.status === 'pending')
              .map((request) => (
                <div key={request.id} className="request-item">
                  <div className={`request-priority ${request.priority}`} />
                  <div className="request-content">
                    <strong>{request.user}</strong>
                    <span>{request.request}</span>
                    <small>{request.date}</small>
                  </div>
                  <div className="request-actions">
                    <button type="button" className="btn-sm success">
                      Approve
                    </button>
                    <button type="button" className="btn-sm danger">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="staff-access mt-3">
            <h4>Staff Access</h4>
            {staffList.map((staff) => (
              <div key={staff.id} className="staff-item">
                <div className="staff-content">
                  <strong>{staff.name}</strong>
                  <span>{staff.role}</span>
                </div>
                <span className={`status-badge ${staff.status}`}>{staff.status}</span>
              </div>
            ))}
          </div>

          <a href="#manage-staff" className="see-more-link">
            Manage Staff Access
          </a>
        </aside>
      </section>
    </div>
  )
}

export default DashboardPage
