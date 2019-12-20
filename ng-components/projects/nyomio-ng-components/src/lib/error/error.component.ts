import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig, MatSnackBarDismiss} from "@angular/material/snack-bar";
import {Query} from "@datorama/akita";
import {ErrorState} from "./error.util";
import {UiErrorService} from "./ui-error-service";

@Component({
  selector: 'error-component',
  template: ``,
  styles: [`
    .error-snack-bar {
      background-color: indianred !important;
      font-weight: bold;
      color: yellow !important;
    }`],
  encapsulation: ViewEncapsulation.None,

})
export class ErrorComponent implements OnInit {

  @Input()
  assignedQuery: Query<any> = null;
  @Input()
  assignedService: UiErrorService = null;

  errorState: ErrorState = null;

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.assignedQuery.selectError().subscribe((value: ErrorState) => {
      this.errorState = value;
      this.errorChanged();
    });
  }

  private errorChanged() {
    if (this.errorState == null) {
      return
    }
    if (this.errorState.dismissed) {
      this.snackBar.dismiss();
    } else {
      this.show();
    }
  }

  private show() {
    this.snackBar.open(this.errorState.errorText, 'OK', {
      panelClass: ['error-snack-bar']
    } as MatSnackBarConfig<any>);
    this.snackBar._openedSnackBarRef.afterDismissed().subscribe((value: MatSnackBarDismiss) => {
      if (value.dismissedByAction) {
        this.assignedService.dismissError(this.errorState.errorText);
      }
    });
  }

}
