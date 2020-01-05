import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Column} from "../nyom-table/nyom-table.component";
import moment from "moment";
import {Moment} from "moment";
import {Observable} from "rxjs";

@Component({
  selector: 'entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})
export class EntityTableComponent implements OnInit {

  @Input()
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @Input()
  columns: Column[] = [];

  @Output()
  rowClicked = new EventEmitter<any>();

  @Output()
  onDateTimeChange = new EventEmitter<Moment>();

  @Output()
  onFilterChange = new EventEmitter<string>();

  @Input()
  filterValue = "";

  @Input()
  filterAt$: Observable<Moment>;

  constructor() { }

  ngOnInit() {
  }

  emitOnDateTimeChange($event: Moment) {
    this.onDateTimeChange.emit($event)
  }

  emitRowClicked($event: any) {
    this.rowClicked.emit($event)
  }

  emitOnFilterChange() {
    this.onFilterChange.emit(this.filterValue)
  }

}
