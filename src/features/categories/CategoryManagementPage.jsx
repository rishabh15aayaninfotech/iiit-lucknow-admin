import { useEffect, useState } from 'react'
import {
  FiAlertCircle,
  FiEdit2,
  FiEye,
  FiMoreVertical,
  FiPlus,
  FiRefreshCw,
  FiTrash2,
} from 'react-icons/fi'
import { useToast } from '../../components/feedback/ToastProvider'
import { useAuth } from '../../hooks/useAuth'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from '../../services/categories'

const PAGE_LIMIT = 20

const initialCategoryForm = {
  name: '',
  description: '',
  isActive: true,
  parentCategoryId: '',
}

function formatDate(value) {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

function getInitials(value) {
  if (!value) {
    return 'CT'
  }

  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')
}

function buildDonutSegments(values, circumference) {
  const total = values.reduce((sum, value) => sum + value, 0)

  if (!total) {
    return values.map(() => ({
      dashArray: `0 ${circumference}`,
      dashOffset: 0,
    }))
  }

  let offset = 0

  return values.map((value) => {
    const segmentLength = (value / total) * circumference
    const segment = {
      dashArray: `${segmentLength} ${circumference - segmentLength}`,
      dashOffset: -offset,
    }

    offset += segmentLength
    return segment
  })
}

function CategoryManagementPage() {
  const { authState, logout } = useAuth()
  const toast = useToast()
  const token = authState?.token
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [meta, setMeta] = useState({ page: 1, limit: PAGE_LIMIT, total: 0, totalPages: 1 })
  const [refreshKey, setRefreshKey] = useState(0)
  const [detailRefreshKey, setDetailRefreshKey] = useState(0)
  const [listLoading, setListLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [actionLoadingId, setActionLoadingId] = useState('')
  const [pageError, setPageError] = useState('')
  const [detailError, setDetailError] = useState('')
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deleteModalCategory, setDeleteModalCategory] = useState(null)
  const [createForm, setCreateForm] = useState(initialCategoryForm)
  const [editForm, setEditForm] = useState(initialCategoryForm)

  useEffect(() => {
    if (!token) {
      return
    }

    let isActive = true

    async function loadCategories() {
      setListLoading(true)
      setPageError('')

      try {
        const response = await getCategories({
          token,
          page: meta.page,
          limit: meta.limit,
        })

        if (!isActive) {
          return
        }

        setCategories(response.data?.categories || [])
        const pagination = response.data?.pagination

        if (pagination) {
          setMeta((current) => ({
            ...current,
            total: pagination.total,
            page: pagination.page,
            limit: pagination.limit,
            totalPages: pagination.totalPages,
          }))
        }
      } catch (error) {
        if (!isActive) {
          return
        }

        if (error.message?.toLowerCase().includes('unauthorized')) {
          logout()
        }

        setCategories([])
        setPageError(error.message || 'Unable to load categories right now.')
        toast.error(error.message || 'Unable to load categories right now.', 'Category fetch failed')
      } finally {
        if (isActive) {
          setListLoading(false)
        }
      }
    }

    loadCategories()

    return () => {
      isActive = false
    }
  }, [token, meta.page, meta.limit, refreshKey, logout])

  useEffect(() => {
    if (!token || !selectedCategoryId) {
      setSelectedCategory(null)
      setDetailError('')
      return
    }

    let isActive = true

    async function loadCategoryDetails() {
      setDetailLoading(true)
      setDetailError('')

      try {
        const response = await getCategoryById({ token, categoryId: selectedCategoryId })

        if (!isActive) {
          return
        }

        setSelectedCategory(response.data || null)
      } catch (error) {
        if (!isActive) {
          return
        }

        setSelectedCategory(null)
        setDetailError(error.message || 'Unable to load category details.')
      } finally {
        if (isActive) {
          setDetailLoading(false)
        }
      }
    }

    loadCategoryDetails()

    return () => {
      isActive = false
    }
  }, [token, selectedCategoryId, detailRefreshKey])

  const activeCategories = categories.filter((item) => item.isActive).length
  const inactiveCategories = categories.filter((item) => !item.isActive).length
  const parentCategories = categories.filter((item) => !item.parentCategoryId).length
  const totalProducts = categories.reduce((sum, item) => sum + (item._count?.products || 0), 0)
  const donutRadius = 54
  const donutCircumference = 2 * Math.PI * donutRadius
  const donutSegments = buildDonutSegments(
    [activeCategories || 0, inactiveCategories || 0, parentCategories || 0],
    donutCircumference,
  )
  const overviewLegend = [
    { label: 'Active categories', value: activeCategories, tone: 'green' },
    { label: 'Inactive categories', value: inactiveCategories, tone: 'orange' },
    { label: 'Parent categories', value: parentCategories, tone: 'blue' },
  ]
  const miniBars = [
    {
      label: 'Page fill',
      value: meta.limit ? Math.round((categories.length / meta.limit) * 100) : 0,
      tone: 'blue',
    },
    {
      label: 'Active',
      value: categories.length ? Math.round((activeCategories / categories.length) * 100) : 0,
      tone: 'green',
    },
    {
      label: 'Inactive',
      value: categories.length ? Math.round((inactiveCategories / categories.length) * 100) : 0,
      tone: 'orange',
    },
    {
      label: 'Parents',
      value: categories.length ? Math.round((parentCategories / categories.length) * 100) : 0,
      tone: 'blue',
    },
  ]
  const parentOptions = categories.filter((item) => !item.parentCategoryId)

  const refreshCategories = () => {
    setRefreshKey((current) => current + 1)
  }

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > meta.totalPages || nextPage === meta.page) {
      return
    }

    setMeta((current) => ({ ...current, page: nextPage }))
  }

  const openViewModal = (categoryId) => {
    setSelectedCategoryId(categoryId)
    setIsViewModalOpen(true)
  }

  const openEditModal = (category) => {
    setSelectedCategoryId(category.id)
    setEditForm({
      name: category.name || '',
      description: category.description || '',
      isActive: Boolean(category.isActive),
      parentCategoryId: category.parentCategoryId || '',
    })
    setIsEditModalOpen(true)
  }

  const submitCreateCategory = async () => {
    setActionLoadingId('create-category')

    try {
      await createCategory({
        token,
        data: {
          ...createForm,
          parentCategoryId: createForm.parentCategoryId || null,
        },
      })

      setCreateForm(initialCategoryForm)
      setIsCreateModalOpen(false)
      refreshCategories()
      toast.success('Category created successfully.')
    } catch (error) {
      toast.error(error.message || 'Unable to create category right now.', 'Create failed')
    } finally {
      setActionLoadingId('')
    }
  }

  const submitEditCategory = async () => {
    if (!selectedCategoryId) {
      return
    }

    setActionLoadingId(selectedCategoryId)

    try {
      await updateCategory({
        token,
        categoryId: selectedCategoryId,
        data: {
          ...editForm,
          parentCategoryId: editForm.parentCategoryId || null,
        },
      })

      setIsEditModalOpen(false)
      refreshCategories()
      setDetailRefreshKey((current) => current + 1)
      toast.success('Category updated successfully.')
    } catch (error) {
      toast.error(error.message || 'Unable to update category right now.', 'Update failed')
    } finally {
      setActionLoadingId('')
    }
  }

  const handleDeleteCategory = async (category) => {
    setActionLoadingId(category.id)

    try {
      await deleteCategory({
        token,
        categoryId: category.id,
      })

      if (selectedCategoryId === category.id) {
        setSelectedCategoryId('')
        setSelectedCategory(null)
        setIsViewModalOpen(false)
      }

      refreshCategories()
      toast.success('Category deleted successfully.')
    } catch (error) {
      toast.error(error.message || 'Unable to delete this category right now.', 'Delete failed')
    } finally {
      setActionLoadingId('')
    }
  }

  return (
    <div className="management-page">
      <section className="management-hero-grid">
        <div className="stacked-stat-list">
          {[
            { title: 'Total Categories', value: meta.total, change: `Page ${meta.page} of ${meta.totalPages || 1}` },
            { title: 'Active Categories', value: activeCategories, change: 'Current page snapshot' },
            { title: 'Parent Categories', value: parentCategories, change: 'Current page snapshot' },
          ].map((item) => (
            <article className="panel stat-card compact tall" key={item.title}>
              <div className="panel-header">
                <div>
                  <h3>{item.title}</h3>
                </div>
                <button type="button" className="icon-ghost">
                  <FiMoreVertical />
                </button>
              </div>
              <div className="stat-value-wrap mt-2">
                <strong>{item.value}</strong>
                <em>{item.change}</em>
              </div>
              <p className="card-footnote">Last 7 days</p>
            </article>
          ))}
        </div>

        <article className="panel overview-panel">
          <div className="panel-header">
            <h3>Category Overview</h3>
            <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end">
              <button type="button" className="outline-action users-refresh-button" onClick={refreshCategories}>
                <FiRefreshCw />
                Refresh
              </button>
              <button
                type="button"
                className="login-submit vendor-add-button"
                onClick={() => {
                  setCreateForm(initialCategoryForm)
                  setIsCreateModalOpen(true)
                }}
              >
                <FiPlus />
                Add Category
              </button>
            </div>
          </div>

          <div className="overview-metric-grid">
            {[
              { label: 'Showing', value: categories.length },
              { label: 'Inactive', value: inactiveCategories },
              { label: 'Products', value: totalProducts },
              { label: 'Subcategories', value: categories.reduce((sum, item) => sum + (item._count?.subCategories || 0), 0) },
            ].map((item, index) => (
              <div key={item.label} className={`overview-metric ${index === 0 ? 'active success' : ''}`}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="users-overview-card">
            <div className="users-overview-visual">
              <div className="users-donut-shell">
                <svg viewBox="0 0 140 140" className="users-donut-chart" aria-hidden="true">
                  <circle className="users-donut-track" cx="70" cy="70" r={donutRadius} />
                  {donutSegments.map((segment, index) => (
                    <circle
                      key={overviewLegend[index].label}
                      className={`users-donut-segment ${overviewLegend[index].tone}`}
                      cx="70"
                      cy="70"
                      r={donutRadius}
                      strokeDasharray={segment.dashArray}
                      strokeDashoffset={segment.dashOffset}
                    />
                  ))}
                </svg>
                <div className="users-donut-center">
                  <strong>{categories.length}</strong>
                  <span>on page</span>
                </div>
              </div>

              <div className="users-overview-insights">
                <div>
                  <p className="muted-copy mb-2">Live category snapshot</p>
                  <h4>{pageError ? 'Unable to load categories' : 'Current category mix'}</h4>
                  <p className="users-overview-copy">
                    {pageError
                      ? pageError
                      : `Page ${meta.page} is showing ${categories.length} categories with active state, parent linkage, and product counts from the backend.`}
                  </p>
                </div>

                <div className="users-overview-legend">
                  {overviewLegend.map((item) => (
                    <div key={item.label} className="users-overview-legend-item">
                      <span className={`users-legend-dot ${item.tone}`} />
                      <div>
                        <strong>{item.value}</strong>
                        <span>{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="users-mini-bars">
              {miniBars.map((item) => (
                <div key={item.label} className="users-mini-bar-card">
                  <div className="users-mini-bar-head">
                    <span>{item.label}</span>
                    <strong>{item.value}%</strong>
                  </div>
                  <div className="users-mini-bar-track">
                    <div
                      className={`users-mini-bar-fill ${item.tone}`}
                      style={{ width: `${Math.min(item.value, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="panel vendor-table-panel">
        <div className="page-section-head mb-3">
          <h3 className="section-title mb-0">Category Details</h3>
          <span className="muted-copy">
            {listLoading ? 'Loading categories...' : `${meta.total} total categories`}
          </span>
        </div>

        {pageError ? (
          <div className="users-empty-state users-empty-state-error">
            <FiAlertCircle />
            <span>{pageError}</span>
          </div>
        ) : null}

        <div className="table-responsive">
          <table className="table order-table align-middle mb-0">
            <thead>
              <tr>
                <th>Category</th>
                <th>Slug</th>
                <th>Parent</th>
                <th>Products</th>
                <th>Subcategories</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listLoading ? (
                <tr>
                  <td colSpan="7">
                    <div className="users-empty-state">
                      <FiRefreshCw className="spin" />
                      <span>Loading categories from the API...</span>
                    </div>
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className="users-empty-state">
                      <FiAlertCircle />
                      <span>No categories found.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                categories.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="vendor-id-cell">
                        <div className="vendor-badge sky">{getInitials(item.name)}</div>
                        <div>
                          <strong>{item.name}</strong>
                          <span className="vendor-email-ellipsis" title={item.description || '-'}>
                            {item.description || '-'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{item.slug || '-'}</td>
                    <td>{item.parentCategory?.name || 'Root category'}</td>
                    <td>{item._count?.products || 0}</td>
                    <td>{item._count?.subCategories || 0}</td>
                    <td>
                      <span className={`shipment-status ${item.isActive ? 'active' : 'inactive'}`}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="action-icons">
                        <button
                          type="button"
                          className="table-action-icon"
                          onClick={() => openViewModal(item.id)}
                          aria-label={`View ${item.name}`}
                        >
                          <FiEye />
                        </button>
                        <button
                          type="button"
                          className="table-action-icon"
                          onClick={() => openEditModal(item)}
                          disabled={actionLoadingId === item.id}
                          aria-label={`Edit ${item.name}`}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          type="button"
                          className="table-action-icon"
                          onClick={() => setDeleteModalCategory(item)}
                          disabled={actionLoadingId === item.id}
                          aria-label={`Delete ${item.name}`}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination-wrap mt-4">
          <button
            type="button"
            className="pager-button"
            onClick={() => handlePageChange(meta.page - 1)}
            disabled={meta.page <= 1 || listLoading}
          >
            Previous
          </button>
          <div className="page-numbers">
            {Array.from({ length: meta.totalPages || 1 }, (_, index) => index + 1).map((item) => (
              <button
                type="button"
                key={item}
                className={item === meta.page ? 'active success' : ''}
                onClick={() => handlePageChange(item)}
                disabled={listLoading}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="pager-button"
            onClick={() => handlePageChange(meta.page + 1)}
            disabled={meta.page >= meta.totalPages || listLoading}
          >
            Next
          </button>
        </div>
      </section>

      {isViewModalOpen ? (
        <div className="users-modal-backdrop" onClick={() => setIsViewModalOpen(false)}>
          <div
            className="users-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-category-title"
          >
            {detailLoading ? (
              <div className="users-empty-state">
                <FiRefreshCw className="spin" />
                <span>Loading selected category...</span>
              </div>
            ) : detailError ? (
              <div className="users-empty-state users-empty-state-error">
                <FiAlertCircle />
                <span>{detailError}</span>
              </div>
            ) : selectedCategory ? (
              <>
                <div className="users-modal-head">
                  <div className="profile-summary">
                    <div className="profile-avatar">{getInitials(selectedCategory.name)}</div>
                    <div>
                      <h3 id="view-category-title">{selectedCategory.name}</h3>
                      <p className="users-modal-copy users-modal-copy-tight">{selectedCategory.slug || '-'}</p>
                    </div>
                  </div>
                  <button type="button" className="icon-ghost" onClick={() => setIsViewModalOpen(false)}>
                    <FiMoreVertical />
                  </button>
                </div>

                <div className="info-block">
                  <p className="muted-copy mb-2">Category Info</p>
                  <div className="info-pill">
                    <span>{selectedCategory.description || 'No description provided.'}</span>
                  </div>
                  <div className="info-pill">
                    <span>Parent: {selectedCategory.parentCategory?.name || 'Root category'}</span>
                  </div>
                </div>

                <div className="info-block">
                  <p className="muted-copy mb-2">Category Status</p>
                  <p className="activity-line">State: {selectedCategory.isActive ? 'Active' : 'Inactive'}</p>
                  <p className="activity-line">Products: {selectedCategory._count?.products || 0}</p>
                  <p className="activity-line">Subcategories: {selectedCategory.subCategories?.length || 0}</p>
                </div>

                <div className="info-block">
                  <p className="muted-copy mb-2">Created</p>
                  <p className="activity-line">{formatDate(selectedCategory.createdAt)}</p>
                </div>

                <div className="users-modal-actions">
                  <button type="button" className="outline-action" onClick={() => setIsViewModalOpen(false)}>
                    Close
                  </button>
                  <button
                    type="button"
                    className="login-submit users-modal-submit"
                    onClick={() =>
                      openEditModal({
                        id: selectedCategory.id,
                        name: selectedCategory.name,
                        description: selectedCategory.description,
                        isActive: selectedCategory.isActive,
                        parentCategoryId: selectedCategory.parentCategoryId,
                      })
                    }
                  >
                    Edit Category
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : null}

      {isCreateModalOpen ? (
        <div className="users-modal-backdrop" onClick={() => setIsCreateModalOpen(false)}>
          <div
            className="users-modal-card vendor-create-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-category-title"
          >
            <div className="users-modal-head">
              <h3 id="create-category-title">Add Category</h3>
              <button type="button" className="icon-ghost" onClick={() => setIsCreateModalOpen(false)}>
                <FiMoreVertical />
              </button>
            </div>

            <div className="vendor-form-grid">
              <label className="users-modal-field">
                <span>Name</span>
                <input
                  type="text"
                  value={createForm.name}
                  onChange={(event) =>
                    setCreateForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />
              </label>

              <label className="users-modal-field">
                <span>Parent Category</span>
                <select
                  value={createForm.parentCategoryId}
                  onChange={(event) =>
                    setCreateForm((current) => ({
                      ...current,
                      parentCategoryId: event.target.value,
                    }))
                  }
                >
                  <option value="">Root category</option>
                  {parentOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="users-modal-field vendor-form-wide">
                <span>Description</span>
                <textarea
                  rows="4"
                  value={createForm.description}
                  onChange={(event) =>
                    setCreateForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <div className="users-modal-actions">
              <button type="button" className="outline-action" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="login-submit users-modal-submit"
                onClick={submitCreateCategory}
                disabled={actionLoadingId === 'create-category'}
              >
                {actionLoadingId === 'create-category' ? 'Creating...' : 'Create Category'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isEditModalOpen ? (
        <div className="users-modal-backdrop" onClick={() => setIsEditModalOpen(false)}>
          <div
            className="users-modal-card vendor-create-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-category-title"
          >
            <div className="users-modal-head">
              <h3 id="edit-category-title">Edit Category</h3>
              <button type="button" className="icon-ghost" onClick={() => setIsEditModalOpen(false)}>
                <FiMoreVertical />
              </button>
            </div>

            <div className="vendor-form-grid">
              <label className="users-modal-field">
                <span>Name</span>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />
              </label>

              <label className="users-modal-field">
                <span>Parent Category</span>
                <select
                  value={editForm.parentCategoryId}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      parentCategoryId: event.target.value,
                    }))
                  }
                >
                  <option value="">Root category</option>
                  {parentOptions
                    .filter((item) => item.id !== selectedCategoryId)
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </label>

              <label className="users-modal-field vendor-form-wide">
                <span>Description</span>
                <textarea
                  rows="4"
                  value={editForm.description}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                />
              </label>

              <label className="users-modal-field vendor-form-wide">
                <span>Status</span>
                <select
                  value={editForm.isActive ? 'active' : 'inactive'}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      isActive: event.target.value === 'active',
                    }))
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
            </div>

            <div className="users-modal-actions">
              <button type="button" className="outline-action" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="login-submit users-modal-submit"
                onClick={submitEditCategory}
                disabled={actionLoadingId === selectedCategoryId}
              >
                {actionLoadingId === selectedCategoryId ? 'Saving...' : 'Update Category'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deleteModalCategory ? (
        <div className="users-modal-backdrop" onClick={() => setDeleteModalCategory(null)}>
          <div
            className="users-modal-card users-modal-card-danger"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-category-title"
          >
            <div className="users-modal-head">
              <h3 id="delete-category-title">Delete Category</h3>
              <button type="button" className="icon-ghost" onClick={() => setDeleteModalCategory(null)}>
                <FiMoreVertical />
              </button>
            </div>
            <p className="users-modal-copy">
              Delete {deleteModalCategory.name}? This action cannot be undone.
            </p>

            <div className="users-modal-actions">
              <button type="button" className="outline-action" onClick={() => setDeleteModalCategory(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="users-danger-button"
                onClick={async () => {
                  const currentCategory = deleteModalCategory
                  await handleDeleteCategory(currentCategory)
                  setDeleteModalCategory(null)
                }}
                disabled={actionLoadingId === deleteModalCategory.id}
              >
                {actionLoadingId === deleteModalCategory.id ? 'Deleting...' : 'Delete Category'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CategoryManagementPage
