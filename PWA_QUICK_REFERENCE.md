# PWA Quick Reference Guide

## What is a PWA?

A Progressive Web App (PWA) is a web application that works like a native app:
- **Installable** on home screen / app menu
- **Offline capable** with cached content
- **Fast loading** on repeat visits
- **Engaging** with notifications and updates

## Key Files

| File | Purpose |
|------|---------|
| `manifest.json` | App configuration & icons |
| `offline.html` | Shows when no internet |
| `sw.js` (generated) | Service worker for caching |
| `PWAInstallPrompt.tsx` | Install button component |
| `PWAUpdatePrompt.tsx` | Update notification |

## User Installation

### Android/Chrome
1. Visit site
2. Wait 30 seconds
3. Click "Install" prompt
4. Appears on home screen

### iOS/Safari
1. Visit site
2. Tap Share button (↗️)
3. Tap "Add to Home Screen"
4. Name: "Nirman Setu"
5. Tap "Add"

### Desktop
1. Visit site in Chrome/Edge
2. Click install icon (top right)
3. Opens in standalone window

## Development Commands

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Regenerate icons
node generate-pwa-icons.mjs

# Preview build
npm run preview
```

## Testing PWA

### In Browser DevTools

1. **Open DevTools** (F12)
2. **Application Tab**
   - Check "Manifest" section
   - Verify service worker status
   - View cached files

3. **Test Offline**
   - Go to "Network" tab
   - Check "Offline" checkbox
   - Reload page
   - Should show cached content

4. **Simulate Install**
   - DevTools → Network → Slow 3G
   - Wait 30+ seconds
   - Look for install prompt

### Lighthouse Audit

```bash
# Run Lighthouse on production build
npm run build
npx lighthouse http://localhost:5173 --view
```

**Target Score**: 90+ for PWA

## Customization

### Change Brand Colors

1. Update `vite.config.ts`:
   ```ts
   theme_color: "#YOUR_COLOR"
   background_color: "#YOUR_COLOR"
   ```

2. Regenerate icons:
   ```bash
   node generate-pwa-icons.mjs
   ```

3. Rebuild:
   ```bash
   npm run build
   ```

### Modify Offline Page

Edit `/public/offline.html` - no rebuild needed

### Update App Shortcuts

Edit manifest in `vite.config.ts` shortcuts array

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No install prompt | Ensure HTTPS (not HTTP) |
| Icons missing | Run `node generate-pwa-icons.mjs` |
| Offline page blank | Check `/public/offline.html` exists |
| Updates not working | Close all app windows, clear cache |
| Manifest error | Validate at https://www.w3.org/TR/appmanifest/ |

## Browser Support

| Browser | Status |
|---------|--------|
| Chrome Android | ✓ Full support |
| Chrome Desktop | ✓ Full support |
| Firefox | ✓ Full support |
| Edge | ✓ Full support |
| Safari iOS | ✓ Limited (manual install) |
| Safari Mac | ✓ Full support |

## Deployment Checklist

- [ ] Build succeeds: `npm run build`
- [ ] Service worker generates in `dist/`
- [ ] Icons in `/public/icons/`
- [ ] Manifest link in `index.html`
- [ ] Site uses HTTPS
- [ ] Test on mobile device
- [ ] Test offline mode
- [ ] Test installation
- [ ] Run Lighthouse audit
- [ ] Monitor analytics for installs

## Important Notes

**HTTPS Required**: PWA features only work on HTTPS (except localhost)

**Cache Strategy**:
- App shell cached forever
- APIs refresh first, cache second
- Fonts/CDN cached for 1 year

**Update Flow**:
1. New version available
2. User sees "Update Available"
3. Clicks "Update Now"
4. Page reloads smoothly

## Performance Tips

1. **Minimize precache size**
   - Currently: 774 KB
   - Limit: 5 MB (configured)
   - Monitor in DevTools Storage

2. **Monitor cache hits**
   - DevTools Network tab
   - Look for "ServiceWorker" in Size column
   - Goal: 70%+ cache hit rate

3. **Optimize images**
   - Large images impact cache
   - Consider lazy loading
   - Use appropriate formats

## Security Notes

- Service worker validates all resources
- Content Security Policy enforced
- HTTPS prevents tampering
- Users can clear cache anytime

## Analytics

Track PWA adoption:

```ts
// Detect if running as PWA
const isPWA = window.matchMedia("(display-mode: standalone)").matches;

// Track installations
window.addEventListener("beforeinstallprompt", () => {
  // User can install
});

// Track updates
navigator.serviceWorker?.addEventListener("controllerchange", () => {
  // App updated
});
```

## Resources

- **Full Guide**: `/PWA_GUIDE.md`
- **Implementation Details**: `/PWA_IMPLEMENTATION_SUMMARY.md`
- **MDN PWA**: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
- **Web.dev**: https://web.dev/progressive-web-apps/
- **Workbox**: https://developers.google.com/web/tools/workbox

## Need Help?

1. Check `/PWA_GUIDE.md` for detailed documentation
2. Review `/PWA_IMPLEMENTATION_SUMMARY.md` for technical details
3. Visit https://web.dev/pwa-checklist/ for PWA standards
4. Test with Lighthouse for recommendations

---

**Your Nirman Setu PWA is ready to deploy! 🚀**
