import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({ 
    environment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    apiMockUrl: process.env.API_MOCK_URL || 'http://localhost:3001',
}));