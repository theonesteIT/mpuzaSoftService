// Worker Model
class Worker {
    constructor(id, name, specialization, email, phone, image, status = 'active') {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
        this.email = email;
        this.phone = phone;
        this.image = image;
        this.status = status;
        this.bookings = [];
    }
}

// Client Model
class Client {
    constructor(id, name, email, phone, gender, status = 'active') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.status = status;
        this.bookings = [];
    }
}

// Booking Model
class Booking {
    constructor(id, clientId, serviceId, workerId, date, time, status = 'pending') {
        this.id = id;
        this.clientId = clientId;
        this.serviceId = serviceId;
        this.workerId = workerId;
        this.date = date;
        this.time = time;
        this.status = status;
    }
}

// Data Manager
class DataManager {
    constructor() {
        this.workers = JSON.parse(localStorage.getItem('workers')) || [];
        this.clients = JSON.parse(localStorage.getItem('clients')) || [];
        this.bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    }

    // Worker Management
    addWorker(worker) {
        this.workers.push(worker);
        this.saveWorkers();
    }

    updateWorker(id, updatedWorker) {
        const index = this.workers.findIndex(worker => worker.id === id);
        if (index !== -1) {
            this.workers[index] = { ...this.workers[index], ...updatedWorker };
            this.saveWorkers();
        }
    }

    deleteWorker(id) {
        this.workers = this.workers.filter(worker => worker.id !== id);
        this.saveWorkers();
    }

    getWorkerById(id) {
        return this.workers.find(worker => worker.id === id);
    }

    getAllWorkers() {
        return this.workers;
    }

    // Client Management
    addClient(client) {
        this.clients.push(client);
        this.saveClients();
    }

    updateClient(id, updatedClient) {
        const index = this.clients.findIndex(client => client.id === id);
        if (index !== -1) {
            this.clients[index] = { ...this.clients[index], ...updatedClient };
            this.saveClients();
        }
    }

    deleteClient(id) {
        this.clients = this.clients.filter(client => client.id !== id);
        this.saveClients();
    }

    getClientById(id) {
        return this.clients.find(client => client.id === id);
    }

    getAllClients() {
        return this.clients;
    }

    // Booking Management
    addBooking(booking) {
        this.bookings.push(booking);
        this.saveBookings();
    }

    updateBooking(id, updatedBooking) {
        const index = this.bookings.findIndex(booking => booking.id === id);
        if (index !== -1) {
            this.bookings[index] = { ...this.bookings[index], ...updatedBooking };
            this.saveBookings();
        }
    }

    deleteBooking(id) {
        this.bookings = this.bookings.filter(booking => booking.id !== id);
        this.saveBookings();
    }

    getBookingById(id) {
        return this.bookings.find(booking => booking.id === id);
    }

    getAllBookings() {
        return this.bookings;
    }

    getBookingsByDate(date) {
        return this.bookings.filter(booking => booking.date === date);
    }

    getBookingsByWorker(workerId) {
        return this.bookings.filter(booking => booking.workerId === workerId);
    }

    getBookingsByClient(clientId) {
        return this.bookings.filter(booking => booking.clientId === clientId);
    }

    // Analytics
    getServicePopularity() {
        const serviceCounts = {};
        this.bookings.forEach(booking => {
            serviceCounts[booking.serviceId] = (serviceCounts[booking.serviceId] || 0) + 1;
        });
        return serviceCounts;
    }

    getClientDemographics() {
        const demographics = {
            male: 0,
            female: 0,
            other: 0
        };
        this.clients.forEach(client => {
            demographics[client.gender]++;
        });
        return demographics;
    }

    getMonthlyRevenue() {
        const monthlyRevenue = {};
        this.bookings.forEach(booking => {
            const month = booking.date.substring(0, 7); // YYYY-MM
            const service = serviceManager.getServiceById(booking.serviceId);
            if (service) {
                const price = parseFloat(service.pricingPlans.basic.price.replace(/[^0-9.-]+/g, ''));
                monthlyRevenue[month] = (monthlyRevenue[month] || 0) + price;
            }
        });
        return monthlyRevenue;
    }

    // Save to localStorage
    saveWorkers() {
        localStorage.setItem('workers', JSON.stringify(this.workers));
    }

    saveClients() {
        localStorage.setItem('clients', JSON.stringify(this.clients));
    }

    saveBookings() {
        localStorage.setItem('bookings', JSON.stringify(this.bookings));
    }
}

// Create a global instance of DataManager
const dataManager = new DataManager();

// Export the DataManager instance
window.dataManager = dataManager; 