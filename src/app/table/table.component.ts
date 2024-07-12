import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Record } from '../form/form.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() records: any[] = [];
  @Output() editRecord = new EventEmitter<Record>();
  @Output() deleteRecord = new EventEmitter<string>();

  getFilteredHobbies(hobbies: { id: string; checked: boolean }[]) {
    return hobbies
      .filter((item) => item.checked)
      .map((item) => item.id)
      .join(', ');
  }

  onEdit(record: Record) {
    this.editRecord.emit(record);
  }

  onDelete(record: Record) {
    if (
      confirm('Are you sure to delete record for ' + record.firstName + '?')
    ) {
      this.deleteRecord.emit(record.id);
    }
  }
}
