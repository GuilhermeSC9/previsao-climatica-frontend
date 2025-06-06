import { format } from "date-fns";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./WeatherCard.css";
import type { Weather } from "../../models/Weather";
import { api } from "../../lib/axios";

interface WeatherCardProps{
  weather: Weather;
  refreshCard: (cityName : string) => void;
}

export default function WeatherCard({weather, refreshCard}: WeatherCardProps){
  const [isFavorited, setIsFavorited] = useState(weather.isFavorite);

  async function toggleFavorite(){
    //TODO: VERIFICAR SE A CIDADE É FAVORITA, SE FOR, CHAMAR A API PARA REMOVER CIDADE DOS FAVORITOS. SE NÃO, ADICIONAR CIDADE AOS FAVORITOS
    if(isFavorited){
      await api.delete(`/favoritecity/${weather.favoriteCityId}`)
    } else{
      await api.post('/favoritecity', {
        "name": weather.location.name
      })
    }
      //TODO: TROCAR O VALOR DE ISFAVORITED
      setIsFavorited(!isFavorited)
      //TODO: CHAMAR REFRESHCARD COM O NOME DA CIDADE
      refreshCard(weather.location.name)
  }

  return(
    <div className="card">
      <div className="favorite-icon" onClick={toggleFavorite}>
        {isFavorited ? <FaStar color="gold" /> : <FaRegStar />}
      </div>
      <div className="cardContent">
        <h2>Clima em {weather.location.name}</h2>
        <p>País: {weather.location.country}</p>
        <p>Temperatura: {weather.current.temp_c.toFixed(0)}°C</p>
        <p>Condição: {weather.current.condition.text}</p>
        <p>Última Atualização: {format(weather.current.last_updated, "dd-MM-yyyy HH:mm")}</p>
      </div>

      <img src={weather.current.condition.icon} alt="" />
    </div>
  )
}
