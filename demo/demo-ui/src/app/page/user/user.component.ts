import { Component, OnInit } from '@angular/core';
import {Column} from "nyomio-ng-components/lib/nyom-table/nyom-table.component";
import {ITdDynamicElementConfig, TdDynamicElement} from "@covalent/dynamic-forms";
import {defaultUser} from "../../state/user/user.model";
import {UserQuery} from "../../state/user/user.query";
import {UserService} from "../../state/user/user.service";
import {ActivatedRoute, ActivationEnd, ParamMap, UrlSegment} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

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

