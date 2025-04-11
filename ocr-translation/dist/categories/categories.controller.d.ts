import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<import("./category.entity").Category>;
    findAll(page?: number, limit?: number): Promise<{
        categories: import("./category.entity").Category[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./category.entity").Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("./category.entity").Category>;
    remove(id: string): Promise<void>;
}
