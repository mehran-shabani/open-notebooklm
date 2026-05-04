# i18n / RTL Audit (Persian Readiness)

## Scope & Coverage
Audit scope covers main frontend surfaces under `frontend/src/app` and shared UI/components under `frontend/src/components` and `frontend/src/lib`. 

**Main pages audited**
- Dashboard Home: `frontend/src/app/(dashboard)/page.tsx`
- Search/Ask: `frontend/src/app/(dashboard)/search/page.tsx`
- Notebooks (list/detail): `frontend/src/app/(dashboard)/notebooks/page.tsx`, `frontend/src/app/(dashboard)/notebooks/[id]/page.tsx`
- Sources (list/detail): `frontend/src/app/(dashboard)/sources/page.tsx`, `frontend/src/app/(dashboard)/sources/[id]/page.tsx`
- Podcasts: `frontend/src/app/(dashboard)/podcasts/page.tsx`
- Transformations: `frontend/src/app/(dashboard)/transformations/page.tsx`
- Settings (+ API Keys): `frontend/src/app/(dashboard)/settings/page.tsx`, `frontend/src/app/(dashboard)/settings/api-keys/page.tsx`
- Advanced: `frontend/src/app/(dashboard)/advanced/page.tsx`
- Auth/Login: `frontend/src/app/(auth)/login/page.tsx`

---

## 1) Hardcoded UI text inventory (needs extraction)

| file path | current text/string | component/page | issue type | priority |
|---|---|---|---|---|
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | `This credential has {credential.model_count} linked model(s).` | DeleteCredentialDialog (modal/alert) | translation | critical |
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | `Migrate models to:` | DeleteCredentialDialog (label) | translation | high |
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | `Select credential` | DeleteCredentialDialog (select placeholder) | translation | high |
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | `Migrate & Delete` | DeleteCredentialDialog (button) | translation | critical |
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | `Delete with Models` | DeleteCredentialDialog (button) | translation | critical |
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | `Test` | CredentialItem (button label in model row) | translation | medium |
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | `Models` | CredentialItem (button label in model row) | translation | medium |
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | `my-gcp-project` | Create/Edit credential form (placeholder) | translation | medium |
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | `us-central1` | Create/Edit credential form (placeholder) | translation | medium |
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | `/path/to/service-account.json` | Create/Edit credential form (placeholder) | translation | medium |
| `frontend/src/components/common/ContextIndicator.tsx` | `Context:` | ContextIndicator | translation | medium |
| `frontend/src/components/layout/AppSidebar.tsx` | `Ctrl+` | Sidebar keyboard shortcut hint | translation | low |
| `frontend/src/app/not-found or metadata surface` (`frontend/src/app/layout.tsx`) | `Open Notebook` | HTML metadata title | translation | low |
| `frontend/src/app/not-found or metadata surface` (`frontend/src/app/layout.tsx`) | `Privacy-focused research and knowledge management` | HTML metadata description | translation | low |

> Note: Many strings are already localized via `t('...')`. Remaining hardcoded strings are concentrated in settings/API-keys flow and a few shared UI components.

---

## 2) RTL-sensitive components audit

| file path | component/page | rtl concern | issue type | priority |
|---|---|---|---|---|
| `frontend/src/components/layout/AppSidebar.tsx` | Sidebar / navigation | Icon+text alignment, collapse direction, keyboard hint order (`Ctrl+K`), chevrons | rtl | critical |
| `frontend/src/components/layout/AppShell.tsx` | App shell (sidebar/content composition) | Sidebar anchoring (left vs right), content padding/margins by direction | rtl | critical |
| `frontend/src/components/ui/dialog.tsx` + usages | Modal | Focus trap + close button placement + padding direction | rtl / a11y | high |
| `frontend/src/components/ui/dropdown-menu.tsx` | Menus | Menu alignment (`start/end`) under RTL | rtl | high |
| `frontend/src/components/ui/select.tsx` | Select inputs | Trigger/content alignment, caret direction, value truncation | rtl | high |
| `frontend/src/components/ui/command.tsx` | Command palette | Search icon/input direction + result item alignment | rtl | high |
| `frontend/src/components/ui/checkbox-list.tsx` | Form checklists | Checkbox/control position should mirror in RTL | rtl | high |
| `frontend/src/components/common/InlineEdit.tsx` | Inline form controls | Action icons and input text alignment | rtl | medium |
| `frontend/src/app/(dashboard)/search/page.tsx` | Search page | Horizontal filters, badges, icon spacing classes (`mr-*`) | rtl | high |
| `frontend/src/app/(dashboard)/notebooks/components/NotebookList.tsx` | List/grid cards | Card action placement, truncation direction for mixed script | rtl | medium |
| `frontend/src/components/source/ChatPanel.tsx` | Chat-like stream panel | Message alignment + markdown direction in mixed LTR/RTL content | rtl | critical |
| `frontend/src/components/search/StreamingResponse.tsx` | Streaming answer view | Citation chips, inline code, punctuation around Persian text | rtl | critical |
| `frontend/src/components/podcasts/EpisodesTab.tsx` | Table/list-like rows + actions | Column/action ordering, status badge alignment | rtl | medium |
| `frontend/src/components/ui/pagination` usages (if added in future) | Pagination pattern | Next/Prev semantics and arrow directions in RTL | rtl | medium |
| `frontend/src/components/ui/sonner.tsx` + toast usages in hooks | Toast notifications | Toast placement and close/action alignment in RTL | rtl | high |

---

## 3) Date/number and locale-formatting gaps

| file path | current text/string | component/page | issue type | priority |
|---|---|---|---|---|
| `frontend/src/lib/utils/date-locale.ts` and all date render callsites | Locale formatting logic exists but Persian locale not confirmed | Cross-app date rendering | date-number | high |
| `frontend/src/components/podcasts/EpisodeCard.tsx` | Duration/time/date display (UI labels) | Episode card | date-number | medium |
| `frontend/src/components/source/SourceDetailContent.tsx` | File stats/date metadata | Source details | date-number | medium |

---

## 4) Validation / empty-state / modal / toast checkpoints

| file path | current text/string | component/page | issue type | priority |
|---|---|---|---|---|
| `frontend/src/lib/hooks/use-sources.ts` | toast title/description strings (success/error flows) | Sources CRUD toasts | translation | high |
| `frontend/src/lib/hooks/use-notebooks.ts` | toast title/description strings | Notebook CRUD toasts | translation | high |
| `frontend/src/lib/hooks/use-notes.ts` | toast title/description strings | Note CRUD toasts | translation | high |
| `frontend/src/lib/hooks/use-credentials.ts` | toast title/description strings | Credential flows | translation | critical |
| `frontend/src/lib/hooks/use-models.ts` | toast title/description strings | Model flows | translation | high |
| `frontend/src/lib/hooks/use-transformations.ts` | toast title/description strings | Transformation flows | translation | high |
| `frontend/src/components/common/EmptyState.tsx` | generic empty-state labels/descriptions | Shared empty states | translation / a11y | high |

---

## 5) Recommended implementation order

1. **Critical translation extraction**: settings/api-keys hardcoded modal/button strings + all hook-level toast messages.
2. **RTL foundation**: global `dir` handling in app shell + sidebar mirroring + dialog/menu/select alignment.
3. **Date/number localization**: ensure Persian (`fa-IR`) formatting for dates and numbers, including digits policy.
4. **A11y checks in RTL**: verify tab order, focus ring movement, screen-reader labels for mirrored layouts.

