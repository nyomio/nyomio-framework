import {User} from '../../../projects/nyomio-ng-components/src/lib/pages/user-page/state/user.model';
import {Organization} from '../organization.model';

export const mockUsers: User[] = [
  {
    email: 'demo.user.1@nyom.io',
    id: 1,
    name: 'Demo User 1'
  },
  {
    email: 'demo.user.2@nyom.io',
    id: 2,
    name: 'Demo User 2'
  },
];

export const mockOragnizations: Organization[] = [
  {
    id: 1,
    org_name: 'Demo Org 1',
    org_address: 'Demo Street 1, Democity, Demoland'
  },
  {
    id: 2,
    org_name: 'Demo Org 2',
    org_address: 'Demo Street 2, Democity, Demoland'
  },
];
