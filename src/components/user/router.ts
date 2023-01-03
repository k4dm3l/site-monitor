import { Router, RequestHandler } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/authenticationHandler';

const userRouter = ({
  router,
  getUserController,
  createUserController,
}: {
  router: Router,
  getUserController: RequestHandler,
  createUserController: RequestHandler,
}): Router => {
  router.get('/:id', verifyToken, asyncHandler(getUserController));

  router.post('/', asyncHandler(createUserController));

  return router;
};

export default userRouter;
