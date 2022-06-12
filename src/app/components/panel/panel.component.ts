import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router,NavigationStart} from '@angular/router';
import { Account } from 'src/app/models/account';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
//wstyd za kod, ale czas goni
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  accounts: Account[] = [];
  myId:any = '';

  constructor(private loginService: LoginService,
    private router: Router,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    let userRole = this.loginService.getRole();
    if(userRole !== 'Admin')
    {
      this.router.navigate(['/', 'dashboard']);
    }
    let url = `https://localhost:7038/api/account/users`;
    this.http.get<Account[]>(url).subscribe(r => this.accounts = r);
    let id = this.loginService.getId();
    this.myId = id;

  }

  changeRole(userId: number, roleId: number){
    let url = `https://localhost:7038/api/account/role`;
    //console.warn("userId", userId,"roleId",roleId);
    this.http.put(url, {"userId": userId,"roleId": roleId}).subscribe(r => window.location.reload());
  }

  deleteUser(userid: number )
  {
    let url = `https://localhost:7038/api/account/${userid}`;
    this.http.delete(url).subscribe(r => window.location.reload());
  }

  changeName(userId: number, name: string)
  {
    const httpOptions ={
      'Content-Type': 'application/json',
      observe: 'body' as const,
      responseType: 'json' as const,
    }
    let url = `https://localhost:7038/api/account/name/${userId}/${name}`;
    this.http.put(url, httpOptions).subscribe(r => window.location.reload());
  }


  typ(typ: number): string{
    if(typ == 0)
      return "Nie określony";
    let name = '';
    if(typ >= 4)
    {
      typ -= 4;
      name += 'Wzrokowiec - ';
    }
    if(typ >= 2)
    {
      typ -= 2;
      name += 'Słuchowiec - ';
    }
    if(typ >= 1)
    {
      typ -= 1;
      name += 'Działaniowiec';
    }
    return name;
  }

}
