import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private signService: RegisterService, private router: Router){}

  loginForm: FormGroup

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  // onSubmit = (form: FormGroup) => {
  //   const body = 
  //   {
  //     email: form.value.email,
  //     password: form.value.password
  //   }
  //   if (form.valid) {
  //     this.signService.sign(body).subscribe({
  //       next: (data: any) => {
  //         this.signService.$token = data.accessToken
  //         console.log(this.signService.$token);
  //         this.loginForm.reset()
  //         this.router.navigateByUrl('/dashboard')
  //       }
  //     })
  //   }
  // }
  onSubmit = (form: FormGroup) => {
    const body = 
    {
      email: form.value.email,
      password: form.value.password
    }
    if (form.valid) {
      this.signService.getLoggedInUser(body).subscribe({
        next: (data: any) => {
          const user = data.find((a:any)=> {
            return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
          })
          if(user){
            this.loginForm.reset()
            this.router.navigateByUrl('/dashboard')
          }
        }
      })
    }
  }

}
