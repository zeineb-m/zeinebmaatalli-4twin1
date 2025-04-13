import { Component, OnInit } from '@angular/core';
import { EquipeService, Equipe, Niveau } from '../services/equipe.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-equipe',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,HttpClientModule],
  templateUrl: './list-equipe.component.html',
  styleUrls: ['./list-equipe.component.css']
})
export class ListEquipeComponent implements OnInit {
  equipes: Equipe[] = [];
  currentEquipe: Equipe = {
    idEquipe: 0,
    nomEquipe: '',
    niveau: Niveau.JUNIOR
  };
  isEditing = false;
  showForm = false;
  niveaux = Object.values(Niveau);

  constructor(private equipeService: EquipeService) {}

  ngOnInit(): void {
    this.getEquipes();
  }

  getEquipes(): void {
    this.equipeService.getAllEquipes().subscribe({
      next: (data) => this.equipes = data,
      error: (err) => console.error('Erreur:', err)
    });
  }

  showAddForm(): void {
    this.resetForm();
    this.isEditing = false;
    this.showForm = true;
  }

  showEditForm(equipe: Equipe): void {
    this.currentEquipe = { ...equipe };
    this.isEditing = true;
    this.showForm = true;
  }

  addEquipe(): void {
    this.equipeService.addEquipe(this.currentEquipe).subscribe({
      next: (newEquipe) => {
        this.equipes.push(newEquipe);
        this.hideForm();
      },
      error: (err) => console.error('Erreur:', err)
    });
  }

  updateEquipe(): void {
    this.equipeService.updateEquipe(this.currentEquipe).subscribe({
      next: (updatedEquipe) => {
        const index = this.equipes.findIndex(e => e.idEquipe === updatedEquipe.idEquipe);
        if (index !== -1) {
          this.equipes[index] = updatedEquipe;
        }
        this.hideForm();
      },
      error: (err) => console.error('Erreur:', err)
    });
  }

  deleteEquipe(id: number): void {
    if (confirm('Êtes-vous sûr ?')) {
      this.equipeService.deleteEquipe(id).subscribe({
        next: () => {
          this.equipes = this.equipes.filter(e => e.idEquipe !== id);
        },
        error: (err) => console.error('Erreur:', err)
      });
    }
  }

  hideForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.currentEquipe = {
      idEquipe: 0,
      nomEquipe: '',
      niveau: Niveau.JUNIOR
    };
    this.isEditing = false;
  }

  getNiveauDisplay(niveau: Niveau): string {
    return {
      [Niveau.JUNIOR]: 'Junior',
      [Niveau.SENIOR]: 'Sénior',
      [Niveau.EXPERT]: 'Expert'
    }[niveau] || niveau;
  }
}
