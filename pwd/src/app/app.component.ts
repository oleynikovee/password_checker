import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgStyle} from "@angular/common";
import {colorState, pwdStrength} from "./app.i";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgStyle, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  public password: string = '';
  public pwdStrengthState: pwdStrength = {
    weak: 'gray',
    medium: 'gray',
    strong: 'gray'
  }
  public showPassword: boolean = false;


  checkPasswordStrength() {
    if (!this.password || this.password == '') {
      this.resetColors();
      return;
    }

    if (this.password.length < 8) {
      this.setColors('red', 'all');
      return;
    }

    const hasLetters = /[a-zA-Zа-яА-Я]/.test(this.password);
    const hasDigits = /\d/.test(this.password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);

    if (hasLetters && hasDigits && hasSymbols) {
      this.setColors('green', 'strong');
    } else if ((hasLetters && hasDigits) || (hasLetters && hasSymbols) || (hasDigits && hasSymbols)) {
      this.setColors('yellow', 'medium');
    } else {
      this.setColors('red', 'weak');
    }
  }

  private resetColors() {
    this.pwdStrengthState.weak = 'gray';
    this.pwdStrengthState.medium = 'gray';
    this.pwdStrengthState.strong = 'gray';
  }

  private setColors(color: colorState, type: string) {
    this.pwdStrengthState.weak = color;
    this.pwdStrengthState.medium = type == 'all' || type != 'weak' ? color : "gray";
    this.pwdStrengthState.strong = type == 'all' || type == 'strong' ? color : "gray";
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
