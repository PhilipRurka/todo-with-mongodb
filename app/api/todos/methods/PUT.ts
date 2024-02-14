import TodoModel from '@/Models/todos';
import mongoConnect from '@/ServerUtils/mongoConnect';
import { TodoReq } from '@/Types/todos';

type TodoPutReturn = Promise<[{ data: { message: string } }, { status: number }]>;

type CatchError = {
  message: string;
};

const todosPut = async (reqData: TodoReq): TodoPutReturn => {
  try {
    await mongoConnect();
  } catch (error) {
    return [{ data: { message: 'Something went wrong with MongoConnection!' } }, { status: 500 }];
  }

  try {
    await TodoModel.create(reqData);

    return [{ data: { message: 'Success!' } }, { status: 200 }];
  } catch (err) {
    const error = err as CatchError;

    return [{ data: { message: error.message } }, { status: 503 }];
  }
};

export default todosPut;
