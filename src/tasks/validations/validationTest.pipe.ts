import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidationTestPipe implements PipeTransform {
    transform(value: any) {
        console.log('value', value);
        return value;
    }
}