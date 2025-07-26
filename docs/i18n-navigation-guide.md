# I18n Navigation Guide

## Overview

This application uses `next-intl` for internationalization with support for English (en), Dutch (nl), and German (de). **Always use the i18n navigation utilities instead of Next.js default navigation** to avoid side effects with language routing.

## Navigation Setup

```typescript
// src/i18n/navigation.ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
```

## Important Notes

- **`redirect`** from `@/i18n/navigation` is for **server-side redirects only** (server components, middleware)
- **`useRouter().push()`** from `@/i18n/navigation` is for **client-side navigation in React components**
- **`window.location.href`** is for **client-side redirects in utilities/stores** (maintains current locale automatically)

## Usage Guidelines

### ✅ **DO - Use i18n navigation:**

```typescript
// For Links
import { Link } from "@/i18n/navigation";

<Link href="/dashboard">Dashboard</Link>
<Link href="/workspace/123">Workspace</Link>
```

```typescript
// For programmatic navigation
import { useRouter, redirect } from "@/i18n/navigation";

function MyComponent() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };

  // Or for server-side redirects
  redirect("/auth/login");
}
```

```typescript
// For pathname utilities
import { usePathname, getPathname } from "@/i18n/navigation";

function MyComponent() {
  const pathname = usePathname();
  // pathname will be locale-aware
}
```

### ❌ **DON'T - Use Next.js default navigation:**

```typescript
// ❌ Don't use these
import Link from "next/link";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
```

## Common Use Cases

### 1. **Component Links**

```typescript
import { Link } from "@/i18n/navigation";

export function Navigation() {
  return (
    <nav>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/workspaces">Workspaces</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  );
}
```

### 2. **Form Redirects**

```typescript
import { useRouter } from "@/i18n/navigation";

export function LoginForm() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/dashboard");
  };
}
```

### 3. **Auth Redirects (Server-side)**

```typescript
import { redirect } from "@/i18n/navigation";

// ✅ Use for server-side redirects (in server components, middleware, etc.)
export function serverAuthGuard() {
  if (!isAuthenticated) {
    redirect("/auth/login");
  }
}
```

### 4. **Auth Redirects (Client-side)**

```typescript
import { useRouter } from "@/i18n/navigation";

// ✅ Use for client-side redirects in components
export function ClientAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);
}

// ✅ Use window.location for redirects in stores/utilities
export function handleLogout() {
  clearTokens();
  window.location.href = "/auth/login"; // Maintains current locale
}
```

### 5. **Conditional Navigation**

```typescript
import { usePathname } from "@/i18n/navigation";

export function ActiveLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={isActive ? "active" : ""}>
      {children}
    </Link>
  );
}
```

## Language Support

The navigation automatically handles:

- **Locale prefixes**: `/en/dashboard`, `/nl/dashboard`, `/de/dashboard`
- **Default locale**: English routes without prefix (`/dashboard`)
- **Language switching**: Maintains current page when switching languages
- **SEO**: Proper hreflang attributes

## Migration Checklist

When updating existing code:

- [ ] Replace `import Link from "next/link"` with `import { Link } from "@/i18n/navigation"`
- [ ] Replace `import { useRouter } from "next/navigation"` with `import { useRouter } from "@/i18n/navigation"`
- [ ] Replace `import { redirect } from "next/navigation"` with `import { redirect } from "@/i18n/navigation"`
- [ ] Update any `usePathname` imports to use i18n version
- [ ] Test navigation in all supported languages (en, nl, de)

## Troubleshooting

### Issue: Navigation not working with language switching

**Solution**: Ensure you're using i18n navigation utilities, not Next.js defaults.

### Issue: URLs missing locale prefix

**Solution**: Check that all navigation uses the i18n utilities and routing is properly configured.

### Issue: Redirects causing language reset

**Solution**: Use `redirect` from `@/i18n/navigation` instead of Next.js redirect.

## Best Practices

1. **Always import from `@/i18n/navigation`**
2. **Use TypeScript** for better type safety with routes
3. **Test in all languages** before deploying
4. **Use relative paths** when possible (`/dashboard` not `https://example.com/dashboard`)
5. **Handle fallbacks** for navigation errors (see auth store implementation)

## Examples in Codebase

- ✅ `src/components/App/Workspace/ui/WorkspaceCard.tsx` - Uses i18n Link
- ✅ `src/lib/auth/useAuthGuard.ts` - Uses i18n useRouter
- ✅ `src/lib/auth/authStore.ts` - Uses i18n redirect with fallback
- ✅ `src/components/Auth/ProtectedRoute.tsx` - Uses i18n navigation via useAuthGuard
