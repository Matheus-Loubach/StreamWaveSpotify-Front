export const dev = 'https://cadastro-steam-wave.vercel.app/api'
// export const dev = 'http://localhost:3000/api'

type RegisterData = {
    name: string,
    email: string,
    password: string,
    passwordconf: string
  }

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
  