import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import ForgotPasswordPage from "../features/auth/ForgotPasswordPage";
import LoginPage from "../features/auth/LoginPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import OrderManagementPage from "../features/orders/OrderManagementPage";
import PaymentCommissionPage from "../features/payments/PaymentCommissionPage";
import PartnerShopManagementPage from "../features/partners/PartnerShopManagementPage";
import PromotionMarketingPage from "../features/promotions/PromotionMarketingPage";
import ContentMediaPage from "../features/content/ContentMediaPage";
import SupportTicketPage from "../features/support/SupportTicketPage";
import ReviewFeedbackPage from "../features/reviews/ReviewFeedbackPage";
import LoyaltyReferralPage from "../features/loyalty/LoyaltyReferralPage";
import AffiliateProgramPage from "../features/affiliate/AffiliateProgramPage";
import CategoryManagementPage from "../features/categories/CategoryManagementPage";
import UserManagementPage from "../features/users/UserManagementPage";
import VendorManagementPage from "../features/vendors/VendorManagementPage";
import { useAuth } from "../hooks/useAuth";
import MealPlanManagementPage from "../features/mealplans/MealPlanManagementPage";
import SpecialRequestsPage from "../features/requests/SpecialRequestsPage";
import AnnouncementsPage from "../features/announcements/AnnouncementsPage";
import MessStaffManagement from "../features/staff/MessStaffManagement";
import WeeklyMenuManagement from "../features/menu/WeeklyMenuManagement";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          {/* <Route path="orders" element={<OrderManagementPage />} />
          <Route path="vendors" element={<VendorManagementPage />} />
          <Route path="categories" element={<CategoryManagementPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="partner-shops" element={<PartnerShopManagementPage />} />
          <Route path="payments" element={<PaymentCommissionPage />} />
          <Route path="promotions" element={<PromotionMarketingPage />} />
          <Route path="content-media" element={<ContentMediaPage />} />
          <Route path="support-tickets" element={<SupportTicketPage />} />
          <Route path="reviews" element={<ReviewFeedbackPage />} />
          <Route path="loyalty-referral" element={<LoyaltyReferralPage />} />
          <Route path="affiliate-program" element={<AffiliateProgramPage />} /> */}
          <Route path="meal-plans" element={<MealPlanManagementPage />} />
          <Route path="special-requests" element={<SpecialRequestsPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="mess-staff" element={<MessStaffManagement />} />
          <Route path="weekly-menu" element={<WeeklyMenuManagement />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
