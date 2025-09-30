
import React, { useState, useMemo } from 'react';
import { Client, Service, ClientDocument } from '../../types';
import { mockClients, mockClientDocuments } from './data';
import { mockServices } from '../services/data';
import { UsersIcon, ClientIcon } from '../icons/Icons';
import KPICard from '../dashboard/KPICard';
import ClientTable from './ClientTable';
import ClientDetailView from './ClientDetailView';

interface Props {
  searchQuery: string;
}

const ClientManagementView: React.FC<Props> = ({ searchQuery }) => {
    const [clients] = useState<Client[]>(mockClients);
    const [services] = useState<Service[]>(mockServices);
    const [documents] = useState<ClientDocument[]>(mockClientDocuments);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const filteredClients = useMemo(() => {
        if (!searchQuery) return clients;
        return clients.filter(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.organization.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [clients, searchQuery]);

    const stats = useMemo(() => ({
        total: clients.length,
        newThisMonth: clients.filter(c => new Date(c.firstSeen) > new Date(new Date().setDate(new Date().getDate() - 30))).length,
    }), [clients]);

    if (selectedClient) {
        return (
            <ClientDetailView 
                client={selectedClient}
                services={services.filter(s => s.email === selectedClient.email)}
                documents={documents.filter(d => d.clientId === selectedClient.id)}
                onBack={() => setSelectedClient(null)}
            />
        );
    }
    
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-gray-200">Client Management</h2>
                <p className="text-text-secondary dark:text-gray-400 mt-1">View and manage all your clients and their service history.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <KPICard title="Total Clients" value={String(stats.total)} icon={<UsersIcon />} color="blue" />
                <KPICard title="New Clients (Last 30 Days)" value={String(stats.newThisMonth)} icon={<ClientIcon />} color="green" />
            </div>

            <ClientTable clients={filteredClients} onViewDetails={setSelectedClient} />
        </div>
    );
};

export default ClientManagementView;
