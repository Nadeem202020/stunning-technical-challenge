import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeasController } from './ideas/ideas.controller';
import { IdeasService } from './ideas/ideas.service';
import { MongooseModule as MongooseFeatureModule } from '@nestjs/mongoose';
import { IdeaSchema } from './models/idea.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/task_database'),
    MongooseModule.forFeature([{ name: 'Idea', schema: IdeaSchema }]),
    // IdeasModule,
  ],
  controllers: [AppController, IdeasController], // controllers go here
  providers: [AppService, IdeasService],         // services go here
})
export class AppModule {}
