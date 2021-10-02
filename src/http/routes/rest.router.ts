import { plural } from '../../../deps.ts'
import CreateController from '../controllers/rest/create.controller.ts'
import DeleteController from '../controllers/rest/delete.controller.ts'
import ReadController from '../controllers/rest/read.controller.ts'
import UpdateController from '../controllers/rest/update.controller.ts'
import Handler from '../exceptions/handler.ts'
import { Config } from '../server.ts'
import Router from './router.ts'


export default class RestRouter extends Router {
  protected path({ path }: Pick<Config, 'path'>): string {
    return path ? path : `/`
  }

  protected build(path: string): void {
    this.router
      .post(path, Handler, CreateController)
      .get(path, Handler, ReadController)
      .get(`${path}/:id`, Handler, ReadController)
      .put(`${path}/:id`, Handler, UpdateController)
      .patch(`${path}/:id`, Handler, UpdateController)
      .delete(`${path}/:id`, Handler, DeleteController)
  }
}
