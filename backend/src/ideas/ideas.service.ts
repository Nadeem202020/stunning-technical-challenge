import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateIdeaDto } from './dto/create-idea.dto';

@Injectable()
export class IdeasService {
  constructor(@InjectModel('Idea') private ideaModel: Model<any>) {}

  // simple dummy generator
  private generateSections(idea: string) {
    // keep deterministic/simple for this challenge
    return [
      { title: 'Hero', content: `Hero section for ${idea}` },
      { title: 'About', content: `About section describing ${idea}` },
      { title: 'Contact', content: `Contact details or call-to-action for ${idea}` }
    ];
  }

  async create(createIdeaDto: CreateIdeaDto) {
    const sections = this.generateSections(createIdeaDto.idea);
    const created = new this.ideaModel({ idea: createIdeaDto.idea, sections });
    try {
      const saved = await created.save();
      return { id: saved._id, idea: saved.idea, sections: saved.sections, createdAt: saved.createdAt };
    } catch (err) {
      throw new InternalServerErrorException('DB save failed');
    }
  }

  async findOne(id: string) {
    return this.ideaModel.findById(id).lean();
  }
}
