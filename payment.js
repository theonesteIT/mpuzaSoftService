// Payment System
class PaymentSystem {
    constructor() {
        this.paypalClientId = 'AfbUU3-0ZUziHDfo95DBQoTNzRY4DMzFRmwnf_ma4Oav0UwsV8YRLcAGFblRUOxCxsn7LOCPR0C9qZ4N';
        this.defaultPhoneNumber = '0798699601'; // Default phone number for payments
    }

    // Initialize PayPal
    initPayPal() {
        return new Promise((resolve, reject) => {
            if (window.paypal) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${this.paypalClientId}&currency=USD`;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
            document.body.appendChild(script);
        });
    }

    // Create PayPal payment
    async createPayment(amount, serviceName) {
        try {
            await this.initPayPal();
            
            return new Promise((resolve, reject) => {
                paypal.Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: amount
                                },
                                description: `Payment for ${serviceName}`,
                                custom_id: this.defaultPhoneNumber // Include phone number in payment details
                            }]
                        });
                    },
                    onApprove: (data, actions) => {
                        return actions.order.capture().then(details => {
                            resolve(details);
                        });
                    },
                    onError: (err) => {
                        reject(err);
                    }
                }).render('#paypal-button-container');
            });
        } catch (error) {
            console.error('Payment creation failed:', error);
            throw error;
        }
    }
}

// SMS Notification System
class SMSNotification {
    constructor() {
        this.apiKey = 'atsk_4bcf0ee09e26594a0f4cbe79a5c1eeae66671dbd8e89ff5ecd6c38679c898830e4cb3328';
        this.apiUrl = 'https://api.africastalking.com/version1/messaging';
        this.senderId = 'ImpuzaSoft';
    }

    // Send SMS notification
    async sendSMS(phoneNumber, message) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'apiKey': this.apiKey
                },
                body: new URLSearchParams({
                    username: 'sandbox', // Replace with your Africa's Talking username
                    to: phoneNumber,
                    message: message,
                    from: this.senderId
                })
            });

            if (!response.ok) {
                throw new Error('SMS sending failed');
            }

            return await response.json();
        } catch (error) {
            console.error('SMS notification failed:', error);
            throw error;
        }
    }
}

// Create global instances
const paymentSystem = new PaymentSystem();
const smsNotification = new SMSNotification();

// Export instances
window.paymentSystem = paymentSystem;
window.smsNotification = smsNotification; 