import {
  FiActivity,
  FiAward,
  FiBox,
  FiCoffee,
  FiFileText,
  FiGift,
  FiHome,
  FiMonitor,
  FiShoppingBag,
  FiSmartphone,
  FiTag,
  FiUsers,
  FiVideo,
} from 'react-icons/fi'

export const sidebarSections = [
  {
    title: 'Main menu',
    items: [
      { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
      { label: 'User Management', icon: 'users', path: '/users' },
      { label: 'Vendor Management', icon: 'vendors', path: '/vendors' },
      { label: 'Category Management', icon: 'categories', path: '/categories' },
      { label: 'Order Management', icon: 'orders', path: '/orders' },
      { label: 'Partner Shop Management', icon: 'partners', path: '/partner-shops' },
      { label: 'Payment & Commission', icon: 'payment', path: '/payments' },
      { label: 'Promotion & Marketing', icon: 'promotion', path: '/promotions' },
      { label: 'Content & Media', icon: 'content', path: '/content-media' },
      { label: 'Support Ticket', icon: 'support', path: '/support-tickets' },
      { label: 'Review & Feedback', icon: 'review', path: '/reviews' },
      { label: 'Loyalty & Referral', icon: 'loyalty', path: '/loyalty-referral' },
      { label: 'Affiliate Program', icon: 'affiliate', path: '/affiliate-program' },
    ],
  },
  {
    title: 'Product',
    items: [
      { label: 'Add Products', icon: 'add', path: '#' },
      { label: 'Product Media', icon: 'media', path: '#' },
      { label: 'Product List', icon: 'list', path: '#' },
      { label: 'Product Reviews', icon: 'productReview', path: '#' },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'Admin role', icon: 'admin', path: '#' },
      { label: 'Control Authority', icon: 'settings', path: '#' },
    ],
  },
]

export const topbarConfig = {
  '/dashboard': {
    title: 'Dashboard',
    searchPlaceholder: 'Search data, users, or reports',
  },
  '/orders': {
    title: 'Order Management',
    searchPlaceholder: 'Search data, users, or reports',
  },
  '/vendors': {
    title: 'Vendor Management',
    searchPlaceholder: 'Search vendor by Vendor ID',
  },
  '/categories': {
    title: 'Category Management',
    searchPlaceholder: 'Search categories or parent categories',
  },
  '/users': {
    title: 'User Management',
    searchPlaceholder: 'Search data, users, or reports',
  },
  '/partner-shops': {
    title: 'Partner Shop Management',
    searchPlaceholder: 'Search data, users, or reports',
  },
  '/payments': {
    title: 'Payment & Commission',
    searchPlaceholder: 'Search data, users, or reports',
  },
  '/promotions': {
    title: 'Promotions & Marketing Management',
    searchPlaceholder: 'Search data, users, or reports',
  },
  '/content-media': {
    title: 'Content & Media Management',
    searchPlaceholder: 'Search data, users, or reports',
  },
  '/support-tickets': {
    title: 'Support Ticket Management',
    searchPlaceholder: 'Search data, users, or reports',
  },
  '/reviews': {
    title: 'Review & Feedback',
    searchPlaceholder: 'Search data, users, or reports',
  },
  '/loyalty-referral': {
    title: 'Loyalty & Referral Management',
    searchPlaceholder: 'Search data, users, or reports',
  },
  '/affiliate-program': {
    title: 'Affiliate Program Management',
    searchPlaceholder: 'Search data, users, or reports',
  },
}

export const dashboardStats = [
  {
    title: 'Total Sales',
    subtitle: 'Last 7 days',
    value: '$350K',
    label: 'Sales',
    change: '+10.4%',
    previous: 'Previous 7days ($235)',
  },
  {
    title: 'Total Orders',
    subtitle: 'Last 7 days',
    value: '10.7K',
    label: 'order',
    change: '+14.4%',
    previous: 'Previous 7days (7.6k)',
  },
  {
    title: 'Pending & Canceled',
    subtitle: 'Last 7 days',
    split: [
      { label: 'Pending', value: '509', meta: 'user 204' },
      { label: 'Canceled', value: '94', meta: '-14.4%', negative: true },
    ],
  },
]

export const revenuePoints = [18, 43, 39, 24, 41, 21, 33, 37, 16, 8, 49]

export const overviewChartPoints = [22, 22, 38, 38, 27, 27, 49, 49, 31, 31, 43, 43]

