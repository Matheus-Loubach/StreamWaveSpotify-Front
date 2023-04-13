export const api = 'https://cadastro-steam-wave.vercel.app/Api'

type RegisterData = {
    name: string,
    email: string,
    password: string,
    passwordconf: string
  }

//Configurações httpFavoriteMusic
export const RequestConfig = (method: any, data: RegisterData) => {
    if (method !== "POST") {
      throw new Error(`Unsupported method: ${method}`);
    }
  
    let headers = {
      "Content-Type": "application/json"
    };
  
    const config = {
      method,
      headers,
      body: JSON.stringify(data),
    };
  
    return config;
  };
  