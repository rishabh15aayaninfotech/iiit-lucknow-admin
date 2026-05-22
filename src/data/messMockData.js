export const dashboardStats = [
  {
    title: 'Total Students',
    subtitle: 'Active Mess Subscribers',
    value: '1,284',
    label: 'students',
    change: '+48 this month',
    previous: 'Previous: 1,236',
    icon: 'users',
  },
  {
    title: 'Meals Booked',
    subtitle: "Today's Bookings",
    split: [
      { label: 'Breakfast', value: '892', meta: '74%' },
      { label: 'Lunch', value: '1,156', meta: '90%' },
      { label: 'Dinner', value: '1,034', meta: '81%' },
    ],
    icon: 'coffee',
  },
  {
    title: 'Meals Consumed',
    subtitle: 'Actual Consumption',
    split: [
      { label: 'Breakfast', value: '756', meta: '-136' },
      { label: 'Lunch', value: '1,089', meta: '-67' },
      { label: 'Dinner', value: '945', meta: '-89' },
    ],
    icon: 'trending-down',
  },
  {
    title: 'Daily Revenue',
    subtitle: "Today's Collection",
    value: 'Rs. 1,28,400',
    label: 'today',
    change: '+8.2%',
    previous: 'Yesterday: Rs. 1,18,600',
    icon: 'dollar-sign',
  },
]

export const wastageData = {
  daily: 287,
  weekly: 1845,
  monthly: 7890,
  percentage: 23,
  costPerDay: 'Rs. 43,050',
  topWastedItems: [
    { item: 'Rice', quantity: '45 kg', percentage: 28 },
    { item: 'Vegetables', quantity: '38 kg', percentage: 24 },
    { item: 'Roti/Bread', quantity: '320 pcs', percentage: 18 },
    { item: 'Dal', quantity: '30 L', percentage: 15 },
  ],
  recommendations: [
    'Reduce rice preparation by 15% on weekdays',
    'Implement portion control for vegetables',
    'Collect feedback on least liked dishes',
  ],
}

export const revenueReports = {
  daily: {
    date: '2024-01-15',
    total: 128400,
    breakfast: 44600,
    lunch: 46240,
    dinner: 37560,
    pendingPayments: 12400,
  },
  weekly: {
    startDate: '2024-01-08',
    endDate: '2024-01-14',
    total: 892400,
    average: 127485,
    comparedToLastWeek: '+5.2%',
  },
  monthly: {
    month: 'January 2024',
    total: 3856200,
    projected: 4100000,
    growth: '+8.5%',
  },
}

export const mealPlans = [
  {
    id: 'MP001',
    name: 'Basic Mess Plan',
    type: 'Student',
    price: 3500,
    duration: 'Monthly',
    mealsPerDay: 3,
    features: ['Breakfast', 'Lunch', 'Dinner', 'Weekend Included'],
    isActive: true,
    subscribers: 856,
  },
  {
    id: 'MP002',
    name: 'Premium Mess Plan',
    type: 'Student',
    price: 4500,
    duration: 'Monthly',
    mealsPerDay: 3,
    features: [
      'All Basic Features',
      'Special Menu on Sundays',
      'Guest Meal Vouchers (2/month)',
    ],
    isActive: true,
    subscribers: 428,
  },
  {
    id: 'MP003',
    name: 'Staff Plan',
    type: 'Staff',
    price: 4000,
    duration: 'Monthly',
    mealsPerDay: 2,
    features: ['Lunch & Dinner', 'Separate Dining Area'],
    isActive: true,
    subscribers: 142,
  },
  {
    id: 'MP004',
    name: 'Guest Day Pass',
    type: 'Temporary',
    price: 250,
    duration: 'Daily',
    mealsPerDay: 3,
    features: ['Single Day Access', 'All Meals'],
    isActive: true,
    subscribers: 0,
  },
]

export const recentTransactions = [
  {
    id: 'TRX001',
    user: 'Rahul Kumar (B2021001)',
    plan: 'Basic Mess Plan',
    amount: 3500,
    date: '2024-01-15',
    status: 'completed',
  },
  {
    id: 'TRX002',
    user: 'Priya Singh (B2021002)',
    plan: 'Premium Mess Plan',
    amount: 4500,
    date: '2024-01-15',
    status: 'completed',
  },
  {
    id: 'TRX003',
    user: 'Dr. Suresh Sharma',
    plan: 'Staff Plan',
    amount: 4000,
    date: '2024-01-14',
    status: 'completed',
  },
  {
    id: 'TRX004',
    user: 'Amit Patel (B2021003)',
    plan: 'Basic Mess Plan',
    amount: 3500,
    date: '2024-01-14',
    status: 'pending',
  },
]

