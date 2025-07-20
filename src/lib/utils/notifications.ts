// Simple notification system
// You can replace this with react-hot-toast or another notification library

export const notifications = {
  success: (message: string) => {
    console.log("✅ Success:", message);
    // You can integrate with a toast library here
  },

  error: (message: string) => {
    console.error("❌ Error:", message);
    // You can integrate with a toast library here
  },

  info: (message: string) => {
    console.log("ℹ️ Info:", message);
    // You can integrate with a toast library here
  },

  warning: (message: string) => {
    console.warn("⚠️ Warning:", message);
    // You can integrate with a toast library here
  },
};

export default notifications;
