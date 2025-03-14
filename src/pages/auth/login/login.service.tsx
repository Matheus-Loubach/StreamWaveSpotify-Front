import { dev } from "../../../utils/config";

export class LoginService {
  async login(data: any) {
    try {
      const responseData = await fetch(dev + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!responseData.ok) {
        throw new Error("Falha no login");
      }

      const response = await responseData.json();

      if (response.token) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("token", response.token);
      } else {
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
      }

      return response;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }
}
