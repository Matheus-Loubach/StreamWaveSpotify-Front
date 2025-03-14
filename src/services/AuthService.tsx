
export const getTrack = async (searchTerm: string, token: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/music/search?searchTerm=${encodeURIComponent(searchTerm)}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log('Erro ao buscar música:', error);
  }
};


