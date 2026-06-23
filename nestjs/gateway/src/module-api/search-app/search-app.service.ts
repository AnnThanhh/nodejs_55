import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch/dist/elasticsearch.service';
import { PrismaService } from 'src/module-system/prisma/prisma.service';

@Injectable()
export class SearchAppService {
  constructor(
    private prisma: PrismaService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async onModuleInit() {
    this.initArticles();
    this.initUser();
    this.initFood();
  }

  searchApp(text: string) {
    console.log(`Searching for: ${text}`);
    return 'search-app';
  }

  async initArticles() {
    //xóa index cũ nếu đã tồn tại
    // this.elasticsearchService.indices.delete({
    //   index: 'articles',
    //   ignore_unavailable: true, // Bỏ qua lỗi nếu index không tồn tại
    // });

    //đọc dữ liệu từ db và gắn vào elasticsearch
    const articles = await this.prisma.articles.findMany();
    articles.forEach((article) => {
      this.elasticsearchService.index({
        index: 'articles',
        id: String(article.id),
        document: article,
      });
    });
  }

  async initUser() {
    //đọc dữ liệu từ db và gắn vào elasticsearch
    const users = await this.prisma.users.findMany();
    users.forEach((user) => {
      this.elasticsearchService.index({
        index: 'users',
        id: String(user.id),
        document: user,
      });
    });
  }

  async initFood() {
    //đọc dữ liệu từ db và gắn vào elasticsearch
    const foods = await this.prisma.foods.findMany();
    foods.forEach((food) => {
      this.elasticsearchService.index({
        index: 'foods',
        id: String(food.id),
        document: food,
      });
    });
  }
}
