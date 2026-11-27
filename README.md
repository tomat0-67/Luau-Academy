# Luau Academy

Application gratuite et open source pour apprendre Luau et le développement Roblox. Le dépôt fournit actuellement la fondation Tauri 2, React et TypeScript. Les cours, l’exécution Luau, la progression et les versions mobiles ne sont pas encore implémentés.

## Prérequis

- Node.js **22.12 ou plus récent** et npm. Vite 8 et Vitest 5 exigent cette version minimale.
- Rust stable installé avec `rustup`.
- Les dépendances système Tauri correspondant au système utilisé (voir les sections ci-dessous).

Versions verrouillées par `package-lock.json` et `src-tauri/Cargo.lock` : Tauri CLI 2.12.6 / crates Rust 2.12.7, React 19.3.1, TypeScript 7.0.2, Vite 8.4.0, Tailwind CSS 4.3.5, CodeMirror 6.0.2, Vitest 5.1.2 et Playwright 1.65.1. Pour reproduire l’installation du dépôt, utilisez `npm ci`.

## Arch Linux

Installer les dépendances WebKitGTK et les outils de compilation :

```bash
sudo pacman -Syu
sudo pacman -S --needed webkit2gtk-4.1 base-devel curl wget file openssl appmenu-gtk-module libappindicator-gtk3 librsvg xdotool nodejs npm rustup
rustup default stable
```

Vérifier les outils :

```bash
node --version
npm --version
rustc --version
cargo --version
```

Depuis la racine du dépôt, installer les dépendances JavaScript puis lancer l’application native :

```bash
npm ci
npm run tauri:dev
```

`npm run tauri:dev` lance Vite et la fenêtre Tauri ensemble. Pour lancer uniquement l’interface dans le navigateur, utilisez `npm run dev`; ce mode ne teste pas le backend Rust.

### Installer Luau Academy dans son compte Arch Linux

Depuis la copie du dépôt, lance le script d’installation :

```bash
./scripts/install-arch.sh
```

Le script vérifie Arch Linux, Node.js et Rust, propose d’installer les paquets système manquants avec `pacman`, installe les dépendances du projet, compile l’application et l’installe dans `~/.local/opt/luau-academy`. Il ajoute un raccourci au menu des applications et une commande `~/.local/bin/luau-academy`. L’installation de l’application dans ton compte ne requiert pas root; `sudo` n’est demandé que si des paquets Arch manquent.

Pour retirer l’application et son raccourci :

```bash
./scripts/install-arch.sh --uninstall
```

La désinstallation retire uniquement les fichiers installés par ce script. Elle ne supprime ni le dépôt, ni les caches npm/Rust.

### Icônes

Après `npm ci`, générer les formats d’icônes Tauri depuis le fichier SVG avant de créer les paquets Linux/Windows/macOS ou d’initialiser Android/iOS :

```bash
npm run tauri -- icon src-tauri/icons/icon.svg
```

### Build Linux

Créer les paquets Linux configurés par Tauri :

```bash
npm run tauri:build
```

Compiler seulement l’exécutable natif sans créer d’installateur :

```bash
npm run tauri -- build --no-bundle
```

Les fichiers générés se trouvent sous `src-tauri/target/release/` et `src-tauri/target/release/bundle/`.

## Tests et vérifications

```bash
npm run build
npm test
npx playwright install chromium
npm run test:e2e
cargo check --manifest-path src-tauri/Cargo.toml
```

L’installation Chromium avec Playwright est nécessaire avant le premier test navigateur. Elle peut utiliser un navigateur déjà installé ou télécharger Chromium.

## Tutoriel Luau intégré

L’application contient un parcours hors ligne de 12 leçons, d’environ 150 minutes : démarrer dans Roblox Studio, variables, conditions, boucles, fonctions, tables, objets et services Roblox, événements, scripts serveur/client, RemoteEvents et validation, ModuleScripts, types Luau stricts, puis un projet final de plaque piège. Chaque leçon donne des explications, un exemple, un exercice et une proposition de correction. La navigation et la validation des leçons fonctionnent; la progression est enregistrée dans le stockage local de l’application.

