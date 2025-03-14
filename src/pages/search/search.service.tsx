import { dev } from "../../utils/config";
import { ITrack } from "../search/search.interface";

const userId = localStorage.getItem('idUser');
const token = localStorage.getItem('token');

export class SearchService {


  async deleteFavorite(track: ITrack) {
    try {
      const response = await fetch(`${dev}/music/favorite/${track.id}`, {
        method: "DELETE",
        body: JSON.stringify({ userId }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao deletar música Favorita:', error);
      return null;
    }
  }

}
