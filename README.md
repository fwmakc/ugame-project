# Шаблон для игр на движке UGame

Создан на основе https://github.com/fwmakc/ts-vite-project

Шаблон поддерживает мультиплатформенную разработку приложений под web, Windows / MacOS / Linux / Android / IOS.

- TypeScript, Vite,
- сборка под desktop с помощью Electron,
- сборка под mobile с помощью Capacitor,
- автопроверки и форматирование ESLint, Prettier,
- автотесты Vitest,
- модули ECMAScript (вместо CommonJS),
- стандарт ES2022.

# Начало работы

Выполняем

```
yarn create ugame
# npm create ugame
```

Проект будет установлен в папку с названием проекта.

> Первым аргументом можно указать название проекта. Тогда будет выполнена автоматическая ускоренная установка без дополнительных вопросов. Также автоматически будут установлены базовые зависимости.

# Быстрый запуск

В режиме разработки:

```
yarn dev
# npm run dev
```

Сборка проекта:

```
yarn build
# npm run build
```

> Во время сборки запускается линтер, прохождение тестов, компиляция TypeScript и минификация.

Можно выполнить только компиляцию:

```
yarn compile
# npm run compile
```

Запуск:

```
yarn preview
# npm run preview
```

# Запуск под десктоп

В режиме разработки

```
yarn electron:dev
```

# Билд под десктопные устройства

## Общие настройки

Следующие настройки берутся из **package.json**:

- name, имя пакета,
- productName, название приложения,
- version, версия,
- author, автор,
- description, описание.

## Electron Builder

Это более классический установщик.

За билд отвечает **electron builder**, файл настроек **electron-builder.config.js**.

Общий конфиг для всех устройств задается в корневых полях.

За билд под ОС **Windows** отвечает секция **win**. В поле **target** указан **nsis**.

Группа **nsis** отвечает за настройки этого установщика.

Собираем приложение под десктоп

```
yarn electron:build
```

Готовое приложение будет лежать в каталоге

```
out/electron-builder
```

## Electron Forge

Это более новый установщик.

За билд отвечает **electron forge**, файл настроек **forge.config.js**.

Общий конфиг для всех устройств задается в секции **packagerConfig**:

- icon, иконка приложения,
- asar, упаковщик ресурсов,
- asarUnpack, внутренние ресурсы, которые будут запакованы,
- extraResource, внешние ресурсы, которые не будут оставлены снаружи приложения.

За билд под ОС **Windows** отвечает **maker-squirrel**.

Здесь прописаны иконки:

- iconUrl, намеренно оставлена пустой,
- setupIcon, иконка для установки,
- loadingGif, изображение во время установки.

и другие настройки.

Собираем приложение под десктоп

```
yarn electron:make
```

Готовое приложение будет лежать в каталоге

```
out/make/squirrel.windows
```

## Билд под MacOS

* информация не проверена

Добавить в **forge.config.js**:

```
  packagerConfig: {
    name: 'YourApp',
    executableName: 'YourApp',
    appBundleId: 'com.yourcompany.yourapp',
    appCategoryType: 'public.app-category.productivity',
    osxSign: {
      identity: 'Developer ID Application: Your Name (TEAM_ID)',
      'hardened-runtime': true,
      entitlements: 'entitlements.plist',
      'entitlements-inherit': 'entitlements.plist',
      'signature-flags': 'library'
    },
    osxNotarize: {
      tool: 'notarytool',
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID
    }
  },
```

Упрощенная конфигурация (без подписи):

```
  packagerConfig: {
    name: 'YourApp',
    osxSign: {},
    osxNotarize: {
      tool: 'notarytool',
    }
  },
```

Сборка приложения:

```
# Только упаковать приложение (без установщиков)
npm run package

# Создать установщики (DMG, ZIP)
npm run make

# Собрать только для macOS
npm run make -- --platform darwin

# Собрать для конкретной архитектуры
npm run make -- --platform darwin --arch x64
npm run make -- --platform darwin --arch arm64
npm run make -- --platform darwin --arch universal
```

Для подписи и нотификации cоздайте файл **entitlements.plist**:

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
    <key>com.apple.security.automation.apple-events</key>
    <true/>
