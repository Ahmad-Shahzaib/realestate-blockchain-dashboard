// "use client";

// import { isAdmin, isSuperAdmin } from "@/redux/auth/handler";

// // Route access configuration
// export const ROUTE_ACCESS = {
//   // Admin routes
//   '/admin': ['admin', 'superadmin'],
//   '/admin/dashboard': ['admin', 'superadmin'],
  
//   // Super Admin routes
//   '/super-admin': ['superadmin'],
//   '/super-admin/users': ['superadmin'],
//   '/super-admin/settings': ['superadmin'],
// };

// /**
//  * Check if the current user has permission to access a specific route
//  * @param route The route path to check
//  * @returns boolean indicating whether the user can access the route
//  */
// export const canAccessRoute = (route: string): boolean => {
//   // Allow access to routes not defined in the ROUTE_ACCESS
//   if (!ROUTE_ACCESS[route as keyof typeof ROUTE_ACCESS]) {
//     return true;
//   }

//   const allowedRoles = ROUTE_ACCESS[route as keyof typeof ROUTE_ACCESS];
  
//   if (allowedRoles.includes('superadmin') && isSuperAdmin()) {
//     return true;
//   }
  
//   if (allowedRoles.includes('admin') && (isAdmin() || isSuperAdmin())) {
//     return true;
//   }
  
//   return false;
// };

// /**
//  * Utility to check if a route is for admin users only
//  */
// export const isAdminRoute = (route: string): boolean => {
//   return route.startsWith('/admin') && !route.startsWith('/super-admin');
// };

// /**
//  * Utility to check if a route is for super admin users only
//  */
// export const isSuperAdminRoute = (route: string): boolean => {
//   return route.startsWith('/super-admin');
// };
