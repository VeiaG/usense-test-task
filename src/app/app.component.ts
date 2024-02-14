import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordInputComponent } from './password-input/password-input.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PasswordInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'usense-test-task';
}
