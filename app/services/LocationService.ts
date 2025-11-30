import * as Location from 'expo-location';

class LocationService {
    private subscription: Location.LocationSubscription | null = null;

    async requestPermissions() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return false;
        }
        return true;
    }

    async startTracking(callback: (location: Location.LocationObject) => void, interval: number = 3000) {
        const hasPermission = await this.requestPermissions();
        if (!hasPermission) return;

        this.subscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                timeInterval: interval,
                distanceInterval: 5,
            },
            (location) => {
                callback(location);
            }
        );
    }

    stopTracking() {
        if (this.subscription) {
            this.subscription.remove();
            this.subscription = null;
        }
    }
}

export default new LocationService();
