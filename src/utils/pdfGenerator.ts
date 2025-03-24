import PDFDocument from 'pdfkit';
import fs from 'fs';
import { IReservation } from '../models/reservation';

export const generateReservationPDF = (reservation: IReservation, pdfPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream(pdfPath);

        writeStream.on('finish', () => resolve());
        writeStream.on('error', (error) => reject(error));

        doc.pipe(writeStream);

        doc.fontSize(20).text('Reservation Details', { align: 'center' });
        doc.moveDown();

        doc.fontSize(12).text(`Reservation Number: ${reservation.reservation_num}`);
        doc.text(`User ID: ${reservation.user_id}`);
        doc.text(`Room ID: ${reservation.room_id}`);
        doc.text(`Arrival Date: ${reservation.arrival_date}`);
        doc.text(`Checkout Date: ${reservation.checkout_date}`);
        doc.text(`Number of Guests: ${reservation.num_of_guest}`);
        doc.text(`Status: ${reservation.status}`);

        doc.end();
    });
};
