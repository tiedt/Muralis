import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/message.service';

@Component({
  selector: 'app-fale-conosco',
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.scss']
})
export class FaleConoscoComponent implements OnInit {
  image =
    "https://images.freeimages.com/images/large-previews/7bc/bald-eagle-1-1400106.jpg";
  name1;
  age;
  loading = false;
  buttionText = "Submit";

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);



  constructor(public emailService: EmailService) { }

  ngOnInit() {
    console.log(this.emailService.test);
  }

  register() {
    this.loading = true;
    this.buttionText = "Submiting...";
    let user = {
      name: this.nameFormControl.value,
      email: this.emailFormControl.value
    }
    this.emailService.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res: any = data;
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = "Submit";
      }, () => {
        this.loading = false;
        this.buttionText = "Submit";
      }
    );
  }
}