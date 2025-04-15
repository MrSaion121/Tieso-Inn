import fs from 'fs';
import PDFDocument from 'pdfkit';
import { generateReservationPDF } from '../../src/utils/pdfGenerator';
import { IReservation } from '../../src/models/reservation';
import { ObjectId } from 'mongoose';

jest.mock('fs');
jest.mock('pdfkit');

describe('generateReservationPDF', () => {
    const mockReservation = {
        reservation_num: 'R12345',
        user_id: '123' as unknown as ObjectId,
        room_id: 'Room101' as unknown as ObjectId,
        arrival_date: new Date('2025-05-01'),
        checkout_date: new Date('2025-05-05'),
        num_of_guest: 2,
        status: 'Confirmed',
    };

    const mockWriteStream = {
        on: jest.fn(),
        once: jest.fn(),
        emit: jest.fn(),
    };

    const mockDoc = {
        pipe: jest.fn(),
        fontSize: jest.fn().mockReturnThis(),
        text: jest.fn().mockReturnThis(),
        moveDown: jest.fn().mockReturnThis(),
        end: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (fs.createWriteStream as jest.Mock).mockReturnValue(mockWriteStream);
        (PDFDocument as unknown as jest.Mock).mockImplementation(() => mockDoc);
        (mockWriteStream.on as jest.Mock).mockImplementation((event: string, callback: () => void) => {
            if (event === 'finish') {
                setImmediate(callback);
            }
        });
    });

    it('should generate a PDF and resolve the promise', async () => {
        await expect(generateReservationPDF(mockReservation as IReservation, 'fakePath.pdf')).resolves.toBeUndefined();
        expect(fs.createWriteStream).toHaveBeenCalledWith('fakePath.pdf');
        expect(mockWriteStream.on).toHaveBeenCalledWith('finish', expect.any(Function));
        expect(mockWriteStream.on).toHaveBeenCalledWith('error', expect.any(Function));
    });

    it('should reject the promise if an error occurs', async () => {
        const error = new Error('write failed');
        (mockWriteStream.on as jest.Mock).mockImplementation((event: string, callback: (err?: Error) => void) => {
            if (event === 'error') {
                setImmediate(() => callback(error));
            }
        });
        await expect(generateReservationPDF(mockReservation as IReservation, 'fail.pdf')).rejects.toThrow('write failed');
    });
});
