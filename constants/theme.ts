// Premium Dark Luxury Theme for Delivo

export const COLORS = {
    // Background Colors
    background: '#0A0A0F',
    surface: '#1A1A24',
    surfaceLight: '#252530',

    // Glass Effect
    glass: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassHover: 'rgba(255, 255, 255, 0.08)',

    // Accent Colors
    primary: '#FFB800',
    primaryDark: '#E6A500',
    secondary: '#FF6B35',
    success: '#00D9A3',
    error: '#FF4757',
    warning: '#FFA502',

    // Text Colors
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textTertiary: 'rgba(255, 255, 255, 0.5)',
    textDisabled: 'rgba(255, 255, 255, 0.3)',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayDark: 'rgba(0, 0, 0, 0.7)',

    // Gradients
    gradientGold: ['#FFB800', '#FF8C00'],
    gradientOrange: ['#FF6B35', '#FF8C00'],
    gradientDark: ['rgba(0, 0, 0, 0.8)', 'transparent'],
};

export const TYPOGRAPHY = {
    // Font Sizes
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    body: 16,
    bodySmall: 14,
    caption: 12,
    tiny: 10,

    // Font Weights
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
};

export const BORDER_RADIUS = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    round: 999,
};

export const SHADOWS = {
    small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    glow: {
        shadowColor: '#FFB800',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
};

// Glassmorphism Styles
export const GLASS_STYLES = {
    card: {
        backgroundColor: COLORS.glass,
        borderRadius: BORDER_RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        ...SHADOWS.medium,
    },
    cardLight: {
        backgroundColor: COLORS.glassHover,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        ...SHADOWS.small,
    },
    input: {
        backgroundColor: COLORS.glass,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },
};

// Animation Durations
export const ANIMATION = {
    fast: 150,
    normal: 250,
    slow: 350,
    verySlow: 500,
};

// Common Styles
export const COMMON_STYLES = {
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    centerContent: {
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
    },
    row: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
    },
    spaceBetween: {
        flexDirection: 'row' as const,
        justifyContent: 'space-between' as const,
        alignItems: 'center' as const,
    },
};

export default {
    COLORS,
    TYPOGRAPHY,
    SPACING,
    BORDER_RADIUS,
    SHADOWS,
    GLASS_STYLES,
    ANIMATION,
    COMMON_STYLES,
};
