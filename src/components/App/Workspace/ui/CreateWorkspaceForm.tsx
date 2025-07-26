"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPlus, X, Users, UserCheck } from "lucide-react";
import { useCreateWorkspace } from "../hooks";
import { useAuth } from "@/lib/auth/authStore";
import { canManageWorkspaceMembers, getUserTypeName } from "@/lib/auth/permissions";
import type { CreateWorkspaceRequest } from "../types";

const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Workspace name is required").max(100, "Name must be less than 100 characters").trim(),
});

type CreateWorkspaceFormValues = z.infer<typeof createWorkspaceSchema>;

interface CreateWorkspaceFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateWorkspaceForm({ onSuccess, onCancel }: CreateWorkspaceFormProps) {
  const { user } = useAuth();
  console.log("USER", user);
  const createWorkspaceMutation = useCreateWorkspace();
  const [addAllUsers, setAddAllUsers] = useState(true);

  // Check if user can manage workspace members (company owners/admins)
  const canManageMembers = canManageWorkspaceMembers(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateWorkspaceFormValues>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateWorkspaceFormValues) => {
    try {
      const workspaceData: CreateWorkspaceRequest = {
        name: data.name,
        // Only include user management fields if user can manage members
        ...(canManageMembers && {
          addAllUsers,
          userList: addAllUsers ? [] : [], // TODO: Implement user selection when addAllUsers is false
        }),
      };

      await createWorkspaceMutation.mutateAsync(workspaceData);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Failed to create workspace:", error);
    }
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Create New Workspace</h3>
        <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Workspace Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-400"
            placeholder="Enter workspace name..."
            autoFocus
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>}
        </div>

        {/* User Management Section - Only show for users who can manage members */}
        {canManageMembers && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Workspace Members
            </h4>

            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userSelection"
                  checked={addAllUsers}
                  onChange={() => setAddAllUsers(true)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                  <UserCheck className="w-4 h-4 mr-1" />
                  Add all company users
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="userSelection"
                  checked={!addAllUsers}
                  onChange={() => setAddAllUsers(false)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Select specific users
                </span>
              </label>

              {!addAllUsers && (
                <div className="ml-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    User selection will be implemented in a future update. For now, only you will be added to the workspace.
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              As a {user ? getUserTypeName(user.userType) : 'Company Owner'}, you will be automatically added as the workspace owner regardless of the selection above.
            </p>
          </div>
        )}

        {/* Show API error if exists */}
        {createWorkspaceMutation.error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm">
            {(createWorkspaceMutation.error as any)?.message || "Failed to create workspace. Please try again."}
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={createWorkspaceMutation.isPending}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createWorkspaceMutation.isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {createWorkspaceMutation.isPending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <FolderPlus className="w-4 h-4 mr-2" />
                Create Workspace
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
