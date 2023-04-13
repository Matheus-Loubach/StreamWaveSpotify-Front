import {api, RequestConfig } from "../utils/config";

type RegisterData = {
    name: string,
    email: string,
    password: string,
    passwordconf: string
  }



//Buscar pelo nome da musica e tocar
export const getTrack = async (searchTerm: string) => {

    try {
        const response = await fetch(api + "/search?searchTerm=" + searchTerm)
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log('Erro ao buscar música:', error);
    }

}

//Register user
export const register = async (data: RegisterData) => {

    const config = RequestConfig("POST", data);

    try {
        const response = await fetch(api + "/register", config);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
    }
};

