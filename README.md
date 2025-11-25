# Gasto Fácil - Guía de Compilación del APK

Este documento contiene las instrucciones paso a paso para compilar la aplicación Gasto Fácil como un APK de Android.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (v14 o superior)
   - Descarga desde: https://nodejs.org/

2. **Java Development Kit (JDK)** (v11 o superior)
   - Requerido para compilar el APK
   - Descarga desde: https://www.oracle.com/java/technologies/downloads/

3. **Android SDK**
   - Se recomienda instalar Android Studio
   - Descarga desde: https://developer.android.com/studio

4. **Gradle** (generalmente incluido con Android SDK)

## Pasos para Compilar el APK

### Paso 1: Clonar o Descargar el Proyecto

```bash
git clone <tu-repositorio>
cd gasto-facil
```

### Paso 2: Instalar Dependencias

Instala todas las dependencias de npm:

```bash
npm install
```

### Paso 3: Compilar la Aplicación Angular

Compila la aplicación en modo producción:

```bash
npm run build
```

Este comando generará los archivos optimizados en el directorio `www/`.

### Paso 4: Sincronizar con Capacitor

Una vez compilada la aplicación, sincroniza los archivos web con Capacitor:

```bash
npx cap sync
```

Este comando copiará los archivos compilados al proyecto de Android.

### Paso 5: Compilar el APK

#### Opción A: APK de Debug (para pruebas)

Si deseas un APK para pruebas en desarrollo:

```bash
cd android
./gradlew assembleDebug
```

El APK se ubicará en:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

#### Opción B: APK de Release (para producción)

Para compilar un APK optimizado para producción:

```bash
cd android
./gradlew assembleRelease
```

El APK se ubicará en:
```
android/app/build/outputs/apk/release/app-release-unsigned.apk
```

### Paso 6: Instalar el APK en un Dispositivo

Para instalar el APK en un dispositivo Android conectado por USB:

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

O si prefieres usar release:

```bash
adb install -r android/app/build/outputs/apk/release/app-release-unsigned.apk
```

## Solución de Problemas

### Problema: "sdk.dir not found"

**Solución:** Crea un archivo `android/local.properties` con la ruta de tu Android SDK:

```properties
sdk.dir=C:/Users/[TuUsuario]/AppData/Local/Android/Sdk
```

Reemplaza `[TuUsuario]` con tu nombre de usuario de Windows.

### Problema: Caracteres especiales en la ruta del proyecto

Si la ruta contiene caracteres no ASCII (acentos), el archivo `android/gradle.properties` ya incluye:

```properties
android.overridePathCheck=true
```

### Problema: "ng.cmd run app:serve --host=localhost --port=8100"

Este error se resolvió updateando TypeScript a versión 4.9.5 compatible con Angular 15.

## Versiones Utilizadas

- **Angular**: 15.2.0
- **Ionic**: 6.0.0
- **Capacitor**: 5.x
- **TypeScript**: 4.9.5
- **Node.js**: 16.x o superior

## Desarrollo Local

Para ejecutar la aplicación en modo desarrollo:

```bash
npm start
```

Esto iniciará el servidor de desarrollo en `http://localhost:4200`

## Estructura del Proyecto

```
gasto-facil/
├── src/                    # Código fuente
│   ├── app/               # Componentes Angular
│   │   ├── pages/        # Páginas de la aplicación
│   │   ├── services/     # Servicios
│   │   └── models/       # Modelos de datos
│   ├── index.html        # HTML principal
│   └── main.ts           # Punto de entrada
├── android/              # Proyecto Android (Capacitor)
├── www/                  # Archivos compilados (se genera al compilar)
├── package.json          # Dependencias npm
└── angular.json          # Configuración Angular
```

## Recursos Útiles

- **Documentación de Ionic**: https://ionicframework.com/docs
- **Documentación de Capacitor**: https://capacitorjs.com/
- **Documentación de Angular**: https://angular.io/
- **Android Developer Docs**: https://developer.android.com/

## Soporte

Si tienes problemas al compilar el APK:

1. Verifica que todas las dependencias estén instaladas correctamente
2. Asegúrate de que el Android SDK y JDK están correctamente configurados
3. Revisa los logs de error en la terminal
4. Intenta limpiar el proyecto con: `./gradlew clean`

## Próximos Pasos (Para Distribución)

Si deseas distribuir la aplicación en Google Play Store:

1. **Firmar el APK**: Necesitarás crear un keystore y firmar el APK
2. **Optimizar**: El APK de release ya viene optimizado
3. **Configurar**: Ajusta la versión y el nombre de la aplicación en `capacitor.config.ts`

---

**Última actualización**: Noviembre 2025
