import { Controller, Get } from '@nestjs/common';
import { CountryService } from '../services/country.service';

@Controller('countries')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get()
  async findAll() {
    return this.countryService.findAll();
  }
}
