#!/bin/bash

# Hyrect - Update to React Native 0.81.5 & React 19.1.0
# This script automates the update process

set -e  # Exit on error

echo "🚀 Hyrect Update Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Updating to:"
echo "  • React 19.1.0"
echo "  • React Native 0.81.5"
echo "  • All compatible libraries"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Backup
echo "📦 Step 1: Creating backup..."
if [ ! -d "../HospitalRecruitmentApp_backup" ]; then
    cp -r . ../HospitalRecruitmentApp_backup
    echo "✅ Backup created at ../HospitalRecruitmentApp_backup"
else
    echo "⚠️  Backup already exists, skipping..."
fi
echo ""

# Step 2: Clean previous installation
echo "🧹 Step 2: Cleaning previous installation..."
echo "  → Removing node_modules..."
rm -rf node_modules
echo "  → Removing package-lock.json..."
rm -f package-lock.json yarn.lock
echo "  → Removing iOS Pods..."
if [ -d "ios" ]; then
    cd ios
    rm -rf Pods Podfile.lock build DerivedData
    cd ..
fi
echo "  → Cleaning Android build..."
if [ -d "android" ]; then
    cd android
    if [ -f "gradlew" ]; then
        ./gradlew clean || true
    fi
    rm -rf .gradle build
    cd app
    rm -rf build
    cd ../..
fi
echo "✅ Cleanup complete"
echo ""

# Step 3: Clear caches
echo "🗑️  Step 3: Clearing caches..."
echo "  → Clearing Metro bundler cache..."
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*
echo "  → Clearing watchman cache..."
if command -v watchman &> /dev/null; then
    watchman watch-del-all || true
    echo "  ✓ Watchman cache cleared"
else
    echo "  ⚠️  Watchman not installed, skipping..."
fi
echo "✅ Caches cleared"
echo ""

# Step 4: Install dependencies
echo "📥 Step 4: Installing dependencies..."
echo "  This may take a few minutes..."
npm install
if [ $? -eq 0 ]; then
    echo "✅ Node dependencies installed"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo ""

# Step 5: iOS setup (if on macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Step 5: Setting up iOS..."
    if [ -d "ios" ]; then
        cd ios
        echo "  → Installing CocoaPods dependencies..."
        pod install
        if [ $? -eq 0 ]; then
            echo "✅ iOS setup complete"
        else
            echo "❌ Pod install failed"
            cd ..
            exit 1
        fi
        cd ..
    fi
else
    echo "⏭️  Step 5: Skipping iOS setup (not on macOS)"
fi
echo ""

# Step 6: Verification
echo "✅ Step 6: Verifying installation..."
echo "  → Checking React Native version..."
npx react-native --version
echo ""

# Step 7: Instructions
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Update Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📱 Next Steps:"
echo ""
echo "1. Start Metro bundler:"
echo "   npm start -- --reset-cache"
echo ""
echo "2. Run on iOS (macOS only):"
echo "   npm run ios"
echo ""
echo "3. Run on Android:"
echo "   npm run android"
echo ""
echo "📖 For troubleshooting, see UPDATE_GUIDE.md"
echo ""
echo "🔍 Verification Checklist:"
echo "  □ App builds successfully"
echo "  □ Splash screen animates"
echo "  □ Login/Register works"
echo "  □ Dashboard loads with animations"
echo "  □ Navigation between screens"
echo "  □ All animations run smoothly"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Happy coding! 🚀"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
