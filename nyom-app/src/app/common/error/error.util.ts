import {Store} from "@datorama/akita";
import {tap} from "rxjs/operators";

export interface ErrorState {
  errorText: string;
  dismissed: boolean;
}

export const handleHttpError = <T>(store: Store) => tap<T>(
  (value: T) => {
  },
  e => {
    console.log(`handleHttpError error: ${e}`)
    store.setLoading(false);
    store.setError({errorText: e.message, dismissed: false} as ErrorState);
  },
  () => {
  });


