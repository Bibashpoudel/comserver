import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsLetter, newsLetterSchema } from 'src/contactus/newsLetter.schema';
import { BlogController } from './blog.controller';
import { Blog, blogSchema } from './blog.schema';
import { BlogService } from './blog.service';
import { Categories, categoriesSchema } from './categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: blogSchema }]),
    MongooseModule.forFeature([
      { name: Categories.name, schema: categoriesSchema },
    ]),
    MongooseModule.forFeature([
      { name: NewsLetter.name, schema: newsLetterSchema },
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
