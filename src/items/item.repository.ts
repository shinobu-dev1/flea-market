import { Item } from "src/entities/item.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateItemDto } from "./dto/create-item.dto";
import { ItemStatus } from "./item-status.enum";
import { User } from "src/entities/user.entity";

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
    async createItem(
        createItemDto: CreateItemDto,
        user: User
    ) {
        const { name, price, description } = createItemDto;
        const item = this.create({
            name,
            price,
            description,
            status: ItemStatus.ON_SALE,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user,
        });

        await this.save(item);

        return item;
    }

}
