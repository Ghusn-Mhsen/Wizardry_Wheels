import MoverRepo from "../../src/repositories/mover.repo";
import Mover from "../..//src/models/mover.model";


jest.mock("../../src/models/mover.model.ts"); // Mock the Mongoose model

describe("MoverRepo", () => {
    let moverRepo: MoverRepo;

    beforeEach(() => {
        jest.clearAllMocks();
        moverRepo = new MoverRepo();
    });

    describe("createMover", () => {
        it("should create a new mover and return the document", async () => {
            const mockMoverData = { weightLimit: 600, questState: "resting", items: [], missionsCompleted: 0 };
            const mockSavedMover = { ...mockMoverData, _id: "12345" };

            // Mock Mongoose methods
            (Mover as any).mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(mockSavedMover),
            }));

            const result = await moverRepo.createMover(mockMoverData);

            expect(result).toEqual(mockSavedMover);
            expect(Mover).toHaveBeenCalledWith(mockMoverData);
        });

        it("should throw an error if creation fails", async () => {
            const mockMoverData = { weightLimit: 600, questState: "resting" };

            // Mock Mongoose methods
            (Mover as any).mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error("Failed to save")),
            }));

            await expect(moverRepo.createMover(mockMoverData)).rejects.toThrow("Failed to create mover: Failed to save");
        });
    });

    describe("findMoverById", () => {
        it("should find a mover by ID", async () => {
            const mockMoverId = "12345";
            const mockMover = { _id: mockMoverId, weightLimit: 600, questState: "resting", items: [] };

            // Mock Mongoose methods
            Mover.findById = jest.fn().mockResolvedValue(mockMover);

            const result = await moverRepo.findMoverById(mockMoverId);

            expect(result).toEqual(mockMover);
            expect(Mover.findById).toHaveBeenCalledWith(mockMoverId);
        });

        it("should throw an error if the mover is not found", async () => {
            const mockMoverId = "12345";

            // Mock Mongoose methods
            Mover.findById = jest.fn().mockRejectedValue(new Error("Failed to find"));

            await expect(moverRepo.findMoverById(mockMoverId)).rejects.toThrow("Failed to find mover by ID: Failed to find");
        });
    });

    describe("updateMover", () => {
        it("should update a mover and return the updated document", async () => {
            const mockMoverId = "12345";
            const mockUpdateData = { questState: "loading" };
            const mockUpdatedMover = { _id: mockMoverId, ...mockUpdateData };

            // Mock Mongoose methods
            Mover.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedMover);

            const result = await moverRepo.updateMover(mockMoverId, mockUpdateData);

            expect(result).toEqual(mockUpdatedMover);
            expect(Mover.findByIdAndUpdate).toHaveBeenCalledWith(mockMoverId, mockUpdateData, { new: true });
        });

        it("should throw an error if updating fails", async () => {
            const mockMoverId = "12345";
            const mockUpdateData = { questState: "loading" };

            // Mock Mongoose methods
            Mover.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error("Failed to update"));

            await expect(moverRepo.updateMover(mockMoverId, mockUpdateData)).rejects.toThrow("Failed to update mover: Failed to update");
        });
    });

    describe("getMostCompletedMissions", () => {
        it("should retrieve movers sorted by completed missions", async () => {
            const mockMovers = [
                { _id: "1", missionsCompleted: 10 },
                { _id: "2", missionsCompleted: 5 },
            ];

            // Mock Mongoose methods
            Mover.find = jest.fn().mockReturnValue({
                sort: jest.fn().mockResolvedValue(mockMovers),
            });

            const result = await moverRepo.getMostCompletedMissions();

            expect(result).toEqual(mockMovers);
            expect(Mover.find).toHaveBeenCalled();
            expect(Mover.find().sort).toHaveBeenCalledWith({ missionsCompleted: -1 });
        });

        it("should throw an error if retrieval fails", async () => {
            Mover.find = jest.fn().mockReturnValue({
                sort: jest.fn().mockRejectedValue(new Error("Failed to retrieve")),
            });

            await expect(moverRepo.getMostCompletedMissions()).rejects.toThrow(
                "Failed to retrieve most completed missions: Failed to retrieve"
            );
        });
    });

    describe("getAllMovers", () => {
        it("should retrieve all movers and populate items", async () => {
            const mockMovers = [{ _id: "1", items: ["item1"] }];

            // Mock Mongoose methods
            Mover.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockMovers),
            });

            const result = await moverRepo.getAllMovers();

            expect(result).toEqual(mockMovers);
            expect(Mover.find).toHaveBeenCalled();
            expect(Mover.find().populate).toHaveBeenCalledWith("items");
        });

        it("should return an empty array if retrieval fails", async () => {
            Mover.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockRejectedValue(new Error("Failed to retrieve")),
            });

            const result = await moverRepo.getAllMovers();

            expect(result).toEqual([]);
        });
    });
});
