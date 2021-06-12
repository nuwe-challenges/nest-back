import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CountryDocument = Country & Document;

@Schema()
export class Country {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  alphaCode2: string;

  @Prop({ required: true })
  alphaCode3: string;

  @Prop({ required: true })
  callingCode: [string];
}

export const CountrySchema = SchemaFactory.createForClass(Country);
