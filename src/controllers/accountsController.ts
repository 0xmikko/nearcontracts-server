import {
  AccountsServiceI,
  AccountUpdateDTO, accountUpdateDTOSchema,
} from "../core/accounts";
import { Response } from "express";
import { RequestWithUser } from "./types";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import Ajv, { ValidateFunction } from "ajv";

@injectable()
export class AccountsController {
  private _service: AccountsServiceI;
  private readonly _updateDTOValidate: ValidateFunction;

  constructor(@inject(TYPES.AccountsService) service: AccountsServiceI) {
    this._service = service;
    this._updateDTOValidate = new Ajv().compile(accountUpdateDTOSchema);
  }

  getProfile() {
    return (req: RequestWithUser, res: Response) => {
      if (req.user === undefined || req.user.user_id === undefined) {
        return res.status(400).send("No user id");
      }

      try {
        this._service
          .get(req.user.user_id)
          .then((result) => {
            res.status(200).json(result);
          })
          .catch(() => res.status(400).send());
      } catch (e) {
        console.log(e)
        res.status(400).send(e);
      }
    };
  }

  list() {
    return (req: RequestWithUser, res: Response) => {
      if (req.user === undefined || req.user.user_id === undefined) {
        return res.status(400).send("No user id");
      }

      this._service
        .list()
        .then((result) => res.json(result))
        .catch((e) => res.status(400).send(e));
    };
  }

  update() {
    return (req: RequestWithUser, res: Response) => {
      if (req.user === undefined || req.user.user_id === undefined) {
        return res.status(400).send("No user id");
      }

      const dto: AccountUpdateDTO = {
        name: req.body.name,
        address: req.body.address,
      };

      console.log(dto)

      if (! this._updateDTOValidate(dto)) {
        return res.status(400).send("Incorrect request");
      }

      console.log(dto);

      try {
        this._service
          .update(req.user.user_id, dto)
          .then((result) => {
            console.log(result);
            res.status(200).json(result);
          })
          .catch(() => res.status(400).send());
      } catch (e) {
        console.log(e)
        res.status(400).send(e);
      }
    };
  }
}
