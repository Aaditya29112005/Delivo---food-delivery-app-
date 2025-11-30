# 📍 Real-Time Location Testing Guide

## ✅ Prerequisites
- ✓ Backend server running on port 3000
- ✓ Location permissions configured in app.json
- ✓ SocketService configured with IP: `192.168.128.173:3000`

---

## 📱 Option A: Physical Device Testing (RECOMMENDED)

### Step 1: Connect to Same WiFi
Make sure your phone and computer are on the **same WiFi network**.

### Step 2: Open Expo Go
1. Install **Expo Go** from App Store (iOS) or Play Store (Android)
2. Open the Expo Go app

### Step 3: Scan QR Code
Look at your terminal where `npm start` is running and scan the QR code:
- **iOS**: Use the Camera app to scan
- **Android**: Use the Expo Go app's built-in scanner

### Step 4: Grant Permissions
When the app loads, you'll see permission prompts:
- **Allow location access** when prompted
- Choose "Allow While Using App" or "Always Allow"

### Step 5: Test Location Tracking
1. **Login** or continue as guest
2. Browse restaurants and **add items to cart**
3. Select a **delivery option** (Standard or Premium)
4. Click **"Place Order"**
5. You should see:
   - ✅ "Live Location Sharing Active" message
   - ✅ Your current location on the map
   - ✅ Console logs showing location updates

### Step 6: View Driver Map (Optional)
To see the driver's view receiving your location:
- Open the app on another device or simulator
- Navigate to the driver map screen
- You'll see your live location marker

---

## 💻 Option B: Simulator Testing

### For iOS Simulator

#### Step 1: Open Simulator
```bash
# Your app should already be running in the simulator
# If not, press 'i' in the terminal where npm start is running
```

#### Step 2: Set Custom Location
1. In the iOS Simulator menu: **Features → Location → Custom Location**
2. Enter coordinates (example):
   - **Latitude**: `31.5204`
   - **Longitude**: `74.3587`
3. Click **OK**

#### Step 3: Simulate Movement
To simulate movement:
1. **Features → Location → Freeway Drive**
2. Or use **City Run** for slower movement
3. Or keep changing **Custom Location** coordinates

#### Step 4: Test the App
1. Place an order
2. Watch the location update on the map
3. Check console for location logs

### For Android Emulator

#### Step 1: Open Extended Controls
- Click the **"..."** (three dots) button in the emulator toolbar
- Or press `Cmd + Shift + P` (Mac) / `Ctrl + Shift + P` (Windows)

#### Step 2: Set Location
1. Go to **Location** tab
2. Enter coordinates or search for a place
3. Click **"Set Location"**

#### Step 3: Simulate Route (Optional)
1. In the Location tab, click **"Routes"**
2. Set a start and end point
3. Click **"Play Route"** to simulate movement

---

## 🔍 Debugging Tips

### Check if Backend is Running
```bash
# You should see this in your terminal:
listening on *:3000
```

### Check Socket Connection
Open the app and look for console logs:
```
Connected to socket server: <socket-id>
```

### Check Location Updates
You should see logs like:
```
Sending location: { latitude: 31.5204, longitude: 74.3587 }
```

### Common Issues

**Issue**: "Cannot connect to server"
- **Fix**: Make sure backend is running and devices are on same WiFi

**Issue**: "Location permission denied"
- **Fix**: Go to phone Settings → Delivo → Location → Allow

**Issue**: "Location not updating"
- **Fix**: Check if you've placed an order (tracking only works during active orders)

---

## 🎯 Testing Checklist

- [ ] Backend server running (`node backend/server.js`)
- [ ] App running on device/simulator
- [ ] Location permissions granted
- [ ] Placed an order
- [ ] See "Live Location Sharing Active" message
- [ ] Location marker appears on map
- [ ] Console shows location updates

---

## 📊 Expected Behavior

### Standard Delivery
- Location updates every **6 seconds**
- ETA: **30-45 minutes**

### Premium Delivery
- Location updates every **2.5 seconds**
- ETA: **10-20 minutes**
- Shows **"PREMIUM"** badge

---

**Your Setup:**
- Server IP: `192.168.128.173:3000`
- Backend: ✅ Running
- App: ✅ Configured