</dict>
</plist>
```

Подписать приложение:

```
npm run build --electron-mac-sign --product-id="your-product-id" --app-id="your-app-id" --name="Your-app-name" --version="version-number" --keystore-path=path/to/keystore-file.p12 --store-password=password
```

## Подготовка к сборке под мобильные устройства

Сборку делаем через capacitor. Полностью все происходит в несколько шагов.

Для настройки отредактируйте файл

```
capacitor.config.ts
```

Добавляем мобильное устройство. Это нужно сделать один раз после развертывания проекта.

```
yarn cap add android
```

Созданный каталог android содержит множество настроек приложения, которые хотелось бы сохранить в репозитории. Но он также содержит много временных файлов и копии проекта и поэтому получается слишком большим.

Мы создали другой каталог app, где вы можете хранить все настройки и ресурсы для сборки.

Перед сборкой вам просто нужно скопировать его содержимое

```
cp -rf app/android/* android/app/src/main
```

или

```
xcopy app\android\* android\app\src\main /E /H /C /I /Y
```

Выполняем предварительную сборку

```
yarn build
```

Копируем собранный проект для следующего этапа

```
yarn cap copy
```

## Билд под мобильные устройства

Для дальнейшей сборки под android лучше всего работать в контейнере nodejs из проекта https://github.com/isengine/server.git

Перейдем в каталог

```
cd android
```

Билд в режиме дебаг:

```
./gradlew assembleDebug
```

Готовое приложение будет лежать в каталоге

```
android/app/build/outputs/apk/debug/app-debug.apk
```

Билд в продакшн:

```
./gradlew assembleRelease
```

Готовое приложение теперь будет лежать в каталоге

```
android/app/build/outputs/apk/release/app-release-unsigned.apk
```

Дальнейшие действия лучше выполнять из корневого каталога проекта

```
cd ..
```

Создаем ключ для подписи

```
keytool -genkey -v -keystore MY_RELEASE_KEY.jks -keyalg RSA -keysize 2048 -validity 10000 -alias MY_KEY_ALIAS

```

Запишите созданные пароли и alias, так как они понадобятся вам в дальнейшем.

Создаем копию приложения

```
cp android/app/build/outputs/apk/release/app-release-unsigned.apk android/app/build/outputs/apk/release/app-release.apk
```

Подписываем приложение

```
apksigner sign --ks MY_RELEASE_KEY.jks --ks-key-alias MY_KEY_ALIAS --ks-pass pass:YOUR_KEYSTORE_PASSWORD --key-pass pass:YOUR_KEY_PASSWORD android/app/build/outputs/apk/release/app-release.apk
```

Можно проверить подпись

```
apksigner verify android/app/build/outputs/apk/release/app-release.apk
```

Если APK подписан правильно, вы не увидите никаких ошибок.

# Тестирование

Тестируем с помощью **Vitest**.

**Vitest** очень похож на **Jest**, но сразу оптимизирован для использования с **TypeScript** и **Vite**. С его помощью можно также тестировать DOM-элементы.

Примеры использования приведены в проекте.

Файлы для тестирования должны называться по маске **.test.ts** или **.spec.ts**:

```
src/intro.test.ts
```

Можно использовать наборы кейсов для тестирования. Они должны называться по маске **.case.ts**:

```
src/intro.case.ts
```

Хорошей практикой может быть помещать тесты и кейсы в отдельные папки:

```
tests/
├── cases/
|   ├── ....case.ts
│   └── intro.case.ts
├── ....test.ts
└── intro.test.ts
```

Для запуска всех тестов используем команду

```
yarn test
# npm run test
```

Чтобы запустить какой-либо определенный тест, указываем его в качестве аргумента:

```
yarn test ./src/tests/example.test.ts
# npm run test ./src/tests/example.test.ts
```

# Поддержка

Больше интересных библиотек в репозитории.

Если проект понравился, и вы хотите меня поддержать, не пожалейте поставить звездочку.

А сейчас просто обнимите своих родных и близких, скажите им, как вы их любите.

# Лицензия

Лицензия MIT, 2025
