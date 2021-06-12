import { Model } from 'mongoose';
import { HttpService, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country, CountryDocument } from '../schema/country.schema';
import to from 'await-to-js';

@Injectable()
export class CountryService implements OnModuleInit {
  constructor(
    @InjectModel(Country.name)
    private countryModel: Model<CountryDocument>,
    private httpService: HttpService,
  ) {}

  async onModuleInit() {
    // const is = await this.countryModel.find({});
    if ((await this.countryModel.find({})).length === 0) {
      const [error, response] = await to(
        this.httpService
          .get(
            `https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;alpha3Code;callingCodes`,
          )
          .toPromise(),
      );
      if (error) console.log(`Error on country pre-build`);

      if (response) {
        await this.countryModel.insertMany(
          response.data.map(
            ({ name, alpha2Code, alpha3Code, callingCodes }) => ({
              name,
              alphaCode2: alpha2Code,
              alphaCode3: alpha3Code,
              callingCode: callingCodes,
            }),
          ),
        );
      }
    }
    // this.countryModel.insertMany();
  }

  async findAll() {
    return this.countryModel.find({});
  }
}
