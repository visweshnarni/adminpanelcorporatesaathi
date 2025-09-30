
import { Client, ClientDocument } from '../../types';
import { mockServices } from '../services/data';

// Create a unique list of clients from services
const clientMap = new Map<string, Client>();
mockServices.forEach(service => {
    if (!clientMap.has(service.email)) {
        clientMap.set(service.email, {
            id: `client-${clientMap.size + 1}`,
            name: service.clientName,
            organization: service.organization,
            email: service.email,
            phone: service.phone,
            firstSeen: service.startDate,
            status: 'Active',
        });
    }
});

export const mockClients: Client[] = Array.from(clientMap.values());

export const mockClientDocuments: ClientDocument[] = [
    {
        id: 'c-doc-1',
        clientId: 'client-1', // Acme Corporation
        name: 'MSA_Acme_Corp.pdf',
        type: 'Service Agreement',
        url: '#',
        size: '1.5 MB',
        uploadDate: '2024-07-14',
    },
    {
        id: 'c-doc-2',
        clientId: 'client-1', // Acme Corporation
        name: 'Director_ID_Proof.pdf',
        type: 'ID Proof',
        url: '#',
        size: '800 KB',
        uploadDate: '2024-07-14',
    },
    {
        id: 'c-doc-3',
        clientId: 'client-2', // Tech Solutions Pvt Ltd
        name: 'Contract_2024.pdf',
        type: 'Contract',
        url: '#',
        size: '500 KB',
        uploadDate: '2024-06-19',
    },
];
