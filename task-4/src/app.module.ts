import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { ProductsModule } from './products/products.module'; 

@Module({
  imports: [
    ProductsModule, 
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost', 
      port: 5432, 
      username: 'postgres', 
      password: 'Sef@t', 
      database: 'product_inventory_db', 
      autoLoadEntities: true, 
      synchronize: true, // Shudhu development stage-er jonno true 
    }),
  ],
})
export class AppModule {} 