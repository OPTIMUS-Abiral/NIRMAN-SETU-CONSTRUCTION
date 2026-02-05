# Progressive Web App (PWA) Implementation Guide

## Overview

Nirman Setu Construction website has been fully configured as a Progressive Web App, allowing users to install it on their devices for offline access, improved performance, and native app-like experience.

## Features Implemented

### 1. Installation Support
- **Android/Chrome**: Users see an install prompt to add the app to their home screen
- **iOS**: Users can manually add via the share menu ("Add to Home Screen")
- **Desktop**: Available on Windows, Mac, and Linux browsers that support PWA

### 2. Offline Support
- Service worker caches essential assets
- Offline page displays when network is unavailable
- Network-first strategy for API calls with fallback to cache
- Cache-first strategy for static assets and fonts

### 3. Performance Optimization
- Workbox integration for intelligent caching
- Precaching of critical assets
- Runtime caching for API responses
- Automatic cache cleanup on updates

### 4. Update Management
- Users receive notifications when updates are available
- Seamless update experience without losing data
- Service worker update detection

## File Structure

```
public/
├── manifest.json                 # PWA manifest configuration
├── offline.html                 # Offline fallback page
├── browserconfig.xml            # Windows tile configuration
└── icons/                       # PWA icons (all sizes)
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    ├── icon-512x512.png
    ├── icon-192x192-maskable.png
    ├── icon-512x512-maskable.png
    ├── icon-180x180.png          # Apple touch icon
    ├── screenshot-540x720.png    # Mobile screenshot
    └── screenshot-1280x720.png   # Desktop screenshot

src/components/
├── PWAInstallPrompt.tsx         # Installation UI component
└── PWAUpdatePrompt.tsx          # Update notification component
```

## Installation Instructions for Users

### Android/Chrome
1. Visit the Nirman Setu website
2. Click the install button in the browser prompt
3. The app will be installed on your home screen
4. Open it like any other app

### iOS Safari
1. Visit the Nirman Setu website in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Name the shortcut and tap "Add"
5. The app will appear on your home screen

### Desktop (Windows/Mac/Linux)
1. Visit the Nirman Setu website
2. Click the install icon in the address bar (Chrome/Edge)
3. Click "Install"
4. The app will open in a standalone window

## Development & Testing

### Building for Production
```bash
npm run build
```

The build process automatically generates:
- Service worker (`sw.js`)
- Manifest with asset hashes
- Optimized cache configuration

### Testing PWA Features

#### 1. Test Installation
- Open DevTools (F12)
- Go to Application → Manifest
- Verify manifest is loaded correctly
- Look for install button in browser UI

#### 2. Test Service Worker
- Open DevTools → Application → Service Workers
- Check service worker is registered and running
- Test offline mode (DevTools → Network → Offline)

#### 3. Test Caching
- Open DevTools → Application → Cache Storage
- View cached files
- Verify cache strategies are working

#### 4. Test Installation Prompt
- Use Chrome DevTools Protocol to trigger install prompt
- Or wait 30 seconds after visiting the page

### Lighthouse PWA Audit
```bash
# Run lighthouse audit
npm run build
npx lighthouse https://localhost:8080 --view
```

**Ideal Score**: 90+ for PWA category

## Manifest Configuration

The `manifest.json` includes:

```json
{
  "name": "Nirman Setu Construction",
  "short_name": "Nirman Setu",
  "description": "Premier construction company...",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#0a0f1c",
  "background_color": "#0a0f1c"
}
```

### Key Settings
- **display**: "standalone" - Runs like a native app
- **scope**: "/" - Defines app boundaries
- **start_url**: "/" - Home page on launch
- **orientation**: "portrait-primary" - Preferred orientation
- **theme_color**: Matches brand navy color
- **background_color**: Splash screen background

## Service Worker Strategy

### Caching Strategies

1. **Precache** (Network-only initially, then cache)
   - HTML, CSS, JS bundles
   - Fonts and icons

2. **Cache-First** (Offline-first)
   - Google Fonts
   - CDN resources
   - Static images

3. **Network-First** (Online-first, fallback to cache)
   - API calls
   - Fresh data priority

4. **Offline Fallback**
   - Shows offline.html when no network

## Performance Metrics

### Expected Improvements
- **Installation**: Adds icon to home screen
- **Loading**: 2-3x faster on repeat visits (cache)
- **Offline**: Core features work without internet
- **Engagement**: Push notifications ready
- **Size**: Efficient caching reduces data usage

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome/Edge | ✓ Full | Install prompt works |
| Firefox | ✓ Full | Install prompt works |
| Safari (iOS) | ✓ Limited | Manual "Add to Home Screen" |
| Safari (Mac) | ✓ Full | Install prompt works |
| Samsung Internet | ✓ Full | Install prompt works |

## Security Considerations

1. **HTTPS Required**: PWA features only work on HTTPS (https:// and localhost)
2. **Content Security Policy**: Configured to allow necessary resources
3. **Service Worker Scope**: Limited to app boundaries
4. **Cache Security**: Sensitive data not cached by default

## Troubleshooting

### Install Prompt Not Showing
- Ensure site is HTTPS
- Page must be visited for 30+ seconds
- Criteria: manifest valid, SW registered, assets cached
- User may have dismissed it (check browser settings)

### Service Worker Not Updating
- Users must close all app windows
- Clear app cache in settings
- Manual update: Go to Settings → Apps → Nirman Setu → Storage → Clear Cache

### Icons Not Displaying
- Verify icon files exist in `/public/icons/`
- Check manifest paths are correct
- Regenerate icons: `node generate-pwa-icons.mjs`

### Offline Page Not Showing
- Check `/public/offline.html` exists
- Verify offline route in vite.config.ts
- Check cache configuration in workbox options

## Maintenance

### Updating Icons
```bash
# Update if brand colors or design changes
node generate-pwa-icons.mjs
```

### Cache Versioning
- Automatic: Change `version` in workbox config
- Manual: Update cache names in service worker

### Testing Updates
1. Make code changes
2. Run `npm run build`
3. Deploy to staging
4. Open DevTools → Application → Service Workers
5. Click "Update" button
6. Refresh page to verify changes

## Next Steps

1. **Deploy**: Ensure site runs on HTTPS
2. **Monitor**: Check PWA installation rates in analytics
3. **Optimize**: Analyze cache hit rates and performance
4. **Enhance**: Add push notifications for project updates
5. **Expand**: Implement app shortcuts for quick access

## Resources

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Google PWA Checklist](https://web.dev/pwa-checklist/)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [Web App Manifest Spec](https://www.w3.org/TR/appmanifest/)

## Support

For PWA-related issues:
1. Check browser console for errors
2. Review DevTools Service Workers tab
3. Verify manifest in DevTools Application tab
4. Check cache storage for expected files
5. Test on different browsers and devices

---

**Last Updated**: February 2026
**Version**: 1.0
