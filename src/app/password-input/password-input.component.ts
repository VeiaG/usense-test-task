import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
type IndicatorColor = "gray" | "red" | "yellow" | "green";


const easyPasswordRegex = new RegExp('^[a-zA-Z]+$|^[0-9]+$|^[!@#$%^&*()\\-_=+`~]+$');
const mediumPasswordRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\\-_=+`~])|(?=.*[0-9])(?=.*[!@#$%^&*()\\-_=+`~]).*$')
const strongPasswordRegex = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\\-_=+`~])");

type PasswordStrength = "easy" | "medium" | "strong" | "not valid" ;
type PasswordMessage = {
  message:string,
  color:IndicatorColor
}
@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss'
})
export class PasswordInputComponent {
  
  indicators :IndicatorColor[]=[
    "gray","gray","gray",
  ]
  passIssues:PasswordMessage={message:"The field is empty",color:"gray"};
  strength:PasswordStrength="not valid";

  private inputTextSubject = new Subject<string>();

  constructor() {
    this.inputTextSubject.pipe(
      debounceTime(300) // debounce for performance optimization
    ).subscribe(value => {
      this.inputText(value);
    });
  }
  onInputChange(value: string): void {
    this.inputTextSubject.next(value);
  }
  inputText(value:string):void {
    
    if(value.length ===0){
      this.indicators = ["gray","gray","gray"];
      this.passIssues = {
        message:"The field is empty",
        color:"gray"
      };
      return
    }
    if(value.length<8){
      this.indicators = ["red","red","red"];
      this.passIssues = {
        message:"Password must be at least 8 symbols long",
        color:"red"
      };
      return
    }
    this.strength=this.getPasswordStrength(value);
    switch(this.strength){
      case "easy":
          this.indicators = ["red","gray","gray"]
          this.passIssues = {
            message:"Pasword is too easy",
            color:"red"
          };
        break;
      case "medium":
          this.indicators = ["yellow","yellow","gray"]
          this.passIssues = {
            message:"Medium strength password",
            color:"yellow"
          };
        break;
      case "strong":
          this.indicators = ["green","green","green"]
          this.passIssues = {
            message:"That's safe password",
            color:"green"
          };
        break;
          
    }
  }
  getPasswordStrength(password:string):PasswordStrength{
    if (strongPasswordRegex.test(password)) {
      return "strong";
    }
    if (mediumPasswordRegex.test(password)) {
        return "medium";
    } 
    if (easyPasswordRegex.test(password)) {
        return "easy";
    } 
    return "easy";
  }
}
