#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="Luau Academy"
APP_ID="luau-academy"
APP_DIR="${HOME}/.local/opt/${APP_ID}"
BIN_DIR="${HOME}/.local/bin"
DESKTOP_FILE="${HOME}/.local/share/applications/${APP_ID}.desktop"
ICON_FILE="${HOME}/.local/share/icons/hicolor/256x256/apps/${APP_ID}.png"

usage() {
  cat <<'EOF'
Usage: ./scripts/install-arch.sh [--uninstall | --help]

Builds Luau Academy from this checkout and installs it for the current user.
The install and uninstall steps do not require root. Missing Arch packages
are offered through pacman and sudo.
EOF
}

remove_installation() {
  rm -rf -- "$APP_DIR"
  rm -f -- "$BIN_DIR/$APP_ID" "$DESKTOP_FILE" "$ICON_FILE"
  printf 'Luau Academy has been removed from this user account.\n'
  printf 'Source files, Rust/npm caches, and user data were left untouched.\n'
}

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  usage
  exit 0
fi

if [[ "${1:-}" == "--uninstall" ]]; then
  remove_installation
  exit 0
fi

if [[ $# -gt 0 ]]; then
  usage >&2
  exit 2
fi

if [[ "${EUID}" -eq 0 ]]; then
  printf 'Do not run this installer as root; it installs into your user account.\n' >&2
  exit 1
fi

if [[ ! -f /etc/arch-release ]]; then
  printf 'This installer is for Arch Linux. See README.md for other platforms.\n' >&2
  exit 1
fi

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

required_packages=(webkit2gtk-4.1 base-devel curl wget file openssl appmenu-gtk-module libappindicator-gtk3 librsvg xdotool nodejs npm rustup)
missing_packages=()
for package in "${required_packages[@]}"; do
  if ! pacman -Q "$package" >/dev/null 2>&1; then
    missing_packages+=("$package")
  fi
done

if ((${#missing_packages[@]} > 0)); then
  printf 'The following Arch packages are required:\n  %s\n' "${missing_packages[*]}"
  read -r -p 'Install them now with sudo pacman? [y/N] ' answer
  if [[ ! "$answer" =~ ^[Yy]$ ]]; then
    printf 'Install the listed packages, then run this installer again.\n' >&2
    exit 1
  fi
  sudo pacman -S --needed "${missing_packages[@]}"
fi

if ! command -v node >/dev/null 2>&1; then
  printf 'Node.js was not found after dependency installation.\n' >&2
  exit 1
fi

read -r node_major node_minor < <(node -p 'process.versions.node.split(".").slice(0, 2).join(" ")')
if ((node_major < 22 || (node_major == 22 && node_minor < 12))); then
  printf 'Node.js 22.12 or newer is required; found %s.\n' "$(node --version)" >&2
  exit 1
fi

if ! command -v rustup >/dev/null 2>&1; then
  printf 'rustup was not found after dependency installation.\n' >&2
  exit 1
fi
active_toolchain="$(rustup show active-toolchain 2>/dev/null || true)"
if [[ -z "$active_toolchain" || "$active_toolchain" == "no active toolchain" ]]; then
  rustup default stable
fi

printf '\nInstalling JavaScript dependencies...\n'
npm ci

printf '\nGenerating app icons...\n'
npm run tauri -- icon src-tauri/icons/icon.svg

printf '\nBuilding the native Linux app...\n'
npm run tauri -- build --no-bundle

release_binary="$ROOT_DIR/src-tauri/target/release/luau-academy"
if [[ ! -x "$release_binary" ]]; then
  printf 'Build completed without the expected executable: %s\n' "$release_binary" >&2
  exit 1
fi

install -d "$APP_DIR" "$BIN_DIR" "$(dirname -- "$DESKTOP_FILE")" "$(dirname -- "$ICON_FILE")"
install -m 755 "$release_binary" "$APP_DIR/$APP_ID"
ln -sfn "$APP_DIR/$APP_ID" "$BIN_DIR/$APP_ID"
install -m 644 src-tauri/icons/icon.png "$ICON_FILE"

cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=${APP_NAME}
Comment=Learn Luau for Roblox
Exec="${APP_DIR}/${APP_ID}"
Icon=${APP_ID}
Terminal=false
Categories=Education;Development;
StartupNotify=true
EOF
chmod 644 "$DESKTOP_FILE"

printf '\nLuau Academy is installed for this user.\n'
printf 'Launch it from the application menu or with: %s\n' "$BIN_DIR/$APP_ID"
