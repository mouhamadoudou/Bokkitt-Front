import { Component } from '@angular/core';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';



  checkPasswords(): void {
    if (this.newPassword !== this.confirmPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas.");
    } else {
      // Procéder avec l'action nécessaire (ex : envoyer les données au backend)
      alert("Mot de passe changé avec succès.");
    }
  }
}
