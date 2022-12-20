import { Router, RequestHandler } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';

const userRouter = ({
  router,
  getUserController,
  createUserController,
}: {
  router: Router,
  getUserController: RequestHandler,
  createUserController: RequestHandler,
}): Router => {
  router.get('/:id', asyncHandler(getUserController));

  router.post('/', asyncHandler(createUserController));

  return router;
};

export default userRouter;
