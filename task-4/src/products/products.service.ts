import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepo: Repository<Products>, 
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.productsRepo.create(dto);
    const data = await this.productsRepo.save(product);
    return { message: 'Product created successfully', data };
  }

  async findAll() {
    const data = await this.productsRepo.find({ order: { createdAt: 'DESC' } });
    return { message: 'All products fetched', count: data.length, data };
  }

  async findOne(id: number) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`); 
    return { message: 'Product found', data: product };
  }

  async update(id: number, dto: PartialUpdateProductDto) {
    await this.findOne(id);
    await this.productsRepo.update(id, dto);
    return this.findOne(id);
  }

  async replace(id: number, dto: UpdateProductDto) {
    await this.findOne(id);
    await this.productsRepo.save({ id, ...dto });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.productsRepo.delete(id);
    return { message: 'Product deleted', id };
  }

  async findByCategory(category: string) {
    const data = await this.productsRepo.find({ where: { category } });
    return { message: `Products in ${category}`, count: data.length, data };
  }

  async search(keyword: string) {
    const data = await this.productsRepo.find({
      where: { name: ILike(`%${keyword}%`) }, //Insensitive Like
    });
    return { message: 'Search results', count: data.length, data };
  }

  async toggleActive(id: number) {
    const product = (await this.findOne(id)).data;
    product.isActive = !product.isActive;
    const data = await this.productsRepo.save(product);
    return { message: 'Status toggled', data };
  }
}