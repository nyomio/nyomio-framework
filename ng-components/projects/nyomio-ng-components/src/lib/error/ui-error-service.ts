import {Store} from "@datorama/akita";

export class UiErrorService {
  constructor(private store: Store<any>) {
  }

  public dismissError(errorText: string) {
    this.store.setError({errorText: errorText, dismissed: true})
  }
}
