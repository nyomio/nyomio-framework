import {Component, OnInit} from '@angular/core';
import {Column} from 'nyomio-ng-components/lib/nyom-table/nyom-table.component';
import {ITdDynamicElementConfig, TdDynamicElement} from '@covalent/dynamic-forms';
import {defaultUser} from './state/user.model';
import {UserQuery} from './state/user.query';
import {UserService} from './state/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'nyomio-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  columns: Column[] = [
    {name: 'id', label: 'ID'},
    {name: 'email', label: 'Email'},
    {name: 'name', label: 'Name'},
    {name: 'organizationId', label: 'OrganizationId'},
  ];

  formElements: ITdDynamicElementConfig[] = [
    {
      name: 'email',
      label: 'Email',
      type: TdDynamicElement.Input,
      required: true,
    },
    {
      name: 'name',
      label: 'Name',
      type: TdDynamicElement.Input,
      required: true,
    },
    {
      name: 'organizationId',
      label: 'OrganizationId',
      type: TdDynamicElement.Input,
      required: true,
    },
  ];

  defaultEntity = defaultUser;

  constructor(public userQuery: UserQuery,
              public userService: UserService,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
  }

}

