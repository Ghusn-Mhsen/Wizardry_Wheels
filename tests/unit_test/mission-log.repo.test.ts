import MissionLogRepo from '../../src/repositories/mission_log.repo';
import MissionLog from '../../src/models/mission_log.model'; // Mongoose Model
import { Document } from 'mongoose';

jest.mock('../../src/models/mission_log.model', () => {
    const mockMissionLog = jest.fn(); // Mock constructor
    mockMissionLog.prototype.save = jest.fn(); // Mock instance methods
    mockMissionLog.find = jest.fn(); // Mock static methods
    return mockMissionLog;
});

describe('MissionLogRepo', () => {
    let missionLogRepo: MissionLogRepo;

    beforeEach(() => {
        missionLogRepo = new MissionLogRepo();
    });

    describe('createLog', () => {
        it('should create a mission log successfully', async () => {
            const mockData = { MoverId: '1', action: 'loading' };
            const mockLog: Document = { _id: '1', ...mockData, save: jest.fn() };

            (MissionLog.prototype.save as jest.Mock).mockResolvedValueOnce(mockLog);

            const result = await missionLogRepo.createLog(mockData.MoverId, mockData.action);
            expect(result).toEqual(mockLog);
            expect(MissionLog.prototype.save).toHaveBeenCalled();
        });

        it('should throw an error if log creation fails', async () => {
            const mockData = { MoverId: '1', action: 'on-mission' };
            (MissionLog.prototype.save as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

            await expect(missionLogRepo.createLog(mockData.MoverId, mockData.action)).rejects.toThrowError(
                'Failed to create mission log: Database error'
            );
        });
    });

    describe('getAllItems', () => {
        it('should return all mission logs', async () => {
            const mockLogs: Document[] = [
                { _id: '1', MoverId: '1', action: 'loading' },
                { _id: '2', MoverId: '2', action: 'unloading' },
            ];
            (MissionLog.find as jest.Mock).mockResolvedValueOnce(mockLogs);

            const result = await missionLogRepo.getAllItems();
            expect(result).toEqual(mockLogs);
            expect(MissionLog.find).toHaveBeenCalled();
        });

        it('should throw an error if retrieving mission logs fails', async () => {
            (MissionLog.find as jest.Mock).mockRejectedValueOnce(new Error('Failed to retrieve mission logs'));

            await expect(missionLogRepo.getAllItems()).rejects.toThrowError(
                'Failed to retrieve mission logs: Failed to retrieve mission logs'
            );
        });
    });
});
