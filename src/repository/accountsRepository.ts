import {Account, AccountsRepositoryI} from '../core/accounts';
import {TypeORMRepository} from './typeORMRepository';
import {injectable} from 'inversify';

@injectable()
export class AccountsRepository extends TypeORMRepository<Account>
    implements AccountsRepositoryI {
    constructor() {
        super(Account);
    }


}
