export const TYPE_OF_USERS = {
    STANDARD_USER: 'standard_user',
    PERFORMANCE_USER: 'performance_glitch_user',
    VISUAL_USER: 'visual_user',
    LOCKED_OUT_USER: 'locked_out_user',
    INVALID_USER: 'invalid_user',
    WRONG_USER: 'wrong_user',
    EMPTY_USER: ''
} as const;

export const TYPE_OF_PASSWORDS = {
    GENERIC_PASSWORD: 'secret_sauce',
    WRONG_PASSWORD: 'User1234',
    EMPTY_PASSWORD: ''
} as const;