export const countrySales = [
  { country: 'US', sales: '30k', growth: '+25.8%', accent: 'us' },
  { country: 'Brazil', sales: '30k', growth: '-15.8%', accent: 'br' },
  { country: 'Australia', sales: '25k', growth: '+35.8%', accent: 'au' },
]

export const transactions = [
  { id: '#6545', date: '01 Oct | 11:29 am', status: 'Paid', amount: '$64' },
  { id: '#5412', date: '01 Oct | 11:29 am', status: 'Pending', amount: '$557' },
  { id: '#6622', date: '01 Oct | 11:29 am', status: 'Paid', amount: '$156' },
  { id: '#6462', date: '01 Oct | 11:29 am', status: 'Paid', amount: '$265' },
  { id: '#6462', date: '01 Oct | 11:29 am', status: 'Paid', amount: '$265' },
]

export const alerts = [
  {
    title: '12 Low Stock Item',
    copy: 'Inventory below threshold in "Electronics".',
    action: 'Restock Now',
    tone: 'danger',
  },
  {
    title: '5 Pending Returns',
    copy: 'Required manual review for refund.',
    action: 'Review All',
    tone: 'warning',
  },
  {
    title: '28 orders Pending',
    copy: 'Ready to be dispatched by end of day.',
    action: 'Go to Orders',
    tone: 'info',
  },
  {
    title: '12 Low Stock Item',
    copy: 'Inventory below threshold in "Electronics".',
    action: 'Restock Now',
    tone: 'success',
  },
]

export const bestSellingProducts = [
  { name: 'Apple iPhone 13', orders: 104, status: 'Stock', price: '$999.00', icon: FiSmartphone },
  { name: 'Nike Air Jordan', orders: 56, status: 'Stock out', price: '$999.00', icon: FiActivity },
  { name: 'T-shirt', orders: 266, status: 'Stock', price: '$999.00', icon: FiShoppingBag },
  { name: 'Cross Bag', orders: 506, status: 'Stock', price: '$999.00', icon: FiTag },
]

export const topCategories = [
  { label: 'Electronic', icon: FiMonitor },
  { label: 'Fashion', icon: FiAward },
  { label: 'Home', icon: FiHome },
]

export const vendors = [
  { name: 'Vendor Name', category: 'Category', icon: FiBox },
  { name: 'Vendor Name', category: 'Category', icon: FiShoppingBag },
  { name: 'Vendor Name', category: 'Category', icon: FiActivity },
]

export const orderStats = [
  { title: 'Total Orders', value: '1,240', change: '+14.4%' },
  { title: 'New Orders', value: '240', change: '+20%' },
  { title: 'Completed Orders', value: '960', change: '85%' },
  { title: 'Canceled Orders', value: '87', change: '-5%', negative: true },
]

export const orderTabs = ['All order (240)', 'Completed', 'Pending', 'Canceled']

export const orderRows = [
  {
    no: 1,
    orderId: '#ORD0001',
    product: 'Wireless Bluetooth Headphones',
    date: '01-01-2026',
    price: '49.99',
    payment: 'Paid',
    status: 'Delivered',
    icon: FiActivity,
  },
  {
    no: 2,
    orderId: '#ORD0002',
    product: "Men's T-Shirt",
    date: '01-01-2026',
    price: '14.99',
    payment: 'Unpaid',
    status: 'Pending',
    icon: FiShoppingBag,
  },
  {
    no: 3,
    orderId: '#ORD0003',
    product: "Men's Leather Wallet",
    date: '01-01-2026',
    price: '49.99',
    payment: 'Paid',
    status: 'Delivered',
    icon: FiTag,
  },
  {
    no: 4,
    orderId: '#ORD0004',
    product: 'Memory Foam Pillow',
    date: '01-01-2026',
    price: '39.99',
    payment: 'Paid',
    status: 'Shipped',
    icon: FiHome,
  },
  {
    no: 5,
    orderId: '#ORD0005',
    product: 'Adjustable Dumbbells',
    date: '01-01-2026',
    price: '14.99',
    payment: 'Unpaid',
    status: 'Pending',
    icon: FiActivity,
  },
  {
    no: 6,
    orderId: '#ORD0006',
    product: 'Coffee Maker',
    date: '01-01-2026',
    price: '79.99',
    payment: 'Unpaid',
    status: 'Cancelled',
    icon: FiCoffee,
  },
  {
    no: 7,
    orderId: '#ORD0007',
    product: 'Casual Baseball Cap',
    date: '01-01-2026',
    price: '49.99',
    payment: 'Paid',
    status: 'Delivered',
    icon: FiAward,
  },
  {
    no: 8,
    orderId: '#ORD0008',
    product: 'Full HD Webcam',
    date: '01-01-2026',
    price: '39.99',
    payment: 'Paid',
    status: 'Delivered',
    icon: FiVideo,
  },
  {
    no: 9,
    orderId: '#ORD0009',
    product: 'Smart LED Color Bulb',
    date: '01-01-2026',
    price: '79.99',
    payment: 'Unpaid',
    status: 'Delivered',
    icon: FiSmartphone,
  },
  {
    no: 10,
    orderId: '#ORD0010',
    product: "Men's T-Shirt",
    date: '01-01-2026',
    price: '14.99',
    payment: 'Unpaid',
    status: 'Delivered',
    icon: FiShoppingBag,
  },
]

