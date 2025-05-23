import "./WeatherPage.css";
import Header from "../../components/Header/Header"
import type { Weather } from "../../models/Weather";
import { useState } from "react";
import { api } from "../../lib/axios";
import type { FavoriteCity } from "../../models/FavoriteCity";

export default function WeatherPage() {
  const [favoriteCitiesData, setFavoriteCitiesData] = useState<Weather[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getFavoriteCities() {
        //TODO: LIMPAR DADOS ANTERIORES DE CIDADES FAVORITAS
        setFavoriteCitiesData([]);
        //TODO: MARCAR COMO CARREGANDO DADOS
        setIsLoading(true);
        //TODO: BUSCAR CIDADES FAVORITAS
        const response = await api.get("/favoritecity");

        //TODO: PARA CADA ITEM DO RESPONSE BUSCAR O CLIMA DA CIDADE PELO NOME
        // E ASSIM SALVAR NO ESTADO DE CIDADES FAVORITAS
        response.data.forEach(async (item : FavoriteCity) => {
          const responseWeather = await getWeatherByCity(item.name);

          if(responseWeather){
            setFavoriteCitiesData((prevState) => [...prevState, responseWeather]);
          }
        })


        favoriteCitiesData.sort((a, b) => a.location.name.localeCompare(b.location.name));

        //TODO: DESMARCAR COMO CARREGANDO DADOS
        setIsLoading(false);
    }

    async function getWeatherByCity(cityName: string) {
        //TODO: FAZER A REQUISIÇÃO PARA A API BUSCANDO O CLIMA PELO
        //NOME DA CIDADE E RETORNAR O RESULTADO
        const response = await api.get<Weather>("/weather/" + cityName);

        if(response.status == 200){
          return response.data
        }
        else{
          console.error("Erro ao carregar clima da cidade")
        }
    }
  return (
    <div className="container">
      <Header />


      <h2 className="favoriteCitiesTitle">Cidades Favoritas</h2>
    </div>
  )
}
