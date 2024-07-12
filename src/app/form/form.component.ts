import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export interface Hobby {
  id: string;
  checked: boolean;
}
export interface Record {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  dateOfBirth: string | null;
  state: string | null;
  gender: string | null;
  hobbies: Hobby[];
  password: string | null;
  confirmPassword: string | null;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit, OnChanges {
  @Input() record: any;
  @Output() addRecord = new EventEmitter<any>();
  recordForm = new FormGroup(
    {
      id: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      hobbies: new FormArray([]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: () => this.passwordMatchValidator }
  );

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

  hobbiesList: string[] = [
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

  ngOnInit(): void {
    this.hobbiesList.forEach((hobby) =>
      this.hobbies.push(new FormControl(false))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['record'] && (this.record as Record)) {
      const formattedRecord = {
        ...this.record,
        hobbies: (this.record as Record).hobbies.map((hobby) => hobby.checked),
      };
      this.recordForm.patchValue(formattedRecord);
    }
  }

  get hobbies() {
    return this.recordForm.get('hobbies') as FormArray;
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.recordForm.valid) {
      const selectedHobbies = this.recordForm.value.hobbies?.map(
        (hobby, index) => ({ id: this.hobbiesList[index], checked: hobby })
      );
      if (this.recordForm.value) {
        this.addRecord.emit({
          ...this.recordForm.value,
          hobbies: selectedHobbies,
        });
        this.recordForm.reset();
      }
    }
  }
}
