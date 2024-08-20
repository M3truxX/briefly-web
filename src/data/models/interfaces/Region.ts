export interface Region {
    city: string; // Nome da cidade
    cityIsoCode: string; // Código ISO da cidade (se aplicável)
    country: string; // Nome do país
    countryIsoCode: string; // Código ISO do país
    continent: string; // Nome do continente
    latitude: number | null; // Latitude da localização, pode ser nula
    longitude: number | null; // Longitude da localização, pode ser nula
    postal: string; // Código postal da localização
    timezone: string; // Fuso horário da localização
}