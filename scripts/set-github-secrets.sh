#!/usr/bin/env bash
# Setzt die Amazon-PA-API Repo-Secrets fuer historische-schuhe.de.
# Liest die Werte aus der lokalen .secrets-Datei (nichts wird abgetippt/hardcodet).
# Voraussetzung: gh ist eingeloggt (gh auth status) und hat Zugriff aufs Repo.
set -euo pipefail

ENV_FILE="/Users/joshuastark/Documents/Claude Code/.secrets/amazon-paapi-historische-schuhe.env"
REPO="strkmrktnghdlbrg/historische-schuhe.de"

if [ ! -f "$ENV_FILE" ]; then
  echo "FEHLER: $ENV_FILE nicht gefunden." >&2
  exit 1
fi

# .env laden
set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

for var in AMAZON_PAAPI_ACCESS_KEY AMAZON_PAAPI_SECRET_KEY AMAZON_PARTNER_TAG; do
  val="${!var:-}"
  if [ -z "$val" ]; then echo "FEHLER: $var fehlt in $ENV_FILE" >&2; exit 1; fi
  gh secret set "$var" --repo "$REPO" --body "$val"
  echo "  gesetzt: $var"
done

echo "Fertig. Repo-Secrets fuer $REPO gesetzt."
echo "Test:  gh workflow run \"Amazon-Produktdaten aktualisieren\" -R $REPO"