Les exemples de code sont étudiés et copiés dans Roblox Studio; cette version de Luau Academy ne les exécute pas. Roblox propose officiellement Studio pour Windows et macOS, pas Linux. Les instructions Roblox de ce parcours nécessitent donc Studio sur un ordinateur pris en charge. Voir la [configuration officielle de Roblox Studio](https://create.roblox.com/docs/studio/setup), la [référence Luau](https://luau.org/syntax/) et la [documentation de sécurité client-serveur](https://create.roblox.com/docs/scripting/security/client-server-boundary).

## Windows 10/11

Installer Node.js 22.12+, Rust stable avec la cible MSVC, **Microsoft C++ Build Tools** avec la charge « Desktop development with C++ », et le runtime **Microsoft Edge WebView2**. Puis, dans PowerShell à la racine du dépôt :

```powershell
npm ci
npm run tauri:dev
```

Pour créer un build Windows, exécuter `npm run tauri:build` sur Windows. Un build Arch Linux ne valide pas le build Windows.

## Android

Android peut être préparé depuis Linux, Windows ou macOS. Installer Android Studio, puis depuis son SDK Manager : Android SDK Platform, Platform-Tools, Build-Tools, Command-line Tools et NDK (Side by side). Après l’installation, configurer `JAVA_HOME`, `ANDROID_HOME` et `NDK_HOME`.

Exemple Linux avec le SDK installé dans `~/Android/Sdk` et Android Studio dans `/opt/android-studio` (adapter ces chemins si nécessaire) :

```bash
export JAVA_HOME=/opt/android-studio/jbr
export ANDROID_HOME="$HOME/Android/Sdk"
export NDK_HOME="$ANDROID_HOME/ndk/$(ls -1 "$ANDROID_HOME/ndk" | tail -n 1)"
export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin"
rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
npm ci
npm run tauri -- icon src-tauri/icons/icon.svg
npm run android:init
npm run android:dev
```

Pour compiler le paquet Android : `npm run android:build`. La génération nécessite le SDK et le NDK configurés. Ce dépôt n’a pas encore été validé sur un appareil ou un émulateur Android.

## iOS et macOS

Les builds iOS ne peuvent être créés que sur macOS avec la version complète de Xcode (pas seulement les Command Line Tools), CocoaPods et Rust. Installer Xcode, l’ouvrir une fois pour terminer sa configuration, puis installer CocoaPods avec Homebrew :

```bash
brew install cocoapods
rustup target add aarch64-apple-ios x86_64-apple-ios aarch64-apple-ios-sim
npm ci
npm run tauri -- icon src-tauri/icons/icon.svg
npm run ios:init
npm run ios:dev
```

`npm run ios:build` compile la version iOS. Un Mac avec Xcode est également requis pour construire et tester la version macOS. Ces plateformes ne sont pas validées par le build Linux.

## Configuration et architecture

- Copier `.env.example` vers `.env` pour les variables locales de développement. Ne pas ajouter de secrets dans les variables `VITE_*` : elles sont intégrées au frontend.
- `src/` contient l’interface et les modules applicatifs; `src-tauri/` le backend Rust; `content/` les contenus pédagogiques; `runtime/luau/` est réservé au vrai runtime Luau.
- SQLite est préparé par le plugin Rust, mais aucun schéma ni service de stockage applicatif n’est encore livré.
- CodeMirror 6 est installé, mais n’est pas encore intégré à un écran d’édition.
- Aucun faux interpréteur Luau n’est utilisé. L’exécution réelle du code apprenant reste à implémenter.

Voir [ARCHITECTURE.md](ARCHITECTURE.md) et [ROADMAP.md](ROADMAP.md) pour les limites actuelles et les phases prévues.

## Compatibilité vérifiée

Le build frontend, les tests Vitest et Playwright, `cargo check` et la compilation de l’exécutable Tauri Linux ont été exécutés avec succès sur Arch Linux. Windows, Android, macOS et iOS demandent leurs outils natifs et leurs propres vérifications avant de pouvoir être annoncés comme pris en charge.
