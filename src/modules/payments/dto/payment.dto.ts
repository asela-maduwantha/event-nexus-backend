import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { PaymentStatus } from 'src/common/enums/payment-status.enum';

export class CreatePaymentDto {
    @ApiProperty({ description: 'Booking ID associated with the payment', example: '60d5f484f8a120001c8d4f6e' })
    @IsMongoId()
    booking: string;

    @ApiProperty({ description: 'Total payment amount', example: 100 })
    @IsNumber()
    amount: number;

    @ApiProperty({ description: 'Status of the payment', enum: PaymentStatus, default: PaymentStatus.PENDING })
    @IsEnum(PaymentStatus)
    status?: PaymentStatus;
}
