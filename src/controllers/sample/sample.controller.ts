import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('sample')
export class SampleController {
  @Get()
  findAll(): string {
    return 'Test';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return id;
  }

  @Post()
  addOne(@Body('data') data: string) {
    return data;
  }
}
