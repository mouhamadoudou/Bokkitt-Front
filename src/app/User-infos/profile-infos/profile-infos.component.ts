import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../component/popup/popup.component';
import { AuthentificationService } from '../../services/authentification.service';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthcheckService } from '../../services/authcheck.service';
import { jwtDecode } from "jwt-decode"
import { TripService } from '../../services/trip.service';
import { GetTokenService } from '../../services/get-token.service';


@Component({
  selector: 'app-profile-infos',
  templateUrl: './profile-infos.component.html',
  styleUrl: './profile-infos.component.css'
})
export class ProfileInfosComponent implements OnInit {
  activeSection: string = 'profile';
  licenceName: string = 'Aucun permis sélectionné';
  public userData: any;

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog,
    public authService: AuthentificationService, private router: Router,
    public userService: UserService,
    public authCheck: AuthcheckService,

    public tripService: TripService,
    public getToken: GetTokenService
  ) { }

  ngOnInit(): void {
    this. userData = {}
    this.uploadUserData()
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file)
    if (file) {
      this.licenceName = file.name;
    }
  }

  uploadUserData() {
    new Promise((resolve, reject) => {
      const token : any = localStorage.getItem('token');
      const decodedToken: any = jwtDecode(token);
  
      this.userService.getUserById(decodedToken.id, "driver").subscribe(
        (data) => {
          this.userData = data;
          resolve("ok");
        },
        (error) => {
          console.error('Error fetching user:', error);
          reject(error);
        }
      );
    });
  }

  updateUserData(infoData : any): Promise<void> {
    const body = {
      client_id: this.getToken.getId(),
      new_value: infoData.newValue,
      role: "driver",
      column: infoData.column
    }
    
    return new Promise((resolve, reject) => {
      this.tripService.updateUserData(body).subscribe(
        (data) => {
          // this.clientRequestList = data.data
          // console.log("dataa ok => ", this.clientRequestList)
          resolve(true);
        },
        (error) => {
          console.error('Error fetching trip request:', error);
          reject(error);
        }
      );
    }).then(() => {
      location.reload();
    });
  }
  

  openDialog(component: {}): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: component
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('Received data:', result);
      if (!result) {
        return
      }
      if (result.confirmed && result.type == "nValue" || result.column == "gender") {
        this.updateUserData(result)
      }
    });
  }
}
