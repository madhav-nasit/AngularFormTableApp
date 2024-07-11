import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Output() addRecord = new EventEmitter<any>();
  recordForm: FormGroup;

  states: string[] = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Lakshadweep',
    'Delhi',
    'Puducherry',
  ];

  hobbies: string[] = [
    'Painting',
    'Photography',
    'Traveling',
    'Dance',
    'Acting',
    'Gaming',
    'Singing',
    'Cricket',
    'Football',
  ];

  constructor(private fb: FormBuilder) {
    this.recordForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dateOfBirth: ['', Validators.required],
        state: ['', Validators.required],
        gender: ['Male', Validators.required],
        hobbies: this.fb.array([]),
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword
      ? null
      : { mismatch: true };
  }

  onHobbyChange(event: any): void {
    const hobbies: FormArray = this.recordForm.get('hobbies') as FormArray;

    if (event.target.checked) {
      hobbies.push(this.fb.control(event.target.value));
    } else {
      const index = hobbies.controls.findIndex(
        (x) => x.value === event.target.value
      );
      hobbies.removeAt(index);
    }
  }

  onSubmit() {
    if (this.recordForm.valid) {
      this.addRecord.emit(this.recordForm.value);
      this.recordForm.reset();
    }
  }
}
