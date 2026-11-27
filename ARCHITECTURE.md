# Architecture

## Current baseline

- **Frontend:** React + strict TypeScript, built by Vite and styled with Tailwind CSS 4.
- **Desktop/mobile shell:** Tauri 2. Rust owns native entry and plugin registration; React is the UI layer.
- **Persistence preparation:** `tauri-plugin-sql` is compiled with SQLite support. No schema or application repository exists yet.
- **Editor preparation:** CodeMirror 6 dependency is present. The editor package is not wired into a screen yet.
- **Tests:** Vitest + jsdom for UI units and Playwright for browser end-to-end checks.
- **Content:** lessons and exercises are kept in `content/`; UI domains live in their own `src/` modules.
- **Runtime:** `runtime/luau` is reserved for a real Luau VM integration. No interpreter mock is permitted.

## Boundaries

```text
React pages/components -> typed frontend services -> Tauri commands/plugins -> Rust/native storage
                             content loaders -> versioned content/ files
```

Keep presentation components independent of platform APIs. Put native storage, filesystem, and other Tauri access behind `src/services` and `src/storage`. Content should remain data-driven and separate from UI code. Never execute learner code until a real Luau runtime and its sandboxing model are integrated.

## Directory map

- `src/app`: app composition and routing entry points
- `src/components`: reusable UI elements
- `src/pages`: screen-level views
- `src/editor`: CodeMirror integration
- `src/learning`, `src/exercises`, `src/projects`: learning domains
- `src/progression`: XP, levels, and achievements domain
- `src/storage`: frontend persistence adapters
- `src/services`: platform and application services
- `src/styles`: global styles and design tokens
- `src-tauri/src`: Rust application and native services
- `src-tauri/capabilities`: least-privilege Tauri permissions
- `content`: versioned educational content
- `runtime/luau`: real Luau runtime integration
- `tests`: cross-layer tests, currently Playwright E2E

## Platform notes

Linux and Windows desktop builds use Tauri's desktop targets. Android project generation can be initiated with Tauri's Android CLI after installing the Android SDK/NDK. iOS project generation and builds require macOS and Xcode. A successful Linux build does not establish Windows or mobile compatibility; those require builds on the appropriate host and toolchain.
