import type { StoredUser } from "./storage";

// Role constants based on backend schema
export const USER_ROLES = {
  ADMIN: 0,
  INTERNAL: 1,
  USER: 2,
} as const;

// User type constants based on backend schema
export const USER_TYPES = {
  INDIVIDUAL_FREELANCER: 0,
  COMPANY_USER: 1,
  COMPANY_OWNER: 2,
} as const;

// Permission helper functions
export const permissions = {
  /**
   * Check if user can create workspaces
   * COMPANY_OWNER and INDIVIDUAL_FREELANCER can create workspaces
   */
  canCreateWorkspace: (user: StoredUser | null): boolean => {
    if (!user) return false;
    return user.userType === USER_TYPES.COMPANY_OWNER || user.userType === USER_TYPES.INDIVIDUAL_FREELANCER;
  },

  /**
   * Check if user can manage workspace members
   * Only COMPANY_OWNER can manage workspace members
   */
  canManageWorkspaceMembers: (user: StoredUser | null): boolean => {
    if (!user) return false;
    return user.userType === USER_TYPES.COMPANY_OWNER;
  },

  /**
   * Check if user can delete workspaces
   * Only COMPANY_OWNER can delete workspaces
   */
  canDeleteWorkspace: (user: StoredUser | null): boolean => {
    if (!user) return false;
    return user.userType === USER_TYPES.COMPANY_OWNER;
  },

  /**
   * Check if user is part of a company (either user or owner)
   */
  isCompanyUser: (user: StoredUser | null): boolean => {
    if (!user) return false;
    return user.userType === USER_TYPES.COMPANY_USER || user.userType === USER_TYPES.COMPANY_OWNER;
  },

  /**
   * Check if user is an individual freelancer
   */
  isIndividualFreelancer: (user: StoredUser | null): boolean => {
    if (!user) return false;
    return user.userType === USER_TYPES.INDIVIDUAL_FREELANCER;
  },

  /**
   * Get user role name for display purposes
   */
  getRoleName: (role: number): string => {
    switch (role) {
      case USER_ROLES.ADMIN:
        return "Admin";
      case USER_ROLES.INTERNAL:
        return "Internal";
      case USER_ROLES.USER:
        return "User";
      default:
        return "Unknown";
    }
  },

  /**
   * Get user type name for display purposes
   */
  getUserTypeName: (userType: number): string => {
    switch (userType) {
      case USER_TYPES.INDIVIDUAL_FREELANCER:
        return "Individual Freelancer";
      case USER_TYPES.COMPANY_USER:
        return "Company User";
      case USER_TYPES.COMPANY_OWNER:
        return "Company Owner";
      default:
        return "Unknown";
    }
  },
};

// Export for convenience
export const {
  canCreateWorkspace,
  canManageWorkspaceMembers,
  canDeleteWorkspace,
  isCompanyUser,
  isIndividualFreelancer,
  getRoleName,
  getUserTypeName,
} = permissions;
