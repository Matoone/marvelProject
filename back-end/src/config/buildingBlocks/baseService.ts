import { Repository } from "./baseRepository";
import { Identity } from "./identity";

export abstract class BaseService {
constructor(readonly repositories: Repository<any>[]){}
}