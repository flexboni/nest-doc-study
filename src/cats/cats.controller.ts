import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';

@Controller('cats')
// @UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) {}

  //   @Post()
  //   @HttpCode(204)
  //   @Header('Cache-Control', 'none')
  //   create(): string {
  //     return 'This action adds a new cat';
  //   }

  //   @Post()
  //   async create(@Body() createCatDto: CreateCatDto) {
  //     return `This action adds a new cat.\n name: ${createCatDto.name}, age: ${createCatDto.age}, breed: ${createCatDto.breed}`;
  //   }

  // @Post()
  // async create(@Body() createCatDto: CreateCatDto) {
  //   console.log(createCatDto);
  //   this.catsService.create(createCatDto);
  // }

  // @Post()
  // @UseFilters(HttpExceptionFilter)
  // async create() {
  //   throw new ForbiddenException();
  // }

  // @Post()
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  @Post()
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  //   @Get()
  //   @Redirect('https://nestjs.com', 301)
  //   getDocs(@Query('version') version) {
  //     if (version && version == '5') {
  //       return { url: 'https://docs.nestjs.com/v5/' };
  //     }

  //     return 'This action redirect';
  //   }

  //   @Get()
  //   findAll(): string {
  //     return 'This action returns all cats';
  //   }

  //   @Get()
  //   async findAll(): Promise<any[]> {
  //     return [];
  //   }

  //   @Get()
  //   findAll(): Observable<any[]> {
  //     return of([]);
  //   }

  //   @Get()
  //   async findAll(): Promise<Cat[]> {
  //     return this.catsService.findAll();
  //   }

  @Get()
  findAll(
    @Query('activityOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    return this.catsService.findAll({ activeOnly, page });
  }

  //   @Get('ab*cd')
  //   findAllWithWildcard(): string {
  //     return 'This route uses a wildcard';
  //   }

  //   @Get(':id')
  //   findOneParamValue(@Param('id') id: number): string {
  //     console.log(id);

  //     return `This action returns a #${id} cat`;
  //   }

  //   @Get(':id')
  //   findOne(@Param() params: any): string {
  //     console.log(params);

  //     return `This action returns a #${params.id} cat`;
  //   }

  // @Get(':id')
  // findOne(@Param('id', new ParseIntPipe()) id: number): string {
  //   return this.catsService.findOne(id);
  // }
}