export const vendorStats = [
  { title: 'Total Vendor', value: '11,040', change: '+14.4%' },
  { title: 'New Vendor', value: '2,370', change: '+20%' },
  { title: 'Visitor', value: '250k', change: '+20%' },
]

export const userStats = [
  { title: 'Total Users', value: '11.5M', change: '+14.4%' },
  { title: 'New Users', value: '2,37k', change: '+20%' },
  { title: 'Visitor', value: '25k', change: '+20%' },
]

export const overviewMetricsVendor = [
  { label: 'Active Vendor', value: '25k' },
  { label: 'Repeat Vendor', value: '5.6k' },
  { label: 'Shop Visitor', value: '250k' },
  { label: 'Conversion Rate', value: '5.5%' },
]

export const overviewMetricsUser = [
  { label: 'Active Customers', value: '25k' },
  { label: 'Repeat Customers', value: '5.6k' },
  { label: 'Shop Visitor', value: '250k' },
  { label: 'Conversion Rate', value: '5.5%' },
]

export const vendorRows = [
  { initials: 'TS', name: 'TechHaven Solution', email: 'contact@techhaven.com', category: 'Electronic', applied: 'Jan 25, 2026', documents: '3 Files', status: 'Pending Review', accent: 'gold' },
  { initials: 'LF', name: 'Luxe Fabrics Co.', email: 'contact@techhaven.com', category: 'Fashion', applied: 'Jan 25, 2026', documents: '5 Files', status: 'Pending Review', accent: 'rose' },
  { initials: 'GO', name: 'GreenEarth Organics', email: 'contact@techhaven.com', category: 'Food', applied: 'Jan 25, 2026', documents: '3 Files', status: 'Pending Review', accent: 'green' },
  { initials: 'HP', name: 'Homedecor Plus', email: 'contact@techhaven.com', category: 'Home & Living', applied: 'Jan 25, 2026', documents: '3 Files', status: 'Pending Review', accent: 'rose' },
  { initials: 'TW', name: 'Toy world Solution', email: 'contact@techhaven.com', category: 'Toy', applied: 'Jan 25, 2026', documents: '3 Files', status: 'Missing Info', accent: 'pink' },
  { initials: 'TH', name: 'TechHaven', email: 'contact@techhaven.com', category: 'Electronic', applied: 'Jan 25, 2026', documents: '3 Files', status: 'High Risk', accent: 'sand' },
  { initials: 'TS', name: 'Tecknoworld Soluton', email: 'contact@techhaven.com', category: 'Electronic', applied: 'Jan 25, 2026', documents: '3 Files', status: 'Missing Info', accent: 'sand' },
  { initials: 'US', name: 'Urban Sneakers', email: 'contact@techhaven.com', category: 'Fashion', applied: 'Jan 25, 2026', documents: '3 Files', status: 'Pending Review', accent: 'sand' },
  { initials: 'FC', name: 'Fresh Co.', email: 'contact@techhaven.com', category: 'Food', applied: 'Jan 25, 2026', documents: '3 Files', status: 'High Risk', accent: 'sand' },
  { initials: 'YD', name: 'Your Decor Partner', email: 'contact@techhaven.com', category: 'Home & Living', applied: 'Jan 25, 2026', documents: '3 Files', status: 'Missing Info', accent: 'sand' },
]

