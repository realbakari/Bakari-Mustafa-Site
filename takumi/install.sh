#!/usr/bin/env bash
# Takumi OS: what `curl -fsSL https://www.bakarimustafa.com/takumi/install.sh | bash` runs.
# A copy of install/fetch.sh from Takumi's source. It fetches Takumi into ~/.local/share/takumi
# and hands off to install/run.sh. Read it before you run it: https://www.bakarimustafa.com/takumi/docs/install/
set -euo pipefail

[[ $EUID -ne 0 ]] || { echo "Run as your user, not root. The installer uses sudo where it must." >&2; exit 1; }
[[ -f /etc/arch-release ]] || { echo "Takumi installs on Arch Linux only." >&2; exit 1; }

repo=${TAKUMI_REPO:-https://github.com/realbakari/takumi-os.git}
ref=${TAKUMI_REF:-main}
dest=${TAKUMI_PATH:-$HOME/.local/share/takumi}

command -v git >/dev/null || sudo pacman -Sy --needed --noconfirm git   # pacman
if [[ -d "$dest/.git" ]]; then
  git -C "$dest" fetch -q origin "$ref" && git -C "$dest" checkout -q "$ref" && git -C "$dest" pull -q --ff-only
else
  rm -rf "$dest"; git clone -q --branch "$ref" "$repo" "$dest"
fi
exec bash "$dest/install/run.sh" "$@"
