# Download EcoGuide Images

Write-Host "📥 Downloading images for EcoGuide..." -ForegroundColor Cyan

# Create images directory if it doesn't exist
$imagesDir = "public\images"
if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir | Out-Null
    Write-Host "✅ Created images directory" -ForegroundColor Green
}

# Image URLs
$images = @{
    "hero.jpg" = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop"
    "section1.jpg" = "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop"
    "section2.jpg" = "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop"
    "section3.jpg" = "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop"
    "section4.jpg" = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    "section5.jpg" = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop"
    "section6.jpg" = "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop"
}

# Download each image
foreach ($filename in $images.Keys) {
    $url = $images[$filename]
    $output = Join-Path $imagesDir $filename
    
    try {
        Write-Host "Downloading $filename..." -ForegroundColor Yellow
        Invoke-WebRequest -Uri $url -OutFile $output -UseBasicParsing
        Write-Host "  ✅ $filename downloaded" -ForegroundColor Green
    } catch {
        Write-Host "  ❌ Failed to download $filename" -ForegroundColor Red
        Write-Host "  Error: $_" -ForegroundColor Red
    }
}

Write-Host "`n🎉 All images downloaded successfully!" -ForegroundColor Green
Write-Host "Images saved to: $imagesDir" -ForegroundColor Cyan
