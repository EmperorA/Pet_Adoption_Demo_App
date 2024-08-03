export const getCityFromCoordinates = async (lat: number, lon: number): Promise<string | null> => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const data = await response.json();
    const city = data.address.city || data.address.town || data.address.village;
    return city || null;
  } catch (error) {
    console.error('Error fetching city from coordinates:', error);
    return null;
  }
};
