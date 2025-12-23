@echo off
echo Downloading EcoGuide images...
echo.

if not exist "public\images" mkdir "public\images"

echo Downloading hero image...
curl -L "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop" -o "public\images\hero.jpg"

echo Downloading section 1 image...
curl -L "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop" -o "public\images\section1.jpg"

echo Downloading section 2 image...
curl -L "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop" -o "public\images\section2.jpg"

echo Downloading section 3 image...
curl -L "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop" -o "public\images\section3.jpg"

echo Downloading section 4 image...
curl -L "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop" -o "public\images\section4.jpg"

echo Downloading section 5 image...
curl -L "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop" -o "public\images\section5.jpg"

echo Downloading section 6 image...
curl -L "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop" -o "public\images\section6.jpg"

echo.
echo All images downloaded successfully!
echo Images saved to: public\images\
pause
