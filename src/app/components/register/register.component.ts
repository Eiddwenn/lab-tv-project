import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoggedUser, User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  constructor(private authService: AuthService){}

  registerForm: FormGroup

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),

    })
  }

  signUp = (form: FormGroup) => {
    const body = 
      {
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        email: form.value.email,
        password: form.value.password
      }
    this.authService.register(body)
    // .subscribe({
    //   next: (data: LoggedUser) => {
    //     console.log(data)
    //   }
    // })
        console.log(this.authService.register(body))
  }





  
}
