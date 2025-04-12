import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Equipe {
  idEquipe: number;
  nomEquipe: string;
  niveau: Niveau;
  // ajoute d'autres champs selon ton modèle
}
export enum Niveau {
  JUNIOR = 'JUNIOR',
  SENIOR = 'SENIOR',
  EXPERT = 'EXPERT'
}
@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  private baseUrl = 'http://localhost:8089/kaddem/equipe';

  constructor(private http: HttpClient) {}

  getAllEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(`${this.baseUrl}/retrieve-all-equipes`);
  }

  getEquipeById(id: number): Observable<Equipe> {
    return this.http.get<Equipe>(`${this.baseUrl}/retrieve-equipe/${id}`);
  }

  addEquipe(equipe: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(`${this.baseUrl}/add-equipe`, equipe);
  }

  updateEquipe(equipe: Equipe): Observable<Equipe> {
    return this.http.put<Equipe>(`${this.baseUrl}/update-equipe`, equipe);
  }

  deleteEquipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-equipe/${id}`);
  }

  faireEvoluerEquipes(): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/faireEvoluerEquipes`, {});
  }
}
