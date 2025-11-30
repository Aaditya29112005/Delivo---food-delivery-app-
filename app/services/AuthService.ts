import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    email: string;
    password: string;
    name?: string;
}

class AuthService {
    private USERS_KEY = 'delivo_users';
    private AUTH_TOKEN_KEY = 'authToken';

    async register(email: string, password: string, name?: string): Promise<{ success: boolean; message: string }> {
        try {
            // Get existing users
            const users = await this.getUsers();

            // Check if user already exists
            if (users.find(u => u.email === email)) {
                return { success: false, message: 'Email already registered' };
            }

            // Add new user
            users.push({ email, password, name });
            await AsyncStorage.setItem(this.USERS_KEY, JSON.stringify(users));

            return { success: true, message: 'Registration successful' };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Registration failed' };
        }
    }

    async login(email: string, password: string): Promise<{ success: boolean; message: string; token?: string }> {
        try {
            const users = await this.getUsers();
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                return { success: false, message: 'Invalid email or password' };
            }

            // Generate a simple token (email-based for demo)
            const token = `user_${email}_${Date.now()}`;
            await AsyncStorage.setItem(this.AUTH_TOKEN_KEY, token);
            await AsyncStorage.setItem('userEmail', email);

            return { success: true, message: 'Login successful', token };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Login failed' };
        }
    }

    async logout(): Promise<void> {
        await AsyncStorage.removeItem(this.AUTH_TOKEN_KEY);
        await AsyncStorage.removeItem('userEmail');
    }

    async isLoggedIn(): Promise<boolean> {
        const token = await AsyncStorage.getItem(this.AUTH_TOKEN_KEY);
        return !!token;
    }

    async getCurrentUser(): Promise<string | null> {
        return await AsyncStorage.getItem('userEmail');
    }

    private async getUsers(): Promise<User[]> {
        try {
            const usersJson = await AsyncStorage.getItem(this.USERS_KEY);
            return usersJson ? JSON.parse(usersJson) : [];
        } catch {
            return [];
        }
    }
}

export default new AuthService();
