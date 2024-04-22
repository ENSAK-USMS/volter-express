
import {
    Request,
    Res,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Route,
    Tags,
    Body,
    TsoaResponse,
} from 'tsoa';

import { Response } from '@tsoa/runtime';
import OrderModel,{IOrder} from '../models/order_model';

@Route('orders')
@Tags('Order Controller')
export class OrderController extends Controller {
    @Get('/')
    public async getAllOrders(): Promise<IOrder[]> {
        const orders = await OrderModel.find();
        return orders;
    }

    @Get('/:id')
    public async getOrderById(id: string): Promise<IOrder> {
        const order = await OrderModel.findById(id);
        if (!order) {
            this.setStatus(404);
            return;
        }
        return order;
    }

    @Post('/')
    public async createOrder(
        @Request() request: Express.Request,
        @Res() res: TsoaResponse<200, IOrder>,
         @Body() body?: IOrder
    ): Promise<IOrder> {
        const order = new OrderModel(body);
        const createdOrder = await order.save();
        
        return createdOrder;
    }

    @Put('/:id')
    public async updateOrder(
        id: string,
        @Request() request: Express.Request,
        @Response() response: Express.Response
    ): Promise<IOrder> {
        const order = await OrderModel.findByIdAndUpdate(id, request.body, {
            new: true,
        });
        if (!order) {
            this.setStatus(404);
            return;
        }
        return order;
    }

    @Delete('/:id')
    public async deleteOrder(id: string): Promise<void> {
        const order = await OrderModel.findByIdAndDelete(id);
        if (!order) {
            this.setStatus(404);
            return;
        }
    }
}
