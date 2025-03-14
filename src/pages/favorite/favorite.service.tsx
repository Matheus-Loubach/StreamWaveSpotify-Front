import { dev } from "../../utils/config";
import { ITrack } from "../search/search.interface";

const userId = localStorage.getItem('idUser');
const token = localStorage.getItem('token');
console.log('userId',userId);


export class FavoriteService {
  async getFavoriteMusics() {

    try {
      const res = await fetch(`${dev}/music/favorite/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Erro ao buscar músicas favoritas");
      }

      return await res.json();
    } catch (error) {
      console.error("Erro ao buscar músicas favoritas:", error);
      return null;
    }
  }

  async createFavorite(track: ITrack) {
    try {
      const response = await fetch(`${dev}/music/favorite`, {
        method: "POST",
        body: JSON.stringify({ userId, track }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao enviar música Favorita:', error);
      return null;
    }
  }

}