export const mealRequests = [
  {
    id: 'REQ001',
    user: 'Anjali Verma (B2021045)',
    type: 'Special Diet',
    request: 'Jain Food Request',
    date: '2024-01-16',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'REQ002',
    user: 'Rohit Singh (B2021089)',
    type: 'Guest Meal',
    request: 'Guest meal for 2 people',
    date: '2024-01-17',
    status: 'approved',
    priority: 'medium',
  },
  {
    id: 'REQ003',
    user: 'Neha Gupta (B2021076)',
    type: 'Medical Diet',
    request: 'Low sugar meals required',
    date: '2024-01-18',
    status: 'pending',
    priority: 'high',
  },
]

export const announcements = [
  {
    id: 'ANN001',
    title: 'Special Dinner on Republic Day',
    message:
      'Enjoy a special menu on 26th January featuring traditional Indian dishes.',
    date: '2024-01-15',
    audience: 'All Students & Staff',
    type: 'event',
    isActive: true,
  },
  {
    id: 'ANN002',
    title: 'Breakfast Timing Change',
    message: 'Breakfast timings will be 7:30 AM - 9:30 AM from tomorrow.',
    date: '2024-01-14',
    audience: 'All Mess Users',
    type: 'notice',
    isActive: true,
  },
  {
    id: 'ANN003',
    title: 'Festival Special Lunch',
    message: 'Special menu for Holi celebration on 25th March',
    date: '2024-01-13',
    audience: 'All Students',
    type: 'event',
    isActive: true,
  },
]

export const weeklySchedule = {
  breakfast: {
    time: '8:00 AM - 10:00 AM',
    items: ['Poha', 'Sandwich', 'Paratha', 'Fruits', 'Milk/Cornflakes'],
  },
  lunch: {
    time: '12:30 PM - 2:30 PM',
    items: ['Roti', 'Rice', 'Dal', 'Seasonal Vegetables', 'Salad', 'Buttermilk'],
  },
  dinner: {
    time: '7:30 PM - 9:30 PM',
    items: ['Roti', 'Rice', 'Dal', 'Paneer/Veg Curry', 'Dessert'],
  },
}

export const staffList = [
  {
    id: 'STF001',
    name: 'Rajesh Mishra',
    role: 'Mess Manager',
    email: 'rajesh@iiitl.ac.in',
    access: 'full',
    status: 'active',
  },
  {
    id: 'STF002',
    name: 'Sunil Kumar',
    role: 'Kitchen Supervisor',
    email: 'sunil@iiitl.ac.in',
    access: 'kitchen',
    status: 'active',
  },
  {
    id: 'STF003',
    name: 'Meera Singh',
    role: 'Accounts',
    email: 'meera@iiitl.ac.in',
    access: 'finance',
    status: 'active',
  },
  {
    id: 'STF004',
    name: 'Amit Verma',
    role: 'Inventory Manager',
    email: 'amit@iiitl.ac.in',
    access: 'inventory',
    status: 'inactive',
  },
]

export const consumptionData = [
  { day: 'Mon', booked: 1245, consumed: 1089 },
  { day: 'Tue', booked: 1289, consumed: 1123 },
  { day: 'Wed', booked: 1324, consumed: 1156 },
  { day: 'Thu', booked: 1267, consumed: 1098 },
  { day: 'Fri', booked: 1198, consumed: 1045 },
  { day: 'Sat', booked: 987, consumed: 876 },
  { day: 'Sun', booked: 654, consumed: 589 },
]

export const revenuePoints = [42, 45, 48, 52, 49, 55, 58, 62, 60, 65, 68, 72, 70, 75]

export default {
  dashboardStats,
  wastageData,
  revenueReports,
  mealPlans,
  recentTransactions,
  mealRequests,
  announcements,
  weeklySchedule,
  staffList,
  consumptionData,
  revenuePoints,
}

export const sidebarSections = [
  {
    title: 'MAIN NAVIGATION',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
      { label: 'Meal Plans', path: '/meal-plans', icon: 'meal-plans' },
      { label: 'Special Requests', path: '/special-requests', icon: 'special-requests' },
      { label: 'Announcements', path: '/announcements', icon: 'announcements' },
    ],
  },
  {
    title: 'STAFF & MENU',
    items: [
      { label: 'Mess Staff', path: '/mess-staff', icon: 'users' },
      { label: 'Weekly Menu', path: '/weekly-menu', icon: 'calendar' },
    ],
  },
]
