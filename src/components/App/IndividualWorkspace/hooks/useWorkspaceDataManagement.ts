import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useWorkspaceStore } from "../store/workspaceStore";
import { individualWorkspaceKeys } from "./index";
import type { Workspace } from "../types";

/**
 * Custom hook to manage workspace data lifecycle and caching
 * Handles workspace switching, cache management, and cleanup
 */
export function useWorkspaceDataManagement(workspaceId: string) {
  const queryClient = useQueryClient();
  const previousWorkspaceId = useRef<string | null>(null);

  // Handle workspace changes and data management
  useEffect(() => {
    // Check if we have cached data for this workspace
    const cachedWorkspace = queryClient.getQueryData<Workspace>(individualWorkspaceKeys.workspace(workspaceId));

    // Only clear data if we're switching to a different workspace (not on initial load or revisit)
    if (previousWorkspaceId.current && previousWorkspaceId.current !== workspaceId) {
      console.log("🏢 [useWorkspaceDataManagement] Switching from", previousWorkspaceId.current, "to", workspaceId);

      // Clear previous workspace data when switching to a different workspace
      const { setWorkspace, setDocuments, clearErrors } = useWorkspaceStore.getState();

      // Clear previous data
      setWorkspace(null);
      setDocuments([]);
      clearErrors();

      // If we have cached data for the new workspace, set it immediately
      if (cachedWorkspace) {
        console.log("🏢 [useWorkspaceDataManagement] Using cached data for", workspaceId);
        setWorkspace(cachedWorkspace);
      }

      // Clear any stale React Query cache for the previous workspace only
      queryClient.removeQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return (
            queryKey.includes("individual-workspace") &&
            queryKey.includes(previousWorkspaceId.current!) &&
            !queryKey.includes(workspaceId)
          );
        },
      });
    } else if (!previousWorkspaceId.current && cachedWorkspace) {
      // First load with cached data available
      console.log("🏢 [useWorkspaceDataManagement] First load with cached data for", workspaceId);
      const { setWorkspace } = useWorkspaceStore.getState();
      setWorkspace(cachedWorkspace);
    }

    // Update the previous workspace ID
    previousWorkspaceId.current = workspaceId;
  }, [workspaceId, queryClient]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Only clear errors on unmount, keep data for potential re-visits
      const { clearErrors } = useWorkspaceStore.getState();
      clearErrors();
    };
  }, []);

  // Check if we have cached data to avoid unnecessary loading states
  const hasCachedData = !!queryClient.getQueryData<Workspace>(individualWorkspaceKeys.workspace(workspaceId));

  return { hasCachedData };
}
