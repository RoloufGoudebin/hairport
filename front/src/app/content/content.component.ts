import { Component, OnInit, OnChanges } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
  }
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

  equipmentFormControl = new FormControl("",[]);

  questionFormControl = new FormControl("",[]);


  register() {
    this.loading = true;
    this.buttionText = "Submiting...";
    let user = {
      name: this.nameFormControl.value,
      email: this.emailFormControl.value,
      equipment: this.equipmentFormControl.value,
      question: this.questionFormControl.value
    }

    this.http.post("http://51.68.191.35:3000/sendmail", user).subscribe(
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
