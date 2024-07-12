import { Component, ViewEncapsulation } from '@angular/core';
import { FormComponent, Record } from './form/form.component';
import { TableComponent } from './table/table.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, FormComponent, TableComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  records: Record[] = [];
  selectedRecord: any = null;

  handleAddRecord(record: Record) {
    if (this.selectedRecord !== null) {
      const recordIndex = this.records.findIndex(
        (record) => record.id === this.selectedRecord.id
      );
      this.records[recordIndex] = record;
      this.selectedRecord = null;
    } else {
      this.records.push({
        ...record,
        id: Math.random().toString(36).substr(2, 9),
      });
    }
  }

  handleEditRecord(record: Record) {
    this.selectedRecord = record;
  }

  handleDeleteRecord(index: string) {
    const recordIndex = this.records.findIndex((record) => record.id === index);
    this.records.splice(recordIndex, 1);
  }
}