export const userRows = [
  { id: '#USER001', name: 'John Doe', phone: '+1234567890', orders: 25, spend: '3,450.00', status: 'Active' },
  { id: '#USER002', name: 'John Doe', phone: '+1234567890', orders: 25, spend: '3,450.00', status: 'Active' },
  { id: '#USER003', name: 'John Doe', phone: '+1234567890', orders: 25, spend: '3,450.00', status: 'Active' },
  { id: '#USER004', name: 'John Doe', phone: '+1234567890', orders: 25, spend: '3,450.00', status: 'Active' },
  { id: '#USER005', name: 'Jane Smith', phone: '+1234567890', orders: 5, spend: '250.00', status: 'Inactive' },
  { id: '#USER006', name: 'Emily Davis', phone: '+1234567890', orders: 30, spend: '4,600.00', status: 'VIP' },
  { id: '#USER007', name: 'Jane Smith', phone: '+1234567890', orders: 5, spend: '250.00', status: 'Inactive' },
  { id: '#CUST001', name: 'John Doe', phone: '+1234567890', orders: 25, spend: '3,450.00', status: 'Active' },
  { id: '#CUST002', name: 'Emily Davis', phone: '+1234567890', orders: 30, spend: '4,600.00', status: 'VIP' },
  { id: '#CUST003', name: 'Jane Smith', phone: '+1234567890', orders: 5, spend: '250.00', status: 'Inactive' },
]

export const partnerStatuses = ['All Status', 'Active', 'Inactive']

export const partnerVendors = [
  { initials: 'TS', name: 'TechHaven Solution', id: '#1234', state: 'Live', presentation: 'Main', selected: true },
  { initials: 'TS', name: 'Tech World Inc.', id: '#1234', state: 'Draft', presentation: 'External Shop' },
  { initials: 'TS', name: 'TechHaven Solution', id: '#1234', state: 'Suspended', presentation: 'Embeded' },
]

export const paymentStats = [
  { title: 'Total Escrow Balance', subtitle: 'Last month', value: '$1,240,500.00', previous: 'Previous 7days ($235)' },
  { title: 'Pending Payouts', subtitle: 'Last month', value: '$10,500.00', previous: 'Previous 7days (7.6k)' },
  { title: 'Total Revenue (Commission)', subtitle: 'Last month', value: '$10,500.00', previous: 'Previous 7days (7.6k)' },
]

export const paymentTabs = ['Transaction Overview', 'Partner Payouts', 'Commission Settings']

export const paymentRows = [
  { orderId: '#ORD0001', vendor: 'Vendor / Store Name', gateway: 'Klama', amount: '49.99', commission: '$49.00 (5%)', status: 'Paid' },
  { orderId: '#ORD0002', vendor: 'Vendor / Store Name', gateway: 'Stripe', amount: '14.99', commission: '$49.00 (5%)', status: 'Pending' },
  { orderId: '#ORD0004', vendor: 'Vendor / Store Name', gateway: 'Klama', amount: '39.99', commission: '$49.00 (5%)', status: 'Paid' },
  { orderId: '#ORD0005', vendor: 'Vendor / Store Name', gateway: 'Stripe', amount: '14.99', commission: '$49.00 (5%)', status: 'Proccessing' },
  { orderId: '#ORD0006', vendor: 'Vendor / Store Name', gateway: 'Klama', amount: '79.99', commission: '$49.00 (5%)', status: 'Unpaid' },
]

export const disbursements = [
  { initials: 'NB', name: 'Nordic Bloom ltd.', pending: '14 Pending Sales', amount: '$12,400.00' },
  { initials: 'ZC', name: 'Zenith Ceramics', pending: '8 Pending Sales', amount: '$12,400.00' },
]

export const commissionSlabs = [
  { initials: 'B', tier: 'Bronze Tier', volume: 'Volume : $0 - $10k / mo', rate: '15%', badge: 'STANDARD', accent: 'gray' },
  { initials: 'S', tier: 'Silver Tier', volume: 'Volume : $0 - $50k / mo', rate: '10%', badge: 'GROWTH', accent: 'sky' },
  { initials: 'G', tier: 'Gold Tier', volume: 'Volume : $50k+ / mo', rate: '5%', badge: 'ELITE', accent: 'gold' },
]

export const userProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  address: '123 Main St, NY',
  registration: '15.01.2025',
  lastPurchase: '10.01.2025',
  totals: [
    { value: '150', label: 'Total order', tone: 'blue' },
    { value: '140', label: 'Completed', tone: 'green' },
    { value: '10', label: 'Canceled', tone: 'red' },
  ],
}

export const socialIcons = [FiGift, FiUsers, FiActivity, FiFileText, FiTag]
