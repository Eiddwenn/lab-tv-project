import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger(
      'inOutForms',
      [
        transition(
          ':enter',
          [
            style({ transform: 'translateX(0)', height: '440px', opacity: 1}),
            style({ transform: 'translateX(400px)', height: '440px', opacity: 0}),
            animate('.2s ease-in',
            style({ transform: 'translateX(0)', height: '440px', opacity: 1}))
          ]
        ),
        transition(
          ':leave',
          [
            style({ transform: 'translateX(0)', height: '570px', opacity: 1}),
            animate('.2s ease-out',
            style({ transform: 'translateX(-400px)', height: '570px', opacity: 0}))
          ]
        )
      ]
    )
  ]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router){}

  changeForm: boolean = false;

  loginForm: FormGroup

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })

    this.registerForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),

    })
  }

  onSubmit = (form: FormGroup) => {
    this.authService.login(this.loginForm.getRawValue()).subscribe(u => {
      this.authService.setLoggedUser(u)
      this.router.navigate(['dashboard']).then(() => {
        window.location.reload()
      })
      console.log(u);
      
    })
  }

 //----REGISTER------------------------- 

 registerForm: FormGroup

  signUp = (form: FormGroup) => {
    const body = 
      {
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        email: form.value.email,
        password: form.value.password
      }
    this.authService.register(body).subscribe({
      next: (data: LoggedUser) => {
        console.log(data)
      }
    })
  }

  toggleForm = () => {
    this.changeForm = !this.changeForm
  }



}
