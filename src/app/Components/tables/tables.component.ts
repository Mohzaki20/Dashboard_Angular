import { Component } from '@angular/core';
import { faTrashAlt,faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {
  faTrashAlt=faTrashAlt;
  faEdit=faEdit;
}
