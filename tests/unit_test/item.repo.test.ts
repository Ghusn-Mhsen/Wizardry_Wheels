import ItemRepo from '../../src/repositories/item.repo';
import Item from '../../src/models/item.model'; // Mongoose Model
import { Document } from 'mongoose';

jest.mock('../../src/models/item.model', () => {
    const mockItem = jest.fn(); // Mock constructor
    mockItem.prototype.save = jest.fn(); // Mock instance methods
    mockItem.find = jest.fn(); // Mock static methods
    return mockItem;
});

describe('ItemRepo', () => {
    let itemRepo: ItemRepo;

    beforeEach(() => {
        itemRepo = new ItemRepo();
    });

    describe('createItem', () => {
        it('should create an item successfully', async () => {
            const mockData = { name: 'product_1', weight: 100 };
            const mockSavedItem: Document = { _id: '1', ...mockData, save: jest.fn() };

            (Item.prototype.save as jest.Mock).mockResolvedValueOnce(mockSavedItem);

            const result = await itemRepo.createItem(mockData);
            expect(result).toEqual(mockSavedItem);
            expect(Item.prototype.save).toHaveBeenCalled();
        });

        it('should throw an error if item creation fails', async () => {
            const mockData = { name: 'product_2', weight: 200 };
            (Item.prototype.save as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

            await expect(itemRepo.createItem(mockData)).rejects.toThrowError('Failed to create item: Database error');
        });
    });

    describe('getAllItems', () => {
        it('should return all items', async () => {
            const mockItems: Document[] = [
                { _id: '1', name: 'product_1', weight: 100 },
                { _id: '2', name: 'product_2', weight: 200 },
            ];
            (Item.find as jest.Mock).mockResolvedValueOnce(mockItems);

            const result = await itemRepo.getAllItems();
            expect(result).toEqual(mockItems);
            expect(Item.find).toHaveBeenCalled();
        });

        it('should throw an error if retrieving items fails', async () => {
            (Item.find as jest.Mock).mockRejectedValueOnce(new Error('Failed to retrieve items'));

            await expect(itemRepo.getAllItems()).rejects.toThrowError('Failed to retrieve items: Failed to retrieve items');
        });
    });
});
