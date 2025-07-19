import { Document, Page } from '@react-pdf/renderer';
import { tailwindToReactPDF, ReactToReactPDF } from 'tailwind-to-react-pdf';

export default function PdfTW({ aim, theory, conclusion }:any) {
    return (
        <Document>
            <Page size="A4">
                <ReactToReactPDF>
                    <div className="flex flex-col p-4">
                        <div className="flex justify-center items-center h-20 border border-black">
                            but this wont work
                            <p className='text-sm font-serif'>EXPERIMENT NO. </p>
                        </div>
                    </div>
                </ReactToReactPDF>
            </Page>
        </Document>
    );
}
