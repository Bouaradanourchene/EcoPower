import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../entities/Purchase';
import { Payment } from '../entities/Payment';
import { Reponseachat } from '../entities/Reponseachat';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'environments/environment';
import { UserService } from './user.service';

const httpOptions= {
  headers: new HttpHeaders({
    'content-Type':'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  

  private purchasetUrl = 'http://localhost:9090/checkout/achat';

  private paymentUrl = environment.ecopowerApiUrl +'http://localhost:9090/checkout/payment';
  
  constructor(private httpClient: HttpClient,private userservice:UserService) {
   // this.stripe$ = loadStripe('pk_test_51MwbJREgRN5yvejWxFme20f8ZYyOWvGdwOjN63QJuyjqPlcxjElgrmWNqyQjspHQSDLqKAKa6wGGbw2QWHkH0lWt00FRt2Fllp');  }

   // private async getStripeInstance(): Promise<Stripe | null> {
    //  return await this.stripe$;
    }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchasetUrl, purchase);    
  }

  createPaymentIntent(payment: Payment): Observable<any> {
    const authToken = this.userservice.getAuthToken();
    const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
    };
    const options = { headers: headers };
    return this.httpClient.post<Payment>(this.paymentUrl, payment,options);
  }
 /*
  async createPaymentIntent(payment: Payment): Promise<any> {
    const stripe = await this.getStripeInstance();
    if (!stripe) {
      // Stripe failed to load
      throw new Error('Failed to load Stripe.');
    }

}*/
}
