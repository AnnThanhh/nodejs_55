import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { buildQueryPrismaHelper } from 'src/common/helpers/build-query-prisma.helper';
import { PrismaService } from 'src/module-system/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  async findAll(req) {
    const { page, pageSize, index, where } = buildQueryPrismaHelper(req);

    const res = await this.prisma.articles.findMany({
      where: where,
      skip: index, // tương đương với offset trong sql
      take: pageSize, // tương đương với limit trong sql
      include: {
        Users: true,
      },
    });

    const totalItems = await this.prisma.articles.count({
      where: where,
    });
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      items: res,
      totalItems: totalItems,
      totalPages: totalPages,
      page: page,
      pageSize: pageSize,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
