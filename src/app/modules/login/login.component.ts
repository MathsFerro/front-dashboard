import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/shared/models/UserModel';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() authenticated = new EventEmitter(); 
  public progressBar: boolean = false;
  public form: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.toastr.warning("Usuário deslogado");
      this.authenticated.emit(false);
      localStorage.clear();
    }

    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.form.invalid)
      return;

    this.progressBar = true;

    // TODO tirar timeout
    const userModel: UserModel = this.form.value;
    this.authService.authenticate(userModel).then(resp => {
      setTimeout(() => {
        if(this.authService.isAuthenticated()) {
          this.authenticated.emit(true);
          this.router.navigate(['dashboard']);
          this.toastr.success(`Bem vindo ${userModel.username}`);
        }
      }, 2000);
    });
  }
}
