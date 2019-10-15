import {
  AfterViewInit,
  Component, EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

export interface Column {
  name: string,
  label: string
}

@Component({
  selector: 'nyom-table',
  templateUrl: './nyom-table.component.html',
  styleUrls: ['./nyom-table.component.scss']
})
export class NyomTableComponent implements OnInit, AfterViewInit{

  @Input()
  dataSource: MatTableDataSource<any>;
  @ViewChildren(MatSort) sort: QueryList<MatSort>;

  @Input()
  columns: Column[];

  @Output()
  rowClicked = new EventEmitter<any>();

  displayedColumns: string[] = [];

  constructor() { }

  ngOnInit() {
    this.displayedColumns = this.columns.map(value => value.name);
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort.first;
    }
  }

  rowClickedFn(row: any) {
    this.rowClicked.emit(row)
  }

}
