import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationExtras,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EntityEditorGuard implements CanActivate {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (route.queryParamMap.has('filterAt')) {
      return true;
    } else {
      const navigationExtras: NavigationExtras = {
        queryParams: {filterAt : moment().valueOf()},
        replaceUrl: true,
      };
      this.router.navigate([state.url], navigationExtras);
      return false;

    }
  }

}
