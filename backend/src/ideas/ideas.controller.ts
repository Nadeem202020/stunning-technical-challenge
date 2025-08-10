import { Controller, Post, Body, Get, Param, BadRequestException } from '@nestjs/common';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { IdeasService } from './ideas.service';

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  async create(@Body() dto: CreateIdeaDto) {
    if (!dto || !dto.idea) throw new BadRequestException('idea is required');
    return this.ideasService.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const doc = await this.ideasService.findOne(id);
    if (!doc) throw new BadRequestException('not found');
    if (Array.isArray(doc)) {
      if (doc.length === 0) throw new BadRequestException('not found');
      return { id: doc[0]._id, idea: doc[0].idea, sections: doc[0].sections, createdAt: doc[0].createdAt };
    }
    return { id: doc._id, idea: doc.idea, sections: doc.sections, createdAt: doc.createdAt };
  }
}
