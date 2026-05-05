# Persianization Release Checklist (fa-IR + RTL)

## Environment
- Date (UTC): 2026-05-05
- Repository: `/workspace/open-notebooklm`
- Frontend stack: Next.js 16 + Vitest
- Backend tests: Pytest (environment dependency missing)
- Feature flag introduced: `feature.fa_locale_enabled`

## Commands executed
1. `cd frontend && npm test`
2. `pytest -q`
3. `cd frontend && npm run build`

## Smoke results (fa-IR + RTL)
> Scope note: full browser-based smoke scenarios (login/signup, dashboard, chat/search, settings, error/empty/loading states) were not executable in this CLI-only run because no UI automation harness (Playwright/Cypress) or running browser session was provided.

| Flow | Result | Evidence | Notes |
|---|---|---|---|
| Login / Signup | NOT EXECUTED | N/A | Requires live browser and backend auth services |
| Dashboard load | NOT EXECUTED | N/A | Requires browser session |
| Chat/Search core flow | NOT EXECUTED | N/A | Requires API + UI interaction |
| Settings update/save | NOT EXECUTED | N/A | Requires browser UI |
| Error/empty/loading states | PARTIAL | Unit tests pass in frontend | Visual confirmation not executed |

## Test results

### Frontend unit/integration tests
- `npm test`: **PASS**
- Outcome: 7/7 files passed, 30/30 tests passed.

### Backend/unit integration tests
- `pytest -q`: **FAIL**
- Root cause: Environment/dependency issue (`ModuleNotFoundError: No module named 'dotenv'`).
- Classification: **env issue**
- Severity: **high** (test suite cannot run)
- Suggested quick fix: install project dependencies (`pip install -e .` or `uv sync`) before rerunning.

### Build verification
- `npm run build`: **FAIL**
- Root cause: TypeScript compile error in `src/app/(dashboard)/advanced/components/RebuildEmbeddings.tsx` (`Cannot find name 'language'`).
- Classification: **code regression**
- Severity: **blocker**
- Suggested quick fix: define `language` from i18n hook/context in that component or replace with existing locale variable already in scope.

## RTL visual findings
> No screenshot-based regression session could be run in this environment.

Expected high-risk areas to verify in staged rollout:
- Sidebar anchor and icon directions
- Mixed Persian/English truncation in cards
- Chat/streaming alignment and citation chips
- Modal/dialog close & action alignment
- Overflow/clipping on mobile widths

## Open issues + severity
1. **Blocker** — Frontend production build fails due to missing `language` variable in `RebuildEmbeddings.tsx`.
2. **High** — Backend pytest suite cannot start due to missing Python dependency (`dotenv`).
3. **Medium** — Critical user smoke tests were not executed end-to-end in a browser automation pipeline.

## Feature flag implementation
Implemented a controlled rollout gate:
- New flag resolver: `frontend/src/lib/feature-flags.ts`
- Flag key: `feature.fa_locale_enabled` (localStorage)
- Env override: `NEXT_PUBLIC_FEATURE_FA_LOCALE_ENABLED`
- Safe default: **disabled** (English-only locale + LTR)
- i18n init now conditionally enables Persian support only when flag is on.
- RTL application in provider now respects the same flag.

## Staged rollout plan

### Stage 1 — Internal team (0-5%)
- Audience: internal QA/devs
- Entry criteria: build green + smoke scripts available
- Pass criteria (24h):
  - Frontend runtime error rate < 0.5%
  - Critical flow API failure delta < 1% vs baseline
  - 0 blocker bugs, <=2 high bugs

### Stage 2 — Beta users (5-20%)
- Audience: opted-in beta users / Persian locale pref users
- Pass criteria (48h):
  - Runtime error rate < 1%
  - Login/search/settings complaint rate < 2% of beta reports
  - 0 blocker, <=3 high issues

### Stage 3 — Full rollout (100%)
- Audience: all users
- Pass criteria (72h after full):
  - Metrics stable within thresholds for 3 consecutive days
  - No unresolved blocker/high linked to fa-IR/RTL

## Monitoring & alerting
Track and alert on:
1. Frontend runtime errors (Sentry/console pipeline)
   - Alert: >1% sessions impacted for 10 min
2. Failed API interactions in critical flows (login, search/chat, settings save)
   - Alert: >3% failure rate for 15 min or >2x baseline
3. User-reported UX RTL regressions
   - Alert: >=5 unique complaints in 24h or any blocker complaint

## Rollback plan
Immediate rollback method:
1. Set `NEXT_PUBLIC_FEATURE_FA_LOCALE_ENABLED=false` (or force local flag off for internal users).
2. Redeploy frontend config/runtime env.
3. Verify default `en-US` + `dir=ltr` on health-check session.

### Exact rollback trigger conditions
- Any **blocker** bug in login/signup preventing auth completion.
- Frontend crash/runtime error rate >1.5% for 10+ minutes.
- Critical flow API failure rate >5% for 15+ minutes.
- Data-loss/corruption bug in settings or content operations.

## Release notes (draft)
- Added Persianization guard behind `feature.fa_locale_enabled` for safe staged rollout.
- Default behavior is unchanged/safe (English + LTR) unless explicitly enabled.
- Known limitation: build currently blocked by unrelated TypeScript issue in advanced embeddings component.
- Next actions: fix blocker build error, enable automated e2e smoke in fa-IR viewport matrix, begin internal rollout.

## Go/No-Go recommendation
**NO-GO** for production rollout on 2026-05-05 until blocker build error and test environment issues are resolved.
