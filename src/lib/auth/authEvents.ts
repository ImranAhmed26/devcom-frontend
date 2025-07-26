// Simple event system for auth state changes
type AuthEventType = 'TOKEN_EXPIRED' | 'UNAUTHORIZED' | 'LOGOUT_REQUIRED';

interface AuthEvent {
  type: AuthEventType;
  message?: string;
  timestamp: number;
}

type AuthEventListener = (event: AuthEvent) => void;

class AuthEventManager {
  private listeners: AuthEventListener[] = [];

  // Subscribe to auth events
  subscribe(listener: AuthEventListener): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Emit auth events
  emit(type: AuthEventType, message?: string) {
    const event: AuthEvent = {
      type,
      message,
      timestamp: Date.now(),
    };

    console.log(`🔔 [AuthEvents] Emitting event:`, event);
    
    this.listeners.forEach(listener => {
      try {
        listener(event);
      } catch (error) {
        console.error('Error in auth event listener:', error);
      }
    });
  }

  // Clear all listeners (useful for cleanup)
  clear() {
    this.listeners = [];
  }
}

// Create singleton instance
export const authEvents = new AuthEventManager();

export type { AuthEventType, AuthEvent, AuthEventListener };