# DEN Rider

React 19 + Vite application for the DEN Global rider delivery workspace. Uses the same central API, secure cookie session, origin checking and CSRF header as every other DEN application. Its base path is `/rider/`.

## Implemented

Vehicle onboarding and verification state; eligible job feed and atomic reservation; release before pickup; organization QR scanning or manual token verification; Ready/handoff-gated pickup; separate cash confirmation, delivery-code verification, and short-lived customer delivery QR. Rider communities enforce the five-membership cap server-side.

Shared features include account registration/login, MFA enrollment and reauthentication, profile, notifications, read-only wallet ledger, workspace navigation, and order-scoped chat and last-reported location where authorized. Rider GPS sharing is an explicit browser action; no fabricated location, ETA or payment balance is shown. Chat/location reads are refreshed on demand. A browser with BarcodeDetector and camera permission supports QR camera scanning; other browsers have a clearly labelled manual-token fallback.

## Local build

```sh
npm ci
npm test
npm run build
```

Clone `den-backend` beside this directory. Build this app, then run `npm run dev` from the backend and open `http://localhost:8787/rider/`. The local backend serves all built role apps under one origin; the same HttpOnly cookie is used everywhere. A standalone Vite dev server requires backend `DEN_APP_ORIGIN` to match that dev-server origin exactly. No CORS relaxation is enabled.

## Shared contracts and releases

`vendor/den-shared` is a versioned snapshot from `DEN-Global/den-shared` with SHA-256 provenance. It is installed via a local file dependency, so a private GitHub token is not needed to build this repository in CI. `npm test` verifies every shared source and contract file against `PROVENANCE.json`. Update in the shared repository, run `node scripts/sync-apps.mjs` with sibling role checkouts, review the changes and commit coordinated snapshots. Do not edit vendor sources directly. The route manifest is `vendor/den-shared/contracts/v1.json`.

## Safety and readiness

This is a development integration preview, not a complete production platform. Sandbox checkout requires an explicit backend flag and collects no funds. International Trade is locked by default; no carrier or customs activation is configured. Email verification, recovery codes, secure document uploads, payment providers and production deployment remain unfinished. The client never grants permissions: every sensitive action is checked by the backend. No real identities or credentials are bundled.

CI runs a clean install, snapshot verification, production build and dependency audit. Full marketplace-to-delivery and authorization tests live in `den-backend`. Browser acceptance evidence is recorded centrally in `den-shared/docs/frontend-verification.md`.
