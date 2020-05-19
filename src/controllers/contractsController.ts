import {
  ContractCreateDTO,
  contractCreateDTOSchema,
  ContractsServiceI,
  ContractUpdateDTO, contractUpdateDTOSchema,
} from "../core/contract";
import { Response } from "express";
import { RequestWithUser } from "./types";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import Ajv, { ValidateFunction } from "ajv";

@injectable()
export class ContractsController {
  private _service: ContractsServiceI;
  private readonly _createDTOValidate: ValidateFunction;
  private readonly _updateDTOValidate: ValidateFunction;

  constructor(@inject(TYPES.ContractsService) service: ContractsServiceI) {
    this._service = service;
    this._createDTOValidate = new Ajv().compile(contractCreateDTOSchema);
    this._updateDTOValidate = new Ajv().compile(contractUpdateDTOSchema);
  }

  create() {
    return (req: RequestWithUser, res: Response) => {
      if (req.user === undefined || req.user.user_id === undefined) {
        return res.status(400).send("No user id");
      }

      const dto: ContractCreateDTO = {
        template_id: req.body.template_id,
      };

      if (!this._createDTOValidate(dto)) {
        return res.status(400).send("Incorrect request");
      }

      console.log(dto);

      try {
        this._service
          .create(req.user.user_id, dto)
          .then((result) => {
            console.log(result);
            res.status(200).json(result);
          })
          .catch((e) => {console.log(e);  res.status(400).send()})
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
        .list(req.user.user_id)
        .then((result) => res.json(result))
        .catch((e) => res.status(400).send(e));
    };
  }

  retrieve() {
    return (req: RequestWithUser, res: Response) => {
      if (req.user === undefined || req.user.user_id === undefined) {
        return res.status(400).send("No user id");
      }

      const id = req.params.id;
      if (id === undefined) {
        return res.status(400).send("No id");
      }

      this._service
        .findById(req.user.user_id, id)
        .then((result) => res.json(result))
        .catch(() => res.status(400).send());
    };
  }

  update() {
    return (req: RequestWithUser, res: Response) => {
      if (req.user === undefined || req.user.user_id === undefined) {
        return res.status(400).send("No user id");
      }

      const dto: ContractUpdateDTO = {
        id: req.body.id,
        name: req.body.name,
        date: req.body.date,
        content: req.body.content,
        address: req.body.address,
        isDeployed: req.body.isDeployed,
        partnerID: req.body.partnerID,
        ownerIsSupplier: req.body.ownerIsSupplier,
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
