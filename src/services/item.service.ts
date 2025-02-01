import { injectable, inject } from "tsyringe";
import ItemRepo from "../repositories/item.repo";

/**
 * ItemService is responsible for handling the business logic related to items.
 * It interacts with the ItemRepo to perform CRUD operations on items.
 */
@injectable()
class ItemService {

    /**
     * @param {ItemRepo} ItemRepo - An instance of the ItemRepo class used to interact with the database.
     */
    constructor(
        @inject(ItemRepo) private ItemRepo: ItemRepo
    ) { }

    /**
     * Creates a new item in the repository.
     * 
     * @param {any} data - The data for the item to be created.
     * @returns {Promise<any>} The result of the creation process, typically the created item.
     */
    async createItem(data: any): Promise<any> {
        return this.ItemRepo.createItem(data);
    }

    /**
     * Retrieves all items from the repository.
     * 
     * @returns {Promise<any[]>} A list of all items.
     */
    async getAllItems(): Promise<any[]> {
        return this.ItemRepo.getAllItems();
    }
}

export default ItemService;
