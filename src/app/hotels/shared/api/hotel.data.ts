
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { IHotel } from '../models/hotel';


export class HotelData implements InMemoryDbService {

  createDb(): Record<string, IHotel[]> {

    const hotels: IHotel[] = [

      {
        id: 1,
        hotelName: "FAYA Hotel",
        description: "Situé à Douala, à 1,4 km du stade Akwa, le FAYA Hotel propose une salle de sport, un parking privé gratuit, une terrasse et un restaurant.",
        price: 230.5,
        imageUrl: "assets/img/hotel-room.jpg",
        rating: 3.5,
        tags: ['nouveau']
      },
      {
        id: 2,
        hotelName: "Hotel Résidence La Falaise",
        description: "L'Hotel Résidence La Falaise vous accueille à Douala. Vous bénéficierez gratuitement de la connexion Wi-Fi dans l'ensemble des locaux et du parking privé sur place.",
        price: 145.5,
        imageUrl: "assets/img/the-interior.jpg",
        rating: 5,
        tags: ['nouveau']
      },
      {
        id: 3,
        hotelName: "Djeuga Palace Hotel",
        description: "Le Djeuga Palace Hotel de Yaoundé dispose d'une connexion Wi-Fi gratuite, d'un bar et d'un jardin. Il possède également une piscine extérieure, une salle de sport et un parking gratuit",
        price: 120.12,
        imageUrl: "assets/img/indoors.jpg",
        rating: 4,
        tags: ['nouveau']
      },
      {
        id: 4,
        hotelName: "K Hotel Douala",
        description: "Situé à Douala, à 200 mètres du parc Bonanjo, le K Hotel Douala propose une piscine extérieure, un parking privé gratuit, une salle de sport et une terrasse.",
        price: 135.12,
        imageUrl: "assets/img/window.jpg",
        rating: 2.5,
        tags: ['nouveau']
      }
    ];

    return { hotels };
  }

  genId(hotels: IHotel[]) {
    return hotels.length > 0 ? Math.max(...hotels.map(hotel => hotel.id)) + 1 : 1
  }

}
