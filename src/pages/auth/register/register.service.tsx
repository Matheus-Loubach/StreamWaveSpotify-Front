import { dev } from "../../../utils/config";
import { IRegisterData } from "../../types/global";


export class RegisterService {
  async register(data: IRegisterData) {
    try {
      const responseData = await fetch(dev + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!responseData.ok) {
        throw new Error("Falha no register");
      }

      const response = await responseData.json();

      return response;
    } catch (error) {
      console.error("Erro ao fazer cadastrar:", error);
      throw error;
    }
  }
}


