# Project Architecture Overview

Providing an **`architecture.md` file** that outlines your project's high-level structure and conventions is a **crucial strategy** for **contextualizing Large Language Models (LLMs)** in software development. This approach helps LLMs understand the "bigger picture" of your project, ensuring the code they generate aligns with your design and standards, especially for medium to large projects.

---

## Stack

- **React + TypeScript** – Frontend UI with strict typing and modular components.
- **Express** – Node.js backend framework for API handling.
- **PostgreSQL** – Relational database for persistent storage.
- **Jest** – Testing framework used across both frontend and backend codebases.

---

## Folder Structure (Feature-Sliced Design)

This project follows the **Feature-Sliced Design (FSD)** methodology. Code is structured into **layers** and **slices**, promoting modularity, separation of concerns, and scalability.

```

/src/  
│  
├── app/ # Application-level config: app init, routing, themes  
├── pages/ # Page-level entry points, usually 1:1 with routes  
├── widgets/ # Complex, reusable sections of a page (composed of features)  
├── features/ # Units of business logic that deliver user value  
├── entities/ # Business entities with state, logic, and models  
├── shared/ # Reusable cross-cutting utilities, UI, styles, etc.  
│ ├── ui/ # Common UI components (e.g. Button, Input)  
│ ├── lib/ # Helper utilities, hooks, etc.  
│ ├── api/ # API client code, fetch adapters  
│ ├── config/ # Constants, runtime/env configuration  
│ ├── types/ # Global or shared TypeScript types  
│ └── assets/ # Static assets: images, fonts, icons  
└── index.tsx # App entry point

```

> 📌 **Slices** (e.g. `auth`, `profile`, `cart`) exist **within layers** (e.g. `features`, `entities`) and contain their own `model`, `ui`, `lib`, and optionally `api`.

---

## Layer Breakdown

| Layer     | Purpose                                                                 |
|-----------|-------------------------------------------------------------------------|
| `app/`    | Application entry point, routes, and top-level setup                    |
| `pages/`  | Route-based layout containers; 1 per route                              |
| `widgets/`| Reusable high-level sections (e.g. NavBar, Footer)                      |
| `features/`| Isolated user-facing actions or use-cases (e.g. login, add-to-cart)   |
| `entities/`| Domain models and associated logic (e.g. User, Product)                |
| `shared/` | Global reusable parts and tools (UI, helpers, styles, config, types)    |

---

## Conventions

- **Component Naming**: Use `PascalCase` for components and `camelCase` for local variables/functions.
- **Slice Structure** (inside `features`, `entities`, etc.):
```

/[slice-name]/  
├── ui/ # UI components  
├── model/ # State management, stores, actions  
├── lib/ # Local utilities for this slice  
├── api/ # Data fetch logic (optional)  
└── index.ts # Public entry point (barrel export)

```
- **Single Responsibility**: One file per component, hook, store, etc.
- **Tests**: Co-located with code. For example:
```

/model/  
├── useProfileStore.ts  
└── useProfileStore.test.ts

```

---

## Example File Path Usage

| Feature                         | File Path                                           |
|---------------------------------|-----------------------------------------------------|
| User profile form UI            | `features/userProfile/ui/ProfileForm.tsx`          |
| Profile update logic            | `features/userProfile/model/updateProfile.ts`      |
| User entity type definition     | `entities/user/model/types.ts`                     |
| Reusable button component       | `shared/ui/Button/Button.tsx`                      |
| Validation utility              | `shared/lib/validation/profileSchema.ts`           |
| App routes config               | `app/routes.tsx`                                   |
| Home page                       | `pages/home/index.tsx`                             |

---

## Integration with LLMs

This document serves as a **reference point** for any AI-powered tooling (e.g. GPT, Claude, Cursor) generating code or task lists. LLMs must:

- Place new files in the correct **slice + layer**
- Respect naming and modular structure
- Avoid mixing concerns between layers (e.g., `features` should not depend on `widgets`)
- Include appropriate test files next to logic
- Reuse shared components/utilities where possible
- Use examples above as patterns when generating code

> ✅ LLMs should always check `architecture.md` before suggesting new file paths or code structures.

---

## Notes

- Prefer **absolute imports** based on the root `src/` directory (e.g., `shared/ui/Button`).
- Avoid circular dependencies by respecting **layer dependency rules**:
- `shared` → used by any layer
- `entities` → can use `shared`
- `features` → can use `entities` and `shared`
- `widgets` → can use `features`, `entities`, `shared`
- `pages` → can use any layer (except `app`)
- `app` → top-level only, does not import from others

