import {TemplateDTO, templateDTOSchema, TemplatesServiceI} from "../core/template";
import { Response } from "express";
import {RequestWithUser} from "./types";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import Ajv, {ValidateFunction} from 'ajv'

@injectable()
export class TemplatesController {
  private _service: TemplatesServiceI;
  private readonly _createDTOValidate : ValidateFunction;

  constructor(@inject(TYPES.TemplatesService) service: TemplatesServiceI) {
    this._service = service;
    this._createDTOValidate = new Ajv().compile(templateDTOSchema);
  }

  create() {
    return (req: RequestWithUser, res: Response) => {

      if (req.user === undefined || req.user.user_id === undefined) {
        return res.status(400).send("No user id");
      }

      const dto : TemplateDTO = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        content: req.body.content,
        isPublic: req.body.isPublic,
      }

      if (!this._createDTOValidate(dto)) {
        return res.status(400).send("Incorrect request");
      }

      console.log(dto);

      try {
        this._service
            .create(req.user.user_id, dto)
            .then((result) => {
              console.log(result);
              res.status(200).json(result); })
            .catch(() => res.status(400).send());
      } catch (e) {
        res.status(400).send(e);
      }

    }
  }

  list() {
    return (req: RequestWithUser, res: Response) => {

      if (req.user === undefined || req.user.user_id === undefined) {
        return res.status(400).send("No user id");
      }

      this._service
          .list(req.user.user_id)
          .then((result) => { console.log(result); res.json(result); } )
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

      const dto : TemplateDTO = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        content: req.body.content,
        isPublic: req.body.isPublic,
      }

      if (!this._createDTOValidate(dto)) {
        return res.status(400).send("Incorrect request");
      }

      console.log(dto);

      try {
        this._service
            .update(req.user.user_id, dto)
            .then((result) => {
              console.log(result);
              res.status(200).json(result); })
            .catch(() => res.status(400).send());
      } catch (e) {
        res.status(400).send(e);
      }

    }
  }

}

