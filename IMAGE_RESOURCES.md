# EcoGuide - Image Resources

## 📸 Direct Image URLs (Unsplash)

All images are from Unsplash with direct CDN links for optimal performance.

### Hero Section
**Video Placeholder**
- URL: `https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop`
- Theme: Environmental sustainability, nature, eco-friendly

---

### Section Images

#### 1. What EcoGuide Is
- **URL**: `https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop`
- **Theme**: Green leaf, nature, environmental awareness
- **Icon**: 🍃 Leaf

#### 2. Why We Created EcoGuide
- **URL**: `https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop`
- **Theme**: Light bulb with plant, sustainable ideas, innovation
- **Icon**: 💡 Bulb

#### 3. What the Project Aims to Do
- **URL**: `https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop`
- **Theme**: Forest path, journey, clear direction, goals
- **Icon**: 🎯 Target Lock

#### 4. Problems We Solve
- **URL**: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop`
- **Theme**: Hands holding sprout, solutions, growth, care
- **Icon**: ✅ Check Shield

#### 5. How EcoGuide Works
- **URL**: `https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop`
- **Theme**: Technology meets nature, process, workflow
- **Icon**: ⚙️ Cog

#### 6. Who EcoGuide Is For
- **URL**: `https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop`
- **Theme**: Group of people, community, diverse users
- **Icon**: 👥 Group

---

## 🔄 Alternative Image Sources

If you want to replace any images, here are alternative Unsplash URLs:

### Environmental/Nature Themes
```
https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=600&fit=crop
```

### Technology + Environment
```
https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop
```

### People + Sustainability
```
https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop
```

---

## 📥 How to Download Images Locally

If you want to host images locally instead:

### Option 1: Download via Browser
1. Copy image URL
2. Paste in browser address bar
3. Right-click image → "Save Image As"
4. Save to `public/images/` folder

### Option 2: Download via Command Line (PowerShell)
```powershell
# Navigate to images folder
cd C:\Users\ASUS\Downloads\EcoGuide\public\images

# Download images
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop" -OutFile "section1.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop" -OutFile "section2.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop" -OutFile "section3.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop" -OutFile "section4.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop" -OutFile "section5.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop" -OutFile "section6.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop" -OutFile "hero.jpg"
```

### Then Update JSON to Use Local Paths:
```json
{
  "image": "/images/section1.jpg"
}
```

---

## 🎨 Image Specifications

All images are optimized with:
- **Width**: 800px
- **Height**: 600px
- **Aspect Ratio**: 16:9 (via aspect-video class)
- **Fit**: Crop (centered)
- **Format**: Auto (WebP when supported, fallback to JPEG)
- **Loading**: Lazy loading enabled

---

## 📝 Usage in Components

Images are automatically loaded from `content.json`:

```tsx
// Hero component
<img src={videoPlaceholder} alt="EcoGuide Preview" />

// ContentSection component
<img src={image} alt={title} />
```

---

## ✅ Current Implementation

- ✅ All 6 section images from Unsplash
- ✅ Hero video placeholder image
- ✅ Direct CDN links (no download needed)
- ✅ Lazy loading for performance
- ✅ Responsive with aspect-video
- ✅ Hover scale animations
- ✅ Rounded corners with shadow

---

## 🔧 Customization

To change an image:
1. Find new image on Unsplash.com
2. Get direct link: `https://images.unsplash.com/photo-XXXXX?w=800&h=600&fit=crop`
3. Update `public/data/content.json`
4. Changes reflect immediately (hot reload)

---

**Note**: Unsplash images are free to use under the Unsplash License. No attribution required, but it's appreciated!
