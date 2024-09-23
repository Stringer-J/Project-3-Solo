const API_KEY = 'ef189f35c7f8730c184c236713074777';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getHZByZip = async (zipCode) => {
    const response = await fetch(`${BASE_URL}?zip=${zipCode},us&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error('Failed to get OW Data');
    }
    return response.json();
};